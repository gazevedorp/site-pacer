import {
  useState,
  useRef,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle, Paperclip, X } from "lucide-react";
import { jobAreaOptions } from "@/data/careers";
import { contactSubjectOptions } from "@/data/contact";
import { submitContato } from "@/lib/cms/mutations/contatos";
import { submitCandidatura } from "@/lib/cms/mutations/candidaturas";
import { cn } from "@/lib/utils";
import {
  TurnstileWidget,
  isTurnstileRequired,
} from "@/components/shared/TurnstileWidget";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type FormVariant = "careers" | "contact";

type FormState = "idle" | "loading" | "success" | "error";

// ─── Rate-limit (client-side visual guard) ─────────────────────────────────────
// Separate counters per variant so one page doesn't block the other.

const lastSubmitTimes: Record<FormVariant, number> = { careers: 0, contact: 0 };
const RATE_LIMIT_MS = 60_000;
/** Reject instant bot submits (form filled faster than a human). */
const MIN_FILL_MS = 3_000;

// ─── Phone mask ───────────────────────────────────────────────────────────────

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

export function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-primary" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-error"
            role="alert"
            aria-live="assertive"
            id={`${htmlFor}-error`}
          >
            <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export const inputClass =
  "w-full rounded-xl border border-border bg-card/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 hover:border-primary/40 focus:border-primary/60 focus:bg-card/10 focus:outline-none focus:ring-2 focus:ring-primary/25 aria-invalid:border-error/50 aria-invalid:focus:ring-error/25";

export const careersInputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 hover:border-primary/40 focus:border-primary/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25 aria-invalid:border-error/50 aria-invalid:focus:ring-error/25";

// ─── Shared base fields ────────────────────────────────────────────────────────

interface BaseFields {
  name: string;
  email: string;
  phone: string;
  /** honeypot */
  _hp: string;
}

// ─── Variant field shapes ──────────────────────────────────────────────────────

interface CareersFields extends BaseFields {
  area: string;
}

interface ContactFields extends BaseFields {
  subject: string;
  message: string;
}

type FieldsByVariant<V extends FormVariant> = V extends "careers"
  ? CareersFields
  : ContactFields;

// ─── Validation ───────────────────────────────────────────────────────────────

type FormErrors = Partial<Record<string, string>>;

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_ACCEPT = "application/pdf,image/jpeg,image/png,image/webp";
const RESUME_ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const RESUME_ALLOWED_EXTENSIONS = /\.(pdf|jpe?g|png|webp)$/i;

function isAllowedResumeFile(file: File): boolean {
  if (RESUME_ALLOWED_TYPES.has(file.type)) return true;
  if (!file.type && RESUME_ALLOWED_EXTENSIONS.test(file.name)) return true;
  return false;
}

function validateCareers(fields: CareersFields, resume: File | null): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim() || fields.name.trim().length < 3)
    errors.name = "Nome deve ter ao menos 3 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Informe um e-mail válido.";
  if (fields.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Informe um telefone válido com DDD.";
  if (!fields.area)
    errors.area = "Selecione a área de interesse.";

  if (!resume || resume.size === 0) {
    errors.resume = "Currículo é obrigatório (PDF ou imagem).";
  } else if (!isAllowedResumeFile(resume)) {
    errors.resume = "Apenas PDF ou imagens (JPG, PNG, WEBP) são aceitos.";
  } else if (resume.size > RESUME_MAX_BYTES) {
    errors.resume = "O arquivo deve ter no máximo 5MB.";
  }

  return errors;
}

function validateContact(fields: ContactFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim() || fields.name.trim().length < 3)
    errors.name = "Nome deve ter ao menos 3 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Informe um e-mail válido.";
  if (fields.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Informe um telefone válido com DDD.";
  if (!fields.subject)
    errors.subject = "Selecione um assunto.";
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = "Mensagem deve ter ao menos 10 caracteres.";
  if (fields.message.length > 500)
    errors.message = "Mensagem não pode ultrapassar 500 caracteres.";

  return errors;
}

// ─── Success messages per variant ─────────────────────────────────────────────

const successCopy: Record<FormVariant, { heading: string; body: string }> = {
  careers: {
    heading: "Candidatura enviada!",
    body: "Recebemos seus dados e entraremos em contato em breve. Boa sorte — você deu o primeiro passo!",
  },
  contact: {
    heading: "Mensagem enviada!",
    body: "Recebemos sua mensagem e responderemos em até 2 dias úteis. Obrigado pelo contato!",
  },
};

// ─── ContactFormBase ──────────────────────────────────────────────────────────

interface ContactFormBaseProps {
  variant: FormVariant;
}

export function ContactFormBase({ variant }: ContactFormBaseProps) {
  const reduced = useReducedMotion();

  // ── State ──────────────────────────────────────────────────────────────────

  const [careersFields, setCareersFields] = useState<CareersFields>({
    name: "",
    email: "",
    phone: "",
    area: "",
    _hp: "",
  });

  const [contactFields, setContactFields] = useState<ContactFields>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    _hp: "",
  });

  const fields: FieldsByVariant<typeof variant> =
    variant === "careers"
      ? (careersFields as FieldsByVariant<typeof variant>)
      : (contactFields as FieldsByVariant<typeof variant>);

  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [rateLimited, setRateLimited] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const mountedAtRef = useRef(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeUploadRef = useRef<HTMLButtonElement>(null);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      const masked = name === "phone" ? maskPhone(value) : value;

      if (variant === "careers") {
        setCareersFields((prev) => ({ ...prev, [name]: masked }));
      } else {
        setContactFields((prev) => ({ ...prev, [name]: masked }));
      }

      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [variant]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setResume(file);
      setErrors((prev) => ({ ...prev, resume: undefined }));
    },
    []
  );

  const clearFile = useCallback(() => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Honeypot check
      if ((fields as BaseFields)._hp) return;

      // Timing honeypot — bots often submit instantly
      if (Date.now() - mountedAtRef.current < MIN_FILL_MS) {
        setErrors({
          form: "Aguarde um momento e tente novamente.",
        });
        return;
      }

      // Optional Turnstile (enabled when VITE_TURNSTILE_SITE_KEY is set)
      if (isTurnstileRequired() && !turnstileToken) {
        setErrors({
          form: "Confirme que você não é um robô antes de enviar.",
        });
        return;
      }

      // Rate limit
      const now = Date.now();
      const last = lastSubmitTimes[variant];
      if (now - last < RATE_LIMIT_MS) {
        setRateLimited(true);
        setTimeout(
          () => setRateLimited(false),
          RATE_LIMIT_MS - (now - last)
        );
        return;
      }

      const errs =
        variant === "careers"
          ? validateCareers(careersFields, resume)
          : validateContact(contactFields);

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        const firstKey = Object.keys(errs)[0];
        if (firstKey === "resume") {
          resumeUploadRef.current?.focus();
        } else {
          document.getElementById(firstKey)?.focus();
        }
        return;
      }

      setFormState("loading");
      lastSubmitTimes[variant] = Date.now();

      try {
        if (variant === "careers") {
          await submitCandidatura({
            name: careersFields.name,
            email: careersFields.email,
            phone: careersFields.phone,
            area: careersFields.area,
            resume: resume!,
          });
        } else {
          await submitContato({
            name: contactFields.name,
            email: contactFields.email,
            phone: contactFields.phone,
            subject: contactFields.subject,
            message: contactFields.message,
          });
        }
        setFormState("success");
      } catch {
        setFormState("error");
      }
    },
    [variant, fields, careersFields, contactFields, resume, turnstileToken]
  );

  // ── Success ────────────────────────────────────────────────────────────────

  if (formState === "success") {
    const copy = successCopy[variant];
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4 rounded-2xl border border-success/20 bg-success/[0.06] p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-success/30 bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{copy.heading}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{copy.body}</p>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  const cf = careersFields;
  const ctf = contactFields;
  const fieldClass = variant === "careers" ? careersInputClass : inputClass;
  const sharedName = variant === "careers" ? cf.name : ctf.name;
  const sharedEmail = variant === "careers" ? cf.email : ctf.email;
  const sharedPhone = variant === "careers" ? cf.phone : ctf.phone;
  const honeypot = variant === "careers" ? cf._hp : ctf._hp;

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label={
        variant === "careers"
          ? "Formulário de candidatura"
          : "Formulário de contato"
      }
      className="relative flex flex-col gap-5"
    >
      {/* Honeypot */}
      <div
        aria-hidden
        className="absolute -left-[9999px] -top-[9999px] opacity-0"
      >
        <label htmlFor="_hp">Leave this empty</label>
        <input
          id="_hp"
          name="_hp"
          type="text"
          value={honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ── Common fields: Name + Email ─── */}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Nome completo"
          htmlFor="name"
          error={errors.name}
          required
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={sharedName}
            onChange={handleChange}
            placeholder="João da Silva"
            className={fieldClass}
            aria-required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </FormField>

        <FormField
          label="E-mail"
          htmlFor="email"
          error={errors.email}
          required
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={sharedEmail}
            onChange={handleChange}
            placeholder="joao@email.com"
            className={fieldClass}
            aria-required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </FormField>

        {/* ── Phone + variant-specific select ─── */}
        <FormField
          label="Telefone"
          htmlFor="phone"
          error={errors.phone}
          required
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={sharedPhone}
            onChange={handleChange}
            placeholder="(16) 99999-9999"
            inputMode="numeric"
            className={fieldClass}
            aria-required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </FormField>

        {variant === "careers" ? (
          <FormField
            label="Área de interesse"
            htmlFor="area"
            error={errors.area}
            required
          >
            <select
              id="area"
              name="area"
              value={cf.area}
              onChange={handleChange}
              className={cn(fieldClass, "cursor-pointer appearance-none")}
              aria-required
              aria-invalid={!!errors.area}
              aria-describedby={errors.area ? "area-error" : undefined}
            >
              <option value="" disabled>
                Selecione...
              </option>
              {jobAreaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>
        ) : (
          <FormField
            label="Assunto"
            htmlFor="subject"
            error={errors.subject}
            required
          >
            <select
              id="subject"
              name="subject"
              value={ctf.subject}
              onChange={handleChange}
              className={cn(fieldClass, "cursor-pointer appearance-none")}
              aria-required
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            >
              <option value="" disabled>
                Selecione...
              </option>
              {contactSubjectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>
        )}
      </div>

      {/* ── Careers-specific: resume ─── */}
      {variant === "careers" && (
        <FormField
          label="Currículo (obrigatório — PDF ou imagem, máx. 5MB)"
          htmlFor="resume"
          error={errors.resume}
          required
        >
          <div className="flex items-center gap-3">
            <button
              ref={resumeUploadRef}
              id="resume-upload"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex flex-1 items-center gap-2.5 rounded-xl border border-border px-4 py-3 text-sm transition-all duration-200",
                variant === "careers"
                  ? "bg-white hover:border-primary/40 hover:bg-white"
                  : "bg-card/5 hover:border-primary/40 hover:bg-card/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
                resume ? "text-foreground" : "text-muted-foreground",
                errors.resume && "border-error/50"
              )}
              aria-describedby={errors.resume ? "resume-error" : undefined}
              aria-invalid={!!errors.resume}
            >
              <Paperclip
                className="h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span className="truncate">
                {resume ? resume.name : "Selecionar PDF ou imagem..."}
              </span>
            </button>

            {resume && (
              <button
                type="button"
                onClick={clearFile}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-error/30 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/30"
                aria-label="Remover arquivo"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            id="resume"
            name="resume"
            type="file"
            accept={RESUME_ACCEPT}
            required
            className="sr-only"
            onChange={handleFileChange}
            aria-required
            aria-invalid={!!errors.resume}
            aria-describedby={errors.resume ? "resume-error" : undefined}
          />
        </FormField>
      )}

      {/* ── Contact-specific: message textarea ─── */}
      {variant === "contact" && (
        <FormField
          label="Mensagem"
          htmlFor="message"
          error={errors.message}
          required
        >
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={500}
              value={ctf.message}
              onChange={handleChange}
              placeholder="Descreva sua dúvida, elogio ou reclamação..."
              className={cn(
                fieldClass,
                "resize-none leading-relaxed",
                "pb-8" // room for char counter
              )}
              aria-required
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "message-error" : "message-counter"
              }
            />
            <span
              id="message-counter"
              aria-live="polite"
              aria-atomic
              className={cn(
                "absolute bottom-3 right-4 text-xs tabular-nums",
                ctf.message.length >= 480
                  ? "text-warning"
                  : "text-muted-foreground"
              )}
            >
              {ctf.message.length}/500
            </span>
          </div>
        </FormField>
      )}

      {/* Rate limit notice */}
      <AnimatePresence>
        {rateLimited && (
          <motion.p
            key="rate"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 rounded-xl border border-warning/20 bg-warning/[0.06] px-4 py-3 text-sm text-warning"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            Aguarde 60 segundos antes de reenviar.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {errors.form && (
          <motion.p
            key="form-err"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 rounded-xl border border-error/20 bg-error/[0.06] px-4 py-3 text-sm text-error"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            {errors.form}
          </motion.p>
        )}
      </AnimatePresence>

      <TurnstileWidget
        onToken={(token) => {
          setTurnstileToken(token);
          setErrors((prev) => ({ ...prev, form: undefined }));
        }}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === "loading" || rateLimited}
        className={cn(
          "flex items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-200",
          "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
          "hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        )}
        aria-busy={formState === "loading"}
      >
        {formState === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            {variant === "careers" ? "Enviar candidatura" : "Enviar mensagem"}
          </>
        )}
      </button>
    </motion.form>
  );
}

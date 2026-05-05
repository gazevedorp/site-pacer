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
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type FormVariant = "careers" | "contact";

type FormState = "idle" | "loading" | "success" | "error";

// ─── Rate-limit (client-side visual guard) ─────────────────────────────────────
// Separate counters per variant so one page doesn't block the other.

const lastSubmitTimes: Record<FormVariant, number> = { careers: 0, contact: 0 };
const RATE_LIMIT_MS = 30_000;

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
      <label htmlFor={htmlFor} className="text-sm font-medium text-white/70">
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
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 transition-all duration-200 hover:border-white/20 focus:border-primary/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-primary/25 aria-invalid:border-error/50 aria-invalid:focus:ring-error/25";

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
  linkedin: string;
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

  const hasLinkedin = fields.linkedin.trim().length > 0;
  const hasResume = resume !== null;

  if (!hasLinkedin && !hasResume) {
    errors.linkedin = "Anexe seu currículo ou informe o LinkedIn.";
  } else if (hasLinkedin) {
    try {
      const url = new URL(fields.linkedin.trim());
      if (!["http:", "https:"].includes(url.protocol))
        errors.linkedin = "URL inválida (use https://).";
    } catch {
      errors.linkedin = "Informe uma URL válida (ex: https://linkedin.com/in/...).";
    }
  }

  if (hasResume && resume) {
    if (resume.type !== "application/pdf")
      errors.resume = "Apenas arquivos PDF são aceitos.";
    else if (resume.size > 5 * 1024 * 1024)
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
    linkedin: "",
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setErrors((prev) => ({
        ...prev,
        resume: undefined,
        ...(file ? { linkedin: undefined } : {}),
      }));
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
        document.getElementById(firstKey)?.focus();
        return;
      }

      setFormState("loading");
      lastSubmitTimes[variant] = Date.now();

      // Simulate network call — replace with real endpoint
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      setFormState("success");
    },
    [variant, fields, careersFields, contactFields, resume]
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
        <h3 className="text-xl font-bold text-white">{copy.heading}</h3>
        <p className="max-w-sm text-sm text-white/50">{copy.body}</p>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  const cf = careersFields;
  const ctf = contactFields;
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
      className="flex flex-col gap-5"
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
            className={inputClass}
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
            className={inputClass}
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
            className={inputClass}
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
              className={cn(inputClass, "cursor-pointer appearance-none")}
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
              className={cn(inputClass, "cursor-pointer appearance-none")}
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

      {/* ── Careers-specific: resume / LinkedIn ─── */}
      {variant === "careers" && (
        <>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs text-white/25">
              Currículo ou LinkedIn — um dos dois
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <FormField
            label="Currículo (PDF, máx. 5MB)"
            htmlFor="resume"
            error={errors.resume}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex flex-1 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm transition-all duration-200",
                  "hover:border-white/20 hover:bg-white/[0.06]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
                  resume ? "text-white" : "text-white/25"
                )}
                aria-describedby={errors.resume ? "resume-error" : undefined}
              >
                <Paperclip
                  className="h-4 w-4 shrink-0 text-white/40"
                  aria-hidden
                />
                <span className="truncate">
                  {resume ? resume.name : "Selecionar arquivo PDF..."}
                </span>
              </button>

              {resume && (
                <button
                  type="button"
                  onClick={clearFile}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white/40 transition-colors hover:border-error/30 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/30"
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
              accept="application/pdf"
              className="sr-only"
              onChange={handleFileChange}
              aria-describedby={errors.resume ? "resume-error" : undefined}
            />
          </FormField>

          <FormField
            label="LinkedIn"
            htmlFor="linkedin"
            error={errors.linkedin}
          >
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              autoComplete="url"
              value={cf.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/seu-perfil"
              className={inputClass}
              aria-invalid={!!errors.linkedin}
              aria-describedby={
                errors.linkedin ? "linkedin-error" : undefined
              }
            />
          </FormField>
        </>
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
                inputClass,
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
                  : "text-white/25"
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
            Aguarde 30 segundos antes de reenviar.
          </motion.p>
        )}
      </AnimatePresence>

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

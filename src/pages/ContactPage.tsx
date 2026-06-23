import { useSeoMeta } from "@/hooks/useSeoMeta";
import { ContactBanner } from "@/components/sections/Contact/ContactBanner";
import { ContactFormBase } from "@/components/shared/ContactFormBase";

export default function ContactPage() {
  useSeoMeta({
    title: "Contato | Pacer Academia — Ribeirão e região",
    description:
      "Entre em contato com a Pacer Academia. Dúvidas, cancelamentos, elogios ou reclamações — nosso time responde em até 2 dias úteis.",
  });

  return (
    <main>
      <ContactBanner />

      {/* Form section */}
      <section
        aria-labelledby="contact-form-heading"
        className="container mx-auto px-4 pb-20 pt-6 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-card-border bg-card p-6 sm:p-8">
            <div className="mb-5 text-center">
              <h2
                id="contact-form-heading"
                className="font-display text-fluid-2xl font-bold text-white"
              >
                Envie sua mensagem
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
                Preencha o formulário abaixo e retornaremos em até 2 dias úteis.
              </p>
            </div>

            <ContactFormBase variant="contact" />
          </div>
        </div>
      </section>
    </main>
  );
}

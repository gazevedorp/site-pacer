import { useSeoMeta } from "@/hooks/useSeoMeta";
import { CareersBanner } from "@/components/sections/Careers/CareersBanner";
import { CareersPerks } from "@/components/sections/Careers/CareersPerks";
import { CareersTestimonials } from "@/components/sections/Careers/CareersTestimonials";
import { CareersForm } from "@/components/sections/Careers/CareersForm";

export default function CareersPage() {
  useSeoMeta({
    title:
      "Trabalhe Conosco | Pacer Academia — Ribeirão Preto e Sertãozinho",
    description:
      "Faça parte do time Pacer! Vagas para Recepção, Professores, Personal Trainers, Limpeza e mais. Envie seu currículo e construa sua carreira com a gente.",
  });

  return (
    <main>
      <CareersBanner />
      <CareersPerks />
      <CareersTestimonials />

      {/* Form section */}
      <section
        aria-labelledby="form-heading"
        className="container mx-auto px-4 pb-20 pt-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Candidate-se agora
            </p>
            <h2
              id="form-heading"
              className="mt-2 text-fluid-2xl font-bold text-white"
            >
              Envie sua candidatura
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
              Preencha os dados abaixo. Nossa equipe de RH entrará em contato
              em até 5 dias úteis.
            </p>
          </div>

          <CareersForm />
        </div>
      </section>
    </main>
  );
}

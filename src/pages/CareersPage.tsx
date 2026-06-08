import { useSeoMeta } from "@/hooks/useSeoMeta";
import { CareersBanner } from "@/components/sections/Careers/CareersBanner";
import { CareersPerks } from "@/components/sections/Careers/CareersPerks";
import { CareersTestimonials } from "@/components/sections/Careers/CareersTestimonials";
import { CareersForm } from "@/components/sections/Careers/CareersForm";

export default function CareersPage() {
  useSeoMeta({
    title:
      "Trabalhe Conosco | Pacer Academia — Ribeirão e região",
    description:
      "Faça parte do time Pacer! Vagas para Recepção, Professores, Estagiários, Cargos Administrativos e mais. Envie seu currículo e construa sua carreira com a gente.",
  });

  return (
    <main>
      <CareersBanner />
      <CareersPerks />
      <CareersTestimonials />

      {/* Form section */}
      <section
        aria-labelledby="form-heading"
        className="container mx-auto px-4 pb-20 pt-6 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-7 text-center">
            <h2
              id="form-heading"
              className="text-fluid-2xl font-bold text-foreground"
            >
              Candidate-se agora
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Preencha os dados abaixo e anexe seu currículo (obrigatório).
              Nossa equipe de RH entrará em contato em até 5 dias úteis.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <CareersForm />
          </div>
        </div>
      </section>
    </main>
  );
}

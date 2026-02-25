import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";

const benefits = [
  "Musculação e cardio com equipamentos de alto padrão",
  "Aulas coletivas inclusas: ginástica, dança e luta",
  "Ambiente 100% climatizado",
  "Professores qualificados à disposição",
  "Planos unitário, multi-unidade e família",
  "Hidroginástica inclusa em unidades selecionadas",
];

export function Pricing() {
  return (
    <section id="planos" className="relative py-24 sm:py-32 bg-cover bg-center" style={{ backgroundImage: "url('/fundo.jpg')" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Planos
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Invista em{" "}
              <span className="text-muted-foreground">você</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Consulte valores diretamente na unidade mais perto de você.
              Todas as aulas coletivas já estão inclusas na mensalidade.
            </p>

            <StaggerContainer className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <StaggerItem key={b}>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {b}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="w-52 justify-center">
                Consultar valores
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-52 justify-center"
                asChild
              >
                <a href="https://wa.me/5516999999999" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

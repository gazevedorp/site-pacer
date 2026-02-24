import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";

const testimonials = [
  {
    name: "Rafaela Mendes",
    role: "Aluna • Unidade Greenville",
    content:
      "A Pacer mudou minha vida! Ambiente climatizado, aparelhos novos e os professores realmente se preocupam com o nosso progresso.",
    rating: 5,
  },
  {
    name: "Thiago Santos",
    role: "Aluno • Unidade Sertãozinho 1",
    content:
      "Melhor academia da região. Faço musculação e hidroginástica sem custo extra. A estrutura é impecável.",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    role: "Aluna • Unidade Fiusa",
    content:
      "Comecei no funcional e hoje faço muay thai também. A variedade de modalidades e os horários são perfeitos.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Depoimentos
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Quem treina,{" "}
            <span className="text-muted-foreground">recomenda</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <Card className="flex h-full flex-col justify-between">
                <div>
                  <Quote className="mb-3 h-5 w-5 text-primary/40" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    “{t.content}”
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

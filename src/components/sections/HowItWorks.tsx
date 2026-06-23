import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { useActiveUnits } from "@/hooks/cms/useUnidades";
import { formatUnidadesCount } from "@/lib/cms/mappers/unidade";

const steps = [
  {
    step: "02",
    title: "Conheça a estrutura",
    description: "Visite a academia, conheça os equipamentos de alto padrão e converse com nossos professores.",
  },
  {
    step: "03",
    title: "Comece a treinar",
    description: "Montamos um programa de exercícios para seus objetivos: perder peso, tonificar ou ganhar massa. #pacernoseuritmo",
  },
] as const;

export function HowItWorks() {
  const { count: activeUnitsCount, isLoading } = useActiveUnits();

  const allSteps = [
    {
      step: "01",
      title: "Escolha sua unidade",
      description: isLoading
        ? "Encontre a unidade mais perto de você em Ribeirão e região e venha conhecer."
        : `São ${formatUnidadesCount(activeUnitsCount)} em Ribeirão e região. Encontre a mais perto de você e venha conhecer.`,
    },
    ...steps,
  ];
  return (
    <section id="como-funciona" className="relative py-24 sm:py-32">
      {/* Subtle divider gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Como funciona
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Comece em{" "}
            <span className="text-muted-foreground">3 passos simples</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3">
          {allSteps.map((item, i) => (
            <StaggerItem key={item.step}>
              <div className="relative text-center">
                {/* Connector line */}
                {i < allSteps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-border to-transparent md:block" />
                )}
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <span className="text-lg font-bold text-primary">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

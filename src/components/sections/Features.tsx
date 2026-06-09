import { Card } from "@/components/ui/card";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { getModalityIcon } from "@/lib/cms/iconMap";
import { modalities } from "@/data/modalities";

export function Features() {
  return (
    <section id="modalidades" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Modalidades
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Encontre seu{" "}
            <span className="text-muted-foreground">treino ideal</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Aulas de ginástica, dança e luta com grade renovada ao longo do ano
            com modalidades sazonais. Do iniciante ao atleta.
          </p>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modalities.map((mod) => {
            const Icon = getModalityIcon(mod.icon);
            return (
            <StaggerItem key={mod.title}>
              <Card className="group h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all group-hover:border-primary/40 group-hover:shadow-md group-hover:shadow-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{mod.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {mod.description}
                </p>
              </Card>
            </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

import { MapPin, Clock, Construction, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { units, comingSoon, GOOGLE_MAPS_API_KEY } from "@/data/units";

export function Units() {
  return (
    <section id="unidades" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Unidades
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Perto de{" "}
            <span className="text-muted-foreground">você</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            13 unidades em Ribeirão Preto e Sertãozinho. Todas com a mesma
            qualidade, equipamentos de alto padrão e ambiente 100% climatizado.
          </p>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {units.map((unit) => (
            <StaggerItem key={unit.name}>
              <Card className="group relative flex h-full flex-col overflow-hidden">
                {/* Gradient placeholder for photo */}
                <div className="mb-4 flex h-32 items-center justify-center rounded-xl border border-white/5 bg-linear-to-br from-white/[0.04] to-transparent">
                  <MapPin className="h-8 w-8 text-primary/40" />
                </div>

                <h3 className="text-lg font-bold">
                  Pacer{" "}
                  <span className="text-primary">{unit.name}</span>
                </h3>
                <p className="mt-1 text-xs font-medium text-muted">{unit.city}</p>

                <div className="mt-3 space-y-2 flex-1">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                    <span>{unit.address}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                    <span>{unit.hours}</span>
                  </div>
                </div>

                {unit.note && (
                  <p className="mt-3 text-xs font-medium text-accent">{unit.note}</p>
                )}

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link to={`/unidades/${unit.slug}`}>
                      Ver detalhes
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="shrink-0"
                    style={{ backgroundColor: "#25D366", color: "#fff" }}
                    asChild
                  >
                    <a
                      href="https://wa.me/5516999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Coming Soon */}
        <AnimatedSection className="mt-16">
          <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8">
            <div className="flex items-center justify-center gap-2 text-center">
              <Construction className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Unidades em construção</h3>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {comingSoon.map((unit) => (
                <div
                  key={unit.name}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
                >
                  <Badge className="mt-0.5 shrink-0">Em breve</Badge>
                  <div>
                    <p className="font-semibold">
                      Pacer <span className="text-primary">{unit.name}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{unit.address}</p>
                    <p className="text-xs text-muted">{unit.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Google Maps embed */}
        <AnimatedSection className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Mapa das unidades Pacer Academia"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_API_KEY}&q=Pacer+Academia+Ribeirão+Preto&zoom=12`}
              allowFullScreen
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

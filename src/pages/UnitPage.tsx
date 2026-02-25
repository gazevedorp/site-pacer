import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, ArrowLeft, MessageCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated";
import { getUnitBySlug, getOtherUnits, GOOGLE_MAPS_API_KEY } from "@/data/units";
import { modalities } from "@/data/modalities";

export function UnitPage() {
  const { slug } = useParams<{ slug: string }>();
  const unit = getUnitBySlug(slug ?? "");
  const otherUnits = getOtherUnits(slug ?? "").slice(0, 4);

  if (!unit) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Unidade não encontrada</h1>
            <p className="mt-4 text-muted-foreground">
              A unidade que você procura não existe.
            </p>
            <Button className="mt-8" asChild>
              <Link to="/">Voltar para o início</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(unit.mapQuery)}`;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/#unidades"
              className="transition-colors hover:text-foreground"
            >
              Unidades
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Pacer {unit.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(233,181,29,0.1) 0%, transparent 60%)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <Button variant="ghost" size="sm" className="mb-6" asChild>
                <Link to="/#unidades">
                  <ArrowLeft className="h-4 w-4" />
                  Todas as unidades
                </Link>
              </Button>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Pacer{" "}
                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  {unit.name}
                </span>
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{unit.city}</p>

              {unit.note && (
                <Badge className="mt-4">{unit.note}</Badge>
              )}
            </AnimatedSection>
          </div>
        </section>

        {/* Info + Map Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Info */}
              <AnimatedSection>
                <Card hover={false} className="h-full">
                  <h2 className="text-xl font-bold">Informações</h2>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Endereço</p>
                        <p className="text-sm text-muted-foreground">
                          {unit.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {unit.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Horários</p>
                        <div className="text-sm text-muted-foreground">
                          {unit.hours.map((h, i) => (
                            <p key={i}>{h}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="flex-1"
                      style={{ backgroundColor: "#25D366", color: "#fff" }}
                      asChild
                    >
                      <a
                        href="https://wa.me/5516999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Falar pelo WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1" asChild>
                      <a href="mailto:sac@paceracademia.com.br">
                        Enviar e-mail
                      </a>
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Map */}
              <AnimatedSection delay={0.1}>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    title={`Mapa Pacer ${unit.name}`}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={mapSrc}
                    allowFullScreen
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Photo placeholders */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl font-bold">Galeria</h2>
            </AnimatedSection>
            <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <StaggerItem key={i}>
                  <div className="flex h-48 items-center justify-center rounded-xl border border-white/5 bg-linear-to-br from-white/[0.04] to-transparent sm:h-56">
                    <p className="text-sm text-muted">Foto em breve</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Modalities */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl font-bold">Modalidades disponíveis</h2>
              <p className="mt-2 text-muted-foreground">
                Confira o que esta unidade oferece para você.
              </p>
            </AnimatedSection>

            <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modalities.map((mod) => (
                <StaggerItem key={mod.title}>
                  <Card className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                      <mod.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{mod.title}</span>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Other Units */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl font-bold">Outras unidades</h2>
            </AnimatedSection>

            <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherUnits.map((u) => (
                <StaggerItem key={u.slug}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                    <Link to={`/unidades/${u.slug}`}>
                      <Card className="h-full">
                        <h3 className="font-bold">
                          Pacer{" "}
                          <span className="text-primary">{u.name}</span>
                        </h3>
                        <p className="mt-1 text-xs text-muted">{u.city}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {u.address}
                        </p>
                      </Card>
                    </Link>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

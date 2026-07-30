import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { CENTRAL_WHATSAPP } from "@/lib/whatsapp";

export function CTA() {
  return (
    <section id="contato" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Background glow with parallax */}
      <ParallaxLayer speed={-0.15} className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-96 w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(233,181,29,0.1) 0%, transparent 60%)",
          }}
        />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            #pacernoseuritmo
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Venha conhecer a unidade mais perto de você.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              style={{ backgroundColor: "#25D366", color: "#fff" }}
              asChild
            >
              <a href={`https://wa.me/${CENTRAL_WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Falar pelo WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:sac@paceracademia.com.br">
                <Mail className="h-4 w-4 mr-2" />
                sac@paceracademia.com.br
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary/60" />
              Ribeirão e região – SP
            </div>
            <span className="hidden sm:block">•</span>
            <span>Seg-Sex 5h–22h • Sáb/Dom/Fer 8h–13h</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

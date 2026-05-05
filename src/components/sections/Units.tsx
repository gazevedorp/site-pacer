import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Construction, ArrowRight, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated";
import { units, comingSoon, GOOGLE_MAPS_API_KEY, type Unit } from "@/data/units";
import gymCover from "@/assets/images/gym.png";

const PAGE_SIZE = 4;

function isCep(value: string): boolean {
  return /^\d{5}-?\d{3}$/.test(value.trim());
}

function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sortByDistance(unitsList: Unit[], lat: number, lng: number): Unit[] {
  return [...unitsList].sort(
    (a, b) =>
      haversineDistance(lat, lng, a.lat, a.lng) -
      haversineDistance(lat, lng, b.lat, b.lng)
  );
}

export function Units() {

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [cepCoords, setCepCoords] = useState<{ lat: number; lng: number } | null>(null);
  const reduced = useReducedMotion();
  const [loadingCep, setLoadingCep] = useState(false);

  const fetchCepCoords = useCallback(async (cep: string) => {
    setLoadingCep(true);
    try {
      const cleanCep = cep.replace(/\D/g, "");
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${cleanCep}&region=br&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.results?.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCepCoords({ lat, lng });
      } else {
        setCepCoords(null);
      }
    } catch {
      setCepCoords(null);
    } finally {
      setLoadingCep(false);
    }
  }, []);

  useEffect(() => {
    const trimmed = search.trim();
    if (isCep(trimmed)) {
      fetchCepCoords(trimmed);
    } else {
      setCepCoords(null);
    }
  }, [search, fetchCepCoords]);

  const filteredUnits = useMemo(() => {
    const trimmed = search.trim();
    // CEP search: sort all units by distance
    if (isCep(trimmed) && cepCoords) {
      return sortByDistance(units, cepCoords.lat, cepCoords.lng);
    }
    // Text search: filter by city/name/address
    if (!trimmed) return units;
    const term = trimmed.toLowerCase();
    return units.filter(
      (u) =>
        u.city.toLowerCase().includes(term) ||
        u.name.toLowerCase().includes(term) ||
        u.address.toLowerCase().includes(term)
    );
  }, [search, cepCoords]);

  // Reset pagination when search changes
  const displayedUnits = filteredUnits.slice(0, visibleCount);
  const hasMore = visibleCount < filteredUnits.length;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setVisibleCount(PAGE_SIZE);
  };



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

        {/* Search */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Digite seu CEP ou nome da cidade..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-10 text-sm text-foreground placeholder:text-muted backdrop-blur-xl outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.06]"
            />
            {loadingCep && (
              <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary" />
            )}
          </div>
          {cepCoords && (
            <p className="mt-2 text-center text-xs text-primary">
              Unidades ordenadas pela mais próxima do CEP informado
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedUnits.map((unit, index) => (
            <motion.div
              key={unit.slug}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: (index % PAGE_SIZE) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card className={`group relative flex h-full flex-col overflow-hidden ${cepCoords && index === 0 ? "ring-2 ring-primary shadow-lg shadow-primary/10" : ""}`}>
                {/* Cover photo */}
                <div className="-mx-6 -mt-6 mb-4 h-36 overflow-hidden relative">
                  <img
                    src={gymCover}
                    alt={`Pacer ${unit.name}`}
                    width={400}
                    height={144}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  {cepCoords && index === 0 && (
                    <span className="absolute top-2 right-2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
                      Mais próxima
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold">
                  Pacer{" "}
                  <span className="text-primary">{unit.name}</span>
                </h3>
                <p className="mt-1 text-xs font-medium text-muted">{unit.city}</p>
                {cepCoords && (
                  <p className="mt-1 text-xs font-medium text-primary">
                    {haversineDistance(cepCoords.lat, cepCoords.lng, unit.lat, unit.lng).toFixed(1)} km de distância
                  </p>
                )}

                <div className="mt-3 space-y-2 flex-1">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                    <span>{unit.address}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                    <div className="flex flex-col">
                      {unit.hours.map((h, i) => (
                        <span key={i}>{h}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {unit.note && (
                  <p className="mt-3 text-xs font-medium text-accent">{unit.note}</p>
                )}

                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                    asChild
                  >
                    <Link to={`/unidades/${unit.slug}`}>
                      Saiba mais
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredUnits.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            Nenhuma unidade encontrada para "{search}".
          </p>
        )}

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            >
              Ver mais unidades
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

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
      </div>
    </section>
  );
}

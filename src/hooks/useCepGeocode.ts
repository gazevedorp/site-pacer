import { useState, useEffect } from "react";

export type GeocodeResult = { lat: number; lng: number; label: string } | null;
export type GeocodeStatus = "idle" | "loading" | "success" | "error";

export function useCepGeocode(cep: string) {
  const [result, setResult] = useState<GeocodeResult>(null);
  const [status, setStatus] = useState<GeocodeStatus>("idle");

  const clean = cep.replace(/\D/g, "");

  useEffect(() => {
    if (clean.length !== 8) {
      setResult(null);
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${clean}&countrycodes=BR&format=json&limit=1&addressdetails=1`,
          { headers: { "Accept-Language": "pt-BR" } }
        );
        const data: Array<{
          lat: string;
          lon: string;
          address: Record<string, string>;
        }> = await res.json();

        if (!data.length) throw new Error("not found");
        if (cancelled) return;

        const addr = data[0].address;
        const label = [
          addr.suburb ?? addr.neighbourhood ?? addr.quarter,
          addr.city ?? addr.town ?? addr.municipality,
        ]
          .filter(Boolean)
          .join(", ");

        setResult({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          label,
        });
        setStatus("success");
      } catch {
        if (!cancelled) {
          setResult(null);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [clean]);

  return { result, status };
}

export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatCep(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

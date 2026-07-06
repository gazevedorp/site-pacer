import { useState, useEffect } from "react";

export type GeocodeResult = { lat: number; lng: number; label: string } | null;
export type GeocodeStatus = "idle" | "loading" | "success" | "error";

interface ViaCepResponse {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | "true";
}

interface PhotonResponse {
  features: Array<{
    geometry: { coordinates: [number, number] };
  }>;
}

async function fetchPhotonCoords(query: string): Promise<{ lat: number; lng: number } | null> {
  const res = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`
  );
  if (!res.ok) return null;

  const data: PhotonResponse = await res.json();
  const feature = data.features[0];
  if (!feature) return null;

  const [lng, lat] = feature.geometry.coordinates;
  return { lat, lng };
}

export async function geocodeCep(clean: string): Promise<GeocodeResult> {
  const viaRes = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
  if (!viaRes.ok) throw new Error("via cep failed");

  const via: ViaCepResponse = await viaRes.json();
  if (via.erro === true || via.erro === "true") throw new Error("not found");

  const label = [via.bairro, via.localidade].filter(Boolean).join(", ");
  const formattedCep = `${clean.slice(0, 5)}-${clean.slice(5)}`;
  const queries = [
    [via.logradouro, via.bairro, via.localidade, via.uf, "Brasil"],
    [formattedCep, via.localidade, via.uf, "Brasil"],
    [formattedCep, "Brasil"],
  ].map((parts) => parts.filter(Boolean).join(", "));

  let coords: { lat: number; lng: number } | null = null;
  for (const query of queries) {
    coords = await fetchPhotonCoords(query);
    if (coords) break;
  }

  if (!coords) throw new Error("not found");

  return { ...coords, label };
}

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
    setResult(null);
    setStatus("loading");

    geocodeCep(clean)
      .then((data) => {
        if (cancelled) return;
        setResult(data);
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setResult(null);
        setStatus("error");
      });

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

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

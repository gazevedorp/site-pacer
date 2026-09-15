import { useState, useEffect } from "react";

export type GeocodeResult = { lat: number; lng: number; label: string } | null;
export type GeocodeStatus = "idle" | "loading" | "success" | "error";

interface AwesomeApiResponse {
  lat?: string;
  lng?: string;
  district?: string;
  neighborhood?: string;
  city?: string;
  status?: number;
  code?: string;
}

interface ViaCepResponse {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | "true";
}

interface PhotonProperties {
  name?: string;
  type?: string;
  city?: string;
  countrycode?: string;
}

interface PhotonFeature {
  geometry: { coordinates: [number, number] };
  properties: PhotonProperties;
}

interface PhotonResponse {
  features?: PhotonFeature[];
}

const PHOTON_PREFERRED_TYPES = new Set(["house", "street", "district"]);

function parseCoord(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string" || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function formatLabel(...parts: Array<string | undefined>): string {
  return parts.map((p) => p?.trim()).filter(Boolean).join(", ");
}

function normalizePlaceName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function featureMatchesCity(props: PhotonProperties, expectedCity: string): boolean {
  const expected = normalizePlaceName(expectedCity);
  if (!expected) return true;

  const city = props.city ? normalizePlaceName(props.city) : "";
  if (city) return city === expected;

  const name = props.name ? normalizePlaceName(props.name) : "";
  return name === expected;
}

function pickPhotonFeature(
  features: PhotonFeature[],
  expectedCity: string
): PhotonFeature | null {
  const inCity = features.filter((feature) => {
    const country = (feature.properties.countrycode ?? "").toUpperCase();
    if (country && country !== "BR") return false;
    return featureMatchesCity(feature.properties, expectedCity);
  });

  const preferred = inCity.filter((feature) =>
    PHOTON_PREFERRED_TYPES.has(feature.properties.type ?? "")
  );

  return preferred[0] ?? inCity[0] ?? null;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url);
  if (!res.ok) return null;
  return (await res.json()) as T;
}

async function geocodeAwesomeApi(clean: string): Promise<GeocodeResult> {
  const data = await fetchJson<AwesomeApiResponse>(
    `https://cep.awesomeapi.com.br/json/${clean}`
  );
  if (!data || data.status || data.code) return null;

  const lat = parseCoord(data.lat);
  const lng = parseCoord(data.lng);
  if (lat == null || lng == null) return null;

  const label =
    formatLabel(data.district ?? data.neighborhood, data.city) ||
    `${clean.slice(0, 5)}-${clean.slice(5)}`;

  return { lat, lng, label };
}

async function fetchPhotonCoords(
  query: string,
  expectedCity: string
): Promise<{ lat: number; lng: number } | null> {
  const params = new URLSearchParams({
    q: query,
    limit: "5",
    countrycode: "BR",
  });
  const data = await fetchJson<PhotonResponse>(
    `https://photon.komoot.io/api/?${params.toString()}`
  );
  if (!data?.features?.length) return null;

  const feature = pickPhotonFeature(data.features, expectedCity);
  if (!feature) return null;

  const [lng, lat] = feature.geometry.coordinates;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

async function geocodeViaCepPhoton(clean: string): Promise<GeocodeResult> {
  const viaRes = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
  if (!viaRes.ok) throw new Error("via cep failed");

  const via: ViaCepResponse = await viaRes.json();
  if (via.erro === true || via.erro === "true") throw new Error("not found");

  const city = via.localidade ?? "";
  const label =
    formatLabel(via.bairro, via.localidade) ||
    `${clean.slice(0, 5)}-${clean.slice(5)}`;
  const formattedCep = `${clean.slice(0, 5)}-${clean.slice(5)}`;
  const queries = [
    [via.logradouro, via.bairro, via.localidade, via.uf, "Brasil"],
    [formattedCep, via.localidade, via.uf, "Brasil"],
    [via.bairro, via.localidade, via.uf, "Brasil"],
    [via.localidade, via.uf, "Brasil"],
  ].map((parts) => parts.filter(Boolean).join(", "));

  for (const query of queries) {
    if (!query) continue;
    const coords = await fetchPhotonCoords(query, city);
    if (coords) return { ...coords, label };
  }

  throw new Error("not found");
}

export async function geocodeCep(clean: string): Promise<GeocodeResult> {
  try {
    const awesome = await geocodeAwesomeApi(clean);
    if (awesome) return awesome;
  } catch {
    // Quota, network, or malformed payload — try ViaCEP + Photon.
  }

  return geocodeViaCepPhoton(clean);
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

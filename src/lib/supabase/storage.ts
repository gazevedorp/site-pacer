const PLACEHOLDER_IMAGE = "/fundo-section.jpeg";

export type StorageBucket =
  | "modalidades"
  | "unidades"
  | "personais"
  | "galeria-fotos"
  | "alertas";

export function getPublicUrl(
  bucket: StorageBucket,
  path: string | null | undefined
): string {
  if (!path) return PLACEHOLDER_IMAGE;

  const base = import.meta.env.VITE_SUPABASE_URL;
  if (!base) return PLACEHOLDER_IMAGE;

  const normalized = path.replace(/^\//, "");
  return `${base}/storage/v1/object/public/${bucket}/${normalized}`;
}

export function getPlaceholderImage(): string {
  return PLACEHOLDER_IMAGE;
}

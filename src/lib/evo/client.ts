const EVO_PROXY_BASE = "/api/evo";

export class EvoApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "EvoApiError";
    this.status = status;
  }
}

export async function evoFetch<T>(
  path: string,
  search?: URLSearchParams
): Promise<T> {
  const query = search?.toString();
  const response = await fetch(
    `${EVO_PROXY_BASE}${path}${query ? `?${query}` : ""}`
  );
  const text = await response.text();

  if (!response.ok) {
    let message = `Falha ao consultar a integração (${response.status})`;
    try {
      const payload = JSON.parse(text) as { error?: string };
      if (payload.error) message = payload.error;
    } catch {
      if (response.status === 404) {
        message = "Rota da integração não encontrada.";
      }
    }
    throw new EvoApiError(message, response.status);
  }

  return (text ? JSON.parse(text) : []) as T;
}

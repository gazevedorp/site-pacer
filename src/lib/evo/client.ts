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

  if (!response.ok) {
    throw new EvoApiError(
      `Falha ao consultar a integração (${response.status})`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import {
  fetchPersonais,
  filterPersonais,
  getTrainerCities,
} from "@/lib/cms/queries/personais";
import type { Personal } from "@/types/cms";

export interface PersonalFilters {
  cidade?: string;
  unidade?: string;
  modalidade?: string;
}

export function usePersonais(filters: PersonalFilters = {}) {
  const query = useSupabaseQuery<Personal[]>(fetchPersonais, [], []);

  const filtered = useMemo(
    () => filterPersonais(query.data, filters),
    [query.data, filters.cidade, filters.unidade, filters.modalidade]
  );

  const cities = useMemo(() => getTrainerCities(query.data), [query.data]);

  return { ...query, data: filtered, allPersonais: query.data, cities };
}

import { useSupabaseQuery } from "@/hooks/cms/useSupabaseQuery";
import { fetchFaqs } from "@/lib/cms/queries/faqs";
import type { FaqItem } from "@/types/cms";

export function useFaqs() {
  return useSupabaseQuery<FaqItem[]>(fetchFaqs, [], []);
}

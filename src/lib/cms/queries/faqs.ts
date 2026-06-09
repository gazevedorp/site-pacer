import { supabase } from "@/lib/supabase/client";
import { mapFaq } from "@/lib/cms/mappers/faq";
import type { FaqItem } from "@/types/cms";

export async function fetchFaqs(): Promise<FaqItem[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapFaq);
}

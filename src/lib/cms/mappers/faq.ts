import type { FaqRow } from "@/lib/supabase/types";
import type { FaqItem } from "@/types/cms";

export function mapFaq(row: FaqRow): FaqItem {
  return {
    id: row.slug,
    slug: row.slug,
    question: row.question,
    answer: row.answer,
  };
}

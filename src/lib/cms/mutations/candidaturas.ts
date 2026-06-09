import { supabase } from "@/lib/supabase/client";

export interface CandidaturaInput {
  name: string;
  email: string;
  phone: string;
  area: string;
  resume: File;
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function submitCandidatura(input: CandidaturaInput): Promise<void> {
  const ext = input.resume.name.split(".").pop() ?? "pdf";
  const path = `${Date.now()}-${sanitizeFileName(input.name)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("candidaturas")
    .upload(path, input.resume, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { error: insertError } = await supabase.from("candidaturas").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    area: input.area,
    curriculo_path: path,
  });

  if (insertError) throw insertError;
}

import { supabase } from "@/lib/supabase/client";

export interface ContatoInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function submitContato(input: ContatoInput): Promise<void> {
  const { error } = await supabase.from("contatos").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    subject: input.subject,
    message: input.message.trim(),
  });

  if (error) throw error;
}

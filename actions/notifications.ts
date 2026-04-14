"use server";

import { createClient } from "@/lib/supabase/server";

export async function markAsRead(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .schema("notify")
    .from("inbox")
    .update({ read_at: new Date().toISOString() })
    .eq("id", id)
    .eq("recipient_id_auth", user.id);
}

export async function markAllAsRead() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .schema("notify")
    .from("inbox")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id_auth", user.id)
    .is("read_at", null);
}

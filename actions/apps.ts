"use server";

import { createClient } from "@/lib/supabase/server";
import { getAppById } from "@/config/apps";

export async function getFrameUrl(appId: string, subPath?: string): Promise<string> {
  const app = getAppById(appId)!;
  const path = subPath ? `/${subPath}` : "";
  return `${app.upstreamUrl}${path}`;
}

export async function getUserRole(): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return "user";
  return (
    (data.claims.user_role as string) ??
    (data.claims.app_metadata as Record<string, string> | undefined)?.role ??
    "user"
  );
}

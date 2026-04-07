import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShellProvider } from "@/components/shell/ShellProvider";
import { hasEnvVars } from "@/lib/utils";

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | undefined;

  if (hasEnvVars) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims) {
      redirect("/auth/login");
    }

    userEmail = data.claims.email as string | undefined;
  }

  return (
    <ShellProvider userEmail={userEmail}>
      {children}
    </ShellProvider>
  );
}

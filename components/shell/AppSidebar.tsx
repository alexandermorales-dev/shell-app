import { getUserRole } from "@/actions/apps";
import { SidebarNavClient } from "./SidebarNavClient";

export async function AppSidebar() {
  const userRole = await getUserRole();
  return <SidebarNavClient userRole={userRole} />;
}

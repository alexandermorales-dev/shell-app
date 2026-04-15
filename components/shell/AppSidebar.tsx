import { getUserRolesByApp } from "@/actions/apps";
import { SidebarNavClient } from "./SidebarNavClient";
import { apps } from "@/config/apps";

export async function AppSidebar() {
  const dbRoles = await getUserRolesByApp();

  const userRolesByApp: Record<string, string> = {};
  for (const app of apps) {
    const dbSlug = app.dbSlug ?? app.id;
    if (dbRoles[dbSlug]) {
      userRolesByApp[app.id] = dbRoles[dbSlug];
    }
  }

  return <SidebarNavClient userRolesByApp={userRolesByApp} />;
}

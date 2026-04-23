import { getUserPermissionsByApp, getUserRolesByApp } from "@/actions/apps";
import { SidebarNavClient } from "./SidebarNavClient";
import { apps } from "@/config/apps";

export async function AppSidebar() {
  const [dbPerms, userRolesByApp] = await Promise.all([
    getUserPermissionsByApp(),
    getUserRolesByApp()
  ]);

  const userPermsByApp: Record<string, string[]> = {};
  for (const app of apps) {
    const dbSlug = app.dbSlug ?? app.id;
    if (dbPerms[dbSlug]) {
      userPermsByApp[app.id] = dbPerms[dbSlug];
    }
  }

  return <SidebarNavClient userPermsByApp={userPermsByApp} userRolesByApp={userRolesByApp} />;
}

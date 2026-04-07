import {
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  BookOpen,
  ClipboardList,
  Award,
} from "lucide-react";
import { AppConfig, NavLink } from "@/types";

export const apps: AppConfig[] = [
  {
    id: "negocios",
    name: "Negocios",
    description: "Gestión comercial y operativa",
    basePath: "/negocios",
    upstreamUrl:
      process.env.NEXT_PUBLIC_NEGOCIOS_URL ||
      "http://eozliv55b6zunhgas3xe7y14.95.111.237.109.sslip.io",
    icon: Briefcase,
    color: "text-blue-500",
    navLinks: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
      { label: "Clientes", path: "/clientes", icon: Users },
      { label: "Documentos", path: "/documentos", icon: FileText },
      { label: "Reportes", path: "/reportes", icon: BarChart2 },
      { label: "Configuración", path: "/configuracion", icon: Settings },
    ],
  },
  {
    id: "capacitacion",
    name: "Capacitación",
    description: "Plataforma de formación y aprendizaje",
    basePath: "/capacitacion",
    upstreamUrl:
      process.env.NEXT_PUBLIC_CAPACITACION_URL ||
      "http://v9yt0f79ntxxikurez2rk2xc.95.111.237.109.sslip.io",
    icon: GraduationCap,
    color: "text-emerald-500",
    navLinks: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
      { label: "Cursos", path: "/cursos", icon: BookOpen },
      { label: "Evaluaciones", path: "/evaluaciones", icon: ClipboardList },
      { label: "Certificados", path: "/certificados", icon: Award },
      { label: "Configuración", path: "/configuracion", icon: Settings },
    ],
  },
];

export function getAppByPath(pathname: string): AppConfig | undefined {
  return apps.find((app) => pathname.startsWith(app.basePath));
}

export function getAppById(id: string): AppConfig | undefined {
  return apps.find((app) => app.id === id);
}

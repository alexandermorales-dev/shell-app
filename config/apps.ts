import {
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  Users,
  BarChart2,
  Settings,
  BookOpen,
  ClipboardList,
  Award,
  UserCheck,
  FilePlus2,
  CreditCard,
  LayoutTemplate,
  ListOrdered,
  PenLine,
  Building2,
  Search,
} from "lucide-react";
import { AppConfig } from "@/types";

export const apps: AppConfig[] = [
  {
    id: "negocios",
    name: "Negocios",
    description: "Gestión comercial y operativa",
    basePath: "/negocios",
    upstreamUrl:
      process.env.NEXT_PUBLIC_NEGOCIOS_URL ||
      "https://negocios.shadevenezuela.com.ve",
    icon: Briefcase,
    color: "text-blue-500",
    navLinks: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
      { label: "Gestión de OSIs", path: "/dashboard/negocios/gestion-de-osis", icon: Building2 },
      { label: "Reportes", path: "/dashboard/negocios/reportes", icon: BarChart2 },
      { label: "Configuración", path: "/configuracion", icon: Settings, allowedRoles: ["admin"] },
    ],
  },
  {
    id: "capacitacion",
    name: "Capacitación",
    description: "Plataforma de formación y aprendizaje",
    basePath: "/capacitacion",
    upstreamUrl:
      process.env.NEXT_PUBLIC_CAPACITACION_URL ||
      "https://capacitacion.shadevenezuela.com.ve",
    icon: GraduationCap,
    color: "text-emerald-500",
    navLinks: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
      { label: "Gestión de Cursos", path: "/dashboard/capacitacion/gestion-cursos", icon: BookOpen },
      { label: "Participantes", path: "/dashboard/capacitacion/participantes", icon: Users },
      { label: "Consulta de Participantes", path: "/dashboard/capacitacion/consulta-participantes", icon: Search },
      { label: "Facilitadores", path: "/dashboard/capacitacion/gestion-de-facilitadores", icon: UserCheck },
      { label: "Gestión de Certificados", path: "/dashboard/capacitacion/gestion-certificados", icon: Award },
      { label: "Generación de Certificados", path: "/dashboard/capacitacion/generacion-certificado", icon: FilePlus2 },
      { label: "Control de Secuencia", path: "/dashboard/capacitacion/control-secuencia", icon: ListOrdered },
      { label: "Reportes", path: "/dashboard/capacitacion/reportes", icon: BarChart2 },
      { label: "Plantillas de Carnets", path: "/dashboard/capacitacion/plantillas-carnets", icon: CreditCard, allowedRoles: ["admin"] },
      { label: "Plantillas de Certificados", path: "/dashboard/capacitacion/plantillas-certificados", icon: LayoutTemplate, allowedRoles: ["admin"] },
      { label: "Plantillas de Cursos", path: "/dashboard/capacitacion/gestion-plantillas-cursos", icon: ClipboardList, allowedRoles: ["admin"] },
      { label: "Gestión de Firmas", path: "/dashboard/capacitacion/gestion-de-firmas", icon: PenLine, allowedRoles: ["admin"] },
    ],
  },
];

export function getAppByPath(pathname: string): AppConfig | undefined {
  return apps.find((app) => pathname.startsWith(app.basePath));
}

export function getAppById(id: string): AppConfig | undefined {
  return apps.find((app) => app.id === id);
}

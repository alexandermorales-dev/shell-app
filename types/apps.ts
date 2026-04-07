import { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface AppConfig {
  id: string;
  name: string;
  description: string;
  basePath: string;
  upstreamUrl: string;
  icon: LucideIcon;
  color: string;
  navLinks: NavLink[];
}

export interface AppNavigationItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface AppStatus {
  id: string;
  isLoading: boolean;
  hasError: boolean;
  lastAccessed?: Date;
}

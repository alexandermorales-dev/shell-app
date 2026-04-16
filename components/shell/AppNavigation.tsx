"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { apps } from "@/config/apps";
import { cn } from "@/lib/utils";

export const AppNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1 mr-2">
      {apps.map((app) => (
        <Link
          key={app.id}
          href={app.basePath}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
            pathname.startsWith(app.basePath)
              ? "bg-white/15 text-white"
              : "text-blue-100/70 hover:text-white hover:bg-white/10"
          )}
        >
          <app.icon className="h-3.5 w-3.5" />
          {app.name}
        </Link>
      ))}
    </nav>
  );
};

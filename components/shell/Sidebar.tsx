"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronDown } from "lucide-react";
import { apps, getAppByPath } from "@/config/apps";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const currentApp = getAppByPath(pathname);
  const [expandedApp, setExpandedApp] = useState<string | null>(
    currentApp?.id ?? null
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-14 left-0 bottom-0 z-30 w-60 border-r border-border bg-background flex flex-col",
          "transition-transform duration-200 ease-in-out",
          "lg:translate-x-0 lg:static lg:top-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link
            href="/dashboard"
            onClick={onClose}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === "/dashboard"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Home className="h-4 w-4 shrink-0" />
            Inicio
          </Link>

          <div className="pt-2 pb-1 px-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              Aplicaciones
            </span>
          </div>

          {apps.map((app) => {
            const isCurrentApp = currentApp?.id === app.id;
            const isExpanded = expandedApp === app.id;

            return (
              <div key={app.id}>
                <button
                  onClick={() =>
                    setExpandedApp(isExpanded ? null : app.id)
                  }
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isCurrentApp
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <app.icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isCurrentApp ? app.color : ""
                    )}
                  />
                  <span className="flex-1 text-left">{app.name}</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform text-muted-foreground",
                      isExpanded ? "rotate-180" : ""
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-0.5 ml-4 pl-3 border-l border-border space-y-0.5">
                    {app.navLinks.map((link) => {
                      const fullPath = `${app.basePath}${link.path === "/" ? "" : link.path}`;
                      const isActive =
                        link.path === "/"
                          ? pathname === app.basePath ||
                            pathname === app.basePath + "/"
                          : pathname.startsWith(fullPath);

                      return (
                        <Link
                          key={link.path}
                          href={fullPath || app.basePath}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                            isActive
                              ? "text-foreground bg-accent"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <link.icon className="h-3.5 w-3.5 shrink-0" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground/50 text-center">
            Shell v1.0
          </p>
        </div>
      </aside>
    </>
  );
}

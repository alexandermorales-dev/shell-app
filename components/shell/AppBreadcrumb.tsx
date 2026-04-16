"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { getAppByPath } from "@/config/apps";

export const AppBreadcrumb = () => {
  const pathname = usePathname();
  const currentApp = getAppByPath(pathname);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href="/dashboard"
        className="font-semibold text-white hover:text-white/80 transition-colors"
      >
        PRISMA
      </Link>
      {currentApp && (
        <>
          <ChevronRight className="h-3.5 w-3.5 text-blue-200/60" />
          <span className="text-blue-200/80">{currentApp.name}</span>
        </>
      )}
    </div>
  );
};

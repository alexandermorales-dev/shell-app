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
        className="font-semibold text-slate-800 hover:text-blue-600 transition-colors"
      >
        PRISMA
      </Link>
      {currentApp && (
        <>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-slate-500 text-sm">{currentApp.name}</span>
        </>
      )}
    </div>
  );
};

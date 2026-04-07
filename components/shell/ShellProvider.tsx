"use client";

import { useState } from "react";
import { Navbar } from "@/components/shell/Navbar";
import { Sidebar } from "@/components/shell/Sidebar";
import { Footer } from "@/components/shell/Footer";

interface ShellProviderProps {
  children: React.ReactNode;
  userEmail?: string;
}

export function ShellProvider({ children, userEmail }: ShellProviderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar
        userEmail={userEmail}
        onMobileMenuToggle={() => setIsMobileMenuOpen((v) => !v)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <main className="flex-1 min-h-0">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

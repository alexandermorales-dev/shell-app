import { Menu, X } from "lucide-react";
import { AppBreadcrumb } from "./AppBreadcrumb";
import { AppNavigation } from "./AppNavigation";
import { UserMenu } from "./UserMenu";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NavbarProps } from "@/types";

export const Navbar = ({
  userEmail,
  onMobileMenuToggle,
  isMobileMenuOpen,
}: NavbarProps) => {
  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur-sm flex items-center px-4 gap-3 sticky top-0 z-40">
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 -ml-1 rounded-md hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </button>

      <AppBreadcrumb />

      <div className="ml-auto flex items-center gap-2">
        <AppNavigation />
        <ThemeSwitcher />
        {userEmail && <UserMenu userEmail={userEmail} />}
      </div>
    </header>
  );
};

import { LogOut } from "lucide-react";
import { signOutAction } from "@/actions/auth";
import { UserMenuProps } from "@/types";

export const UserMenu = ({ userEmail }: UserMenuProps) => {
  return (
    <div className="flex items-center gap-2 pl-2 border-l border-border">
      <span className="hidden sm:block text-xs text-muted-foreground max-w-[140px] truncate">
        {userEmail}
      </span>
      <form action={signOutAction}>
        <button
          type="submit"
          className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

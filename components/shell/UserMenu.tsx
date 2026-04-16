import { LogOut } from "lucide-react";
import { signOutAction } from "@/actions/auth";
import { UserMenuProps } from "@/types";

export const UserMenu = ({ userEmail }: UserMenuProps) => {
  return (
    <div className="flex items-center gap-2 pl-2 border-l border-blue-300/20">
      <span className="hidden sm:block text-xs text-blue-100/70 max-w-[140px] truncate">
        {userEmail}
      </span>
      <form action={signOutAction}>
        <button
          type="submit"
          className="p-2 rounded-md hover:bg-white/10 transition-colors text-blue-100/70 hover:text-white"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

import { LogOut } from "lucide-react";
import { signOutAction } from "@/actions/auth";
import { UserMenuProps } from "@/types";

export const UserMenu = ({ userEmail }: UserMenuProps) => {
  return (
    <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
      <span className="hidden sm:block text-xs text-slate-500 max-w-[140px] truncate">
        {userEmail}
      </span>
      <form action={signOutAction}>
        <button
          type="submit"
          className="p-2 rounded-md hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

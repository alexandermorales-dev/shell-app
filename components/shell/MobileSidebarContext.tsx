"use client";

import { createContext, useContext } from "react";

interface MobileSidebarContextType {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebarContext = createContext<MobileSidebarContextType>({
  isOpen: false,
  onClose: () => {},
});

export function useMobileSidebar() {
  return useContext(MobileSidebarContext);
}

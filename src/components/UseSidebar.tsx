import { useState } from "react";

export const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    setIsExpanded,
    setIsMobileOpen,
  };
};
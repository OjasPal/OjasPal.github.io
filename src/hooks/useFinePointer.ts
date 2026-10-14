import { useEffect, useState } from "react";

/**
 * Checks whether the current device supports hover and has a fine pointer (mouse/trackpad).
 * Gating 3D tilt, mouse spotlight, and parallax to fine pointers avoids broken touch UX.
 */
export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsFine(query.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsFine(e.matches);
    };

    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return isFine;
}

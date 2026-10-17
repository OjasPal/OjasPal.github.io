import { useState, useEffect, useCallback, useRef } from "react";

export type RouteState =
  | { type: "home"; targetSection?: string }
  | { type: "case-study"; slug: string };

function parseHash(hash: string): RouteState {
  const clean = hash.trim();

  // Match #/projects/<slug>
  const projectMatch = clean.match(/^#\/projects\/([a-zA-Z0-9_-]+)/);
  if (projectMatch) {
    return { type: "case-study", slug: projectMatch[1] };
  }

  // Section anchor like #skills, #contact, #projects
  if (clean.startsWith("#") && clean.length > 1 && !clean.startsWith("#/")) {
    const section = clean.slice(1);
    return { type: "home", targetSection: section };
  }

  return { type: "home" };
}

export function useHashRoute() {
  const [route, setRoute] = useState<RouteState>(() =>
    typeof window !== "undefined"
      ? parseHash(window.location.hash)
      : { type: "home" }
  );

  // Preserve scroll position when entering a case study from home
  const homeScrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = parseHash(window.location.hash);
      setRoute(newRoute);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToCaseStudy = useCallback((slug: string) => {
    homeScrollPositionRef.current = window.scrollY;
    window.location.hash = `#/projects/${slug}`;
  }, []);

  const navigateToHome = useCallback((targetSection?: string) => {
    if (targetSection) {
      window.location.hash = `#${targetSection}`;
    } else {
      window.location.hash = "#projects";
    }
  }, []);

  return {
    route,
    savedScrollPosition: homeScrollPositionRef.current,
    navigateToCaseStudy,
    navigateToHome,
  };
}

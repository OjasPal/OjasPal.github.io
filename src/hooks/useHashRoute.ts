import { useState, useEffect, useCallback, useRef } from "react";

export type RouteState =
  | { type: "home"; targetSection?: string }
  | { type: "all-projects" }
  | { type: "case-study"; slug: string };

function parseHash(hash: string): RouteState {
  const clean = hash.trim();

  // Match #/projects/<slug>
  const projectMatch = clean.match(/^#\/projects\/([a-zA-Z0-9_-]+)/);
  if (projectMatch) {
    return { type: "case-study", slug: projectMatch[1] };
  }

  // Match #/projects or #/projects/
  if (/^#\/projects\/?$/.test(clean)) {
    return { type: "all-projects" };
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
  const lastHomeScrollYRef = useRef<number>(0);
  const prevRouteRef = useRef<RouteState>(route);

  useEffect(() => {
    const handleScroll = () => {
      if (prevRouteRef.current.type === "home") {
        lastHomeScrollYRef.current = window.scrollY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const prev = prevRouteRef.current;
      const newRoute = parseHash(window.location.hash);

      if (newRoute.type === "case-study" && prev.type !== "case-study") {
        if (prev.type === "all-projects") {
          sessionStorage.setItem("caseStudyOrigin", "all-projects");
          homeScrollPositionRef.current = 0;
        } else {
          sessionStorage.setItem("caseStudyOrigin", "home");
          homeScrollPositionRef.current = lastHomeScrollYRef.current;
        }
      } else if (newRoute.type === "all-projects") {
        homeScrollPositionRef.current = 0;
      } else if (newRoute.type === "home" && prev.type === "all-projects") {
        homeScrollPositionRef.current = 0;
      }

      prevRouteRef.current = newRoute;
      setRoute(newRoute);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToCaseStudy = useCallback((slug: string) => {
    if (prevRouteRef.current.type === "all-projects") {
      sessionStorage.setItem("caseStudyOrigin", "all-projects");
      homeScrollPositionRef.current = 0;
    } else {
      sessionStorage.setItem("caseStudyOrigin", "home");
      homeScrollPositionRef.current = window.scrollY;
    }
    window.location.hash = `#/projects/${slug}`;
  }, []);

  const navigateToAllProjects = useCallback(() => {
    window.location.hash = "#/projects";
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
    navigateToAllProjects,
    navigateToHome,
  };
}

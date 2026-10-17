import { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/hero/Hero";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/skills/Skills";
import { About } from "./components/about/About";
import { Credentials } from "./components/credentials/Credentials";
import { ResumeSection } from "./components/resume/ResumeSection";
import { ResumeModal } from "./components/resume/ResumeModal";
import { Contact } from "./components/contact/Contact";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { useHashRoute } from "./hooks/useHashRoute";
import { getCaseStudy } from "./data/caseStudies";
import { CaseStudyView } from "./components/case-study/CaseStudyView";

export default function App() {
  const [globalResumeModalOpen, setGlobalResumeModalOpen] = useState(false);
  const { route, savedScrollPosition, navigateToHome } = useHashRoute();

  const currentCaseStudy =
    route.type === "case-study" ? getCaseStudy(route.slug) : undefined;

  // Fallback to home if unknown slug
  useEffect(() => {
    if (route.type === "case-study" && !currentCaseStudy) {
      navigateToHome();
    }
  }, [route, currentCaseStudy, navigateToHome]);

  // Handle scrolling to anchor or restoring scroll position on home mount
  useEffect(() => {
    if (route.type === "home") {
      if (route.targetSection) {
        const timer = setTimeout(() => {
          const element = document.getElementById(route.targetSection!);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          } else if (route.targetSection === "projects" && savedScrollPosition > 0) {
            window.scrollTo({ top: savedScrollPosition, behavior: "instant" });
          }
        }, 60);
        return () => clearTimeout(timer);
      }
    }
  }, [route, savedScrollPosition]);

  const isCaseStudy = route.type === "case-study" && currentCaseStudy;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0B0C10] text-[#F2F4F8] selection:bg-[#38BDF8]/20 selection:text-[#38BDF8] flex flex-col">
        {/* Navigation Bar (visible on Home view) */}
        {!isCaseStudy && <Navbar />}

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1">
          {isCaseStudy ? (
            <CaseStudyView
              caseStudy={currentCaseStudy}
              onBackToProjects={() => navigateToHome("projects")}
            />
          ) : (
            <>
              {/* Hero Section */}
              <Hero onOpenResumeModal={() => setGlobalResumeModalOpen(true)} />

              {/* 01 Projects */}
              <Projects />

              {/* 02 Skills */}
              <Skills />

              {/* 03 About */}
              <About />

              {/* 04 Experience */}
              <Credentials />

              {/* 05 Resume */}
              <ResumeSection />

              {/* 06 Contact */}
              <Contact />
            </>
          )}
        </main>

        {/* Global Resume Modal for Hero 'View resume' CTA */}
        <ResumeModal
          isOpen={globalResumeModalOpen}
          onClose={() => setGlobalResumeModalOpen(false)}
        />

        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

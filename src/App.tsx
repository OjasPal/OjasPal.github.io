import { useState } from "react";
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

export default function App() {
  const [globalResumeModalOpen, setGlobalResumeModalOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0B0C10] text-[#F2F4F8] selection:bg-[#38BDF8]/20 selection:text-[#38BDF8] flex flex-col">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1">
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

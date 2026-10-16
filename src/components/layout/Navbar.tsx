import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, ArrowUpRight } from "lucide-react";
import { Monogram } from "./Monogram";
import { MobileMenu, NavItem } from "./MobileMenu";
import { useActiveSection } from "../../hooks/useActiveSection";

const navItems: NavItem[] = [
  { id: "projects", number: "01", label: "Projects" },
  { id: "skills", number: "02", label: "Skills" },
  { id: "about", number: "03", label: "About" },
  { id: "experience", number: "04", label: "Credentials" },
  { id: "resume", number: "05", label: "Resume" },
  { id: "contact", number: "06", label: "Contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(
    navItems.map((item) => item.id),
    "projects"
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.001,
  });

  // Track if page has scrolled to adjust background slightly
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-300 border-b ${
          hasScrolled
            ? "bg-[#12141C]/85 backdrop-blur-md border-[#1E2430]"
            : "bg-[#12141C]/65 backdrop-blur-sm border-[#1E2430]/60"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Brand Zone: Monogram & Name */}
          <a
            href="#"
            className="flex items-center gap-3 group text-[#F2F4F8] hover:text-[#38BDF8] transition-colors shrink-0"
            aria-label="Ojas Pal Portfolio Home"
          >
            <Monogram size={34} />
            <span className="font-display font-bold tracking-tight text-base sm:text-lg whitespace-nowrap">
              OJAS PAL
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative py-1 text-xs xl:text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#F2F4F8]"
                      : "text-[#8A90A0] hover:text-[#F2F4F8]"
                  }`}
                >
                  <span className="font-mono text-[11px] text-[#38BDF8] mr-1.5 opacity-90">
                    {item.number}
                  </span>
                  <span>{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#38BDF8] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold rounded-xl bg-[#12141C] text-[#F2F4F8] border border-[#1E2430] hover:border-[#38BDF8]/60 hover:bg-[#1A1E29] hover:text-[#38BDF8] transition-all duration-200 group"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8A90A0] group-hover:text-[#38BDF8] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2.5 rounded-xl border border-[#1E2430] bg-[#12141C] text-[#F2F4F8] hover:border-[#38BDF8]/50 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional 2px Cyan Scroll Progress Line */}
        <motion.div
          aria-hidden="true"
          className="h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#38BDF8] to-cyan-300 origin-left"
          style={{ scaleX }}
        />
      </header>

      {/* Full-screen Mobile Navigation Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navItems}
        activeId={activeSection}
      />
    </>
  );
}

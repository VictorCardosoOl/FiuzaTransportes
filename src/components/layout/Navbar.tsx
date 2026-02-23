import { useState, useEffect } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { whatsappUrl } from "@/config/contact";

const NAV_LINKS = [
  { name: "Início", href: "#inicio", section: "inicio" },
  { name: "Frota", href: "#frota", section: "frota" },
  { name: "Serviços", href: "#servicos", section: "servicos" },
  { name: "Sobre", href: "#sobre", section: "sobre" },
  { name: "Contato", href: "#contato", section: "contato" },
] as const;

const WHATSAPP_HREF = whatsappUrl("Olá! Gostaria de solicitar um orçamento.");

/** D4 — Hook custom para detectar qual seção está visível (IntersectionObserver) */
function useActiveSection(sections: readonly string[]): string {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return active;
}

const SECTION_IDS = NAV_LINKS.map((l) => l.section);

export default function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  // D10 — Fechar menu mobile ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrollDirection === "down" && !isAtTop ? "-translate-y-full" : "translate-y-0",
        isAtTop ? "bg-transparent py-6" : "bg-white/90 backdrop-blur-md shadow-sm py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" aria-label="Ir para o início">
          <span
            className={cn(
              "font-display font-bold text-2xl tracking-tight transition-colors",
              isAtTop ? "text-white" : "text-fiuza-dark"
            )}
          >
            FIUZA<span className="text-fiuza-blue">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative",
                  isAtTop
                    ? isActive ? "text-white" : "text-white/70 hover:text-white"
                    : isActive ? "text-fiuza-blue" : "text-gray-500 hover:text-fiuza-blue",
                  // Underline indicator para seção ativa
                  "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-fiuza-blue after:rounded-full after:transition-transform after:duration-300",
                  isActive ? "after:scale-x-100" : "after:scale-x-0"
                )}
              >
                {link.name}
              </a>
            );
          })}

          <Button
            size="sm"
            as="a"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "transition-all",
              isAtTop
                ? "bg-white text-fiuza-dark hover:bg-white/90"
                : "bg-fiuza-blue text-white hover:bg-fiuza-dark"
            )}
          >
            Cotar Agora
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isAtTop ? "text-white" : "text-fiuza-dark")} />
          ) : (
            <Menu className={cn("w-6 h-6", isAtTop ? "text-white" : "text-fiuza-dark")} />
          )}
        </button>
      </div>

      {/* Mobile Menu — D10: aria-hidden quando fechado, id para aria-controls */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={cn(
          "absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4 md:hidden",
          "transition-all duration-300 origin-top",
          isMobileMenuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        )}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            aria-current={activeSection === link.section ? "page" : undefined}
            className={cn(
              "text-fiuza-dark font-medium p-3 hover:bg-gray-50 rounded-lg transition-colors",
              activeSection === link.section && "text-fiuza-blue bg-fiuza-blue/5"
            )}
            onClick={closeMobileMenu}
          >
            {link.name}
          </a>
        ))}
        <Button
          as="a"
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-fiuza-blue text-white"
          onClick={closeMobileMenu}
        >
          Solicitar Orçamento
        </Button>
      </div>
    </header>
  );
}

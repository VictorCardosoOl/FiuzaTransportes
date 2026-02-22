import { useState } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { whatsappUrl } from "@/config/contact";

// I4 fix: constante estática fora do componente — não recriada a cada render.
// C4 fix: hrefs com âncoras reais apontando para as seções da página.
const NAV_LINKS = [
  { name: "Início", href: "#inicio" },
  { name: "Frota", href: "#frota" },
  { name: "Serviços", href: "#servicos" },
  { name: "Sobre", href: "#sobre" },
  { name: "Contato", href: "#contato" },
] as const;

// C2 fix: URL do WhatsApp centralizada, sem duplicação.
const WHATSAPP_HREF = whatsappUrl("Olá! Gostaria de solicitar um orçamento.");

export default function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-fiuza-blue",
                isAtTop ? "text-white/80 hover:text-white" : "text-gray-600"
              )}
            >
              {link.name}
            </a>
          ))}
          {/* I6 fix: link externo como <a> com rel="noopener noreferrer" */}
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
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isAtTop ? "text-white" : "text-fiuza-dark")} />
          ) : (
            <Menu className={cn("w-6 h-6", isAtTop ? "text-white" : "text-fiuza-dark")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-fiuza-dark font-medium p-2 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
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
          >
            Solicitar Orçamento
          </Button>
        </div>
      )}
    </header>
  );
}

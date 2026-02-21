import { useState } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Início", href: "#" },
    { name: "Frota", href: "#" },
    { name: "Serviços", href: "#" },
    { name: "Sobre", href: "#" },
    { name: "Contato", href: "#" },
  ];

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
        <div className="flex items-center gap-1">
          <span className={cn(
            "font-display font-bold text-2xl tracking-tight transition-colors",
            isAtTop ? "text-white" : "text-fiuza-dark"
          )}>
            FIUZA<span className="text-fiuza-blue">.</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
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
          <Button 
            size="sm" 
            className={cn(
              "transition-all",
              isAtTop 
                ? "bg-white text-fiuza-dark hover:bg-white/90" 
                : "bg-fiuza-blue text-white hover:bg-fiuza-dark"
            )}
            onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
          >
            Cotar Agora
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isAtTop ? "text-white" : "text-fiuza-dark")} />
          ) : (
            <Menu className={cn("w-6 h-6", isAtTop ? "text-white" : "text-fiuza-dark")} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-fiuza-dark font-medium p-2 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="w-full bg-fiuza-blue text-white" onClick={() => window.open("https://wa.me/5511999999999", "_blank")}>
            Solicitar Orçamento
          </Button>
        </div>
      )}
    </header>
  );
}

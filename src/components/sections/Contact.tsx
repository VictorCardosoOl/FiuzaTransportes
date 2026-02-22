import { ArrowUpRight, Instagram, Facebook, Linkedin } from "lucide-react";
import { CONTACT, whatsappUrl } from "@/config/contact";

// I6 fix: links sociais com href real e rel="noopener noreferrer"
const SOCIAL_LINKS = [
  { icon: Instagram, href: CONTACT.social.instagram, label: "Instagram" },
  { icon: Facebook, href: CONTACT.social.facebook, label: "Facebook" },
  { icon: Linkedin, href: CONTACT.social.linkedin, label: "LinkedIn" },
] as const;

export default function Contact() {
  return (
    <footer id="contato" className="relative w-full bg-fiuza-dark text-fiuza-cream overflow-hidden pt-32 pb-12">

      {/* Noise Texture (SVG inline) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" aria-hidden="true">
        <svg className="w-full h-full">
          <filter id="noise-footer">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-footer)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Top: CTA & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">

          {/* Brand Identity */}
          <div className="max-w-2xl">
            <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Vamos mover o <br />
              <span className="text-fiuza-blue italic font-serif">mundo juntos?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-lg leading-relaxed">
              Logística inteligente para quem não pode parar. Solicite sua cotação hoje mesmo.
            </p>
            <div className="mt-12">
              {/* C2 fix: URL do WhatsApp via helper centralizado */}
              {/* I6 fix: <a> com rel="noopener noreferrer" */}
              <a
                href={whatsappUrl("Olá! Gostaria de iniciar uma conversa sobre logística.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-fiuza-blue hover:text-white transition-all duration-300"
              >
                Iniciar Conversa <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-12 lg:text-right">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4 block">Base Operacional</span>
              <address className="not-italic text-2xl md:text-3xl font-serif leading-snug">
                {CONTACT.address.street}<br />
                {CONTACT.address.city} — {CONTACT.address.state}, {CONTACT.address.country}
              </address>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4 block">Contato Direto</span>
              <a
                href={`tel:+${CONTACT.whatsappNumber}`}
                className="block text-xl hover:text-fiuza-blue transition-colors mb-2"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block text-xl hover:text-fiuza-blue transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Socials */}
          <div className="flex gap-6">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-8">
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
              Termos de Uso
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs font-mono uppercase tracking-widest text-gray-600">
            © {new Date().getFullYear()} Fiuza Transportes.
          </div>
        </div>
      </div>

      {/* Background Text Decorativo */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none" aria-hidden="true">
        <p className="text-[20vw] font-bold leading-none tracking-tighter text-center whitespace-nowrap transform translate-y-[20%]">
          FIUZA LOGISTICS
        </p>
      </div>
    </footer>
  );
}

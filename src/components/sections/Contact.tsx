import { ArrowUpRight, Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <footer className="relative w-full bg-[#F6F5F0] text-[#1A1A1A] overflow-hidden pt-40 pb-20">
      
      {/* 1. NOISE TEXTURE (SVG) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-multiply">
        <svg className="w-full h-full">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 2. BACKGROUND TYPOGRAPHY */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none z-0 select-none overflow-hidden">
         <h1 className="font-serif font-bold text-[25vw] opacity-[0.02] leading-none tracking-tighter text-fiuza-dark whitespace-nowrap transform translate-y-[15%]">
            FIUZA TRANSPORTES
         </h1>
      </div>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 w-full border-t border-black/5 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* COLUMN 1: IDENTITY */}
          <div className="group p-12 lg:p-16 border-b md:border-b-0 md:border-r border-black/5 hover:bg-black/[0.02] transition-colors duration-500 flex flex-col justify-between min-h-[400px]">
            <div>
              <h2 className="font-display text-5xl font-bold mb-4 tracking-tight">FIUZA<span className="text-fiuza-blue">.</span></h2>
              <p className="font-serif text-2xl italic opacity-60 leading-tight">Logística com precisão <br/> e inteligência.</p>
            </div>
            
            <div className="mt-auto pt-12">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold opacity-40 block mb-3">ESTABLISHED</span>
              <span className="font-display text-xl">2008 — SÃO PAULO</span>
            </div>
          </div>

          {/* COLUMN 2: LOCATION & CTA */}
          <div className="group p-12 lg:p-16 border-b md:border-b-0 lg:border-r border-black/5 hover:bg-black/[0.02] transition-colors duration-500 flex flex-col justify-between min-h-[400px]">
             <div>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold opacity-40 block mb-8">BASE OPERACIONAL</span>
                <address className="not-italic font-serif text-3xl leading-snug mb-8 text-fiuza-dark/80">
                  Rodovia Anhanguera, km 25<br/>
                  São Paulo — SP<br/>
                  Brasil
                </address>
             </div>

             <a 
               href="https://wa.me/5511999999999" 
               target="_blank"
               className="inline-flex items-center gap-4 text-fiuza-blue hover:text-fiuza-dark transition-colors group/link mt-auto"
             >
               <span className="font-sans font-bold uppercase tracking-widest text-xs border-b border-fiuza-blue group-hover/link:border-fiuza-dark pb-1">Solicitar Orçamento</span>
               <ArrowUpRight className="w-6 h-6 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
             </a>
          </div>

          {/* COLUMN 3: CONTACTS */}
          <div className="group p-12 lg:p-16 border-b md:border-b-0 md:border-r border-black/5 hover:bg-black/[0.02] transition-colors duration-500 flex flex-col justify-between min-h-[400px]">
             <div>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold opacity-40 block mb-8">CONTATO DIRETO</span>
                <ul className="space-y-8">
                  <li className="flex items-start gap-6">
                    <Phone className="w-6 h-6 opacity-30 mt-1" />
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-2xl font-medium">(11) 99999-9999</span>
                      <span className="text-[10px] uppercase opacity-40 tracking-widest">Plantão 24h</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-6">
                    <Mail className="w-6 h-6 opacity-30 mt-1" />
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-2xl font-medium">comercial@fiuza.com</span>
                      <span className="text-[10px] uppercase opacity-40 tracking-widest">Vendas</span>
                    </div>
                  </li>
                </ul>
             </div>
          </div>

          {/* COLUMN 4: SOCIAL & LEGAL */}
          <div className="group p-12 lg:p-16 hover:bg-black/[0.02] transition-colors duration-500 flex flex-col justify-between min-h-[400px]">
             <div>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold opacity-40 block mb-8">CONECTE-SE</span>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, href: "#" },
                    { icon: Facebook, href: "#" },
                    { icon: Linkedin, href: "#" }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.href} 
                      className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-fiuza-blue hover:text-white hover:border-transparent transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
             </div>

             <div className="mt-12 pt-12 border-t border-black/5">
                <div className="flex flex-col gap-3">
                  <a href="#" className="font-sans text-[10px] uppercase font-bold tracking-widest hover:text-fiuza-blue transition-colors">Política de Privacidade</a>
                  <a href="#" className="font-sans text-[10px] uppercase font-bold tracking-widest hover:text-fiuza-blue transition-colors">Termos de Uso</a>
                  <span className="font-sans text-[10px] opacity-30 mt-4">© {new Date().getFullYear()} FIUZA TRANSPORTES.</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

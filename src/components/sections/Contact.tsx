import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Contact() {
  return (
    <footer className="bg-fiuza-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Section: CTA & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Pronto para <br />
              <span className="text-fiuza-blue">Otimizar sua Logística?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Fale com nossos especialistas. Receba uma cotação personalizada em até 30 minutos via WhatsApp ou E-mail.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 text-fiuza-blue">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Base Operacional</h4>
                  <p className="text-gray-400 text-sm">Rodovia Anhanguera, km 25<br />São Paulo - SP</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 text-fiuza-blue">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Plantão 24h</h4>
                  <p className="text-gray-400 text-sm">(11) 99999-9999</p>
                  <p className="text-gray-400 text-sm">(11) 3333-3333</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 text-fiuza-blue">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">E-mail Comercial</h4>
                  <p className="text-gray-400 text-sm">comercial@fiuzatransportes.com.br</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 text-fiuza-dark shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Solicitar Orçamento Rápido</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-gray-200 focus:border-fiuza-blue focus:ring-2 focus:ring-fiuza-blue/20 outline-none transition-all" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">WhatsApp</label>
                  <input type="tel" className="w-full p-3 rounded-lg border border-gray-200 focus:border-fiuza-blue focus:ring-2 focus:ring-fiuza-blue/20 outline-none transition-all" placeholder="(11) 99999-9999" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Origem (Cidade/UF)</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-gray-200 focus:border-fiuza-blue focus:ring-2 focus:ring-fiuza-blue/20 outline-none transition-all" placeholder="Ex: São Paulo, SP" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Destino (Cidade/UF)</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-gray-200 focus:border-fiuza-blue focus:ring-2 focus:ring-fiuza-blue/20 outline-none transition-all" placeholder="Ex: Rio de Janeiro, RJ" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tipo de Carga</label>
                <select className="w-full p-3 rounded-lg border border-gray-200 focus:border-fiuza-blue focus:ring-2 focus:ring-fiuza-blue/20 outline-none transition-all bg-white">
                  <option>Selecione...</option>
                  <option>Carga Seca</option>
                  <option>Mudança</option>
                  <option>Maquinário</option>
                  <option>Outros</option>
                </select>
              </div>

              <Button className="w-full mt-4 bg-fiuza-blue hover:bg-fiuza-dark" size="lg">
                Enviar Solicitação
              </Button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                Ao enviar, você concorda em receber contato via WhatsApp.
              </p>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-display font-bold tracking-tight">
            FIUZA<span className="text-fiuza-blue">.</span>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Início</a>
            <a href="#" className="hover:text-white transition-colors">Frota</a>
            <a href="#" className="hover:text-white transition-colors">Serviços</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-fiuza-blue transition-colors text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-fiuza-blue transition-colors text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-fiuza-blue transition-colors text-white">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-12 text-xs text-gray-600">
          © {new Date().getFullYear()} Fiuza Transportes. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

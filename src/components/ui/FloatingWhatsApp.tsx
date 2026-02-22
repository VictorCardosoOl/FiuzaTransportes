import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/contact";

// C2 fix: número centralizado via config. I6 fix: rel="noopener noreferrer" já presente.
const HREF = whatsappUrl("Olá! Gostaria de solicitar um orçamento.");

export default function FloatingWhatsApp() {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-900/30 transition-transform hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </a>
  );
}

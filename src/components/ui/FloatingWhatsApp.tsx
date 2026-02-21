import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-900/30 transition-transform hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-md opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
        Fale Conosco
      </span>
    </a>
  );
}

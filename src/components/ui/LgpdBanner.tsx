import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "fiuza_lgpd_consent";

/**
 * D9 — Banner de consentimento LGPD/GDPR.
 * Aparece apenas na primeira visita. Aceitar/Recusar armazena a decisão em localStorage.
 */
export default function LgpdBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(STORAGE_KEY);
        if (!consent) {
            // Delay de 1.5s para não sobrepor o Preloader
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(STORAGE_KEY, "accepted");
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem(STORAGE_KEY, "declined");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-label="Aviso de cookies e privacidade"
            aria-modal="false"
            className="fixed bottom-0 left-0 right-0 z-[60] bg-fiuza-dark text-fiuza-cream px-4 py-5 md:px-6 shadow-2xl border-t border-white/10
                 animate-in slide-in-from-bottom duration-500"
        >
            <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                    <p className="text-sm text-fiuza-cream/90 leading-relaxed max-w-2xl">
                        Utilizamos cookies essenciais para o funcionamento do site. Ao continuar navegando,{" "}
                        você concorda com a nossa{" "}
                        <a
                            href="/politica-de-privacidade"
                            className="underline hover:text-fiuza-blue transition-colors"
                        >
                            Política de Privacidade
                        </a>{" "}
                        em conformidade com a <strong>LGPD</strong>.
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                        onClick={handleDecline}
                        className="text-xs font-mono uppercase tracking-widest text-fiuza-cream/50 hover:text-fiuza-cream transition-colors px-4 py-2"
                    >
                        Recusar
                    </button>
                    <button
                        onClick={handleAccept}
                        className="text-xs font-mono uppercase tracking-widest bg-fiuza-blue text-white px-6 py-2 rounded-full hover:bg-white hover:text-fiuza-dark transition-all"
                    >
                        Aceitar
                    </button>
                    <button
                        onClick={handleAccept}
                        aria-label="Fechar aviso de privacidade"
                        className="text-fiuza-cream/30 hover:text-fiuza-cream transition-colors p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

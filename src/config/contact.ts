/**
 * Dados de contato centralizados.
 * Altere aqui para refletir em toda a aplicação — sem busca/replace manual.
 */
export const CONTACT = {
    /** Número no formato internacional, sem '+' nem espaços. Usado em links wa.me */
    whatsappNumber: "5511999999999",
    /** Número formatado para exibição ao usuário */
    phoneDisplay: "(11) 99999-9999",
    email: "comercial@fiuza.com",
    address: {
        street: "Rodovia Anhanguera, km 25",
        city: "São Paulo",
        state: "SP",
        country: "Brasil",
        /** Endereço completo formatado */
        full: "Rodovia Anhanguera, km 25, São Paulo — SP, Brasil",
    },
    social: {
        instagram: "https://instagram.com/fiuzatransportes",
        facebook: "https://facebook.com/fiuzatransportes",
        linkedin: "https://linkedin.com/company/fiuzatransportes",
    },
} as const;

/** Gera a URL do WhatsApp com mensagem pré-preenchida opcional */
export function whatsappUrl(message?: string): string {
    const base = `https://wa.me/${CONTACT.whatsappNumber}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

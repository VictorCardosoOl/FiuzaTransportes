import { vi, describe, it, expect } from "vitest";

// Mock GSAP para testes (não precisa de DOM real para animações)
vi.mock("gsap", () => ({ default: { registerPlugin: vi.fn(), from: vi.fn(), to: vi.fn() } }));
vi.mock("@gsap/react", () => ({ useGSAP: vi.fn((fn) => fn()) }));

import { CONTACT, whatsappUrl } from "../config/contact";

describe("CONTACT config", () => {
    it("deve ter número de WhatsApp no formato internacional", () => {
        expect(CONTACT.whatsappNumber).toMatch(/^\d{12,13}$/);
    });

    it("whatsappUrl sem mensagem retorna URL base correta", () => {
        const url = whatsappUrl();
        expect(url).toBe(`https://wa.me/${CONTACT.whatsappNumber}`);
    });

    it("whatsappUrl com mensagem encode corretamente a query", () => {
        const msg = "Olá! Solicito cotação.";
        const url = whatsappUrl(msg);
        expect(url).toContain("?text=");
        expect(url).toContain(encodeURIComponent(msg));
    });

    it("CONTACT tem todos os campos obrigatórios", () => {
        expect(CONTACT).toHaveProperty("whatsappNumber");
        expect(CONTACT).toHaveProperty("phoneDisplay");
        expect(CONTACT).toHaveProperty("email");
        expect(CONTACT).toHaveProperty("address");
    });
});

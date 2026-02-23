/// <reference types="vitest/globals" />
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button component", () => {
    it("renderiza como <button> por padrão", () => {
        render(<Button>Clique</Button>);
        expect(screen.getByRole("button", { name: "Clique" })).toBeInTheDocument();
    });

    it("renderiza como <a> quando as='a' + href", () => {
        render(
            <Button as="a" href="https://wa.me/55119" target="_blank" rel="noopener noreferrer">
                WhatsApp
            </Button>
        );
        const link = screen.getByRole("link", { name: "WhatsApp" });
        expect(link).toHaveAttribute("href", "https://wa.me/55119");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("aplica variante primary por padrão", () => {
        render(<Button>Ação</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("fiuza-blue");
    });

    it("chama onClick quando clicado", async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Clique</Button>);
        await userEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledOnce();
    });
});

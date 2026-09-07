import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
    it("muestra el nombre de la aplicación", () => {
        render(
            <MemoryRouter>
                <Header cartCount={0} />
            </MemoryRouter>
        );

        expect(screen.getByText("PRODUCT STORE")).toBeInTheDocument();
    });

    it("muestra el número de productos del carrito", () => {
        render(
            <MemoryRouter>
                <Header cartCount={3} />
            </MemoryRouter>
        );

        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("muestra el enlace a la página principal", () => {
        render(
            <MemoryRouter>
                <Header cartCount={0} />
            </MemoryRouter>
        );

        const homeLink = screen.getByRole("link", {
            name: "PRODUCT STORE"
        });

        expect(homeLink).toHaveAttribute("href", "/");
    });

    it("muestra el breadcrumb del producto en la página de detalle", () => {
        render(
            <MemoryRouter initialEntries={["/product/123"]}>
                <Header cartCount={0} />
            </MemoryRouter>
        );

        expect(screen.getByText("Inicio")).toBeInTheDocument();
        expect(screen.getByText("Producto")).toBeInTheDocument();
    });

    it("no muestra el breadcrumb de producto en la página principal", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Header cartCount={0} />
            </MemoryRouter>
        );

        expect(screen.queryByText("Producto")).not.toBeInTheDocument();
    });
});
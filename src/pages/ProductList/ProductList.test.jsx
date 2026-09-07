import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "./ProductList";

describe("ProductList", () => {
    it("muestra la vista de productos", () => {
        render(
            <MemoryRouter>
                <ProductList />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    });
});
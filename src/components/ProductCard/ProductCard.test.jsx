import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

const product = {
    id: "123",
    brand: "Samsung",
    model: "Galaxy S24",
    price: 899,
    imgUrl: "https://example.com/phone.jpg"
};

describe("ProductCard", () => {
    it("muestra la información del producto", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} />
            </MemoryRouter>
        );

        expect(screen.getByText("Samsung")).toBeInTheDocument();
        expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
        expect(screen.getByText("899 €")).toBeInTheDocument();
    });

    it("genera el enlace correcto al detalle del producto", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} />
            </MemoryRouter>
        );

        const link = screen.getByRole("link");

        expect(link).toHaveAttribute("href", "/product/123");
    });

    it("muestra la imagen del producto", () => {
        render(
            <MemoryRouter>
                <ProductCard product={product} />
            </MemoryRouter>
        );

        const image = screen.getByRole("img");

        expect(image).toHaveAttribute("src", product.imgUrl);
        expect(image).toHaveAttribute("alt", product.model);
    });
});
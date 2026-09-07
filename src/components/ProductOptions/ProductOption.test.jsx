import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductOptions from "./ProductOptions";
import { addToCart } from "../../services/productService";

vi.mock("../../services/productService", () => ({
    addToCart: vi.fn()
}));

const options = {
    colors: [
        {
            code: "black",
            name: "Negro"
        },
        {
            code: "white",
            name: "Blanco"
        }
    ],
    storages: [
        {
            code: "128",
            name: "128 GB"
        },
        {
            code: "256",
            name: "256 GB"
        }
    ]
};

describe("ProductOptions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("muestra los selectores de color y almacenamiento", () => {
        render(
            <MemoryRouter>
                <ProductOptions
                    options={options}
                    productId="123"
                    setCartCount={() => {}}
                />
            </MemoryRouter>
        );

        const colorSelect = document.querySelector('select[name="color"]');
        const storageSelect = document.querySelector('select[name="storage"]');

        expect(colorSelect).toBeInTheDocument();
        expect(storageSelect).toBeInTheDocument();
    });

    it("selecciona automáticamente una opción cuando solo existe una", () => {
        const singleOption = {
            colors: [
                {
                    code: "black",
                    name: "Negro"
                }
            ],
            storages: [
                {
                    code: "128",
                    name: "128 GB"
                }
            ]
        };

        render(
            <MemoryRouter>
                <ProductOptions
                    options={singleOption}
                    productId="123"
                    setCartCount={() => {}}
                />
            </MemoryRouter>
        );

        const colorSelect = document.querySelector('select[name="color"]');
        const storageSelect = document.querySelector('select[name="storage"]');

        expect(colorSelect).toHaveValue("black");
        expect(storageSelect).toHaveValue("128");
    });

    it("permite cambiar el color y el almacenamiento", () => {
        render(
            <MemoryRouter>
                <ProductOptions
                    options={options}
                    productId="123"
                    setCartCount={() => {}}
                />
            </MemoryRouter>
        );

        const colorSelect = document.querySelector('select[name="color"]');
        const storageSelect = document.querySelector('select[name="storage"]');

        fireEvent.change(colorSelect, {
            target: { value: "white" }
        });

        fireEvent.change(storageSelect, {
            target: { value: "256" }
        });

        expect(colorSelect).toHaveValue("white");
        expect(storageSelect).toHaveValue("256");
    });

    it("añade el producto al carrito con las opciones seleccionadas", async () => {
        const setCartCount = vi.fn();

        addToCart.mockResolvedValue({
            count: 1
        });

        render(
            <MemoryRouter>
                <ProductOptions
                    options={options}
                    productId="123"
                    setCartCount={setCartCount}
                />
            </MemoryRouter>
        );

        const colorSelect = document.querySelector('select[name="color"]');
        const storageSelect = document.querySelector('select[name="storage"]');

        const addButton = screen.getByRole("button", {
            name: "Añadir al carrito"
        });

        fireEvent.change(colorSelect, {
            target: { value: "white" }
        });

        fireEvent.change(storageSelect, {
            target: { value: "256" }
        });

        fireEvent.click(addButton);

        await waitFor(() => {
            expect(addToCart).toHaveBeenCalledWith(
                "123",
                "white",
                "256"
            );
        });

        expect(setCartCount).toHaveBeenCalledWith(1);
    });
});
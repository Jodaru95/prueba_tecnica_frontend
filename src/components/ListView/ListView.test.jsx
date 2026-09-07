import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListView from "./ListView";
import { getProducts } from "../../services/productService";

vi.mock("../../services/productService", () => ({
    getProducts: vi.fn()
}));

const products = [
    {
        id: "1",
        brand: "Samsung",
        model: "Galaxy S24",
        price: 899,
        imgUrl: "https://example.com/samsung.jpg"
    },
    {
        id: "2",
        brand: "Apple",
        model: "iPhone 16",
        price: 999,
        imgUrl: "https://example.com/iphone.jpg"
    },
    {
        id: "3",
        brand: "Xiaomi",
        model: "Redmi Note 14",
        price: 299,
        imgUrl: "https://example.com/xiaomi.jpg"
    }
];

describe("ListView", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        getProducts.mockResolvedValue(products);
    });

    it("muestra los productos obtenidos de la API", async () => {
        render(
            <MemoryRouter>
                <ListView />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Samsung")).toBeInTheDocument();
        });

        expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.getByText("iPhone 16")).toBeInTheDocument();
        expect(screen.getByText("Xiaomi")).toBeInTheDocument();
        expect(screen.getByText("Redmi Note 14")).toBeInTheDocument();
    });

    it("llama al servicio para obtener los productos", async () => {
        render(
            <MemoryRouter>
                <ListView />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getProducts).toHaveBeenCalledTimes(1);
        });
    });

    it("filtra los productos por marca", async () => {
        render(
            <MemoryRouter>
                <ListView />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Samsung")).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText("Buscar...");

        fireEvent.change(searchInput, {
            target: { value: "Samsung" }
        });

        expect(screen.getByText("Samsung")).toBeInTheDocument();
        expect(screen.queryByText("Apple")).not.toBeInTheDocument();
        expect(screen.queryByText("Xiaomi")).not.toBeInTheDocument();
    });

    it("filtra los productos por modelo", async () => {
        render(
            <MemoryRouter>
                <ListView />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText("Buscar...");

        fireEvent.change(searchInput, {
            target: { value: "Galaxy S24" }
        });

        expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
        expect(screen.queryByText("iPhone 16")).not.toBeInTheDocument();
        expect(screen.queryByText("Redmi Note 14")).not.toBeInTheDocument();
    });

    it("realiza la búsqueda sin distinguir mayúsculas y minúsculas", async () => {
        render(
            <MemoryRouter>
                <ListView />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Samsung")).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText("Buscar...");

        fireEvent.change(searchInput, {
            target: { value: "sAmSuNg" }
        });

        expect(screen.getByText("Samsung")).toBeInTheDocument();
        expect(screen.queryByText("Apple")).not.toBeInTheDocument();
        expect(screen.queryByText("Xiaomi")).not.toBeInTheDocument();
    });

    it("muestra todos los productos cuando la búsqueda está vacía", async () => {
        render(
            <MemoryRouter>
                <ListView />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Samsung")).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText("Buscar...");

        fireEvent.change(searchInput, {
            target: { value: "Samsung" }
        });

        fireEvent.change(searchInput, {
            target: { value: "" }
        });

        expect(screen.getByText("Samsung")).toBeInTheDocument();
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.getByText("Xiaomi")).toBeInTheDocument();
    });
});
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { getProductDetail } from "../../services/productService";

vi.mock("../../services/productService", () => ({
    getProductDetail: vi.fn()
}));

const product = {
    id: "123",
    brand: "Samsung",
    model: "Galaxy S24",
    price: 899,
    cpu: "Snapdragon 8 Gen 3",
    ram: "8 GB",
    os: "Android",
    displayResolution: "2340 x 1080",
    battery: "4000 mAh",
    primaryCamera: ["50 MP"],
    secondaryCmera: ["12 MP"],
    dimentions: "147 x 70.6 x 7.6 mm",
    weight: "167 g",
    imgUrl: "https://example.com/samsung.jpg",
    options: {
        colors: [
            { code: "black", name: "Negro" },
            { code: "white", name: "Blanco" }
        ],
        storages: [
            { code: "128", name: "128 GB" },
            { code: "256", name: "256 GB" }
        ]
    }
};

describe("ProductDetail", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        getProductDetail.mockResolvedValue(product);
    });

    function renderProductDetail() {
        return render(
            <MemoryRouter initialEntries={["/product/123"]}>
                <Routes>
                    <Route
                        path="/product/:id"
                        element={<ProductDetail setCartCount={() => { }} />}
                    />
                </Routes>
            </MemoryRouter>
        );
    }

    it("obtiene el producto usando el id de la URL", async () => {
        renderProductDetail();

        await waitFor(() => {
            expect(getProductDetail).toHaveBeenCalledWith("123");
        });
    });

    it("muestra la información principal del producto", async () => {
        renderProductDetail();

        await waitFor(() => {
            expect(screen.getByText("Samsung")).toBeInTheDocument();
        });

        expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
        expect(screen.getByText("899€")).toBeInTheDocument();
        expect(screen.getByText("Snapdragon 8 Gen 3")).toBeInTheDocument();
        expect(screen.getByText("8 GB")).toBeInTheDocument();
        expect(screen.getByText("Android")).toBeInTheDocument();
        expect(screen.getByText("2340 x 1080")).toBeInTheDocument();
        expect(screen.getByText("4000 mAh")).toBeInTheDocument();
        expect(screen.getByText("147 x 70.6 x 7.6 mm")).toBeInTheDocument();
        expect(screen.getByText("167 g")).toBeInTheDocument();
    });

    it("muestra las cámaras del producto", async () => {
        renderProductDetail();

        await waitFor(() => {
            expect(screen.getByText("Samsung")).toBeInTheDocument();
        });

        expect(screen.getByText(/Principal:/)).toHaveTextContent("50 MP");
        expect(screen.getByText(/Secundaria:/)).toHaveTextContent("12 MP");
    });

    it("muestra la imagen del producto", async () => {
        renderProductDetail();

        await waitFor(() => {
            expect(screen.getByRole("img")).toBeInTheDocument();
        });

        const image = screen.getByRole("img");

        expect(image).toHaveAttribute("src", product.imgUrl);
        expect(image).toHaveAttribute("alt", product.model);
    });

    it("muestra las opciones de color y almacenamiento", async () => {
    renderProductDetail();

    await waitFor(() => {
        expect(screen.getByText("Samsung")).toBeInTheDocument();
    });

    const colorSelect = document.querySelector('select[name="color"]');
    const storageSelect = document.querySelector('select[name="storage"]');

    expect(colorSelect).toBeInTheDocument();
    expect(storageSelect).toBeInTheDocument();

    expect(screen.getByText("Negro")).toBeInTheDocument();
    expect(screen.getByText("Blanco")).toBeInTheDocument();
    expect(screen.getByText("128 GB")).toBeInTheDocument();
    expect(screen.getByText("256 GB")).toBeInTheDocument();
});
});
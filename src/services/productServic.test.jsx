import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    getProducts,
    getProductDetail,
    addToCart
} from "./productService";

describe("productService", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it("obtiene los productos de la API cuando no existe caché", async () => {
        const products = [
            {
                id: "1",
                brand: "Samsung",
                model: "Galaxy S24"
            }
        ];

        const fetchMock = vi
            .spyOn(globalThis, "fetch")
            .mockResolvedValue({
                ok: true,
                json: async () => products
            });

        const result = await getProducts();

        expect(fetchMock).toHaveBeenCalledWith(
            "https://itx-frontend-test.onrender.com/api/product"
        );

        expect(result).toEqual(products);
    });

    it("utiliza la caché de productos cuando todavía es válida", async () => {
        const products = [
            {
                id: "1",
                brand: "Samsung",
                model: "Galaxy S24"
            }
        ];

        localStorage.setItem(
            "products_cache",
            JSON.stringify({
                data: products,
                timestamp: Date.now()
            })
        );

        const fetchMock = vi.spyOn(globalThis, "fetch");

        const result = await getProducts();

        expect(fetchMock).not.toHaveBeenCalled();
        expect(result).toEqual(products);
    });

    it("vuelve a consultar los productos cuando la caché ha caducado", async () => {
        const oldProducts = [
            {
                id: "1",
                brand: "Samsung",
                model: "Galaxy S24"
            }
        ];

        const newProducts = [
            {
                id: "2",
                brand: "Apple",
                model: "iPhone 16"
            }
        ];

        localStorage.setItem(
            "products_cache",
            JSON.stringify({
                data: oldProducts,
                timestamp: Date.now() - (60 * 60 * 1000 + 1)
            })
        );

        const fetchMock = vi
            .spyOn(globalThis, "fetch")
            .mockResolvedValue({
                ok: true,
                json: async () => newProducts
            });

        const result = await getProducts();

        expect(fetchMock).toHaveBeenCalled();
        expect(result).toEqual(newProducts);
    });

    it("obtiene el detalle del producto de la API cuando no existe caché", async () => {
        const product = {
            id: "1",
            brand: "Samsung",
            model: "Galaxy S24"
        };

        const fetchMock = vi
            .spyOn(globalThis, "fetch")
            .mockResolvedValue({
                ok: true,
                json: async () => product
            });

        const result = await getProductDetail("1");

        expect(fetchMock).toHaveBeenCalledWith(
            "https://itx-frontend-test.onrender.com/api/product/1"
        );

        expect(result).toEqual(product);
    });

    it("utiliza la caché del detalle cuando todavía es válida", async () => {
        const product = {
            id: "1",
            brand: "Samsung",
            model: "Galaxy S24"
        };

        localStorage.setItem(
            "product_1",
            JSON.stringify({
                data: product,
                timestamp: Date.now()
            })
        );

        const fetchMock = vi.spyOn(globalThis, "fetch");

        const result = await getProductDetail("1");

        expect(fetchMock).not.toHaveBeenCalled();
        expect(result).toEqual(product);
    });

    it("añade un producto al carrito con las opciones seleccionadas", async () => {
        const responseData = {
            count: 1
        };

        const fetchMock = vi
            .spyOn(globalThis, "fetch")
            .mockResolvedValue({
                ok: true,
                json: async () => responseData
            });

        const result = await addToCart(
            "123",
            "black",
            "256"
        );

        expect(fetchMock).toHaveBeenCalledWith(
            "https://itx-frontend-test.onrender.com/api/cart",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: "123",
                    colorCode: "black",
                    storageCode: "256"
                })
            }
        );

        expect(result).toEqual(responseData);
    });
});
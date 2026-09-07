const API_URL = "https://itx-frontend-test.onrender.com";
const PRODUCTS_CACHE_KEY = "products_cache";
const CACHE_DURATION = 60 * 60 * 1000;


export async function getProducts() {
    const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);

    if (cached) {
        const now = Date.now();
        const cache = JSON.parse(cached);

        if (now - cache.timestamp < CACHE_DURATION) {
            return cache.data;
        }
    }

    const response = await fetch(API_URL + '/api/product');

    if (!response.ok) {
        throw new Error("Error al intentar obtener los productos");
    }

    const data = await response.json();

    const cache = {
        data: data,
        timestamp: Date.now()
    };
    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(cache));

    return data;
}

export async function getProductDetail(id) {
    const cacheKey = "product_" + id;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        const now = Date.now();
        const cache = JSON.parse(cached);

        if (now - cache.timestamp < CACHE_DURATION) {
            return cache.data;
        }
    }

    const response = await fetch(API_URL + '/api/product/' + id);

    if (!response.ok) {
        throw new Error("Error al intentar obtener los datos del producto");
    }

    const data = await response.json();

    const cache = {
        data: data,
        timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(cache));
    return data;
}

export async function addToCart(productId, colorCode, storageCode) {
    const body = {
        id: productId,
        colorCode: colorCode,
        storageCode: storageCode
    };

    const response = await fetch(API_URL + '/api/cart', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error("Error al intentar realizar la accion");
    }

    const data = await response.json();
    return data;
}
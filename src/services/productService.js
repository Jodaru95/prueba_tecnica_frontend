const API_URL = "https://itx-frontend-test.onrender.com";

export async function getProducts() {
    const response = await fetch(API_URL+'/api/product');

    if(!response.ok){
        throw new Error("Error al intentar obtener los productos");
    }

    const data = await response.json();
    return data;
}

export async function getProductDetail(id){
    const response = await fetch(API_URL+'/api/product/'+id);

    if(!response.ok){
        throw new Error("Error al intentar obtener los datos del producto");
    }

    const data = await response.json();
    return data;
}
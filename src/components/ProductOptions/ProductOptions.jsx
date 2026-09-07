import "./ProductOptions.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../services/productService";

function ProductOptions({ options, productId, setCartCount }) {
    const [color, setColor] = useState(
        options.colors.length === 1 ? options.colors[0].code : "",
    ); //Comienza en el unico code que recibe si solo recibe 1
    const [storage, setStorage] = useState(
        options.storages.length === 1 ? options.storages[0].code : "",
    );
    const navigate = useNavigate();

    async function handleAddToCart() {
        const data = await addToCart(productId, color, storage);
        setCartCount(data.count);
    }

    return (
        <div className="product-options">
            <select
                name="color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
            >
                <option value="" hidden={options.colors.length === 1}>
                    Seleccionar...
                </option>
                {options.colors.map((color) => (
                    <option key={color.code} value={color.code}>
                        {color.name}
                    </option>
                ))}
            </select>
            <select
                name="storage"
                value={storage}
                onChange={(event) => setStorage(event.target.value)}
            >
                <option value="" hidden={options.storages.length === 1}>
                    Seleccionar...
                </option>
                {options.storages.map((storage) => (
                    <option key={storage.code} value={storage.code}>
                        {storage.name}
                    </option>
                ))}
            </select>

            <button onClick={handleAddToCart}>Añadir al carrito</button>

            <button onClick={() => navigate("/")}>Volver</button>
        </div>
    );

}


export default ProductOptions;

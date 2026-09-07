import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetail } from "../../services/productService";
import ProductOptions from "../../components/ProductOptions/ProductOptions";
import "./ProductDetail.css";

function ProductDetail({setCartCount}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductDetail(id);
      setProduct(data);
    }

    loadProduct();
  }, [id]);
  console.log(product);
  return (
    <div className="product-detail">
      {product && (
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.imgUrl} alt={product.model} />
          </div>
          <div className="contenido">
            <div className="product-detail-info">
              <h2>Características</h2>
              <ul>
                <li><b>Marca:</b> {product.brand}</li>
                <li><b>Modelo:</b> {product.model}</li>
                <li><b>Precio:</b> {product.price ? product.price + "€" : "Precio no disponible actualmente"} </li>
                <li><b>CPU:</b> {product.cpu ? product.cpu : "CPU no especificada"}</li>
                <li><b>RAM:</b> {product.ram ? product.ram : "RAM no especificada"}</li>
                <li><b>Sistema Operativo:</b> {product.os ? product.os : "Sistema operativo no especificado"}</li>
                <li><b>Resolución:</b> {product.displayResolution ? product.displayResolution : "Resolución no especificada"}</li>
                <li><b>Batería:</b> {product.battery ? product.battery : "Bateria no especificada"}</li>
                <li><b>Cámaras:</b>
                  <ul>
                    <li>Principal: {Array.isArray(product.primaryCamera) ? product.primaryCamera.join(", ") : product.primaryCamera}</li>
                    <li>Secundaria: {Array.isArray(product.secondaryCmera) ? product.secondaryCmera.join(", ") : product.secondaryCmera}</li>
                  </ul>
                </li>
                <li><b>Dimensiones:</b> {product.dimentions ? product.dimentions : "Dimensiones no especificadas"}</li>
                <li><b>Peso:</b> {product.weight ? product.weight : "Peso no especificado"}</li>
              </ul>
            </div>

            <ProductOptions options={product.options} productId={product.id} setCartCount={setCartCount}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;

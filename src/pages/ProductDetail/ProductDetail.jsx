import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetail } from "../../services/productService";
import ProductOptions from "../../components/ProductOptions/ProductOptions";
import "./ProductDetail.css";

function ProductDetail() {
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
                <li><b>Precio:</b> {product.price} €</li>
                <li><b>CPU:</b> {product.cpu}</li>
                <li><b>RAM:</b> {product.ram}</li>
                <li><b>Sistema Operativo:</b> {product.os}</li>
                <li><b>Resolución:</b> {product.displayResolution}</li>
                <li><b>Batería:</b> {product.battery}</li>
                <li><b>Cámaras:</b>
                  <ul>
                    <li>Principal: {product.primaryCamera.join(", ")}</li>
                    <li>Secundaria: {product.secondaryCmera.join(", ")}</li>
                  </ul>
                </li>
                <li><b>Dimensiones:</b> {product.dimentions}</li>
                <li><b>Peso:</b> {product.weigth ? product.weigth : "Peso no especificado..."}</li>
              </ul>
            </div>

            <ProductOptions options={product.options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;

import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <article className="product-card">
        <div className="product-image">
          <img src={product.imgUrl} alt={product.model} />
        </div>

        <div className="product-info">
          <h2>{product.brand}</h2>
          <h3>{product.model}</h3>
          <p>{product.price} €</p>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;

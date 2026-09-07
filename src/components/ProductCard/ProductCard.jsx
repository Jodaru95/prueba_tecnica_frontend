import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.model} />
      </div>

      <div className="product-info">
        <h2>{product.brand}</h2>
        <h3>{product.model}</h3>
        <p>{product.price} €</p>
      </div>
    </article>
  );
}

export default ProductCard;

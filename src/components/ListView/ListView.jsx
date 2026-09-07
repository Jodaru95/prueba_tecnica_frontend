import SearchBox from "../../components/SearchBox/Searchbox";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import "./ListView.css";

function ListView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <div className="list-view">
      <div className="search-container">
        <SearchBox />
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ListView;

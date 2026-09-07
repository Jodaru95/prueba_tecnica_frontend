import SearchBox from "../../components/SearchBox/Searchbox";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import "./ListView.css";

function ListView() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product)=>{return product.brand.toLowerCase().includes(search.toLowerCase()) || product.model.toLowerCase().includes(search.toLowerCase())});
  return (
    <div className="list-view">
      <div className="search-container">
        <SearchBox search={search} setSearch={setSearch}/>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ListView;

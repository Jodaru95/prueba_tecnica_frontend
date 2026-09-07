import SearchBox from "../../components/SearchBox/Searchbox";
import ProductCard from "../ProductCard/ProductCard";
import "./ListView.css";

function ListView() {
  const products = [
    {
      id: 1,
      brand: "Apple",
      model: "iPhone 15",
      price: 799,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgy1hSZllKbBmKLYNTM2gzL6p3IJcx6wKnDu4mZwXzuA&s=10",
    },
    {
      id: 2,
      brand: "Samsung",
      model: "Galaxy S24",
      price: 899,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7BMR4TH0r880m1WEVGqr26q9De5qu4N3xs0yhCWDOQ&s=10",
    },
    {
      id: 3,
      brand: "Google",
      model: "Pixel 9",
      price: 699,
      image: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/0840353919808_1.jpg",
    },
  ];

  return (
    <div className="list-view">
      <SearchBox />
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ListView;

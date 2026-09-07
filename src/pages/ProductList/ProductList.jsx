import Header from "../../components/Header/Header";
import ListView from "../../components/ListView/ListView";
import "./ProductList.css";

function ProductList() {
  return (
    <div className="product-list">
      <Header />
      <ListView />
    </div>
  );
}

export default ProductList;

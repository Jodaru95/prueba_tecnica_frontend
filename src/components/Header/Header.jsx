import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ cartCount }) {
  const location = useLocation();

  const isProductDetail = location.pathname.startsWith("/product/");

  return (
    <header className="header">
      <div className="header-content">

        <Link to="/" className="header-brand">
          PRODUCT STORE
        </Link>

        <nav className="breadcrumb">
          <Link to="/">Inicio</Link>

          {isProductDetail && (
            <>
              <span> / </span>
              <span>Producto</span>
            </>
          )}
        </nav>

        <div className="header-cart">
          <span>Carrito</span>
          <span>{cartCount}</span>
        </div>

      </div>
    </header>
  );
}

export default Header;
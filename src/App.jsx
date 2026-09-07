import "./App.css";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const [cartCount, setCartCount] = useState(Number(localStorage.getItem("cartcount")) || 0);
  useEffect(() => {
    localStorage.setItem('cartcount', cartCount)
  }, [cartCount]);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail setCartCount={setCartCount} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

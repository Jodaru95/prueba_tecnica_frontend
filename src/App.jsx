import "./App.css";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/useContext";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Footer from "./components/footer";
import ProductListing from "./pages/ProductListing";

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categoryId" element={<ProductListing />} />
        </Routes>
        <Footer />
      </Router>
    </ProductProvider>
  );
}

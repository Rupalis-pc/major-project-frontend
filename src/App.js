import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/useContext";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Footer from "./components/footer";
import ProductListing from "./pages/ProductListing";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import NewCollection from "./pages/NewCollection";
import Profile from "./pages/Profile";
import OrderDetail from "./pages/OrderDetail";

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categoryId" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/newCollection" element={<NewCollection />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />
        </Routes>
        <Footer />
      </Router>
    </ProductProvider>
  );
}

import { Navigate, Routes, Route } from "react-router-dom";

//Page Import
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Product from "./pages/Product";
import ContactUs from "./pages/ContactUs";
import SellerLogin from "./pages/SellerLogin";
import SellerRegistration from "./pages/SellerRegistration";
import UserAdmin from "./pages/UserAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate  to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product" element={<Product />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/seller-login" element={<SellerLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/seller-registration" element={<SellerRegistration />} />
      <Route path="/user/:action" element={<UserAdmin />} />
    </Routes>
  );
}

export default App;

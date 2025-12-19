// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import ShopAPI from "./pages/ShopAPI";
import ProductDetailsAPI from "./pages/ProductDetailsAPI";
import MyOrders from "./pages/MyOrders";
import OurProducts from "./pages/OurProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<ShopAPI />} />
            <Route path="our-products" element={<OurProducts />} />
            <Route path="product/:id" element={<ProductDetailsAPI />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="search" element={<Search />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

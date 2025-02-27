import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Wishlist from "./components/WishList";
import ProductDetail from "./components/ProductDetail";
import Basket from "./components/Basket";
import { CartProvider } from "./context/CartContext";
import Profile from "./components/Profile";
import PlaceOrder from "./components/PlaceOrder";
import Signup from "./components/Signup";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("user") !== null
  );

  useEffect(() => {
    setCartCount(wishlist.length);
  }, [wishlist]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item !== id));
  };

  return (
    <CartProvider>
      {isAuthenticated ? (
        <>
          <Navbar wishlist={wishlist} onSearch={handleSearch} cartCount={cartCount} />
          <Routes>
            <Route
              path="/"
              element={<ProductList wishlist={wishlist} searchQuery={searchQuery} toggleWishlist={toggleWishlist} products={products} />}
            />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} products={products} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      )}
    </CartProvider>
  );
}

export default App;

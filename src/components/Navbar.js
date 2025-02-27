import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, X, Heart } from "lucide-react";
import "./Navbar.css";
import { useCart } from "../context/CartContext";
import { GrBasket } from "react-icons/gr";

function Navbar({cartCount, wishlistCount = 0,onSearch = () => {} }) {
  const [query, setQuery] = useState("");
  const {basketCount} = useCart();
  

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); 
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Logo</Link>

        <div className="navbar-search">
          <Search className="search-icon" />
          <input
            type="search"
            placeholder="Search Products"
            value={query}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <nav className="navbar-links">
          <Link to="/" className="nav-item">Store</Link>
          <Link to="/account" className="nav-item">Account</Link>

          <Link to="/wishlist" className="nav-item wishlist">
            <Heart className="icon" />
            <span>Wish List {cartCount}</span>
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>

          <Link to="/basket" className="nav-item basket">
            
            <span>Basket {basketCount}</span>
            <GrBasket className="icon" />
           
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
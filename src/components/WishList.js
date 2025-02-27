import React from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import "./Wishlist.css";

const WishList = ({ wishlist, removeFromWishlist, products }) => {
  const navigate = useNavigate();

  const handleRemove = (id, e) => {
    e.stopPropagation();
    removeFromWishlist(id);
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-wishlist">No items in your wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((productId) => {
            const product = products.find((prod) => prod.id === productId);
            if (!product) return null;

            return (
              <div key={product.id} className="wishlist-card">
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  className="wishlist-image"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <div className="wishlist-info">
                  <h3 className="wishlist-title">{product.title}</h3>
                  <p className="wishlist-price">${(product.price ?? 0).toFixed(2)}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => handleRemove(product.id, e)}
                >
                  <FiTrash2 />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishList;

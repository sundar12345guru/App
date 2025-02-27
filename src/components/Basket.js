import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Basket.css";
import { RiShoppingCartFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

const Basket = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

 
  const handleBuyNow = (item) => {
    navigate("/place-order", { state: { product: item } });
  };

  return (
    <div className="basket-container">
      <h2>
        Your Shopping Cart <RiShoppingCartFill />
      </h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p className="item-total">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="Remove"
                >
                  <RiDeleteBin6Line className="remove-icon" /> Remove
                </button>
                <button
                  onClick={() => handleBuyNow(item)}
                  className="buy-now-btn"
                >
                  
                  Buy Now
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;

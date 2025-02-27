import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
    country: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!product) {
      navigate("/basket");
    }
  }, [product, navigate]);

  useEffect(() => {
    const { name, street, city, zip, country } = address;
    setIsFormValid(name && street && city && zip && country);
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentSelection = (method) => {
    if (!isFormValid) {
      alert("Please fill in all required address fields.");
      return;
    }
    setPaymentMethod(method);

    if (method === "cash") {
      setOrderPlaced(true);
    }
  };

  const handleUtrChange = (e) => {
    setUtrNumber(e.target.value);
  };

  const handleSubmitUtr = () => {
    if (!utrNumber.trim()) {
      alert("Please enter a valid UTR number.");
      return;
    }
    setOrderPlaced(true);
  };

  const upiQRValue = `upi://pay?pa=9361415241@ptyes&pn=Your%20Store&pa2=sundaronado2002-2@okaxis&pn2=Your%20Store`;

  return (
    <div className="place-order-container">
      <h2>Place Your Order</h2>
      {product ? (
        <div className="order-summary">
          <h3>{product.title}</h3>
          <p className="product-price">Price: ${product.price}</p>

          <div className="address-form">
            <h4>Enter Delivery Address</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Name</label>
              <input type="text" name="name" value={address.name} onChange={handleChange} placeholder="Full Name" required />

              <label>Street Address</label>
              <input type="text" name="street" value={address.street} onChange={handleChange} placeholder="Street Address" required />

              <label>City</label>
              <input type="text" name="city" value={address.city} onChange={handleChange} placeholder="City" required />

              <label>ZIP Code</label>
              <input type="text" name="zip" value={address.zip} onChange={handleChange} placeholder="ZIP Code" required />

              <label>Country</label>
              <input type="text" name="country" value={address.country} onChange={handleChange} placeholder="Country" required />
            </form>
          </div>

          <div className="payment-method-selection">
            <button type="button" className="payment-btn" onClick={() => handlePaymentSelection("online")} disabled={!isFormValid}>
              Online Payment
            </button>
            <button type="button" className="payment-btn" onClick={() => handlePaymentSelection("cash")} disabled={!isFormValid}>
              Cash on Delivery
            </button>
          </div>

          {paymentMethod === "online" && !orderPlaced && (
            <div className="payment-section">
              <h4>Scan to Pay</h4>
              <QRCode value={upiQRValue} size={150} />
              <p className="qr-note">Scan this QR code to pay using UPI.</p>

              <input type="text" className="utr-input" placeholder="Enter UTR Number" value={utrNumber} onChange={handleUtrChange} />

              <button type="button" className="submit-btn" onClick={handleSubmitUtr} disabled={!utrNumber.trim()}>
                Submit UTR Number
              </button>
            </div>
          )}

          {orderPlaced && (
            <div className="order-completed">
              <h3>Your Order is Successfully Placed!</h3>
              <button onClick={() => navigate("/basket")}>Go to Basket</button>
            </div>
          )}
        </div>
      ) : (
        <p>Product details not found. Please go back to your cart.</p>
      )}
    </div>
  );
};

export default PlaceOrder;

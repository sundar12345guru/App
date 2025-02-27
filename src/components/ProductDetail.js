import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }
  const truncate=(text,maxlength)=>{
    return text.length>maxlength? text.substring(0,maxlength)+"...":text;
  }

  return (
    <div className="product-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}><IoMdArrowRoundBack />  Back</button>
      <div className="product-details">
        <img src={product.thumbnail} alt={product.title} className="details-image" />
        <h2 className="details-title">{product.title}</h2>
        <p className="details-description">{truncate(product.description,60)}</p>
        <p className="details-price">Price: ${product.price.toFixed(2)}</p>
        <div className="details-rating">
          Rating:
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < Math.round(product.rating) ? "yellow-star" : "normal-star"}>
              ★
            </span>
          ))}
        </div>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}><FaCartPlus />  Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;

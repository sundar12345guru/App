import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiStar, FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./ProductList.css";

const predefinedCategories = [
  "beauty", "fragrances", "furniture", "groceries", "home-decoration",
  "kitchen-accessories", "laptops", "mens-shirts", "mens-shoes", "mens-watches",
  "mobile-accessories", "motorcycle", "skin-care", "smartphones", "sports-accessories",
  "sunglasses", "tablets", "tops", "vehicle", "womens-bags", "womens-dresses",
  "womens-jewellery", "womens-shoes", "womens-watches",
];

const ProductList = ({ toggleWishlist, wishlist = [], searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categories] = useState(predefinedCategories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerRow = 4;
  const itemsPerPage = itemsPerRow * 3;
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = selectedCategory
      ? `https://dummyjson.com/products/category/${selectedCategory}`
      : "https://dummyjson.com/products?limit=1000";

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setCurrentPage(1);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [selectedCategory]);

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderStars = (rating = 0) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar key={i} className={i < Math.round(rating) ? "star-filled" : "star-empty"} />
    ));
  };

  return (
    <div className="product-list-container">
      <div className="filters">
        <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="product-image-container">
                <img src={product.thumbnail || "/placeholder.svg"} alt={product.title} className="product-image" />
                <button
                  className="wishlist-button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                >
                  <FiHeart
                    className={`wishlist-icon ${wishlist.includes(product.id) ? "wishlist-icon-filled" : "wishlist-icon-empty"}`}
                  />
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description" title={product.description}>
                  {product.description}
                </p>
                <div className="product-bottom">
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-rating">{renderStars(product.rating)}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>

      {filteredProducts.length > itemsPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
            <FiChevronLeft />
          </button>
          <span className="page-info">
            Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
            className="pagination-btn"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import "./HomePage.css";

const products = [
  { id: 1, name: "Iron Painted Planter - Floral", price: 11000, image: "/image/product1.jpg" },
  { id: 2, name: "Antique Cow Head Wall Decor (Set of 3)", price: 8800, image: "/image/product2.jpg" },
  { id: 3, name: "Vintage Carved Turquoise Wall Decor", price: 10500, image: "/image/product3.jpg", oldPrice: 21000 },
  { id: 4, name: "Reclaimed Wood Horse With Stand", price: 12000, image: "/image/product4.jpg" },
  { id: 5, name: "Antique Wooden Table Decor with Iron Handle", price: 4200, image: "/image/product5.jpg" },
  { id: 6, name: "Brass Lord Shiva Dancing Statue", price: 158800, image: "/image/product6.jpg" },
  { id: 7, name: "Antique Brass Nandi Idol", price: 3000, image: "/image/product7.jpg" },
  { id: 8, name: "Turquoise Carved Wall Decor", price: 13500, image: "/image/product8.jpg" },
  { id: 9, name: "Antique Iron Horse", price: 220000, image: "/image/product9.jpg" },
];


// Slider Component
const Slider = ({ images, currentSlide }) => (
  <div className="slider-container">
    {images.map((image, index) => (
      <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
        {index === currentSlide && (
          <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
        )}
      </div>
    ))}
  </div>
);

// Product Listing Component
const ProductListing = ({ products, sortOption, handleAddToCart, quantities, handleQuantityChange }) => {
  const sortedProducts = [...products];
  if (sortOption === "Alphabetically, A–Z") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "Price: Low to High") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price: High to Low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="product-listing">
      <h2 className="section-title">Timeless ANTIQUES</h2>
      <p className="section-subtitle">Artfully Selected and Restored Antique Decor Pieces</p>
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-title">{product.name}</h3>
            <p className="product-price">Rs. {product.price.toLocaleString()}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(product.name, "decrement")}>-</button>
              <input type="number" value={quantities[product.name]} readOnly min={1} />
              <button onClick={() => handleQuantityChange(product.name, "increment")}>+</button>
            </div>
            <div className="action-buttons">
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button className="buy-now">Buy it Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main HomePage Component
const HomePage = () => {
  const { addToCart } = useContext(CartContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortOption, setSortOption] = useState("Alphabetically, A–Z");
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.name] = 1;
      return acc;
    }, {})
  );

  // Slider images
  const images = ["image/vin1.jpg", "image/vin2.jpg", "image/vin3.jpg", "image/vin4.jpg"];

  // Slider functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle quantity changes
  const handleQuantityChange = (productName, operation) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (operation === "increment") {
        newQuantities[productName] += 1;
      } else if (operation === "decrement" && newQuantities[productName] > 1) {
        newQuantities[productName] -= 1;
      }
      return newQuantities;
    });
  };

  // Handle adding to cart
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: quantities[product.name],
    });
  };

  return (
    <div className="HomePage">
      {/* Slider Section */}
      <Slider images={images} currentSlide={currentSlide} />

      {/* Product Listing Section */}
      <div className="filter-sort">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="Alphabetically, A–Z">Alphabetically, A–Z</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>
      </div>
      <ProductListing
        products={products}
        sortOption={sortOption}
        handleAddToCart={handleAddToCart}
        quantities={quantities}
        handleQuantityChange={handleQuantityChange}
      />
    </div>
  );
};

export default HomePage;

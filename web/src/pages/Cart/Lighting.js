import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext"; // Import CartContext for cart functionality
import "./Lighting.css";

const PendantLighting = () => {
  const { addToCart } = useContext(CartContext); // Access the cart context
  const [quantities, setQuantities] = useState({});
  const [showTopButton, setShowTopButton] = useState(false);

  const products = [
    { id: 1, name: "Swarna Jali Small Conical Lamp - Antique Brass", price: 4800, image: "image/Swarna Jali Small Conical Lamp.jpg" },
    { id: 2, name: "Rattan Canopy Pendant Lampshade", price: 32400, image: "image/Rattan Canopy Pendant Lampshade.jpg" },
    { id: 3, name: "Parachute Rattan Hanging Decor", price: 4400, image: "image/Parachute Rattan Hanging Decor.jpg" },
    { id: 4, name: "Rattan Bumper Lampshade", price: 8800, image: "image/Rattan Bumper Lampshade.jpg" },
    { id: 5, name: "Chandni Narrow Hexagon Mottled Glass Lamp - Antique Bronze", price: 5900, image: "image/Chandni Narrow Hexagon Mottled Glass Lamp - Antique Bronze.jpg" },
    { id: 6, name: "Rattan Pendant Drop Shaped Lampshade", price: 6800, image: "image/Rattan Pendant Drop Shaped Lampshade.jpg" },
    { id: 7, name: "Rattan Inverted Lampshade", price: 8800, image: "image/Rattan Inverted Lampshade.jpg" },
    { id: 8, name: "Rattan Donut Pendant Lampshade", price: 15000, image: "image/Rattan Donut Pendant Lampshade.jpg" },
  ];

  // Initialize quantities state for each product
  useEffect(() => {
    const initialQuantities = products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [products]);

  const handleQuantityChange = (id, operation) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (operation === "increment") {
        newQuantities[id] += 1;
      } else if (operation === "decrement" && newQuantities[id] > 1) {
        newQuantities[id] -= 1;
      }
      return newQuantities;
    });
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: quantities[product.id], // Add selected quantity
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pendant-lighting">
      <header className="pendant-lighting-header">
        <h1>Lighting</h1>
        <nav>
    <Link to="/">Home</Link> &gt;  
    <Link to="/wall-lamps">Wall Lamps</Link> &gt;
    <Link to="/macrame-lamps">Macrame And Crochet Lamps</Link> &gt; 
  <span>Lighting</span>
</nav>
        <p>
          Illuminate your space with our Rattan and Bamboo Lampshade Collection.
          Crafted with natural elegance, these shades bring warmth and style to
          any room. Discover a harmonious blend of rattan and bamboo, casting a
          gentle glow that enhances your ambiance. Elevate your lighting
          experience with these timeless, handcrafted pieces.
        </p>
      </header>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Rs. {product.price.toLocaleString()}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(product.id, "decrement")}>-</button>
                <input type="number" value={quantities[product.id]} readOnly />
                <button onClick={() => handleQuantityChange(product.id, "increment")}>+</button>
              </div>
              <div className="action-buttons">
                <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
                <button className="buy-it-now">Buy It Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showTopButton && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </div>
      )}
    </div>
  );
};

export default PendantLighting;

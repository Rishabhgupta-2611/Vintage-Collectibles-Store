import React, { useState, useContext, useEffect } from "react";
import { CartContext } from './CartContext';
import { Link } from "react-router-dom";  // Import CartContext
import "./WallLamps.css";

const WallLamps = () => {
  const { addToCart } = useContext(CartContext);  // Access addToCart function from context

  const products = [
    { id: 1, name: "Metal Jali Twin Wall Light", price: 10500, image: "image/Metal_Jali_Twin_Wall_Light.jpg" },
    { id: 2, name: "Seagrass String Wall Light - Round", price: 5500, image: "image/Seagrass String Wall Light - Round.jpg" },
    { id: 3, name: "Rattan Flower Ceiling Light", price: 8500, image: "image/Rattan Flower Ceiling Light.jpg" },
    { id: 4, name: "Palm Leaf Wall Light", price: 3850, image: "image/Palm Leaf Wall Light.jpg" },
    { id: 5, name: "Bamboo Curve Wall Light", price: 4500, image: "image/Bamboo Curve Wall Light.jpg" },
    { id: 6, name: "Bamboo Wheel Wall Light", price:  4500, image: "image/Bamboo Wheel Wall Light.jpg" },
  ];

  const [showTopButton, setShowTopButton] = useState(false);
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.name] = 1;
      return acc;
    }, {})
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuantityChange = (productName, operation) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      if (operation === "increment") {
        newQuantities[productName] += 1;
      } else if (operation === "decrement") {
        newQuantities[productName] -= 1;
      }
      return newQuantities;
    });
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: quantities[product.name],  // Add selected quantity
    });
  };

  return (
    <div className="wall-lamps">
      <header className="wall-lamps-header">
        <h1>Wall Lamps</h1>
        <nav>
    <Link to="/">Home</Link>  &gt;  
    <Link to="/macrame-lamps">Macrame And Crochet Lamps</Link>  &gt; 
    <span>   Wall Lamps </span></nav>
        <p>
          Illuminate your space with our curated collection of wall lamps.
          Perfect for enhancing any room with a touch of elegance and modern design.
          Crafted with precision, our wall lamps combine style and functionality for a timeless appeal.
          Transform your home into a haven of warmth and sophistication with our unique designs.
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
                <button onClick={() => handleQuantityChange(product.name, "decrement")}>-</button>
                <input
                  type="number"
                  value={quantities[product.name]}
                  readOnly
                  min={1}
                />
                <button onClick={() => handleQuantityChange(product.name, "increment")}>+</button>
              </div>
              <div className="action-buttons">
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}  // Add item to cart
                >
                  Add to Cart
                </button>
                <button className="buy-it-now">
                  Buy it Now
                </button>
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

export default WallLamps;

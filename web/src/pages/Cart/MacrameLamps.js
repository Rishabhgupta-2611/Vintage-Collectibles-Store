import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext"; // Import CartContext
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./MacrameLamps.css";

const macrameLamps = [
  { id: 1, name: "Snowdrop Vintage Crochet Lamp", price: 8500, image: "image/Snowdrop Vintage Crochet Lamp.jpg" },
  { id: 2, name: "White Hibiscus – Macrame Lampshade", price: 6800, image: "image/White Hibiscus – Macrame Lampshade.jpg" },
  { id: 3, name: "White Tulip - Crochet Lampshade", price: 4800, image: "image/White Tulip - Crochet Lampshade.jpg" },
  { id: 4, name: "Iris Crochet Lampshade", price: 5500, image: "image/Iris Crochet Lampshade.jpg" },
  { id: 5, name: "White Lily - Crochet Lampshade", price: 5200, image: "image/White Lily - Crochet Lampshade.jpg" },
  { id: 6, name: "Daffodil - Crochet Lamp", price: 5800, image: "image/Daffodil - Crochet Lamp.jpg" },
  { id: 7, name: "Daisy - Crochet Lampshade", price: 5599, image: "image/Daisy - Crochet Lampshade.jpg" },
  { id: 8, name: "Peony - Macrame Lampshade", price: 5399, image: "image/Peony - Macrame Lampshade.jpg" },
  { id: 9, name: "Cinnamon Jute Lampshade", price: 4199, image: "image/Cinnamon Jute Lampshade.jpg" },
];

const MacrameLamps = () => {
  const { addToCart } = useContext(CartContext); // Consume addToCart from context
  const [quantities, setQuantities] = useState(
    macrameLamps.reduce((acc, lamp) => {
      acc[lamp.name] = 1; // Initialize all quantities to 1
      return acc;
    }, {})
  );

  const handleQuantityChange = (lampName, operation) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (operation === "increment") {
        newQuantities[lampName] += 1;
      } else if (operation === "decrement" && newQuantities[lampName] > 1) {
        newQuantities[lampName] -= 1;
      }
      return newQuantities;
    });
  };

  const handleAddToCart = (lamp) => {
    addToCart({
      ...lamp,
      quantity: quantities[lamp.name], // Add selected quantity
    });
    toast.success(`${lamp.name} added to cart!`);
  };

  const handleBuyItNow = (lamp) => {
    // Simulate a direct checkout process for now
    toast.info(`Proceeding to checkout with ${lamp.name}.`);
  };

  return (
    <div className="macrame-lamps">
      <div className="macrame-lamps-header">
        <h1>Macrame And Crochet Lamps</h1>
        <nav>
    <Link to="/">Home</Link>  &gt;   
    <span>  Macrame And Crochet Lamps</span></nav>
        <p>
          Macrame and crochet lamps are like cozy cocoons of light. They're made
          by weaving or knotting cords or yarn into intricate patterns around a
          frame to create a soft, textured lampshade. Tesu Home Decor lamps
          emit a gentle glow, casting mesmerizing patterns of light and shadow
          around the room.
        </p>
      </div>
      <div className="products-grid">
        {macrameLamps.map((lamp) => (
          <div key={lamp.id} className="product-card">
            <img
              src={lamp.image}
              alt={lamp.name}
              className="product-image"
            />
            <h3>{lamp.name}</h3>
            <p>₹{lamp.price.toLocaleString()}</p>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(lamp.name, "decrement")}
              >
                -
              </button>
              <input
                type="number"
                value={quantities[lamp.name]}
                readOnly
                min={1}
              />
              <button
                onClick={() => handleQuantityChange(lamp.name, "increment")}
              >
                +
              </button>
            </div>
            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(lamp)}
              >
                Add to Cart
              </button>
              <button
                className="buy-it-now-btn"
                onClick={() => handleBuyItNow(lamp)}
              >
                Buy It Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacrameLamps;

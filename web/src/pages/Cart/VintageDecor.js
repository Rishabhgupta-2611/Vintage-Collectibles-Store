import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext"; // Import CartContext
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./VintageDecor.css";

const vintageDecorProducts = [
  { id: 1, name: "Antique Brass Diya Stand", price: 41000, image: "/image/Antique Brass Diya Stand.jpg" },
  { id: 2, name: "Antique Wooden Brown Pot", price: 4800, image: "/image/Antique Wooden Brown Pot.jpg" },
  { id: 3, name: "Vintage Handcarved Wooden Horse with Feathers", price: 11800, image: "/image/Vintage Handcarved Wooden Horse with Feathers.jpg" },
];

const VintageDecor = () => {
  const { addToCart } = useContext(CartContext); // Consume addToCart from context
  const [quantities, setQuantities] = useState(
    vintageDecorProducts.reduce((acc, product) => {
      acc[product.name] = 1; // Initialize all quantities to 1
      return acc;
    }, {})
  );

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

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: quantities[product.name], // Add selected quantity
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyItNow = (product) => {
    // Simulate a direct checkout process for now
    toast.info(`Proceeding to checkout with ${product.name}.`);
    // Logic for redirecting to checkout page can be added here
  };

  return (
    <div className="VintageDecor">
      <div className="vintage-header">
        <h1>Vintage Decor</h1>
        <nav>
          <Link to="/">Home</Link> &gt; <span>Vintage Decor</span>
        </nav>
        <p>
          Vintage home decor embraces the charm and character of bygone eras,
          typically from the early 20th century or earlier. It celebrates
          nostalgia, incorporating elements like weathered wood, distressed
          metals, and ornate patterns...
        </p>
      </div>

      <div className="product-grid">
        {vintageDecorProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>₹{product.price.toLocaleString()}</p>

            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(product.name, "decrement")}>
                -
              </button>
              <input
                type="number"
                value={quantities[product.name]}
                readOnly
                min={1}
              />
              <button onClick={() => handleQuantityChange(product.name, "increment")}>
                +
              </button>
            </div>

            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="buy-it-now-btn"
                onClick={() => handleBuyItNow(product)}
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

export default VintageDecor;

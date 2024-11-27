import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext"; // Import CartContext
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./VintageFurniture.css"; // Import styling

const vintageFurnitureItems = [
  { id: 1, name: "Antique Wood Turquoise Blue Almirah", price: 899000, image: "/image/Antique Wood Turquoise Blue Almirah.jpg" },
  { id: 2, name: "Heritage Elephant Carved Wooden Console Table", price: 589000, image: "/image/Heritage Elephant Carved Wooden Console Table.jpg" },
  { id: 3, name: "Wooden Drawer Painted Cabinet", price: 589900, image: "/image/Wooden Drawer Painted Cabinet.jpg" },
];

const VintageFurniture = () => {
  const { addToCart } = useContext(CartContext); // Consume addToCart from context
  const [quantities, setQuantities] = useState(
    vintageFurnitureItems.reduce((acc, product) => {
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
    <div className="VintageFurniture">
      {/* Breadcrumb */}
      <div className="breadcrumb">
      <nav>
        <a href="/">Home</a> &gt; <span>Vintage Furniture</span>
      </nav>
        <p className="description">
          Discover vintage furniture handcrafted from reclaimed truck wood, elegant seating crafted from recycled wood, teak wood, and mango wood.
        </p>
      </div>

      {/* Product Grid */}
      <section className="product-grid">
        <div className="products">
          {vintageFurnitureItems.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>₹{product.price.toLocaleString()}</p>

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
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
                <button className="buy-it-now-btn" onClick={() => handleBuyItNow(product)}>
                  Buy It Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VintageFurniture;

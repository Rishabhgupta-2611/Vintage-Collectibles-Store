import React, { useState, useContext } from "react";
import { CartContext } from './CartContext';  // Import CartContext
import "./sculptures.css"; // Include styles here

const sculptures = [
  { 
    id: 1,
    name: "Buddha Parametric Sculpture", 
    price: 65000, 
    image: "image/buddha.jpg" 
  },
  { id: 2, name: "David Parametric Sculpture", price: 65000, image: "image/david.jpg" },
  { id: 3, name: "Leo Parametric Sculpture", price: 52000, image: "image/leo.jpg" },
  { id: 4, name: "Moai Parametric Sculpture", price: 56000, image: "image/moai.jpg" },
  { id: 5, name: "Turtle Parametric Sculpture", price: 48000, image: "image/turtle.jpg" },
];

const SculpturesArt = () => {
  const { addToCart } = useContext(CartContext); // Consume addToCart from context
  const [sortOption, setSortOption] = useState("Alphabetically, A–Z");
  const [quantities, setQuantities] = useState(
    sculptures.reduce((acc, sculpture) => {
      acc[sculpture.name] = 1; // Initialize all quantities to 1
      return acc;
    }, {})
  );

  const handleQuantityChange = (sculptureName, operation) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      if (operation === "increment") {
        newQuantities[sculptureName] += 1;
      } else if (operation === "decrement" ) {
        newQuantities[sculptureName] -= 1;
      }
      return newQuantities;
    });
  };

  const sortSculptures = () => {
    if (sortOption === "Alphabetically, A–Z") {
      return sculptures.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Price: Low to High") {
      return sculptures.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      return sculptures.sort((a, b) => b.price - a.price);
    }
    return sculptures;
  };

  const handleAddToCart = (sculpture) => {
    addToCart({
      ...sculpture,
      quantity: quantities[sculpture.name],  // Add selected quantity
    });
  };

  return (
    <div className="container">
      <h1>Sculptures & Art</h1>
      <nav>
        <a href="/">Home</a> &gt; <span>Sculptures & Art</span>
      </nav>
      <p>
        Where modern sculpture and art meet innovation and elegance. We bring
        you a curated selection of contemporary sculptures and artworks
        designed to transform spaces and inspire creativity.
      </p>
      
      <div className="filter-sort">
        <label htmlFor="sort">Filter: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="Alphabetically, A–Z">Alphabetically, A–Z</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>
      </div>
      
      <div className="sculpture-grid">
        {sortSculptures().map((sculpture, index) => (
          <div key={index} className="card">
            <img
              src={sculpture.image}
              alt={sculpture.name}
              className="sculpture-image"
            />
            <h3>{sculpture.name}</h3>
            <p>Rs. {sculpture.price.toLocaleString()}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(sculpture.name, "decrement")}>-</button>
              <input
                type="number"
                value={quantities[sculpture.name]}
                readOnly
                min={1}
              />
              <button onClick={() => handleQuantityChange(sculpture.name, "increment")}>+</button>
            </div>
            <div className="action-buttons">
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(sculpture)}  // Add item to cart
              >
                Add to cart
              </button>
              <button className="buy-it-now">Buy it now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SculpturesArt;

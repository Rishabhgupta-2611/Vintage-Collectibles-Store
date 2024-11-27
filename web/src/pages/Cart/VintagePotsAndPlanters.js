import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext'; // Import CartContext
import { toast } from 'react-toastify'; // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { Link } from 'react-router-dom';
import './VintagePotsAndPlanters.css'; // Use a separate CSS file for styling

// Pots and Planters data
const potsAndPlantersItems = [
  {
    id: 1,
    name: 'Antique Brass Kettle Vase',
    price: 9500,
    image: '/image/Antique Brass Kettle Vase.jpg', // Replace with the actual path
  },
  {
    id: 2,
    name: 'Antique Timber Vessel',
    price: 94000,
    image: '/image/Antique Timber Vessel.jpg',
  },
  {
    id: 3,
    name: 'Antique Wooden Tumbler',
    price: 4800,
    image: '/image/Antique Wooden Tumbler.jpg',
  },
];

const VintagePotsAndPlanters = () => {
  const { addToCart } = useContext(CartContext); // Consume addToCart from context
  const [quantities, setQuantities] = useState(
    potsAndPlantersItems.reduce((acc, product) => {
      acc[product.name] = 1; // Initialize all quantities to 1
      return acc;
    }, {})
  );

  const handleQuantityChange = (productName, operation) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (operation === 'increment') {
        newQuantities[productName] += 1;
      } else if (operation === 'decrement' && newQuantities[productName] > 1) {
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
    toast.info(`Proceeding to checkout with ${product.name}.`);
    // Simulate a direct checkout process for now
  };

  return (
    <div className="VintagePotsAndPlanters">
      {/* Breadcrumb */}
      <div className="breadcrumb">
      <nav>
        <a href="/">Home</a> &gt; <span>Vintage Pots and Planters</span>
      </nav>
        <p className="description">
          Vintage pots and planters are like time-traveling treasure chests for your plants. They're containers that have a classic, old-school vibe, often with intricate designs or weathered finishes that give them a nostalgic charm. These beauties not only hold your plants but also add a touch of history and personality to your home or garden. Whether they're made of clay, metal, or even reclaimed materials, vintage pots and planters bring a sense of timeless style to any green space.
        </p>
      </div>

      {/* Product Grid */}
      <section className="product-grid">
        <div className="products">
          {potsAndPlantersItems.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>From Rs. {item.price.toLocaleString('en-IN')}</p>

              {/* Quantity Control */}
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.name, 'decrement')}>-</button>
                <input type="number" value={quantities[item.name]} readOnly min={1} />
                <button onClick={() => handleQuantityChange(item.name, 'increment')}>+</button>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
                <button className="buy-it-now-btn" onClick={() => handleBuyItNow(item)}>
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

export default VintagePotsAndPlanters;

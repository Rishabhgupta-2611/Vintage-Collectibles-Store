import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './ProductList.css';

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    {
      id: 1,
      name: 'Vintage Vase',
      price: 100,
      image: '/path/to/vintage-vase.jpg', // Replace with real image paths
    },
    {
      id: 2,
      name: 'Antique Lamp',
      price: 200,
      image: '/path/to/antique-lamp.jpg',
    },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>₹ {product.price.toFixed(2)}</p>
          <button onClick={() => addToCart({ ...product, quantity: 1 })} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

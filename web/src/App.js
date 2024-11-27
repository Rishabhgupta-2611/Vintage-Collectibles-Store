import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './pages/Header/Header';
import NavBar from './pages/Navbar/NavBar';
import Footer from './pages/Footer/Footer';
import { CartProvider } from './pages/Cart/CartContext'; // CartProvider for managing cart state

// Pages
import HomePage from './pages/Cart/HomePage';
import OurStoryPage from './pages/About us/OurStoryPage';
import Login from './pages/Account/index';
import Register from './pages/Account/Register';
import Cart from './pages/Cart/Cart';
import SculpturesArt from './pages/Cart/SculpturesArt';
import VintageDecorGallery from './pages/Cart/VintageDecor';
import VintageFurniture from "./pages/Cart/VintageFurniture";
import VintagePotsAndPlanters from "./pages/Cart/VintagePotsAndPlanters";
import PendantLighting from './pages/Cart/Lighting';
import WallLamps from './pages/Cart/WallLamps';
import MacrameLamps from './pages/Cart/MacrameLamps'; 
import Checkout from './pages/Cart/Checkout';
// Utility function for login status check
const isLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          {/* Header and Navbar */}
          <Header />
          <NavBar />

          {/* App Routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<OurStoryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
            <Route path="/sculptures-art" element={<ProtectedRoute element={<SculpturesArt />} />} />
            <Route
              path="/antiques-vintage/vintage-decor"
              element={<ProtectedRoute element={<VintageDecorGallery />} />}
            />
            <Route path="/vintage-furniture" element={<VintageFurniture />} /> 
            <Route path="/VintagePotsAndPlanters" element={<VintagePotsAndPlanters/>} /> 
            <Route path="/lighting" element={<ProtectedRoute element={<PendantLighting />} />} />
            <Route path="/wall-lamps" element={<ProtectedRoute element={<WallLamps />} />} />
            <Route path="/macrame-lamps" element={<ProtectedRoute element={<MacrameLamps />} />} />
            
            {/* Checkout Route */}
            <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

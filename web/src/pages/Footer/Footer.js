import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h3>ABOUT</h3>
          <p>Our Story</p>
          <p>Our Artisans</p>
          <p>Commitment to Sustainability</p>
          <p>Careers</p>
          <p>About Us</p>
        </div>

        <div className="footer-section">
          <h3>SERVICES</h3>
          <p>Bulk Enquiry</p>
          <p>Made to Order</p>
          <p>Corporate Gifting</p>
          <p>Care Guide</p>
          <p>Brochure</p>
          <p>FAQs</p>
        </div>

        <div className="footer-section">
          <h3>HELP</h3>
          <p>Shipping Policy</p>
          <p>Returns & Refunds</p>
          <p>Payment Method</p>
          <p>Terms and Conditions</p>
          <p>Billing Terms and Conditions</p>
          <p>Privacy Policy</p>
          <p>Contact Us</p>
        </div>

        <div className="footer-section">
          <h3>CONNECT</h3>
          <p><strong>Company Name:</strong>Timeless Treasures</p>
          <p><strong>Address:</strong> E5/141, Arera Colony, Bhopal, Madhya Pradesh 462016</p>
          <p><strong>Company GST Number:</strong> 23AAYFA9620Q1ZN</p>
          <p><strong>Company MSME:</strong> 23AAYFA9620Q1ZN</p>
          <p><strong>Phone:</strong> +91 8738894881 / +91 8738987617</p>
          <p><strong>Email:</strong> connect@TimelessTreasuresindia.com</p>
        </div>
      </div>

      <div className="footer-social">
        <span>© Timeless Treasures 2024</span>
        {/* Removed social media icons */}
        <div className="payment-processing">
          <p>Payment processing partner</p>
          {/* Removed the payment processing logo */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
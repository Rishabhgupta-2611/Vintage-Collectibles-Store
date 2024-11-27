import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import generatePDFInvoice from "./generatePDFInvoice"; // Ensure this file exists and is implemented correctly
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], total: initialTotal = 0 } = location.state || {};

  const total = Number(initialTotal) || 0;
  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
    "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ].sort();

  const [deliveryAddress, setDeliveryAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  const [billingAddress, setBillingAddress] = useState({ ...deliveryAddress });
  const [isBillingSame, setIsBillingSame] = useState(true);

  const TAX_RATE = 0.18; // 18% GST
  const taxAmount = (total * TAX_RATE).toFixed(2);
  const grandTotal = (total + parseFloat(taxAmount)).toFixed(2);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "delivery") {
      setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
      if (isBillingSame) {
        setBillingAddress((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setBillingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBillingToggle = () => {
    setIsBillingSame(!isBillingSame);
    if (!isBillingSame) {
      setBillingAddress({ ...deliveryAddress });
    }
  };

  const handlePayment = () => {
    const requiredFields = ["firstName", "lastName", "address", "city", "state", "pinCode", "phone"];
    const isDeliveryValid = requiredFields.every((field) => deliveryAddress[field]);
    const isBillingValid = isBillingSame || requiredFields.every((field) => billingAddress[field]);

    if (!isDeliveryValid || !isBillingValid) {
      alert("Please fill in all required fields.");
      return;
    }

    // Generate PDF Invoice
    generatePDFInvoice(deliveryAddress, billingAddress, cart, total, taxAmount, grandTotal);

    // Show Success Message and Navigate to Home
    alert("Order placed successfully! Your invoice has been downloaded.");
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Delivery Address */}
      <div className="address-section">
        <h3>Delivery Address</h3>
        <div className="address-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={deliveryAddress.firstName}
            onChange={(e) => handleInputChange(e, "delivery")}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={deliveryAddress.lastName}
            onChange={(e) => handleInputChange(e, "delivery")}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={deliveryAddress.address}
            onChange={(e) => handleInputChange(e, "delivery")}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={deliveryAddress.city}
            onChange={(e) => handleInputChange(e, "delivery")}
          />
          <select
            name="state"
            value={deliveryAddress.state}
            onChange={(e) => handleInputChange(e, "delivery")}
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="pinCode"
            placeholder="PIN Code"
            value={deliveryAddress.pinCode}
            onChange={(e) => handleInputChange(e, "delivery")}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={deliveryAddress.phone}
            onChange={(e) => handleInputChange(e, "delivery")}
          />
        </div>
      </div>

      {/* Billing Address */}
      <div className="address-section">
        <h3>
          Billing Address{" "}
          <label>
            <input
              type="checkbox"
              checked={isBillingSame}
              onChange={handleBillingToggle}
            />{" "}
            Same as delivery address
          </label>
        </h3>
        {!isBillingSame && (
          <div className="address-form">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={billingAddress.firstName}
              onChange={(e) => handleInputChange(e, "billing")}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={billingAddress.lastName}
              onChange={(e) => handleInputChange(e, "billing")}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={billingAddress.address}
              onChange={(e) => handleInputChange(e, "billing")}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={billingAddress.city}
              onChange={(e) => handleInputChange(e, "billing")}
            />
            <select
              name="state"
              value={billingAddress.state}
              onChange={(e) => handleInputChange(e, "billing")}
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="pinCode"
              placeholder="PIN Code"
              value={billingAddress.pinCode}
              onChange={(e) => handleInputChange(e, "billing")}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={billingAddress.phone}
              onChange={(e) => handleInputChange(e, "billing")}
            />
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="summary-section">
        <h3>Order Summary</h3>
        <p>Subtotal: ₹{total.toFixed(2)}</p>
        <p>Tax (18% GST): ₹{taxAmount}</p>
        <p>Grand Total: ₹{grandTotal}</p>
      </div>

      <button className="payment-button" onClick={handlePayment}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default Checkout;

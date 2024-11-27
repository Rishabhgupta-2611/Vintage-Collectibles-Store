import { jsPDF } from "jspdf";
import logo from "./rishabh.png"; // Replace with your logo path
import "jspdf-autotable"; // Optional, if you want to use tables for better formatting

const generatePDFInvoice = (deliveryAddress, billingAddress, cart, total, taxAmount, grandTotal) => {
  const doc = new jsPDF();

  // Add Logo
  doc.addImage(logo, "PNG", 10, 10, 50, 20); // Adjust positioning and size for the logo

  // Invoice Header
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("TAX INVOICE / BILL OF SUPPLY / CASH MEMO", 105, 20, null, null, "center");
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("(Original for Recipient)", 105, 25, null, null, "center");

  // Horizontal Line
  doc.line(10, 30, 200, 30);

  // Delivery Address Section
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Delivery Address", 10, 40);
  doc.setFont("helvetica", "normal");
  doc.text(`${deliveryAddress.firstName} ${deliveryAddress.lastName}`, 10, 45);
  doc.text(deliveryAddress.address, 10, 50);
  doc.text(`${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pinCode}`, 10, 55);
  doc.text(`Phone: ${deliveryAddress.phone}`, 10, 60);

  // Billing Address Section
  doc.setFont("helvetica", "bold");
  doc.text("Billing Address", 110, 40);
  doc.setFont("helvetica", "normal");
  doc.text(`${billingAddress.firstName} ${billingAddress.lastName}`, 110, 45);
  doc.text(billingAddress.address, 110, 50);
  doc.text(`${billingAddress.city}, ${billingAddress.state} - ${billingAddress.pinCode}`, 110, 55);
  doc.text(`Phone: ${billingAddress.phone}`, 110, 60);

  // Horizontal Line
  doc.line(10, 65, 200, 65);

  // Order Summary Header
  doc.setFont("helvetica", "bold");
  doc.text("Order Summary", 10, 75);

  // Table Header
  doc.text("Item Name", 10, 85);
  doc.text("Quantity", 110, 85);
  doc.text("Price (\u20B9)", 150, 85); // Use Unicode for ₹ symbol

  // Horizontal Line Below Header
  doc.line(10, 90, 200, 90);

  // Table Data
  let yOffset = 95;
  doc.setFont("helvetica", "normal");
  cart.forEach((item) => {
    doc.text(item.name, 10, yOffset);
    doc.text(String(item.quantity), 110, yOffset);
    doc.text(`\u20B9${(item.price * item.quantity).toFixed(2)}`, 150, yOffset); // Use Unicode for ₹ symbol
    yOffset += 10;
  });

  // Horizontal Line Below Table
  doc.line(10, yOffset, 200, yOffset);

  // Totals
  yOffset += 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Subtotal: \u20B9${total.toFixed(2)}`, 150, yOffset);
  yOffset += 10;
  doc.text(`Tax (18% GST): \u20B9${taxAmount}`, 150, yOffset);
  yOffset += 10;
  doc.text(`Grand Total: \u20B9${grandTotal}`, 150, yOffset);

  // Footer
  yOffset += 20;
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for shopping with us!", 105, yOffset, null, null, "center");

  // Save the PDF
  doc.save(`Invoice_${new Date().toISOString().slice(0, 10)}.pdf`);
};

export default generatePDFInvoice;

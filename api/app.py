from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient

# Initialize Flask app
app = Flask(__name__)

# Configure app
app.config['MONGO_URI'] = 'mongodb://localhost:27017/shopping_cart'
CORS(app, origins="http://localhost:3000", supports_credentials=True)

# Initialize MongoDB and extensions
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# MongoDB collections
users_collection = mongo.db.users
orders_collection = mongo.db.orders

### USER AUTHENTICATION ROUTES ###

# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')

    # Check if all fields are provided
    if not all([first_name, last_name, email, password]):
        return jsonify({"message": "All fields are required"}), 400

    # Check if the email already exists in the database
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already exists"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert the user into the MongoDB collection
    users_collection.insert_one({
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "Registration successful"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if the email and password are provided
    if not all([email, password]):
        return jsonify({"message": "Email and password are required"}), 400

    # Find the user by email
    user = users_collection.find_one({"email": email})

    if user and bcrypt.check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"message": "Invalid email or password"}), 401


### ORDER MANAGEMENT ROUTES ###

# Save order route
@app.route('/save-order', methods=['POST'])
def save_order():
    data = request.json
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    order_id = orders_collection.insert_one(data).inserted_id
    return jsonify({'message': 'Order saved successfully', 'order_id': str(order_id)}), 201

# Get all orders route
@app.route('/get-orders', methods=['GET'])
def get_orders():
    orders = list(orders_collection.find({}, {'_id': 0}))
    return jsonify(orders), 200


### SERVER START ###
if __name__ == '__main__':
    app.run(debug=True)
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import smtplib
# from email.mime.multipart import MIMEMultipart
# from email.mime.base import MIMEBase
# from email import encoders
# import os

# app = Flask(__name__)
# CORS(app)

# # Email Configuration
# EMAIL_ADDRESS = "guptasanjaykumar0407@gmail.com"  # Replace with your email
# EMAIL_PASSWORD = "Meena@1979"  # Use app-specific password or SMTP password

# # Send Email
# def send_email_with_pdf(email, pdf_path):
#     msg = MIMEMultipart()
#     msg["From"] = EMAIL_ADDRESS
#     msg["To"] = email
#     msg["Subject"] = "Your Order Invoice"

#     attachment = open(pdf_path, "rb")
#     part = MIMEBase("application", "octet-stream")
#     part.set_payload(attachment.read())
#     encoders.encode_base64(part)
#     part.add_header("Content-Disposition", f"attachment; filename=Invoice.pdf")
#     msg.attach(part)

#     with smtplib.SMTP("smtp.gmail.com", 587) as server:
#         server.starttls()
#         server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
#         server.sendmail(EMAIL_ADDRESS, email, msg.as_string())

#     attachment.close()

# # API Endpoint to Place Order
# @app.route("/place-order", methods=["POST"])
# def place_order():
#     email = request.form.get("email")
#     pdf_file = request.files.get("pdf")

#     if not email or not pdf_file:
#         return jsonify({"error": "Missing email or PDF file"}), 400

#     # Save PDF temporarily
#     pdf_path = f"temp_invoice.pdf"
#     pdf_file.save(pdf_path)

#     try:
#         # Send Email with PDF
#         send_email_with_pdf(email, pdf_path)
#         os.remove(pdf_path)  # Clean up the temporary file
#         return jsonify({"message": "Order placed successfully, email sent!"}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)

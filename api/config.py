# config.py
import os

class Config:
    SECRET_KEY = os.urandom(24)  # For session management
    MONGO_URI = "mongodb://localhost:27017/Rishabh_Vintage_Store"  # MongoDB URI

// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- 1. THE DATA (Our Menu) ---
const menuItems = [
    { id: 1, name: "Geralde Burger", category: "Burgers", price: 250.00, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 2, name: "Cheese Master", category: "Burgers", price: 350.00, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500" },
    { id: 3, name: "French Fries", category: "Sides", price: 90.00, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500" },
    { id: 4, name: "Coke", category: "Drinks", price: 67.00, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" },
    { id: 5, name: "Vanilla Shake", category: "Drinks", price: 120.00, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { id: 6, name: "Chocolate Cake", category: "Dessert", price: 150.00, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" }
];

let orders = [];

// --- 2. ENDPOINTS ---

// Get the menu
app.get('/menu', (req, res) => {
    res.json(menuItems);
});

// Place an order
app.post('/orders', (req, res) => {
    const newOrder = req.body;
    orders.push(newOrder);
    console.log("New Order Received:", newOrder);
    res.json({ message: "Order placed successfully!", orderId: Date.now() });
});

app.listen(4000, () => {
    console.log("Restaurant Server running on port 4000");
});
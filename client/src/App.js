import React, { useState, useEffect } from 'react';

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  // Fetch Menu from Server on load
  useEffect(() => {
    fetch('http://localhost:4000/menu')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  // Filter Logic: If category is "All", show everything. Else, match category.
  const filteredMenu = category === "All" 
    ? menu 
    : menu.filter(item => item.category === category);

  // Cart Logic: Add item to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Cart Logic: Remove specific item (by index)
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // Calculate Total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Send Order to Server
  const placeOrder = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    
    fetch('http://localhost:4000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, total: total })
    })
    .then(() => {
      alert("Order Sent to Kitchen!");
      setCart([]); // Clear cart
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* LEFT SIDE: MENU */}
      <div className="w-2/3 p-6 overflow-y-auto">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">🍔 Pat's Restaurant</h1>
          <div className="space-x-2">
            {["All", "Burgers", "Sides", "Drinks", "Dessert"].map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold ${category === cat ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer" onClick={() => addToCart(item)}>
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <span className="text-orange-500 font-bold">₱ {item.price.toFixed(2)}</span>
                </div>
                <button className="w-full bg-gray-100 text-gray-700 py-1 rounded hover:bg-orange-100 hover:text-orange-600 text-sm font-medium">
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: CART */}
      <div className="w-1/3 bg-white p-6 shadow-2xl flex flex-col justify-between border-l">
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Order</h2>
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">Select items to start...</p>
          ) : (
            <ul className="space-y-3 max-h-[60vh] overflow-y-auto">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">₱{item.price.toFixed(2)}</span>
                    <button onClick={() => removeFromCart(index)} className="text-red-400 hover:text-red-600">✕</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
          <button 
            onClick={placeOrder}
            className="w-full bg-green-500 text-white py-4 rounded-xl text-xl font-bold hover:bg-green-600 transition shadow-lg transform hover:scale-105"
          >
            Checkout Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
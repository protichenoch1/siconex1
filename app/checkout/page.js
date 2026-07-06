"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState("card");

  // Load cart + address
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];

    setCart(savedCart);

    const defaultAddr = addresses.find((a) => a.isDefault);
    setAddress(defaultAddr || addresses[0]);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (!address) {
      alert("Please add a delivery address");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      address,
      payment,
      status: "Ordered",
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));
    localStorage.removeItem("cart");

    alert("Order placed successfully!");

    // optional redirect
    window.location.href = "/account/orders";
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={header}>Checkout</div>

      {/* ADDRESS */}
      <Section title="Delivery Address">
        {address ? (
          <div>
            <b>{address.name}</b>
            <div>{address.phone}</div>
            <div>{address.city}</div>
            <div>{address.location}</div>
          </div>
        ) : (
          <div>No address selected</div>
        )}
      </Section>

      {/* CART ITEMS */}
      <Section title="Items">
        {cart.map((item) => (
          <div key={item.id} style={itemRow}>
            <img src={item.image} style={img} />
            <div>
              <div>{item.name}</div>
              <div style={{ color: "#777" }}>
                KES {item.price.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </Section>

      {/* PAYMENT */}
      <Section title="Payment Method">
        <Option
          label="Card (Visa / Mastercard)"
          value="card"
          current={payment}
          set={setPayment}
        />
        <Option
          label="M-Pesa"
          value="mpesa"
          current={payment}
          set={setPayment}
        />
      </Section>

      {/* TOTAL */}
      <div style={totalBox}>
        <div>Total</div>
        <b>KES {total.toLocaleString()}</b>
      </div>

      {/* BUTTON */}
      <div style={{ padding: "10px" }}>
        <button onClick={placeOrder} style={btn}>
          Place Order
        </button>
      </div>
    </div>
  );
}

// 🔹 Section
function Section({ title, children }) {
  return (
    <div style={card}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

// 🔹 Payment option
function Option({ label, value, current, set }) {
  return (
    <div
      onClick={() => set(value)}
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginTop: "8px",
        cursor: "pointer",
        background: current === value ? "#e8f5e9" : "#fff",
      }}
    >
      {label}
    </div>
  );
}

// styles
const header = {
  background: "#0a8f3c",
  color: "#fff",
  padding: "16px",
  fontWeight: "bold",
};

const card = {
  background: "#fff",
  margin: "10px",
  padding: "12px",
  borderRadius: "8px",
};

const itemRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const img = {
  width: "60px",
  height: "60px",
  objectFit: "cover",
  borderRadius: "6px",
};

const totalBox = {
  background: "#fff",
  margin: "10px",
  padding: "15px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
};

const btn = {
  width: "100%",
  padding: "14px",
  background: "#0a8f3c",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

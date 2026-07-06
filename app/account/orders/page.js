"use client";

import { useState, useEffect } from "react";

export default function OrdersPage() {
  const [tab, setTab] = useState("ongoing");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const ongoing = orders.filter(o => o.status === "ongoing");
  const delivered = orders.filter(o => o.status === "delivered");

  const markAsDelivered = (id) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: "delivered" } : order
    );

    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(updated);
  };

  const list = tab === "ongoing" ? ongoing : delivered;

  return (
    <div style={{ padding: "15px", background: "#f5f5f5", minHeight: "100vh" }}>
      
      <h2>My Orders</h2>

      {/* TABS */}
      <div style={{
        display: "flex",
        marginTop: "15px",
        background: "#fff",
        borderRadius: "8px",
        overflow: "hidden"
      }}>
        <button
          onClick={() => setTab("ongoing")}
          style={{
            flex: 1,
            padding: "12px",
            border: "none",
            background: tab === "ongoing" ? "#0a8f3c" : "#fff",
            color: tab === "ongoing" ? "#fff" : "#333",
            fontWeight: "bold"
          }}
        >
          Ongoing
        </button>

        <button
          onClick={() => setTab("delivered")}
          style={{
            flex: 1,
            padding: "12px",
            border: "none",
            background: tab === "delivered" ? "#0a8f3c" : "#fff",
            color: tab === "delivered" ? "#fff" : "#333",
            fontWeight: "bold"
          }}
        >
          Delivered
        </button>
      </div>

      {/* LIST */}
      <div style={{ marginTop: "15px" }}>
        {list.length === 0 ? (
          <p style={{ color: "#777" }}>No orders here</p>
        ) : (
          list.map(order => (
            <div
              key={order.id}
              style={{
                background: "#fff",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "10px",
                border: "1px solid #eee"
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src={order.image}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain"
                  }}
                />

                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "14px", fontWeight: "500" }}>
                    {order.name}
                  </p>

                  <p style={{ color: "#0a8f3c", fontWeight: "bold" }}>
                    KES {order.price}
                  </p>

                  <p style={{ fontSize: "12px", color: "#777" }}>
                    Qty: {order.quantity}
                  </p>
                </div>
              </div>

              {/* ACTION */}
              {tab === "ongoing" && (
                <button
                  onClick={() => markAsDelivered(order.id)}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "10px",
                    background: "#0a8f3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px"
                  }}
                >
                  Mark as Received
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
                }

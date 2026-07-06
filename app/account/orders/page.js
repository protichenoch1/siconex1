"use client";

import { useState } from "react";

export default function OrdersPage() {
  const [tab, setTab] = useState("ongoing");

  const ongoingOrders = [
    {
      id: 1,
      name: "Samsung Galaxy A14",
      price: "KES 23,500",
      status: "Ready for pickup",
      image: "/phone.jpg",
    },
    {
      id: 2,
      name: "JBL Speaker",
      price: "KES 9,800",
      status: "On the way",
      image: "/speaker.jpg",
    },
  ];

  const deliveredOrders = [
    {
      id: 3,
      name: "HP Laptop",
      price: "KES 67,000",
      status: "Delivered",
      image: "/laptop.jpg",
    },
  ];

  const orders = tab === "ongoing" ? ongoingOrders : deliveredOrders;

  const StatusBadge = ({ status }) => {
    let color = "#999";

    if (status === "Delivered") color = "green";
    if (status === "On the way") color = "orange";
    if (status === "Ready for pickup") color = "#0a8f3c";

    return (
      <span
        style={{
          fontSize: "12px",
          color: "#fff",
          background: color,
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        {status}
      </span>
    );
  };

  const Card = ({ item }) => (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "12px",
        borderBottom: "1px solid #eee",
        background: "#fff",
      }}
    >
      <img
        src={item.image}
        alt=""
        style={{
          width: "70px",
          height: "70px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "600" }}>{item.name}</div>
        <div style={{ fontSize: "13px", color: "#777" }}>
          {item.price}
        </div>

        <div style={{ marginTop: "6px" }}>
          <StatusBadge status={item.status} />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div
        style={{
          background: "#0a8f3c",
          color: "#fff",
          padding: "16px",
          fontWeight: "bold",
        }}
      >
        My Orders
      </div>

      {/* TABS */}
      <div
        style={{
          display: "flex",
          background: "#fff",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div
          onClick={() => setTab("ongoing")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "12px",
            cursor: "pointer",
            borderBottom:
              tab === "ongoing" ? "3px solid #0a8f3c" : "none",
            fontWeight: tab === "ongoing" ? "600" : "normal",
          }}
        >
          Ongoing
        </div>

        <div
          onClick={() => setTab("delivered")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "12px",
            cursor: "pointer",
            borderBottom:
              tab === "delivered" ? "3px solid #0a8f3c" : "none",
            fontWeight: tab === "delivered" ? "600" : "normal",
          }}
        >
          Delivered
        </div>
      </div>

      {/* LIST */}
      <div style={{ marginTop: "10px" }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#777" }}>
            No orders here
          </div>
        ) : (
          orders.map((item) => <Card key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
          }

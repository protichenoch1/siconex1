"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [tab, setTab] = useState("ongoing");
  const [allOrders, setAllOrders] = useState([]);
  const router = useRouter();

  // ✅ Load real orders from checkout
  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const formatted = savedOrders.flatMap((order) =>
      order.items.map((item) => ({
        id: order.id,
        name: item.name,
        price: `KES ${item.price.toLocaleString()}`,
        image: item.image,
        status: order.status || "On the way",
      }))
    );

    setAllOrders(formatted);
  }, []);

  const ongoingOrders = allOrders.filter(
    (o) => o.status !== "Delivered"
  );

  const deliveredOrders = allOrders.filter(
    (o) => o.status === "Delivered"
  );

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
      onClick={() => router.push(`/account/orders/${item.id}`)}
      style={{
        display: "flex",
        gap: "10px",
        padding: "12px",
        borderBottom: "1px solid #eee",
        background: "#fff",
        cursor: "pointer",
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

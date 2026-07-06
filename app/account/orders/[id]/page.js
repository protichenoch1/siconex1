"use client";

import { useParams } from "next/navigation";

export default function OrderDetails() {
  const { id } = useParams();

  // Fake data (later replace with real backend)
  const orders = [
    {
      id: "1",
      name: "Samsung Galaxy A14",
      price: 23500,
      image: "/phone.jpg",
      status: "Ready for pickup",
      steps: ["Ordered", "On the way", "Ready for pickup"],
    },
    {
      id: "2",
      name: "JBL Speaker",
      price: 9800,
      image: "/speaker.jpg",
      status: "On the way",
      steps: ["Ordered", "On the way"],
    },
    {
      id: "3",
      name: "HP Laptop",
      price: 67000,
      image: "/laptop.jpg",
      status: "Delivered",
      steps: ["Ordered", "On the way", "Delivered"],
    },
  ];

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return <div style={{ padding: "20px" }}>Order not found</div>;
  }

  const allSteps = ["Ordered", "On the way", "Ready for pickup", "Delivered"];

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
        Order Details
      </div>

      {/* PRODUCT CARD */}
      <div
        style={{
          background: "#fff",
          margin: "10px",
          padding: "12px",
          borderRadius: "8px",
          display: "flex",
          gap: "10px",
        }}
      >
        <img
          src={order.image}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "6px",
            objectFit: "cover",
          }}
        />

        <div>
          <div style={{ fontWeight: "600" }}>{order.name}</div>
          <div style={{ color: "#777", fontSize: "14px" }}>
            KES {order.price.toLocaleString()}
          </div>
          <div style={{ marginTop: "6px", color: "#0a8f3c" }}>
            {order.status}
          </div>
        </div>
      </div>

      {/* TRACKING TIMELINE */}
      <div
        style={{
          background: "#fff",
          margin: "10px",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ marginBottom: "10px" }}>Track Order</h4>

        {allSteps.map((step, index) => {
          const isActive = order.steps.includes(step);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              {/* DOT */}
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: isActive ? "#0a8f3c" : "#ccc",
                  marginRight: "10px",
                }}
              />

              {/* LINE */}
              <div
                style={{
                  position: "absolute",
                  left: "21px",
                  marginTop: "20px",
                  height: "30px",
                  width: "2px",
                  background:
                    index !== allSteps.length - 1
                      ? isActive
                        ? "#0a8f3c"
                        : "#ccc"
                      : "transparent",
                }}
              />

              {/* TEXT */}
              <div
                style={{
                  color: isActive ? "#000" : "#999",
                  fontWeight: isActive ? "500" : "normal",
                }}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

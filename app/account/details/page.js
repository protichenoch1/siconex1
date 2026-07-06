"use client";

import { useEffect, useState } from "react";

export default function DetailsPage() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [saved, setSaved] = useState(false);

  // Load user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setForm({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveDetails = () => {
    localStorage.setItem("user", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
        My Details
      </div>

      {/* FORM */}
      <div
        style={{
          background: "#fff",
          margin: "10px",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        {/* FIRST NAME */}
        <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />

        {/* MIDDLE NAME */}
        <Input label="Middle Name" name="middleName" value={form.middleName} onChange={handleChange} />

        {/* LAST NAME */}
        <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />

        {/* EMAIL */}
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />

        {/* PHONE */}
        <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />

        {/* BUTTON */}
        <button onClick={saveDetails} style={btnStyle}>
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// 🔹 Reusable Input Component
function Input({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ fontSize: "13px", color: "#555" }}>
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
}

// styles
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  background: "#0a8f3c",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

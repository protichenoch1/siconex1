"use client";

import { useEffect, useState } from "react";

export default function DetailsPage() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setForm(user);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 📸 Image upload (base64)
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // 📱 Phone formatter
  const formatPhone = (phone) => {
    let digits = phone.replace(/\D/g, "");

    if (digits.startsWith("0")) {
      digits = "254" + digits.slice(1);
    }

    if (digits.startsWith("254")) {
      return "+" + digits;
    }

    return phone;
  };

  const saveDetails = () => {
    setError("");

    // ❌ Validation: must be 10 digits (07XXXXXXXX)
    const digits = form.phone.replace(/\D/g, "");

    if (digits.length !== 10 || !digits.startsWith("0")) {
      setError("Phone must be 10 digits (07XXXXXXXX)");
      return;
    }

    const formattedPhone = formatPhone(form.phone);

    const updatedUser = {
      ...form,
      phone: formattedPhone,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setForm(updatedUser);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={headerStyle}>My Details</div>

      <div style={cardStyle}>
        
        {/* PROFILE IMAGE */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={form.avatar || "/avatar.png"}
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />

          <div style={{ marginTop: "10px" }}>
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>
        </div>

        <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
        <Input label="Middle Name" name="middleName" value={form.middleName} onChange={handleChange} />
        <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />

        {/* EMAIL (READONLY) */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Email</label>
          <input
            value={form.email}
            readOnly
            style={{ ...inputStyle, background: "#eee", color: "#777" }}
          />
        </div>

        <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />

        {/* ERROR */}
        {error && (
          <div style={{ color: "red", fontSize: "13px", marginBottom: "10px" }}>
            {error}
          </div>
        )}

        {/* BUTTON */}
        <button onClick={saveDetails} style={btnStyle}>
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// 🔹 Input component
function Input({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={labelStyle}>{label}</label>
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
const headerStyle = {
  background: "#0a8f3c",
  color: "#fff",
  padding: "16px",
  fontWeight: "bold",
};

const cardStyle = {
  background: "#fff",
  margin: "10px",
  padding: "15px",
  borderRadius: "8px",
};

const labelStyle = {
  fontSize: "13px",
  color: "#555",
};

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

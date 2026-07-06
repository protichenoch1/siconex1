"use client";

import { useEffect, useState } from "react";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    phone: "",
    city: "",
    location: "",
    isDefault: false,
  });

  // Load addresses
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(saved);
  }, []);

  // Save to storage
  const saveToStorage = (data) => {
    localStorage.setItem("addresses", JSON.stringify(data));
    setAddresses(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add or update address
  const saveAddress = () => {
    let updated = [...addresses];

    if (form.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }

    if (form.id) {
      updated = updated.map((a) =>
        a.id === form.id ? form : a
      );
    } else {
      updated.push({ ...form, id: Date.now() });
    }

    saveToStorage(updated);
    resetForm();
  };

  const editAddress = (addr) => {
    setForm(addr);
    setShowForm(true);
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    saveToStorage(updated);
  };

  const setDefault = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveToStorage(updated);
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      phone: "",
      city: "",
      location: "",
      isDefault: false,
    });
    setShowForm(false);
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={header}>My Addresses</div>

      {/* ADD BUTTON */}
      <div style={{ padding: "10px" }}>
        <button onClick={() => setShowForm(true)} style={btn}>
          + Add New Address
        </button>
      </div>

      {/* ADDRESS LIST */}
      {addresses.length === 0 ? (
        <div style={empty}>No saved addresses</div>
      ) : (
        addresses.map((addr) => (
          <div key={addr.id} style={card}>
            
            <div style={{ fontWeight: "600" }}>{addr.name}</div>
            <div style={text}>{addr.phone}</div>
            <div style={text}>{addr.city}</div>
            <div style={text}>{addr.location}</div>

            {addr.isDefault && (
              <div style={defaultTag}>Default</div>
            )}

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => editAddress(addr)} style={smallBtn}>
                Edit
              </button>
              <button onClick={() => deleteAddress(addr.id)} style={smallBtn}>
                Delete
              </button>
              {!addr.isDefault && (
                <button onClick={() => setDefault(addr.id)} style={smallBtn}>
                  Set Default
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div style={overlay}>
          <div style={modal}>
            
            <h3>{form.id ? "Edit Address" : "New Address"}</h3>

            <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="City" name="city" value={form.city} onChange={handleChange} />
            <Input label="Location (Street / Area)" name="location" value={form.location} onChange={handleChange} />

            <div style={{ margin: "10px 0" }}>
              <label>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                />
                {" "}Set as default
              </label>
            </div>

            <button onClick={saveAddress} style={btn}>Save</button>
            <button onClick={resetForm} style={{ ...btn, background: "#999" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 🔹 Input
function Input({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={label}>{label}</label>
      <input name={name} value={value} onChange={onChange} style={input} />
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

const btn = {
  width: "100%",
  padding: "12px",
  background: "#0a8f3c",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const smallBtn = {
  marginRight: "8px",
  padding: "6px 10px",
  border: "none",
  background: "#eee",
  borderRadius: "4px",
  cursor: "pointer",
};

const card = {
  background: "#fff",
  margin: "10px",
  padding: "12px",
  borderRadius: "8px",
};

const text = {
  fontSize: "13px",
  color: "#555",
};

const defaultTag = {
  marginTop: "5px",
  fontSize: "12px",
  color: "#fff",
  background: "#0a8f3c",
  display: "inline-block",
  padding: "2px 6px",
  borderRadius: "4px",
};

const empty = {
  textAlign: "center",
  padding: "40px",
  color: "#777",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "400px",
};

const label = {
  fontSize: "13px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "4px",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

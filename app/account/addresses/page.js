"use client";

import { useEffect, useState } from "react";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const emptyForm = {
    id: null,
    name: "",
    phone: "",
    county: "",
    subCounty: "",
    town: "",
    addressLine: "",
    postal: "",
    isDefault: false,
  };

  const [form, setForm] = useState(emptyForm);

  // ✅ LOAD + MIGRATE FROM SIGNUP
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) return;

    if (savedUser.addresses) {
      setAddresses(savedUser.addresses);
    } else {
      const migrated = [
        {
          id: crypto.randomUUID(),
          name: savedUser.first_name + " " + savedUser.last_name,
          phone: savedUser.phone_number,
          county: savedUser.county,
          subCounty: savedUser.sub_county,
          town: savedUser.town,
          addressLine: savedUser.address_line,
          postal: savedUser.postal_code,
          isDefault: true,
        },
      ];

      setAddresses(migrated);

      const updatedUser = {
        ...savedUser,
        addresses: migrated,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, []);

  // ✅ SAVE TO USER
  const saveToStorage = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    const updatedUser = {
      ...savedUser,
      addresses: data,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setAddresses(data);

    window.dispatchEvent(new Event("userUpdated"));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ VALIDATION
  const isValid = () => {
    return (
      form.name &&
      form.phone &&
      form.county &&
      form.subCounty &&
      form.town &&
      form.addressLine
    );
  };

  // ✅ ADD / UPDATE
  const saveAddress = () => {
    if (!isValid()) {
      alert("Please fill all fields");
      return;
    }

    let updated = [...addresses];

    if (form.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }

    if (form.id) {
      updated = updated.map((a) =>
        a.id === form.id ? { ...form } : a
      );
    } else {
      updated.push({
        ...form,
        id: crypto.randomUUID(),
        isDefault: updated.length === 0 || form.isDefault,
      });
    }

    saveToStorage(updated);
    resetForm();
  };

  const editAddress = (addr) => {
    setForm({ ...addr });
    setShowForm(true);
  };

  const deleteAddress = (id) => {
    let updated = addresses.filter((a) => a.id !== id);

    if (!updated.some((a) => a.isDefault) && updated.length > 0) {
      updated[0].isDefault = true;
    }

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
    setForm(emptyForm);
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

      {/* LIST */}
      {addresses.length === 0 ? (
        <div style={empty}>No saved addresses</div>
      ) : (
        addresses.map((addr) => (
          <div key={addr.id} style={card}>
            <div style={{ fontWeight: "600" }}>{addr.name}</div>
            <div style={text}>{addr.phone}</div>
            <div style={text}>{addr.county}</div>
            <div style={text}>{addr.subCounty}</div>
            <div style={text}>{addr.town}</div>
            <div style={text}>{addr.addressLine}</div>
            <div style={text}>{addr.postal}</div>

            {addr.isDefault && <div style={defaultTag}>Default</div>}

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

      {/* MODAL */}
      {showForm && (
        <div style={overlay} onClick={resetForm}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            
            <h3>{form.id ? "Edit Address" : "New Address"}</h3>

            <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="County" name="county" value={form.county} onChange={handleChange} />
            <Input label="Sub County" name="subCounty" value={form.subCounty} onChange={handleChange} />
            <Input label="Town" name="town" value={form.town} onChange={handleChange} />
            <Input label="Address Line" name="addressLine" value={form.addressLine} onChange={handleChange} />
            <Input label="Postal Code" name="postal" value={form.postal} onChange={handleChange} />

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

            <button onClick={saveAddress} style={btn}>
              {form.id ? "Update" : "Save"}
            </button>

            <button
              onClick={resetForm}
              style={{ ...btn, background: "#999", marginTop: 8 }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// INPUT
function Input({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={labelStyle}>{label}</label>
      <input name={name} value={value} onChange={onChange} style={input} />
    </div>
  );
}

// STYLES
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

const labelStyle = {
  fontSize: "13px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "4px",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

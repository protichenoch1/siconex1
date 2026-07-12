"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { locations } from "@/lib/locations";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    county: "",
    subCounty: "",
    town: "",
    address: "",
    postal: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Get selected county + sub counties
  const selectedCounty = locations.find(
    (c) => c.id == form.county
  );

  const subCounties = selectedCounty
    ? selectedCounty.subCounties
    : [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // ✅ Validation
    if (form.password !== form.confirmPassword) {
      return setErrorMsg("Passwords do not match");
    }

    if (!form.county || !form.subCounty || !form.town) {
      return setErrorMsg("Please complete your address");
    }

    setLoading(true);

    // ✅ Insert into Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          first_name: form.firstName,
          middle_name: form.middleName,
          last_name: form.lastName,
          phone_number: form.phone,
          email: form.email,
          password: form.password, // ⚠️ still plain (can upgrade later)

          county: selectedCounty?.name,
          sub_county: form.subCounty,
          town: form.town,
          address_line: form.address,
          postal_code: form.postal
        }
      ])
      .select()
      .single();

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // ✅ Save session
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("userUpdated"));

    // ✅ Redirect
    router.push("/account");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        
        <h2>Create Account</h2>
        <p className="subtitle">Fill in your details</p>

        {errorMsg && <p className="error">{errorMsg}</p>}

        {/* PERSONAL INFO */}
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="middleName" placeholder="Middle Name (optional)" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />

        {/* PASSWORD */}
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />

        {/* ADDRESS */}
        <h3>Address</h3>

        {/* COUNTY */}
        <select
          name="county"
          value={form.county}
          onChange={(e) =>
            setForm({
              ...form,
              county: e.target.value,
              subCounty: ""
            })
          }
          required
        >
          <option value="">Select County</option>
          {locations.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* SUB COUNTY */}
        <select
          name="subCounty"
          value={form.subCounty}
          onChange={handleChange}
          disabled={!form.county}
          required
        >
          <option value="">Select Sub County</option>
          {subCounties.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* TOWN */}
        <input
          name="town"
          placeholder="Town"
          onChange={handleChange}
          required
        />

        {/* ADDRESS LINE */}
        <input
          name="address"
          placeholder="Address Line"
          onChange={handleChange}
          required
        />

        {/* POSTAL */}
        <input
          name="postal"
          placeholder="Postal Code (optional)"
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "CREATE ACCOUNT"}
        </button>

        {/* FOOTER */}
        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link href="/auth/login" className="secondary-btn">
            LOGIN HERE
          </Link>
        </div>

      </form>
    </div>
  );
          }

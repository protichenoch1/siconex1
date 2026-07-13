"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (form.password !== form.confirmPassword) {
      return setErrorMsg("Passwords do not match");
    }

    if (!form.county || !form.subCounty || !form.town) {
      return setErrorMsg("Please complete your address");
    }

    setLoading(true);

    // ✅ 1. Insert user
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([
        {
          first_name: form.firstName,
          middle_name: form.middleName,
          last_name: form.lastName,
          phone_number: form.phone,
          email: form.email,
          password: form.password
        }
      ])
      .select()
      .single();

    if (userError) {
      setErrorMsg(userError.message);
      setLoading(false);
      return;
    }

    // ✅ 2. Insert address
    const { error: addressError } = await supabase
      .from("addresses")
      .insert([
        {
          user_id: user.id,
          full_name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          county: form.county,
          sub_county: form.subCounty,
          town: form.town,
          address_line: form.address,
          postal_code: form.postal
        }
      ]);

    if (addressError) {
      setErrorMsg(addressError.message);
      setLoading(false);
      return;
    }

    // ✅ 3. Save login session
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("userUpdated"));

    // ✅ 4. Redirect
    router.push("/account");
  };

  return (
    <form onSubmit={handleSignup} className="max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold">Create Account</h2>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="middleName" placeholder="Middle Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />

      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

      <hr />

      <h3 className="font-semibold">Address</h3>

      <input name="county" placeholder="County" onChange={handleChange} required />
      <input name="subCounty" placeholder="Sub County" onChange={handleChange} required />
      <input name="town" placeholder="Town" onChange={handleChange} required />
      <input name="address" placeholder="Address Line" onChange={handleChange} />
      <input name="postal" placeholder="Postal Code" onChange={handleChange} />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
    }

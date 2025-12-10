import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("tm_user") || "{}");

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [travelStyle, setTravelStyle] = useState(user.travelStyle || "");
  const [bio, setBio] = useState(user.bio || "");

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/auth/profile", {
        name,
        phone,
        travelStyle,
        bio,
      });

      localStorage.setItem("tm_user", JSON.stringify(res.data.user));
      alert("Profile updated!");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const logout = () => {
    localStorage.removeItem("tm_token");
    localStorage.removeItem("tm_user");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <main>
        <h1 className="page-title">My Profile</h1>

        <div className="profile-card">
          <form onSubmit={saveProfile}>

            <div className="form-row">
              <label>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="form-row">
              <label>Email</label>
              <input value={user.email} disabled />
            </div>

            <div className="form-row">
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />
            </div>

            <div className="form-row">
              <label>Travel Style</label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
              >
                <option value="">Select style</option>
                <option value="solo">Solo</option>
                <option value="family">Family</option>
                <option value="adventure">Adventure</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div className="form-row">
              <label>Bio / Travel Motto</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about your travel style..."
              ></textarea>
            </div>

            <button type="submit" className="btn-save-profile">
              Save Profile
            </button>
          </form>

          {/* 🔥 LOGOUT BUTTON ADDED HERE */}
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

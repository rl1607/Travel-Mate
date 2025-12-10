import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import TripCard from "../components/TripCard";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("tm_user") || "{}");

  useEffect(() => {
    API.get("/trips")
      .then((r) => setTrips(r.data))
      .catch(() => {});
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />

      <main>

        {/* HEADER SECTION */}
        <div
          className="dashboard-header"
          style={{
            background: "linear-gradient(90deg, #FF6A00, #FF2E71, #9A1CF4)",
            padding: "35px 40px",
            borderRadius: "20px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <div>
            <h1 style={{ fontSize: "36px", margin: "0", fontWeight: "700" }}>
              Welcome back, {user.name || "User"} 🌍
            </h1>
            <p style={{ opacity: 0.9, marginTop: "5px", fontSize: "16px" }}>
              Ready to plan your next adventure?
            </p>
          </div>

          <button
            className="btn-primary"
            style={{
              background: "white",
              color: "#FF2E71",
              padding: "12px 20px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0px 4px 12px rgba(255,50,90,0.25)",
            }}
            onClick={() => navigate("/CreateTrip")}
          >
            + New Trip
          </button>
        </div>

        {/* STATS SECTION */}
        <section className="cards" style={{ marginBottom: "40px" }}>
          <div className="stat-card colorful-card">
            <div className="stat-title">Total Trips</div>
            <div className="stat-num">{trips.length}</div>
          </div>

          <div className="stat-card colorful-card">
            <div className="stat-title">Upcoming</div>
            <div className="stat-num">0</div>
          </div>

          <div className="stat-card colorful-card">
            <div className="stat-title">Total Spent</div>
            <div className="stat-num">₹0</div>
          </div>

          <div className="stat-card colorful-card">
            <div className="stat-title">Budget Used</div>
            <div className="stat-num">0%</div>
          </div>
        </section>

        {/* CURRENTLY TRAVELING */}
        <section className="trip-list">
          <h2 style={{ marginBottom: "20px", fontSize: "26px" }}>
            Currently Traveling
          </h2>

          <div className="grid">
            {trips.length === 0 ? (
              <p style={{ color: "#888", fontSize: "16px" }}>
                No trips yet. Start planning your first adventure!
              </p>
            ) : (
              trips.map((t) => <TripCard key={t._id} trip={t} />)
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

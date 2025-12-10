import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import ItineraryTab from "../components/trip/ItineraryTab";
import ExpenseTab from "../components/trip/ExpenseTab";
import MediaTab from "../components/trip/MediaTab";
import MapTab from "../components/trip/MapTab";
import WeatherTab from "../components/trip/WeatherTab";


export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("itinerary");

  const fetchTrip = async () => {
    try {
      const res = await API.get(`/trips/${id}`);
      setTrip(res.data);
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Failed to load trip");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="loader" />
        </main>
      </div>
    );
  }

  if (!trip) return null;

  const daysUntil = () => {
    try {
      const now = new Date();
      const s = new Date(trip.startDate);
      const diff = Math.ceil((s - now) / (1000 * 60 * 60 * 24));
      return diff > 0 ? `${diff} days` : "Started";
    } catch {
      return "";
    }
  };

  const durationDays = () => {
    try {
      const s = new Date(trip.startDate);
      const e = new Date(trip.endDate);
      const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
      return diff >= 0 ? `${diff} days` : "-";
    } catch {
      return "-";
    }
  };

  const totalSpent = trip.expenses?.reduce((a, b) => a + Number(b.amount || 0), 0) || 0;
  const budget = trip.budget || 0;
  const usedPercent = budget ? ((totalSpent / budget) * 100).toFixed(0) : 0;

  return (
    <div className="app-shell">
      <Sidebar />

      <main style={{ paddingBottom: 60 }}>
        {/* Hero */}
        <div
          className="trip-hero"
          style={{
            background: trip.coverImage
              ? `url(${trip.coverImage}) center/cover`
              : "linear-gradient(135deg,#FF6A00 0%, #FF2E71 100%)",
          }}
        >
          <div className="trip-hero-overlay" />
          <div className="trip-hero-content">
            <div className="hero-left">
              <button className="btn-ghost small" onClick={() => navigate(-1)}>
                ← Back
              </button>
            </div>

            <div className="hero-mid">
              <div className="badge">{trip.purpose || "trip"}</div>
              <h1 className="hero-title">{trip.name}</h1>
              <div className="hero-sub">
                <span className="muted">{trip.destination}</span>
              </div>
              <div style={{ marginTop: 12 }}>
                <button
                  className="btn-ghost small"
                  style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
                  onClick={() => {
                    const lat = trip.location?.lat;
                    const lng = trip.location?.lng;
                    if (lat && lng) {
                      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
                    } else {
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.destination)}`, "_blank");
                    }
                  }}
                >
                  Open in Google Maps
                </button>
              </div>
            </div>

            <div className="hero-right">
              <button className="btn-primary" onClick={() => navigate("/CreateTrip")}>
                + New Trip
              </button>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="info-cards">
          <div className="info-card">
            <div className="info-title">Duration</div>
            <div className="info-value">{durationDays()}</div>
          </div>

          <div className="info-card">
            <div className="info-title">Starts in</div>
            <div className="info-value">{daysUntil()}</div>
          </div>

          <div className="info-card">
            <div className="info-title">Budget</div>
            <div className="info-value">₹{budget}</div>
          </div>

          <div className="info-card">
            <div className="info-title">Spent</div>
            <div className="info-value">₹{totalSpent}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-row">
          <div
            className={`tab ${activeTab === "itinerary" ? "active" : ""}`}
            onClick={() => setActiveTab("itinerary")}
          >
            Itinerary
          </div>
          <div
            className={`tab ${activeTab === "expenses" ? "active" : ""}`}
            onClick={() => setActiveTab("expenses")}
          >
            Expenses
          </div>
          <div
            className={`tab ${activeTab === "media" ? "active" : ""}`}
            onClick={() => setActiveTab("media")}
          >
            Media
          </div>
          <div
            className={`tab ${activeTab === "map" ? "active" : ""}`}
            onClick={() => setActiveTab("map")}
          >
            Map
          </div>
          <div
            className={`tab ${activeTab === "weather" ? "active" : ""}`}
            onClick={() => setActiveTab("weather")}
          >
            Weather
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "20px auto" }}>
          {activeTab === "itinerary" && (
            <ItineraryTab trip={trip} onSaved={fetchTrip} />
          )}

          {activeTab === "expenses" && (
            <ExpenseTab trip={trip} onSaved={fetchTrip} />
          )}

          {activeTab === "media" && (
            <MediaTab trip={trip} onSaved={fetchTrip} />
          )}

          {activeTab === "map" && (
          <MapTab trip={trip} onSaved={fetchTrip} /> 
        )}

          {activeTab === "weather" && (
        <WeatherTab destination={trip.destination} />
       )}

        </div>
      </main>
    </div>
  );
}

import React, { useState } from "react";
import API from "../../api/axios";

export default function ItineraryTab({ trip, onSaved }) {
  const [form, setForm] = useState({
    place: "",
    description: "",
    date: "",
    time: "",
    transport: "Car",
    cost: ""
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.post(`/trips/${trip._id}/itinerary`, form);
      setForm({ place: "", description: "", date: "", time: "", transport: "Car", cost: "" });
      if (onSaved) onSaved();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to save itinerary");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>New Activity</h3>
          <button className="btn-primary small" onClick={() => {document.getElementById("itinerary-place")?.focus();}}>
            + Add Activity
          </button>
        </div>

        <form onSubmit={submit} style={{ marginTop: 18 }}>
          <label>Place / Activity</label>
          <input id="itinerary-place" value={form.place} onChange={handleChange("place")} placeholder="e.g., Visit Eiffel Tower" />

          <label>Description</label>
          <textarea value={form.description} onChange={handleChange("description")} placeholder="Activity details..." />

          <div className="row" style={{ marginTop: 6 }}>
            <div style={{ flex: 1 }}>
              <label>Date</label>
              <input type="date" value={form.date} onChange={handleChange("date")} />
            </div>

            <div style={{ flex: 1 }}>
              <label>Time</label>
              <input type="time" value={form.time} onChange={handleChange("time")} />
            </div>
          </div>

          <div className="row" style={{ marginTop: 6 }}>
            <div style={{ flex: 1 }}>
              <label>Transport</label>
              <select value={form.transport} onChange={handleChange("transport")}>
                <option>Car</option>
                <option>Flight</option>
                <option>Train</option>
                <option>Bus</option>
                <option>Walk</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label>Estimated Cost</label>
              <input type="number" value={form.cost} onChange={handleChange("cost")} placeholder="Optional" />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
            <button type="button" className="btn-ghost" onClick={() => setForm({ place: "", description: "", date: "", time: "", transport: "Car", cost: "" })}>
              Cancel
            </button>
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add Activity"}
            </button>
          </div>
        </form>
      </div>

      {/* List existing itinerary */}
      <div style={{ marginTop: 20 }}>
        <h3>Itinerary</h3>
        {(!trip.itinerary || trip.itinerary.length === 0) ? (
          <div className="card" style={{ textAlign: "center", color: "#888" }}>
            No activities yet.
          </div>
        ) : (
          <div>
            {trip.itinerary.map((it, idx) => (
              <div key={idx} className="card" style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{it.place}</div>
                    <div className="muted">{it.description}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="muted">{it.date} {it.time}</div>
                    <div className="muted">{it.transport} • ₹{it.cost || 0}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import API from "../../api/axios";

const categories = ["Food & Drinks", "Transport", "Lodging", "Entertainment", "Other"];
const modes = ["Cash", "Card", "UPI", "Online"];

export default function ExpenseTab({ trip, onSaved }) {
  const [form, setForm] = useState({ category: categories[0], amount: "", date: "", mode: modes[0], description: "" });
  const [saving, setSaving] = useState(false);

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.post(`/trips/${trip._id}/expenses`, form);
      setForm({ category: categories[0], amount: "", date: "", mode: modes[0], description: "" });
      if (onSaved) onSaved();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to save expense");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>New Expense</h3>
          <button className="btn-primary small" onClick={() => document.getElementById("expense-amount")?.focus()}>
            + Add Expense
          </button>
        </div>

        <form onSubmit={submit} style={{ marginTop: 18 }}>
          <div className="row">
            <div style={{ flex: 1 }}>
              <label>Category</label>
              <select value={form.category} onChange={handle("category")}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label>Amount</label>
              <input id="expense-amount" type="number" value={form.amount} onChange={handle("amount")} />
            </div>
          </div>

          <div className="row" style={{ marginTop: 6 }}>
            <div style={{ flex: 1 }}>
              <label>Date</label>
              <input type="date" value={form.date} onChange={handle("date")} />
            </div>

            <div style={{ flex: 1 }}>
              <label>Payment Mode</label>
              <select value={form.mode} onChange={handle("mode")}>
                {modes.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <label style={{ marginTop: 8 }}>Description</label>
          <input value={form.description} onChange={handle("description")} placeholder="e.g., Lunch at beach restaurant" />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
            <button type="button" className="btn-ghost" onClick={() => setForm({ category: categories[0], amount: "", date: "", mode: modes[0], description: "" })}>
              Cancel
            </button>
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Expenses</h3>
        {(!trip.expenses || trip.expenses.length === 0) ? (
          <div className="card" style={{ textAlign: "center", color: "#888" }}>No expenses recorded.</div>
        ) : (
          <div>
            {trip.expenses.map((ex, i) => (
              <div key={i} className="card" style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{ex.category} • ₹{ex.amount}</div>
                    <div className="muted">{ex.description}</div>
                  </div>
                  <div className="muted">{ex.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import {
  Pie,
  Bar,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/trips/analytics/summary").then((r) => {
      setData(r.data);
    });
  }, []);

  if (!data)
    return (
      <div className="loading">
        <h2>Loading Analytics...</h2>
      </div>
    );

  return (
    <div className="app-shell">
      <Sidebar />
      <main>
        <h1 className="page-title">Travel Analytics</h1>

        {/* Top Stats */}
        <div className="analytics-grid">
          <div className="analytics-card orange">
            <p>Total Trips</p>
            <h2>{data.totalTrips}</h2>
          </div>

          <div className="analytics-card pink">
            <p>Total Spent</p>
            <h2>₹{data.totalSpent}</h2>
          </div>

          <div className="analytics-card purple">
            <p>Avg Trip Cost</p>
            <h2>₹{data.avgTripCost.toFixed(0)}</h2>
          </div>

          <div className="analytics-card blue">
            <p>Total Expenses</p>
            <h2>{data.totalExpensesCount}</h2>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-container">
          {/* Spending by Category */}
          <div className="chart-box">
            <h3>Spending by Category</h3>
            <Pie
              data={{
                labels: Object.keys(data.categoryCount),
                datasets: [
                  {
                    data: Object.values(data.categoryCount),
                    backgroundColor: ["#FF2E71", "#FF6A00", "#FFA500", "#00BFFF"],
                  },
                ],
              }}
            />
          </div>

          {/* Trips by Purpose */}
          <div className="chart-box">
            <h3>Trips by Purpose</h3>
            <Bar
              data={{
                labels: Object.keys(data.purposeCount),
                datasets: [
                  {
                    label: "Trips",
                    data: Object.values(data.purposeCount),
                    backgroundColor: "#FF6A00",
                  },
                ],
              }}
            />
          </div>

          {/* Monthly Spending Trend */}
          <div className="chart-box wide">
            <h3>Monthly Spending Trend</h3>
            <Bar
              data={{
                labels: Object.keys(data.monthlySpending),
                datasets: [
                  {
                    label: "Amount",
                    data: Object.values(data.monthlySpending),
                    backgroundColor: "#FF2E71",
                  },
                ],
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import API from "../../api/axios";

export default function MapTab({ trip, onSaved }) {
  const [map, setMap] = useState(null);

  // Initialize map
  useEffect(() => {
    if (!map) {
      const newMap = L.map("tripMap").setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(newMap);

      setMap(newMap);
    }
  }, []);

  // Render markers and route
  useEffect(() => {
    if (!map) return;

    // CLEAR OLD LAYERS
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    const routeList = trip.mapRoute || [];
    const polyPoints = [];

    // ADD MARKERS
    routeList.forEach((p, index) => {
      const marker = L.marker([p.lat, p.lng]).addTo(map);

      // CREATE REAL DOM ELEMENT FOR POPUP
      const popupDiv = document.createElement("div");
      popupDiv.innerHTML = `
        <b>${p.label}</b><br/>
      `;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.cssText = `
        margin-top: 6px;
        padding: 6px 10px;
        background: #ff2e71;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      `;

      popupDiv.appendChild(deleteBtn);

      marker.bindPopup(popupDiv);

      // DELETE CLICK HANDLER
      deleteBtn.addEventListener("click", async () => {
        await API.delete(`/trips/${trip._id}/map/${index}`);
        if (onSaved) onSaved();
      });

      polyPoints.push([p.lat, p.lng]);
    });

    // DRAW ROUTE
    if (polyPoints.length > 1) {
      L.polyline(polyPoints, { color: "red", weight: 4 }).addTo(map);
      map.fitBounds(polyPoints);
    } else if (polyPoints.length === 1) {
      map.setView(polyPoints[0], 12);
    }

    // ADD NEW POINT ON CLICK
    map.off("click");
    map.on("click", async (e) => {
      const { lat, lng } = e.latlng;

      await API.post(`/trips/${trip._id}/map`, {
        lat,
        lng,
        label: "Route Point",
      });

      if (onSaved) onSaved();
    });
  }, [map, trip]);

  return (
    <div style={{ height: "500px", borderRadius: 12, overflow: "hidden" }}>
      <h3 style={{ marginBottom: 10 }}>Click to add route points — tap marker to delete</h3>
      <div id="tripMap" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

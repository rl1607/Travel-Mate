import React from "react";
import { useNavigate } from "react-router-dom";

export default function TripCard({ trip }) {
  const navigate = useNavigate();

  return (
    <div
      className="trip-card"
      onClick={() => navigate(`/trip/${trip._id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* Cover Image / Gradient */}
     <div
        className="cover"
        style={{
          background: trip.coverImage
            ? `url(http://localhost:5000${trip.coverImage}) center/cover no-repeat`
          : "linear-gradient(135deg,#FF6A00,#FF2E71)"
  }}
/>


      {/* Trip Info */}
      <div className="trip-body">
        <h3>{trip.name || "My Trip"}</h3>

        <p className="muted">{trip.destination || "Unknown Destination"}</p>

        <p className="muted">
          {trip.startDate
            ? new Date(trip.startDate).toLocaleDateString()
            : ""}
          {" - "}
          {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : ""}
        </p>

        <p>
          <strong>Budget:</strong>  ₹{trip.budget || 0}
        </p>
      </div>
    </div>
  );
}



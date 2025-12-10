import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="logo">TravelMate</div>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/Trips">Trips</NavLink>
        <NavLink to="/CreateTrip">Add</NavLink>
        <NavLink to="/Analytics">Analytics</NavLink>
        <NavLink to="/Profile">Profile</NavLink>
      </nav>
    </aside>
  )
}

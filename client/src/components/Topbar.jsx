import React from 'react';
export default function Topbar({title}) {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      <div className="top-actions">
        <button className="btn-ghost">+ New Trip</button>
      </div>
    </header>
  )
}

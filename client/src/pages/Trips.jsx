import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import API from '../api/axios';
import TripCard from '../components/TripCard';

export default function Trips(){
  const [trips,setTrips]=useState([]);
  useEffect(()=>{ API.get('/trips').then(r=>setTrips(r.data)).catch(()=>{}); },[]);
  return (
    <div className="app-shell">
      <Sidebar/>
      <main>
        <Topbar title="My Trips"/>
        <div className="content">
          <div className="grid">
            {trips.map(t=> <TripCard key={t._id} trip={t} />)}
          </div>
        </div>
      </main>
    </div>
  )
}

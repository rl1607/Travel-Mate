import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Trips from './pages/Trips';
import CreateTrip from './pages/CreateTrip';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styles/globals.css';
import TripDetails from "./pages/TripDetails";

function App(){
  const token = localStorage.getItem('tm_token');
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={ token ? <Dashboard/> : <Navigate to='/login'/> }/>
      <Route path='/Trips' element={ token ? <Trips/> : <Navigate to='/login'/> }/>
      <Route path="/trip/:id" element={ token ? <TripDetails/> : <Navigate to="/login"/> }/>
      <Route path='/CreateTrip' element={ token ? <CreateTrip/> : <Navigate to='/login'/> }/>
      <Route path='/Analytics' element={ token ? <Analytics/> : <Navigate to='/login'/> }/>
      <Route path='/Profile' element={ token ? <Profile/> : <Navigate to='/login'/> }/>
    </Routes>
  );
}
export default App;

import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateTrip(){
  const [form,setForm]=useState({name:'',destination:'',startDate:'',endDate:'',purpose:'Vacation',budget:1000,notes:''});
  const [cover,setCover]=useState(null);
  const navigate = useNavigate();
  const submit = async e=>{ e.preventDefault();
    try{
      const data = new FormData();
      Object.keys(form).forEach(k=>data.append(k, form[k]));
      if(cover) data.append('cover', cover);
      await API.post('/trips', data);
      navigate('/Trips');
    }catch(e){
      alert('Error creating trip');
    }
  };
  return (
    <div className="app-shell">
      <Sidebar/>
      <main>
        <Topbar title="Create New Trip"/>
        <div className="content">
          <form className="card form-card" onSubmit={submit}>
            <label>Trip Name</label>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <label>Destination</label>
            <input value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} />
            <div className="row">
              <div>
                <label>Start Date</label>
                <input type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
              </div>
              <div>
                <label>End Date</label>
                <input type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/>
              </div>
            </div>
            <label>Purpose</label>
            <select value={form.purpose} onChange={e=>setForm({...form,purpose:e.target.value})}>
              <option>Vacation</option><option>Adventure</option><option>Business</option>
            </select>
            <label>Budget</label>
            <input type="number" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/>
            <label>Cover Image</label>
            <input type="file" onChange={e=>setCover(e.target.files[0])}/>
            <label>Notes</label>
            <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
            <div className="actions">
              <button type="button" className="btn-ghost" onClick={()=>navigate(-1)}>Cancel</button>
              <button className="btn-primary" type="submit">Create Trip</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

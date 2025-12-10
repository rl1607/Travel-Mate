import React, {useState} from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
export default function Signup(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const navigate = useNavigate();
  const submit = async e=>{ e.preventDefault();
    try{
      const res = await API.post('/auth/register',{name,email,password});
      localStorage.setItem('tm_token', res.data.token);
      localStorage.setItem('tm_user', JSON.stringify(res.data.user));
      navigate('/login');
    }catch(e){
      alert(e.response?.data?.message || 'Error');
    }
  };
  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <h2>Create account</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"/>
        <button className="btn-primary">Sign up</button>
      </form>
    </div>
  )
}

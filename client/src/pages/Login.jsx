import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });

      localStorage.setItem('tm_token', res.data.token);
      localStorage.setItem('tm_user', JSON.stringify(res.data.user));

      navigate('/');
    } catch (e) {
      alert(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <h2>Welcome to TravelMate</h2>

        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />

        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          type="password" 
        />

        <button className="btn-primary" type="submit">
          Sign In
        </button>

        {/* NEW USER - SIGNUP BUTTON */}
        <p style={{ marginTop: "15px", color: "#555" }}>
          New user?{" "}
          <span 
            onClick={() => navigate('/signup')}
            style={{ color: "var(--grad2)", cursor: "pointer", fontWeight: 600 }}
          >
            Create an account
          </span>
        </p>
        
      </form>
    </div>
  );
}

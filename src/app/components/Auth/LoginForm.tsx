'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import  {login}  from '../../redux/features/auth/authSlice'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
  
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (res.data.message === "Login successful") {
        
        dispatch(login({ email }));
        

        router.push('/dashboard');
      }
    } catch (err: any) {
      setError("Invalid Email ya Password!");
      console.error(err);
    }
  };

  return (

    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <input 
        type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2.5 border rounded-lg outline-none" required 
      />
      <input 
        type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2.5 border rounded-lg outline-none" required 
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2.5 rounded-lg font-bold">
        Sign In
      </button>
    </form>
  );
}
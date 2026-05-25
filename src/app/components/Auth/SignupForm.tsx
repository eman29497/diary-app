'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/auth/authSlice'; 
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: email }));

    alert('Account created and logged in successfully!');
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
    
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-lg outline-none"
          placeholder="Your Name"
          required
        />
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-lg outline-none"
          placeholder="name@example.com"
          required
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-lg outline-none"
          placeholder="Type Password Here..."
          required
        />
      </div>

      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg font-bold">
        Sign Up
      </button>
    </form>
  );
}
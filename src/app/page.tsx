'use client'
import { useState } from 'react';
import SignupForm from "./components/Auth/SignupForm";
import LoginForm from "./components/Auth/LoginForm";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        
        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="text-center mt-6 text-sm">
          <p>{isLogin ? "Don't have an account? " : "Already have an account? "}</p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
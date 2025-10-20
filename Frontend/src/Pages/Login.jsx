 import React, { useState } from 'react';
import assets from '../assets/assets';  

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 
  const handleSumbit = (e) => {
    e.preventDefault()
    console.log("User Register completed : " , email, password, name);
  }

  return (
    <div className="w-full h-screen flex">
      {/* Left Side - Login/Register Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-12 md:px-24 bg-white">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p className="text-gray-600 mb-8">
          {isLogin
            ? 'Login to access your account and explore amazing products.'
            : 'Register to start your journey with us and enjoy amazing products.'}
        </p>

        <form onSubmit={handleSumbit} className="w-full flex flex-col gap-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-gray-500">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src={assets.Login_Image} // replace with your image
          alt="Auth Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;

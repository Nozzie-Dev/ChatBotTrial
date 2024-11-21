import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', formData);
      setMessage('Registration successful!');
      setError('');
      navigate('/login'); 
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="relative w-full max-w-md bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">SIGN UP</h1>
        <p className="text-gray-600 text-center mt-2">Create an account to get started.</p>

        <div className="flex items-center my-4">
          <span className="border-t border-gray-300 flex-grow"></span>
          <span className="px-3 text-gray-400">Or</span>
          <span className="border-t border-gray-300 flex-grow"></span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
          <button type="submit" className="w-full py-2 bg-black text-white rounded">Register</button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-purple-500 hover:underline">Log in</a>
        </p>

        {message && <div className="mt-4 p-2 bg-green-500 text-white text-center rounded">{message}</div>}
        {error && <div className="mt-4 p-2 bg-red-500 text-white text-center rounded">{error}</div>}
      </div>
    </div>
  );
};

export default SignUp;

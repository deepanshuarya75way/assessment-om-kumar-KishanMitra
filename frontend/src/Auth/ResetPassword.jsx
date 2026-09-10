import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');
    if (token && emailParam) {
      setResetToken(token);
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/reset-password', { email, resetToken, newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data.message || 'Error resetting password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-[420px] sm:mx-auto mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Reset Password</h1>
            </div>
            <form onSubmit={handleReset}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5
                      peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="resetToken"
                      name="resetToken"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                      placeholder="Reset Token"
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                    />
                    <label
                      htmlFor="resetToken"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5
                      peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Reset Token
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label
                      htmlFor="newPassword"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5
                      peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      New Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-cyan-500 text-white rounded-md px-4 py-2 w-full hover:bg-cyan-600 transition"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {message && <p className="text-center text-red-500">{message}</p>}
            <div className="text-center">
              <p className="text-gray-600 font-serif">
                <Link to="/auth/login" className="text-blue-400">
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
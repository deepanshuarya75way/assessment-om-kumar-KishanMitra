import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(''); // For OTP input
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('login'); // 'login' or 'verify'
  const navigate = useNavigate();
  const location = useLocation();

  // Check for verification success
  useEffect(() => {
    if (location.search.includes('verified=true')) {
      setMessage('Email verified successfully! Please log in.');
      setStep('login'); // Reset to login step
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        setMessage('Login successful');
        setTimeout(() => navigate('/'), 1000); // Slight delay for UX
      }
    } catch (err) {
      const errMsg = err.response?.data.message || 'Error logging in';
      setMessage(errMsg);
      if (errMsg === 'Email not verified. Check your email for verification code.') {
        setStep('verify'); // Move to OTP verification step
      }
      console.log('Login error:', errMsg); // Frontend debug
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/verify-otp`, { email, otp });
      setMessage(res.data.message);
      // Retry login after verification
      const loginRes = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
      localStorage.setItem('token', loginRes.data.token);
      setMessage('Login successful');
      setTimeout(() => navigate('/'), 1000); // Redirect after login
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error verifying OTP');
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setMessage('Please enter your email to resend verification.');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/api/resend-verification`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data.message || 'Error resending verification');
    }
  };

  const handleGoogleLogin = () => {
    setMessage('Google login not implemented yet');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-[420px] sm:mx-auto mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <form onSubmit={step === 'login' ? handleLogin : handleVerify}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {step === 'login' ? (
                    <>
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
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Email Address
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="password"
                          name="password"
                          type="password"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <button
                          type="submit"
                          className="bg-cyan-500 text-white rounded-md px-4 py-2 w-full hover:bg-cyan-600 transition"
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="otp"
                        name="otp"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <label
                        htmlFor="otp"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Verification Code
                      </label>
                      <div className="relative mt-4">
                        <button
                          type="submit"
                          className="bg-cyan-500 text-white rounded-md px-4 py-2 w-full hover:bg-cyan-600 transition"
                        >
                          Verify OTP
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleResendVerification}
                        className="mt-2 text-green-500 underline w-full text-center"
                      >
                        Resend Code
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
            {message && (
              <p className={`text-center mt-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
            <div className="text-center mt-4">
              <p className="text-gray-600 font-serif">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-blue-400">
                  Signup
                </Link>
              </p>
              <p className="text-gray-600 font-serif">
                <Link to="/auth/forgot-password" className="text-blue-400">
                  Forgot Password?
                </Link>
              </p>
            </div>
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(-401.000000, -860.000000)">
                      <g transform="translate(401.000000, 860.000000)">
                        <path
                          d="M9.827 24c0-1.524.253-2.985.705-4.356l-7.909-6.04C1.082 16.734.214 20.26.214 24c0 3.737.868 7.261 2.407 10.388l7.905-6.051A13.957 13.957 0 0 1 9.827 24"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.093l6.836-6.827C35.036 2.773 29.695.533 23.714.533c-9.287 0-17.269 5.311-21.091 13.071l7.909 6.04c1.822-5.532 7.017-9.542 13.182-9.542"
                          fill="#EB4335"
                        ></path>
                        <path
                          d="M23.714 37.867c-6.165 0-11.36-4.979-13.182-10.631l-7.909 6.039c4.822 7.761 12.804 13.071 21.091 13.071 5.732 0 11.204-2.435 15.312-6.248l-7.507-5.804c-2.118 1.335-4.785 2.053-7.805 2.053"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714V28.8h12.604c-.63 3.091-2.345 5.468-4.8 7.015l7.507 5.804c4.315-3.804 7.121-9.768 7.121-17.619"
                          fill="#4285F4"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
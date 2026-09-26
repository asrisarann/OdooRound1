import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';

// Default initial user for demonstration if none exists in localStorage
const DEFAULT_USERS = [
  {
    loginId: 'admin123',
    email: 'admin@example.com',
    password: 'Password@123'
  }
];

export default function App() {
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'forgot' | 'dashboard'
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('app_users_db');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });
  const [currentUser, setCurrentUser] = useState(null);

  // Save users into localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('app_users_db', JSON.stringify(users));
  }, [users]);

  // Login form state
  const [loginForm, setLoginForm] = useState({ loginId: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    loginId: '',
    email: '',
    password: '',
    rePassword: ''
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState('');

  // Forgot Password form state
  const [forgotInput, setForgotInput] = useState('');
  const [forgotMsg, setForgotMsg] = useState(null);

  // --- Validation Logic as per Requirements ---
  const validateSignup = () => {
    const errs = {};
    const { loginId, email, password, rePassword } = signupForm;

    // 1. Login ID: unique and 6-12 characters
    if (!loginId) {
      errs.loginId = 'Login ID is required';
    } else if (loginId.length < 6 || loginId.length > 12) {
      errs.loginId = 'Login ID must be between 6-12 characters';
    } else if (users.some((u) => u.loginId.toLowerCase() === loginId.toLowerCase())) {
      errs.loginId = 'Login ID already exists';
    }

    // 2. Email ID: valid email format & not a duplicate in database
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errs.email = 'Email ID is required';
    } else if (!emailRegex.test(email)) {
      errs.email = 'Please enter a valid Email ID';
    } else if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      errs.email = 'Email ID is already registered';
    }

    // 3. Password: unique, > 8 characters, contains lowercase, uppercase, special character
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length <= 8) {
      errs.password = 'Password length must be more than 8 characters';
    } else if (!hasLowerCase || !hasUpperCase || !hasSpecialChar) {
      errs.password = 'Must contain lowercase, uppercase, and a special character';
    }

    // 4. Re-Enter Password match
    if (!rePassword) {
      errs.rePassword = 'Please re-enter password';
    } else if (password !== rePassword) {
      errs.rePassword = 'Passwords do not match';
    }

    setSignupErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // --- Handlers ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    const trimmedId = loginForm.loginId.trim();
    const userMatch = users.find(
      (u) =>
        (u.loginId.toLowerCase() === trimmedId.toLowerCase() ||
          u.email.toLowerCase() === trimmedId.toLowerCase()) &&
        u.password === loginForm.password
    );

    if (userMatch) {
      setLoginSuccess('Login successful!');
      setCurrentUser(userMatch);
      setTimeout(() => {
        setView('dashboard');
        setLoginSuccess('');
      }, 700);
    } else {
      setLoginError('Invalid Login Id or Password');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupSuccess('');

    if (!validateSignup()) {
      return;
    }

    const newUser = {
      loginId: signupForm.loginId.trim(),
      email: signupForm.email.trim(),
      password: signupForm.password
    };

    setUsers((prev) => [...prev, newUser]);
    setSignupSuccess('Account created successfully! Redirecting to Sign In...');

    setTimeout(() => {
      setLoginForm({ loginId: newUser.loginId, password: '' });
      setSignupForm({ loginId: '', email: '', password: '', rePassword: '' });
      setSignupErrors({});
      setSignupSuccess('');
      setView('login');
    }, 1500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    const query = forgotInput.trim().toLowerCase();
    const found = users.find((u) => u.loginId.toLowerCase() === query || u.email.toLowerCase() === query);

    if (found) {
      setForgotMsg({
        type: 'success',
        text: `Password reset link sent to ${found.email} (Demo Password: ${found.password})`
      });
    } else {
      setForgotMsg({
        type: 'error',
        text: 'No account found with this Login ID or Email'
      });
    }
  };

  // --- Render Dashboard when logged in ---
  if (view === 'dashboard' && currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full text-center border border-gray-300/60 rounded-2xl px-8 py-10 bg-white shadow-sm">
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto object-contain" />
          <h1 className="text-gray-900 text-2xl mt-4 font-semibold">Welcome, {currentUser.loginId}!</h1>
          <p className="text-gray-500 text-sm mt-1">{currentUser.email}</p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            ✓ Successfully authenticated into the application.
          </div>
          <button
            type="button"
            onClick={() => {
              setCurrentUser(null);
              setView('login');
            }}
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 py-8">
      {/* -------------------- SIGN IN PAGE -------------------- */}
      {view === 'login' && (
        <form
          onSubmit={handleLoginSubmit}
          className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-sm"
        >
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mt-8 object-contain" />
          <h1 className="text-gray-900 text-3xl mt-4 font-medium">Sign In</h1>
          <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

          {loginError && (
            <div className="mt-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
              {loginError}
            </div>
          )}

          {loginSuccess && (
            <div className="mt-4 p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-600 text-xs font-medium text-center">
              {loginSuccess}
            </div>
          )}

          {/* Login ID field */}
          <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="Login Id"
              value={loginForm.loginId}
              onChange={(e) => {
                setLoginForm({ ...loginForm, loginId: e.target.value });
                if (loginError) setLoginError('');
              }}
              className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full pr-4"
              required
            />
          </div>

          {/* Password field */}
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm({ ...loginForm, password: e.target.value });
                if (loginError) setLoginError('');
              }}
              className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full pr-4"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity font-medium"
          >
            SIGN IN
          </button>

          <p className="text-gray-500 text-sm mt-4 mb-8">
            <button
              type="button"
              onClick={() => {
                setForgotMsg(null);
                setView('forgot');
              }}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Forget Password ?
            </button>
            {' | '}
            <button
              type="button"
              onClick={() => {
                setSignupErrors({});
                setSignupSuccess('');
                setView('signup');
              }}
              className="text-indigo-500 font-medium hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </form>
      )}

      {/* -------------------- SIGN UP PAGE -------------------- */}
      {view === 'signup' && (
        <form
          onSubmit={handleSignupSubmit}
          noValidate
          className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-sm"
        >
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mt-8 object-contain" />
          <h1 className="text-gray-900 text-3xl mt-4 font-medium">Sign Up</h1>
          <p className="text-gray-500 text-sm mt-2">Create an account to get started</p>

          {signupSuccess && (
            <div className="mt-4 p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-600 text-xs font-medium text-center">
              {signupSuccess}
            </div>
          )}

          {/* 1. Enter Login Id */}
          <div className="mt-6">
            <div
              className={`flex items-center w-full bg-white border ${
                signupErrors.loginId ? 'border-red-400' : 'border-gray-300/80'
              } h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                placeholder="Enter Login Id"
                value={signupForm.loginId}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, loginId: e.target.value });
                  if (signupErrors.loginId) setSignupErrors({ ...signupErrors, loginId: null });
                }}
                className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full pr-4"
                required
              />
            </div>
            {signupErrors.loginId && (
              <p className="text-red-500 text-xs text-left mt-1 pl-4">{signupErrors.loginId}</p>
            )}
          </div>

          {/* 2. Enter Email Id */}
          <div className="mt-4">
            <div
              className={`flex items-center w-full bg-white border ${
                signupErrors.email ? 'border-red-400' : 'border-gray-300/80'
              } h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500`}
            >
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
              </svg>
              <input
                type="email"
                placeholder="Enter Email Id"
                value={signupForm.email}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, email: e.target.value });
                  if (signupErrors.email) setSignupErrors({ ...signupErrors, email: null });
                }}
                className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full pr-4"
                required
              />
            </div>
            {signupErrors.email && (
              <p className="text-red-500 text-xs text-left mt-1 pl-4">{signupErrors.email}</p>
            )}
          </div>

          {/* 3. Enter Password */}
          <div className="mt-4">
            <div
              className={`flex items-center w-full bg-white border ${
                signupErrors.password ? 'border-red-400' : 'border-gray-300/80'
              } h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500`}
            >
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
              </svg>
              <input
                type="password"
                placeholder="Enter Password"
                value={signupForm.password}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, password: e.target.value });
                  if (signupErrors.password) setSignupErrors({ ...signupErrors, password: null });
                }}
                className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full pr-4"
                required
              />
            </div>
            {signupErrors.password && (
              <p className="text-red-500 text-xs text-left mt-1 pl-4 leading-tight">{signupErrors.password}</p>
            )}
          </div>

          {/* 4. Re-Enter Password */}
          <div className="mt-4">
            <div
              className={`flex items-center w-full bg-white border ${
                signupErrors.rePassword ? 'border-red-400' : 'border-gray-300/80'
              } h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <input
                type="password"
                placeholder="Re-Enter Password"
                value={signupForm.rePassword}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, rePassword: e.target.value });
                  if (signupErrors.rePassword) setSignupErrors({ ...signupErrors, rePassword: null });
                }}
                className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full pr-4"
                required
              />
            </div>
            {signupErrors.rePassword && (
              <p className="text-red-500 text-xs text-left mt-1 pl-4">{signupErrors.rePassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity font-medium"
          >
            SIGN UP
          </button>

          <p className="text-gray-500 text-sm mt-4 mb-8">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setLoginError('');
                setLoginSuccess('');
                setView('login');
              }}
              className="text-indigo-500 font-medium hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </form>
      )}

      {/* -------------------- FORGOT PASSWORD PAGE -------------------- */}
      {view === 'forgot' && (
        <form
          onSubmit={handleForgotSubmit}
          className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-sm"
        >
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mt-8 object-contain" />
          <h1 className="text-gray-900 text-2xl mt-4 font-medium">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-2">Enter your Login Id or Email to recover</p>

          {forgotMsg && (
            <div
              className={`mt-4 p-2.5 rounded-xl border text-xs font-medium text-center ${
                forgotMsg.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-600'
              }`}
            >
              {forgotMsg.text}
            </div>
          )}

          <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="Login ID or Email"
              value={forgotInput}
              onChange={(e) => setForgotInput(e.target.value)}
              className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full pr-4"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity font-medium"
          >
            SEND RESET LINK
          </button>

          <p className="text-gray-500 text-sm mt-4 mb-8">
            Remembered your password?{' '}
            <button
              type="button"
              onClick={() => {
                setForgotMsg(null);
                setView('login');
              }}
              className="text-indigo-500 font-medium hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

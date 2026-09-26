import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    sessionStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 1.5rem',
      position: 'relative',
      backgroundColor: '#ffffff'
    }}>
      {/* Background Geometric Line & Circle Canvas */}
      <svg 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
        viewBox="0 0 1440 720" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path stroke="#E2E8F0" strokeOpacity="0.75" d="M-15.227 702.342H1439.7" />
        <circle cx="711.819" cy="372.562" r="308.334" stroke="#E2E8F0" strokeOpacity="0.75" />
        <circle cx="16.942" cy="20.834" r="308.334" stroke="#E2E8F0" strokeOpacity="0.75" />
        <path stroke="#E2E8F0" strokeOpacity="0.75" d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7" />
        <circle cx="782.595" cy="411.166" r="308.334" stroke="#E2E8F0" strokeOpacity="0.75" />
      </svg>

      {/* Login Card Form */}
      <form 
        onSubmit={handleLogin}
        style={{
          maxWidth: '384px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(209, 213, 219, 0.6)',
          borderRadius: '1rem',
          padding: '0 2rem',
          backgroundColor: '#ffffff',
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={logo} 
            alt="StockSense Logo" 
            style={{ 
              width: '44px', 
              height: '44px', 
              objectFit: 'contain' 
            }} 
          />
        </div>

        <h1 style={{
          color: '#111827',
          fontSize: '1.875rem',
          marginTop: '1rem',
          fontWeight: 500,
          letterSpacing: '-0.02em'
        }}>
          Login
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem',
          marginTop: '0.5rem'
        }}>
          Please sign in to continue
        </p>

        {/* Email Field */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginTop: '2rem',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(209, 213, 219, 0.8)',
          height: '3rem',
          borderRadius: '9999px',
          overflow: 'hidden',
          paddingLeft: '1.5rem',
          gap: '0.5rem'
        }}>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
          </svg>
          <input 
            type="email" 
            placeholder="Email id" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              background: 'transparent',
              color: '#374151',
              outline: 'none',
              fontSize: '0.875rem',
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            required 
          />
        </div>

        {/* Password Field */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '1rem',
          width: '100%',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(209, 213, 219, 0.8)',
          height: '3rem',
          borderRadius: '9999px',
          overflow: 'hidden',
          paddingLeft: '1.5rem',
          gap: '0.5rem'
        }}>
          <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
          </svg>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: 'transparent',
              color: '#374151',
              outline: 'none',
              fontSize: '0.875rem',
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            required 
          />
        </div>

        {/* Forgot password */}
        <div style={{
          marginTop: '1.25rem',
          textAlign: 'left'
        }}>
          <a 
            href="#forgot" 
            onClick={(e) => { e.preventDefault(); alert('Password reset requested.'); }}
            style={{
              fontSize: '0.875rem',
              color: '#6366f1'
            }}
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '2.75rem',
            borderRadius: '9999px',
            color: '#ffffff',
            backgroundColor: '#6366f1',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            boxShadow: '0 2px 6px rgba(99, 102, 241, 0.3)'
          }}
        >
          Login
        </button>

        {/* Sign up link */}
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem',
          marginTop: '0.75rem',
          marginBottom: '2.75rem'
        }}>
          Don’t have an account?{' '}
          <Link 
            to="/signup" 
            style={{
              color: '#6366f1',
              fontWeight: 500
            }}
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

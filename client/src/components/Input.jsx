import React, { useState } from 'react';

/**
 * Reusable Input component with optional label, icons, password visibility toggle, and error states.
 * @param {Object} props
 */
export default function Input({
  label,
  id,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  leftIcon,
  required = false,
  className = '',
  autoComplete,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id || name} className="form-label">
          {label} {required && <span style={{ color: 'var(--color-primary)' }}>*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
        
        <input
          id={id || name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          className={`form-input ${leftIcon ? 'has-left-icon' : ''} ${isPassword ? 'has-right-icon' : ''} ${
            error ? 'is-error' : ''
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="input-icon-right"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="form-error">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

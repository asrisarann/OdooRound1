import React from 'react';

/**
 * Reusable Button component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary']
 * @param {boolean} [props.fullWidth=false]
 * @param {boolean} [props.loading=false]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 */
export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const variantClass = `btn-${variant}`;
  const fullWidthClass = fullWidth ? 'btn-full' : '';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${fullWidthClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

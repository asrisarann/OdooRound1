import React from 'react';

/**
 * Reusable Logo component
 * @param {Object} props
 * @param {string} [props.title='AuraStack']
 * @param {string} [props.logoSrc='/logo.png']
 * @param {string} [props.className='']
 */
export default function Logo({ title = 'AuraStack', logoSrc = '/logo.png', className = '' }) {
  return (
    <div className={`logo-container ${className}`}>
      <div className="logo-icon-wrapper">
        <img
          src={logoSrc}
          alt={`${title} Logo`}
          className="logo-image"
          onError={(e) => {
            // Fallback gradient emblem if image isn't loaded
            e.target.style.display = 'none';
          }}
        />
      </div>
      <span className="logo-brand-text">{title}</span>
    </div>
  );
}

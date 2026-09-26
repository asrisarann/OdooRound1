import React from 'react';
import Logo from '../components/Logo';

/**
 * AuthLayout - Modern split screen authentication layout with backdrop glow
 */
export default function AuthLayout({
  children,
  title,
  subtitle,
  heroTitle = 'Build faster with intelligent automation.',
  heroDescription = 'Experience seamless workflow automation, real-time insights, and next-gen developer tools crafted for modern scale.',
  features = [
    { title: 'End-to-end encryption & security' },
    { title: 'Lightning fast state-of-the-art infrastructure' },
    { title: 'Automated analytics & smart reporting' }
  ]
}) {
  return (
    <div className="auth-wrapper">
      {/* Background Animated Glows */}
      <div className="bg-glow-container">
        <div className="bg-glow-1" />
        <div className="bg-glow-2" />
        <div className="bg-glow-3" />
      </div>

      <div className="auth-container">
        {/* Left pane: Hero branding */}
        <div className="auth-hero-pane">
          <div>
            <Logo />
            <div className="hero-content">
              <div className="hero-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Next Generation Platform
              </div>
              <h1 className="hero-title">{heroTitle}</h1>
              <p className="hero-description">{heroDescription}</p>

              <div className="hero-features">
                {features.map((feature, idx) => (
                  <div key={idx} className="hero-feature-item">
                    <div className="hero-feature-icon">✓</div>
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-footer">
            <span>© {new Date().getFullYear()} AuraStack Inc.</span>
            <span>Privacy & Terms</span>
          </div>
        </div>

        {/* Right pane: Auth Form */}
        <div className="auth-form-pane">
          <div className="auth-header">
            {title && <h2 className="auth-title">{title}</h2>}
            {subtitle && <div className="auth-subtitle">{subtitle}</div>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

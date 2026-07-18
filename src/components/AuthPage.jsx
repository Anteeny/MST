import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import './AuthPage.css';

export default function AuthPage({ defaultMode = 'signin' }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect path if present (e.g. from query params)
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirectTo') || '/dashboard';

  // Decide whether we are in signin or register mode based on props or URL path
  const isRegisterMode = location.pathname.includes('/register') || defaultMode === 'register';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Check if session already exists, if so redirect
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate(redirectTo);
      }
    };
    checkUser();
  }, [navigate, redirectTo]);

  // Clear messages and input values when toggling between sign-in and register modes
  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
    setEmail('');
    setPassword('');
    setFullName('');
  }, [location.pathname]);

  const getFriendlyErrorMessage = (error) => {
    if (!error) return '';

    if (error.message?.includes('provider is not enabled')) {
      return 'Google sign-in is not enabled for this Supabase project. Enable the Google provider in Supabase Auth > Providers and add your Google OAuth credentials.';
    }

    return error.message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (isRegisterMode) {
      // Register logic
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        // Supabase sends a confirmation email by default unless disabled.
        // We show a helpful message and still redirect if auto-confirmed.
        if (data?.session) {
          navigate(redirectTo);
        } else {
          setSuccessMsg('Registration successful! Please check your email to verify your account.');
          // Clear inputs
          setEmail('');
          setPassword('');
          setFullName('');
        }
      }
    } else {
      // Sign In logic
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        navigate(redirectTo);
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) {
      setErrorMsg(getFriendlyErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">
            {isRegisterMode ? 'Create your account' : 'Sign in to your account'}
          </h1>
          <p className="auth-subtitle">
            {isRegisterMode ? 'Start learning from our top faculties today' : 'Welcome back! Please enter your details'}
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="auth-alert warning">
            <strong>Supabase is not configured yet.</strong><br />
            If you are running in production on Vercel, please make sure you set the
            <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> environment variables in your Vercel Project Settings.
          </div>
        )}

        {errorMsg && <div className="auth-alert error">{errorMsg}</div>}
        {successMsg && <div className="auth-alert success">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required={isRegisterMode}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : isRegisterMode ? 'Register' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline google-signin-btn"
          disabled={loading}
        >
          <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="#EA4335"
              d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.76 14.95 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.05 7.14 8.8 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.25c0-.82-.07-1.6-.22-2.35H12v4.5h6.48c-.28 1.48-1.12 2.73-2.38 3.58l3.68 2.85c2.15-1.98 3.72-4.9 3.72-8.58z"
            />
            <path
              fill="#FBBC05"
              d="M5.1 14.8c-.25-.75-.4-1.55-.4-2.4s.15-1.65.4-2.4L1.5 7.2C.55 9.1 0 11.25 0 13.5s.55 4.4 1.5 6.3l3.6-3z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.68-2.85c-1.02.68-2.33 1.1-4.28 1.1-3.2 0-5.95-2.1-6.9-5.26l-3.6 2.8C3.4 19.35 7.35 23 12 23z"
            />
          </svg>
          {isRegisterMode ? 'Sign up with Google' : 'Sign in with Google'}
        </button>

        <div className="auth-footer">
          {isRegisterMode ? (
            <p>
              Already have an account?{' '}
              <Link to="/sign-in" className="auth-link">
                Click here to sign in
              </Link>
            </p>
          ) : (
            <p>
              New to MST?{' '}
              <Link to="/register" className="auth-link">
                Click here to create new account
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

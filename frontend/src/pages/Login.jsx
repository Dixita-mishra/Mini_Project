import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdPersonOutline, MdLockOutline, MdOutlineShield, MdArrowBack } from 'react-icons/md';
import { usePortal } from '../context/PortalContext';
import { GoogleLogin } from '@react-oauth/google';

import API_BASE_URL from '../apiConfig';

const Login = () => {
  const navigate = useNavigate();
  const { switchPortal } = usePortal();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [role, setRole] = useState('user');
  const [captchaText, setCaptchaText] = useState('');
  const [userInputCaptcha, setUserInputCaptcha] = useState('');
  const canvasRef = React.useRef(null);

  const generateCaptcha = React.useCallback(() => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    drawCaptcha(result);
  }, []);

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Lines for noise
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Text
    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < text.length; i++) {
      const x = 20 + i * 25;
      const y = canvas.height / 2 + (Math.random() * 10 - 5);
      const angle = (Math.random() * 20 - 10) * Math.PI / 180;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Dots for noise
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  React.useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (userInputCaptcha !== captchaText) {
      alert('Invalid Captcha. Please try again.');
      generateCaptcha();
      setUserInputCaptcha('');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.username, password: formData.password, role })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        switchPortal(role);

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'agent') {
          navigate('/agent/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error connecting to server. Make sure the backend is running.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenId: credentialResponse.credential, role })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        switchPortal(role);

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'agent') {
          navigate('/agent/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        alert(data.message || 'Google Login failed');
      }
    } catch (error) {
      console.error('Google Login error:', error);
      alert('Error connecting to server for Google Login.');
    }
  };

  const roleButtonStyle = (currentRole) => ({
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    background: role === currentRole ? '#fff' : 'transparent',
    color: role === currentRole ? '#11b2ac' : '#64748b',
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer',
    boxShadow: role === currentRole ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
    transition: 'all 0.2s'
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #71c5ef 0%, #cdb4db 50%, #b5e48c 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '850px',
        minHeight: '480px',
        background: 'rgba(255, 255, 255, 0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        position: 'relative'
      }}>

        <div style={{
          flex: 1.1,
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #81c7f5 0%, #90caf9 100%)',
          color: '#fff',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'absolute', top: 30, left: 30 }}>
            <MdOutlineShield style={{ fontSize: 22 }} />
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>EASYINSURE</span>
          </div>

          <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '20px', lineHeight: '1.1', maxWidth: '300px' }}>
            Secure Your<br />Future Today.
          </h1>
          <p style={{ fontSize: '15px', lineHeight: '1.6', opacity: 0.9, maxWidth: '320px' }}>
            The most advanced insurance management platform for modern professionals and families.
          </p>
        </div>

        <div style={{
          flex: 0.9,
          padding: '50px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}>

          <button
            type="button"
            style={{
              position: 'absolute',
              top: 25,
              left: 35,
              background: 'none',
              border: 'none',
              color: '#4b5563',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <MdArrowBack /> Back to Selection
          </button>

          <div style={{ marginBottom: '25px', marginTop: '10px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1f2937', marginBottom: '16px' }}>
              {role === 'admin' ? 'Admin Login' : role === 'agent' ? 'Agent Login' : 'User Login'}
            </h2>

            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '12px',
              padding: '4px',
              border: '1px solid rgba(0,0,0,0.05)',
              marginBottom: '16px'
            }}>
              <button type="button" onClick={() => setRole('user')} style={roleButtonStyle('user')}>
                User
              </button>

              <button type="button" onClick={() => setRole('admin')} style={roleButtonStyle('admin')}>
                Admin
              </button>

              <button type="button" onClick={() => setRole('agent')} style={roleButtonStyle('agent')}>
                Agent
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#4b5563' }}>
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Username or Email"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  paddingRight: '45px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: '#1f2937',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <MdPersonOutline style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: 18 }} />
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  paddingRight: '45px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: '#1f2937',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <MdLockOutline style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: 18 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <canvas 
                  ref={canvasRef} 
                  width="180" 
                  height="45" 
                  style={{ 
                    borderRadius: '8px', 
                    border: '1px solid rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={generateCaptcha}
                  title="Click to refresh captcha"
                />
                <button 
                  type="button" 
                  onClick={generateCaptcha}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#11b2ac',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '5px'
                  }}
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter Captcha"
                value={userInputCaptcha}
                onChange={(e) => setUserInputCaptcha(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: '#1f2937',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                background: '#11b2ac',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 4px 12px rgba(17, 178, 172, 0.25)',
              }}
            >
              SIGN IN AS {role.toUpperCase()}
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '10px 0',
              gap: '10px'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log('Login Failed');
                  alert('Google Login Failed');
                }}
                useOneTap
                theme="filled_blue"
                shape="pill"
                text="signin_with"
                width="100%"
              />
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px' }}>
              <span style={{ color: '#4b5563' }}>Don't have an account? </span>
              <Link to={`/register?role=${role}`} style={{ color: '#11b2ac', fontWeight: 600, textDecoration: 'none' }}>
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

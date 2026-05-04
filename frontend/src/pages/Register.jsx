import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  MdPersonOutline,
  MdLockOutline,
  MdOutlineShield,
  MdEmail,
  MdPhone,
  MdLocationCity
} from 'react-icons/md';
import API_BASE_URL from '../apiConfig';
import { GoogleLogin } from '@react-oauth/google';
import { usePortal } from '../context/PortalContext'; // Need this for switchPortal

const Register = () => {
  const navigate = useNavigate();
  const { switchPortal } = usePortal();
  const [searchParams] = useSearchParams();

  const initialRole = searchParams.get('role') || 'user';
  const [role, setRole] = useState(initialRole);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
    city: '',
    otp: ''
  });

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
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

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

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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

  const handleSendOTP = async () => {
    if (!formData.username) {
      setError('Please enter your email first');
      return;
    }
    setError('');
    setOtpLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.username })
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        alert('OTP sent to your email!');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Send OTP error:', err);
      setError('Error connecting to server');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (userInputCaptcha !== captchaText) {
      setError('Invalid Captcha. Please try again.');
      generateCaptcha();
      setUserInputCaptcha('');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
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
        setError(data.message || 'Google Login failed');
      }
    } catch (err) {
      console.error('Google Login error:', err);
      setError('Error connecting to server for Google Login.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const title =
    role === 'admin'
      ? 'Admin Registration'
      : role === 'agent'
        ? 'Agent Registration'
        : 'Create Account';

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
        minHeight: '560px',
        background: 'rgba(255, 255, 255, 0.45)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}>

        <div style={{
          flex: 1.1,
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #81c7f5 0%, #90caf9 100%)',
          color: '#fff',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'absolute', top: 30, left: 30 }}>
            <MdOutlineShield style={{ fontSize: 22 }} />
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              EASYINSURE
            </span>
          </div>

          <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '20px', lineHeight: '1.1', maxWidth: '300px' }}>
            Join Us <br />Today.
          </h1>

          <p style={{ fontSize: '15px', lineHeight: '1.6', opacity: 0.9, maxWidth: '320px' }}>
            Register to gain full control over your insurance management securely.
          </p>
        </div>

        <div style={{
          flex: 0.9,
          padding: '35px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
        }}>

          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1f2937', marginBottom: '10px' }}>
              {title}
            </h2>

            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '12px',
              padding: '4px',
              border: '1px solid rgba(0,0,0,0.05)',
              marginBottom: '12px'
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
              Enter your details to register
            </p>
          </div>

          {error && (
            <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '10px', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '40px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <MdPersonOutline style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: 18 }} />
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="username"
                placeholder="Email Address"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '40px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <MdEmail style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: 16 }} />
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '40px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '10px',
                  fontSize: '13px',
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
                    borderRadius: '10px', 
                    border: '1px solid rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={generateCaptcha}
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
                    cursor: 'pointer'
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
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ position: 'relative', display: 'flex', gap: '10px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={otpLoading || otpSent}
                style={{
                  padding: '0 15px',
                  background: otpSent ? '#10b981' : '#11b2ac',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  opacity: otpLoading ? 0.7 : 1
                }}
              >
                {otpLoading ? 'SENDING...' : otpSent ? 'OTP SENT' : 'SEND OTP'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: '40px',
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <MdPhone style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: 18 }} />
              </div>

              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: '40px',
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <MdLocationCity style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: 18 }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
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
                boxShadow: '0 4px 12px rgba(17, 178, 172, 0.25)'
              }}
            >
              {loading ? 'REGISTERING...' : `REGISTER AS ${role.toUpperCase()}`}
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '8px 0',
              gap: '10px'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log('Login Failed');
                  setError('Google Login Failed');
                }}
                useOneTap
                theme="filled_blue"
                shape="pill"
                text="continue_with"
                width="100%"
              />
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px' }}>
              <span style={{ color: '#4b5563' }}>Already have an account? </span>
              <Link to="/login" style={{ color: '#11b2ac', fontWeight: 600, textDecoration: 'none' }}>
                Login here
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
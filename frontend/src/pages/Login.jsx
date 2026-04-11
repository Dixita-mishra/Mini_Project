import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPersonOutline, MdLockOutline, MdOutlineShield } from 'react-icons/md';
import { usePortal } from '../context/PortalContext';

const Login = () => {
  const navigate = useNavigate();
  const { switchPortal } = usePortal();
  
  const [formData, setFormData] = useState({ username: '', password: '', remember: false });
  const [role, setRole] = useState('user'); // default role

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.username, password: formData.password, role })
      });
      const data = await response.json();
      
      if (response.ok) {
        switchPortal(role);
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Main Glass Card */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '900px',
        minHeight: '500px',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        
        {/* Left Side - Welcome Messaging */}
        <div style={{
          flex: 1,
          padding: '60px 50px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.4) 0%, rgba(129, 140, 248, 0.3) 100%)',
          color: '#fff',
          justifyContent: 'center'
        }}>
          {/* Logo Top Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'absolute', top: 30, left: 40 }}>
             <MdOutlineShield style={{ fontSize: 24 }} />
             <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '1px' }}>SOLIDARITY</span>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Welcome Back!
          </h1>
          <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.9, maxWidth: '280px' }}>
            To keep connected with us please login with your personal information
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          flex: 1,
          padding: '40px 50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.15)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Login</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Role Switcher */}
            <div style={{ 
              display: 'flex', 
              background: 'rgba(0,0,0,0.05)', 
              borderRadius: '12px', 
              padding: '4px',
              border: '1px solid rgba(255,255,255,0.4)'
            }}>
              <button
                type="button"
                onClick={() => setRole('user')}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: role === 'user' ? '#fff' : 'transparent',
                  color: role === 'user' ? 'var(--blue-dark)' : 'var(--text-secondary)',
                  boxShadow: role === 'user' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: role === 'admin' ? '#fff' : 'transparent',
                  color: role === 'admin' ? 'var(--blue-dark)' : 'var(--text-secondary)',
                  boxShadow: role === 'admin' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Admin
              </button>
            </div>

            {/* Input Group Username */}
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Username / Email" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  paddingRight: '45px',
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
              <MdPersonOutline style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 20 }} />
            </div>

            {/* Input Group Password */}
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                required
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  paddingRight: '45px',
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
              <MdLockOutline style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 20 }} />
            </div>

            {/* Options */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.remember} onChange={(e) => setFormData({...formData, remember: e.target.checked})} style={{ width: 14, height: 14 }} />
                <span>Remember me</span>
              </label>
              <a href="#" style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Forgot password?</a>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              style={{
                marginTop: '6px',
                padding: '14px',
                background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.8), rgba(56, 189, 248, 0.8))',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)',
                transition: 'transform 0.2s',
                width: '60%',
                margin: '6px auto 0'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              SIGN IN AS {role.toUpperCase()}
            </button>

            {/* SignUp link */}
            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Don't have an account? <a href="#" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

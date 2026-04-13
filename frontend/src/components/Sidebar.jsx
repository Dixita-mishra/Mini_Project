import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import {
  MdDashboard, MdPolicy, MdAssignment, MdPeople, MdSupervisorAccount,
  MdBarChart, MdSettings, MdShield, MdCreditCard, MdAccountCircle,
  MdHeadsetMic, MdLogout, MdKeyboardArrowRight, MdLocalHospital,
  MdAutorenew, MdVideocam, MdChat, MdCall, MdChatBubbleOutline, MdOutlineShield, MdClose,
  MdStore, MdFactCheck, MdShoppingCart, MdInfoOutline
} from 'react-icons/md';

const adminNav = [
  { section: 'MAIN', items: [
    { icon: <MdDashboard />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <MdPolicy />, label: 'Policies', path: '/admin/policies', badge: null },
    { icon: <MdAssignment />, label: 'Claims', path: '/admin/claims', badge: null },
    { icon: <MdPeople />, label: 'Users', path: '/admin/users' },
    { icon: <MdSupervisorAccount />, label: 'Agents', path: '/admin/agents' },
  ]},
  { section: 'INSIGHTS', items: [
    { icon: <MdBarChart />, label: 'Reports', path: '/admin/reports' },
    { icon: <MdSettings />, label: 'Settings', path: '/admin/settings' },
  ]},
];

const normalUserNav = [
  { section: 'MY ACCOUNT', items: [
    { icon: <MdPolicy />, label: 'My Policies', path: '/user/policies' },
    { icon: <MdShoppingCart />, label: 'Buy Policy', path: '/user/buy-policy' },
  ]},
  { section: 'CLAIMS & SUPPORT', items: [
    { icon: <MdAssignment />, label: 'File a Claim', path: '/user/claims', badge: null },
    { icon: <MdInfoOutline />, label: 'Claim Status', path: '/user/claim-status' },
    { icon: <MdAccountCircle />, label: 'Profile', path: '/user/profile' },
  ]},
];

const userAdminNav = [
  { section: 'BRANCH MANAGEMENT', items: [
    { icon: <MdPeople />, label: 'Manage Customers', path: '/user/manage-customers' },
    { icon: <MdPolicy />, label: 'Assigned Policies', path: '/user/assigned-policies' },
    { icon: <MdFactCheck />, label: 'Claim Verification', path: '/user/claim-verification' },
    { icon: <MdBarChart />, label: 'Branch Analytics', path: '/user/branch-analytics' },
  ]},
];

const Sidebar = ({ isOpen, onClose }) => {
  const { portal, switchPortal, userRole, switchUserRole } = usePortal();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserDetails, setShowUserDetails] = React.useState(false);

  // Try parsing the current token
  let tokenPayload = null;
  try {
    const rawToken = localStorage.getItem('token');
    if (rawToken) {
      const base64Url = rawToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const pad = base64.length % 4;
      const paddedBase64 = pad ? base64 + '='.repeat(4 - pad) : base64;
      const jsonPayload = decodeURIComponent(atob(paddedBase64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      tokenPayload = JSON.parse(jsonPayload);
    }
  } catch (e) {
    console.error('Failed to parse token payload in Sidebar:', e);
  }

  let navItems = adminNav;
  if (portal === 'user') {
    navItems = userRole === 'admin' ? userAdminNav : normalUserNav;
  }

  const handleSwitch = (p) => {
    switchPortal(p);
    navigate(p === 'admin' ? '/admin/dashboard' : '/user/dashboard');
  };

  const handleNav = (path) => navigate(path);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <div className="logo-icon">
            <MdOutlineShield style={{ color: '#fff', fontSize: 20 }} />
          </div>
          <div className="logo-text">
            <span className="logo-name">EASYINSURE</span>
            <span className="logo-tagline">Insurance Services</span>
          </div>
        </div>
        {/* Animated Close Button */}
        <button className="sidebar-close-btn" onClick={onClose} title="Close Sidebar">
          <MdClose />
        </button>
      </div>

      {/* Top User Card replacing the manual footer one */}
      <div className="sidebar-footer" style={{ borderTop: 'none', borderBottom: '1px solid var(--border-color)', margin: '0 1rem 1rem 1rem', padding: '1rem 0' }}>
        <div 
          className="sidebar-user-card" 
          style={{ padding: '0.5rem', cursor: 'pointer', transition: 'background 0.2s', borderRadius: '8px' }}
          onClick={() => setShowUserDetails(!showUserDetails)}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div className={`user-avatar ${portal === 'admin' ? 'admin' : 'user-av'}`}>
            {tokenPayload?.name ? tokenPayload.name.charAt(0).toUpperCase() : (portal === 'admin' ? 'A' : 'U')}
          </div>
          <div className="user-info">
            <div className="user-name">
              {tokenPayload?.name || tokenPayload?.email || (portal === 'admin' ? 'Admin Profile' : 'User Profile')}
            </div>
            <div className="user-role" style={{ textTransform: 'capitalize' }}>
              {tokenPayload?.role || portal} Portal
            </div>
          </div>
          <MdKeyboardArrowRight style={{ color: 'var(--text-muted)', fontSize: 18, transform: showUserDetails ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </div>
        
        {/* Expanded Details Section */}
        {showUserDetails && (
          <div style={{ marginTop: '10px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '13px' }}>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
               <strong>Email:</strong> {tokenPayload?.email || 'admin@insurance.com'}
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
               <strong>Account ID:</strong> {tokenPayload?.id || 'AUTH-BPR'}
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              style={{ width: '100%', padding: '8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600 }}
            >
              <MdLogout /> Logout
            </button>
          </div>
        )}
      </div>



      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section}>
            <div className="nav-section-label">{section.section}</div>
            {section.items.map((item) => (
              <div
                key={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleNav(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Static Sidebar Logout Feature */}
      <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid var(--border-color)' }}>
        <div 
          className="nav-item" 
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          style={{ color: '#ef4444', fontWeight: 700, cursor: 'pointer', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '10px' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'}
        >
          <span className="nav-icon" style={{ color: '#ef4444', background: 'none' }}><MdLogout /></span>
          <span style={{ flex: 1 }}>Secure Logout</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import {
  MdDashboard, MdPolicy, MdAssignment, MdPeople, MdSupervisorAccount,
<<<<<<< HEAD
  MdBarChart, MdSettings, MdShield, MdCreditCard, MdAccountCircle,
  MdHeadsetMic, MdLogout, MdKeyboardArrowRight, MdLocalHospital,
  MdAutorenew, MdVideocam, MdChat, MdCall, MdChatBubbleOutline, MdOutlineShield, MdClose,
  MdStore, MdFactCheck, MdShoppingCart, MdInfoOutline
=======
  MdBarChart, MdSettings, MdCreditCard, MdAccountCircle,
  MdLogout, MdKeyboardArrowRight, MdOutlineShield, MdClose,
  MdFactCheck, MdShoppingCart, MdInfoOutline
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
} from 'react-icons/md';

const adminNav = [
  { section: 'MAIN', items: [
    { icon: <MdDashboard />, label: 'Dashboard', path: '/admin/dashboard' },
<<<<<<< HEAD
    { icon: <MdPolicy />, label: 'Policies', path: '/admin/policies', badge: null },
    { icon: <MdAssignment />, label: 'Claims', path: '/admin/claims', badge: null },
=======
    { icon: <MdPolicy />, label: 'Policies', path: '/admin/policies' },
    { icon: <MdAssignment />, label: 'Claims', path: '/admin/claims' },
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
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
<<<<<<< HEAD
    { icon: <MdAssignment />, label: 'File a Claim', path: '/user/claims', badge: null },
=======
    { icon: <MdAssignment />, label: 'File a Claim', path: '/user/claims' },
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
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

<<<<<<< HEAD
const Sidebar = ({ isOpen, onClose }) => {
  const { portal, switchPortal, userRole, switchUserRole } = usePortal();
  const navigate = useNavigate();
  const location = useLocation();

  let navItems = adminNav;
=======
const agentNav = [
  { section: 'AGENT PANEL', items: [
    { icon: <MdDashboard />, label: 'Dashboard', path: '/agent/dashboard' },
    { icon: <MdPeople />, label: 'Assigned Leads', path: '/agent/leads' },
    { icon: <MdPolicy />, label: 'Available Policies', path: '/agent/policies' },
    { icon: <MdFactCheck />, label: 'Recommend Policy', path: '/agent/recommend' },
    { icon: <MdAssignment />, label: 'Create Quote', path: '/agent/quote' },
    { icon: <MdBarChart />, label: 'Sales Tracking', path: '/agent/sales' },
    { icon: <MdCreditCard />, label: 'Commission', path: '/agent/commission' },
    { icon: <MdAccountCircle />, label: 'Clients', path: '/agent/clients' },
  ]},
];

const Sidebar = ({ isOpen, onClose }) => {
  const { portal, userRole } = usePortal();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserDetails, setShowUserDetails] = React.useState(false);

  let tokenPayload = null;

  try {
    const rawToken = localStorage.getItem('token');
    if (rawToken) {
      const base64Url = rawToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const pad = base64.length % 4;
      const paddedBase64 = pad ? base64 + '='.repeat(4 - pad) : base64;
      const jsonPayload = decodeURIComponent(
        atob(paddedBase64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      tokenPayload = JSON.parse(jsonPayload);
    }
  } catch (e) {
    console.error('Failed to parse token payload in Sidebar:', e);
  }

  let navItems = adminNav;

>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
  if (portal === 'user') {
    navItems = userRole === 'admin' ? userAdminNav : normalUserNav;
  }

<<<<<<< HEAD
  const handleSwitch = (p) => {
    switchPortal(p);
    navigate(p === 'admin' ? '/admin/dashboard' : '/user/dashboard');
  };

  const handleNav = (path) => navigate(path);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
=======
  if (portal === 'agent') {
    navItems = agentNav;
  }

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('portal');
    navigate('/login');
  };

  const avatarText =
    tokenPayload?.name
      ? tokenPayload.name.charAt(0).toUpperCase()
      : portal === 'admin'
        ? 'A'
        : portal === 'agent'
          ? 'G'
          : 'U';

  const profileName =
    tokenPayload?.name ||
    tokenPayload?.email ||
    (portal === 'admin'
      ? 'Admin Profile'
      : portal === 'agent'
        ? 'Agent Profile'
        : 'User Profile');

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <div className="logo-icon">
            <MdOutlineShield style={{ color: '#fff', fontSize: 20 }} />
          </div>
          <div className="logo-text">
<<<<<<< HEAD
            <span className="logo-name">SOLIDARITY</span>
            <span className="logo-tagline">Insurance Services</span>
          </div>
        </div>
        {/* Animated Close Button */}
=======
            <span className="logo-name">EASYINSURE</span>
            <span className="logo-tagline">Insurance Services</span>
          </div>
        </div>

>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
        <button className="sidebar-close-btn" onClick={onClose} title="Close Sidebar">
          <MdClose />
        </button>
      </div>

<<<<<<< HEAD
      {/* Portal Toggle */}
      <div className="sidebar-portal-toggle">
        <div className="portal-toggle-btns">
          <button
            className={`portal-btn ${portal === 'admin' ? 'active' : ''}`}
            onClick={() => handleSwitch('admin')}
          >
            Admin
          </button>
          <button
            className={`portal-btn ${portal === 'user' ? 'active' : ''}`}
            onClick={() => handleSwitch('user')}
          >
            User
          </button>
        </div>
      </div>

      {/* Sub-role Toggle for User Mode */}
      {portal === 'user' && (
        <div className="sidebar-portal-toggle" style={{ marginTop: '0', paddingTop: '0' }}>
          <div className="portal-toggle-btns" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '4px' }}>
            <button
              className={`portal-btn ${userRole === 'normal' ? 'active' : ''}`}
              onClick={() => switchUserRole('normal')}
              style={{ fontSize: '0.8rem', padding: '6px' }}
            >
              Normal User
            </button>
            <button
              className={`portal-btn ${userRole === 'admin' ? 'active' : ''}`}
              onClick={() => switchUserRole('admin')}
              style={{ fontSize: '0.8rem', padding: '6px' }}
            >
              User Admin
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
=======
      <div
        className="sidebar-footer"
        style={{
          borderTop: 'none',
          borderBottom: '1px solid var(--border-color)',
          margin: '0 1rem 1rem 1rem',
          padding: '1rem 0'
        }}
      >
        <div
          className="sidebar-user-card"
          style={{
            padding: '0.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
            borderRadius: '8px'
          }}
          onClick={() => setShowUserDetails(!showUserDetails)}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div className={`user-avatar ${portal === 'admin' ? 'admin' : 'user-av'}`}>
            {avatarText}
          </div>

          <div className="user-info">
            <div className="user-name">{profileName}</div>
            <div className="user-role" style={{ textTransform: 'capitalize' }}>
              {tokenPayload?.role || portal} Portal
            </div>
          </div>

          <MdKeyboardArrowRight
            style={{
              color: 'var(--text-muted)',
              fontSize: 18,
              transform: showUserDetails ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
          />
        </div>

        {showUserDetails && (
          <div
            style={{
              marginTop: '10px',
              padding: '12px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '13px'
            }}
          >
            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>Email:</strong> {tokenPayload?.email || 'profile@easyinsure.com'}
            </div>

            <div style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <strong>Account ID:</strong> {tokenPayload?.id || 'AUTH-BPR'}
            </div>

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '8px',
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: 600
              }}
            >
              <MdLogout /> Logout
            </button>
          </div>
        )}
      </div>

>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section}>
            <div className="nav-section-label">{section.section}</div>
<<<<<<< HEAD
=======

>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
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

<<<<<<< HEAD
      {/* Footer User Card */}
      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className={`user-avatar ${portal === 'admin' ? 'admin' : 'user-av'}`}>
            {portal === 'admin' ? 'A' : 'U'}
          </div>
          <div className="user-info">
            <div className="user-name">
              {portal === 'admin' ? 'Admin User' : (userRole === 'admin' ? 'Agent Manager' : 'John Doe')}
            </div>
            <div className="user-role">
              {portal === 'admin' ? 'Super Administrator' : (userRole === 'admin' ? 'User Admin' : 'Customer')}
            </div>
          </div>
          <MdKeyboardArrowRight style={{ color: 'var(--text-muted)', fontSize: 18 }} />
=======
      <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid var(--border-color)' }}>
        <div
          className="nav-item"
          onClick={handleLogout}
          style={{
            color: '#ef4444',
            fontWeight: 700,
            cursor: 'pointer',
            background: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '10px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)')}
        >
          <span className="nav-icon" style={{ color: '#ef4444', background: 'none' }}>
            <MdLogout />
          </span>
          <span style={{ flex: 1 }}>Secure Logout</span>
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
        </div>
      </div>
    </aside>
  );
};

<<<<<<< HEAD
export default Sidebar;
=======
export default Sidebar;
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6

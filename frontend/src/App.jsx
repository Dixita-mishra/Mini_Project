<<<<<<< HEAD
=======
import ClaimStatus from './pages/user/ClaimStatus';
import BuyPolicy from './pages/user/BuyPolicy';
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PortalProvider } from './context/PortalContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
<<<<<<< HEAD

// Public Pages
import Login from './pages/Login';

// Admin Pages
import AdminDashboard   from './pages/admin/AdminDashboard';
import PolicyManagement from './pages/admin/PolicyManagement';
import ClaimsManagement from './pages/admin/ClaimsManagement';
import UserManagement   from './pages/admin/UserManagement';
import Agents           from './pages/admin/Agents';
import Reports          from './pages/admin/Reports';
import Settings         from './pages/admin/Settings';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import MyPolicies    from './pages/user/MyPolicies';
import MyClaims      from './pages/user/MyClaims';
import Payments      from './pages/user/Payments';
import Profile       from './pages/user/Profile';
import Support       from './pages/user/Support';
=======
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminDashboard from './pages/admin/AdminDashboard';
import PolicyManagement from './pages/admin/PolicyManagement';
import ClaimsManagement from './pages/admin/ClaimsManagement';
import UserManagement from './pages/admin/UserManagement';
import Agents from './pages/admin/Agents';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

import UserDashboard from './pages/user/UserDashboard';
import MyPolicies from './pages/user/MyPolicies';
import MyClaims from './pages/user/MyClaims';
import Payments from './pages/user/Payments';
import Profile from './pages/user/Profile';
import Support from './pages/user/Support';

import AgentDashboard from './pages/agent/AgentDashboard';
import AssignedLeads from './pages/agent/AssignedLeads';
import AgentPolicies from './pages/agent/AgentPolicies';
import RecommendPolicy from './pages/agent/RecommendPolicy';
import CreateQuote from './pages/agent/CreateQuote';
import SalesTracking from './pages/agent/SalesTracking';
import Commission from './pages/agent/Commission';
import Clients from './pages/agent/Clients';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6

const AppShell = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="app-layout">
<<<<<<< HEAD
      {/* Backdrop for mobile UX when sidebar is open */}
      <div 
=======
      <div
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
        className={`sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
<<<<<<< HEAD
      
      <div className="main-content">
        <Header 
          currentPath={location.pathname} 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/policies"  element={<PolicyManagement />} />
          <Route path="/admin/claims"    element={<ClaimsManagement />} />
          <Route path="/admin/users"     element={<UserManagement />} />
          <Route path="/admin/agents"    element={<Agents />} />
          <Route path="/admin/reports"   element={<Reports />} />
          <Route path="/admin/settings"  element={<Settings />} />

          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/policies"  element={<MyPolicies />} />
          <Route path="/user/claims"    element={<MyClaims />} />
          <Route path="/user/payments"  element={<Payments />} />
          <Route path="/user/profile"   element={<Profile />} />
          <Route path="/user/support"   element={<Support />} />

          {/* Default redirect inside shell */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </div>
=======

      <div className="main-content">
        <Header
          currentPath={location.pathname}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/policies" element={<PolicyManagement />} />
          <Route path="/admin/claims" element={<ClaimsManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/agents" element={<Agents />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />

          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/policies" element={<MyPolicies />} />
          <Route path="/user/claims" element={<MyClaims />} />
          <Route path="/user/payments" element={<Payments />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/support" element={<Support />} />
          <Route path="/user/buy-policy" element={<BuyPolicy />} />
          <Route path="/user/claim-status" element={<ClaimStatus />} />

          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/leads" element={<AssignedLeads />} />
          <Route path="/agent/policies" element={<AgentPolicies />} />
          <Route path="/agent/recommend" element={<RecommendPolicy />} />
          <Route path="/agent/quote" element={<CreateQuote />} />
          <Route path="/agent/sales" element={<SalesTracking />} />
          <Route path="/agent/commission" element={<Commission />} />
          <Route path="/agent/clients" element={<Clients />} />

          <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
        </Routes>
      </div>

      {location.pathname.startsWith('/user') && <Chatbot />}
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
    </div>
  );
};

const App = () => (
  <PortalProvider>
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppShell />} />
=======
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<ProtectedRoute><AppShell /></ProtectedRoute>} />
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
      </Routes>
    </BrowserRouter>
  </PortalProvider>
);

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6

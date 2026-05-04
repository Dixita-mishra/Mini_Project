import React, { createContext, useContext, useState, useCallback } from 'react';

const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
<<<<<<< HEAD
  const [portal, setPortal] = useState('admin'); // 'admin' | 'user'
  const [refreshKey, setRefreshKey] = useState(0);
  const [userRole, setUserRole] = useState('normal'); // 'normal' | 'admin' (Normal User / User Admin)

  const switchPortal = (p) => setPortal(p);
  const switchUserRole = (r) => setUserRole(r);

  // Pages subscribe to this; bump the key to trigger a re-fetch
=======
  const [portal, setPortal] = useState(localStorage.getItem('portal') || 'admin');
  const [refreshKey, setRefreshKey] = useState(0);
  const [userRole, setUserRole] = useState('normal');

  const switchPortal = (p) => {
    setPortal(p);
    localStorage.setItem('portal', p);
  };

  const switchUserRole = (r) => setUserRole(r);

>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
  const triggerRefresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  return (
<<<<<<< HEAD
    <PortalContext.Provider value={{ portal, switchPortal, refreshKey, triggerRefresh }}>
    <PortalContext.Provider value={{ portal, switchPortal, userRole, switchUserRole }}>
=======
    <PortalContext.Provider value={{ portal, switchPortal, userRole, switchUserRole, refreshKey, triggerRefresh }}>
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
      {children}
    </PortalContext.Provider>
  );
};

<<<<<<< HEAD
export const usePortal = () => useContext(PortalContext);
=======
export const usePortal = () => useContext(PortalContext);
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6

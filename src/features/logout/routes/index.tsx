import { useEffect } from 'react';
import useAuth from '../../../lib/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
      logout();
  }, [isAuthenticated, logout]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to dashboard if authenticated
  } else {
    return <Navigate to="/" />;
  }
};

export default Logout;

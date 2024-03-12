import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ children }) {
  const { checkAuthenticationStatus, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
console.log("PRIVATE ROUTE")
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await checkAuthenticationStatus();
      } catch (error) {
        console.error('Error checking authentication:', error);
        // If authentication check fails, navigate to the login page
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [checkAuthenticationStatus, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

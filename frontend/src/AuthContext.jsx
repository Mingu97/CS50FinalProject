import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'
const AuthContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('Guest');


  const handleLogout = useCallback(async () => {
    try {
      const token = Cookies.get('myAppCookie');

      if (!token) {
        console.error('No token found. Logout failed.');
        return;
      }

      const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
      const response = await axios.post(
        `${API_BASE_URL}api/users/logout`,
        { selectedItems },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log('Logout successful:', response.data.message);
      } else {
        console.error('Logout API request failed:', response.data.message);
      }

      localStorage.removeItem('selectedItems');
      Cookies.remove('myAppCookie');
      setIsLoggedIn(false);
      setUser('Guest');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [setIsLoggedIn, setUser]);

  const checkAuthenticationStatus = useCallback(async () => {
    const token = Cookies.get('myAppCookie');

    // Check if the token is present
    if (token) {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Check if the token is expired
      if (decodedToken.exp > Date.now() / 1000) {
        setUser(decodedToken.username);
        return true; // Token is not expired
      } else {
        // Token is expired, perform logout
        await handleLogout();
        return false; // Token is expired
      }
    } else {
      // If token is not present, return false
      setUser('Guest');
      return false;
    }
  }, [setUser, handleLogout]);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoggedIn(await checkAuthenticationStatus());
    };

    fetchData();
  }, [checkAuthenticationStatus]); // Include checkAuthenticationStatus in the dependency array

  // Function to handle login
  const handleLogin = async (username, password, navigate) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/users/login`,
        { username, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { data } = response;
      console.log(response)

      if (data.errorType) {
        handleLoginError(data.errorType, data.message);
        return false; // Return false for unsuccessful login
      } else {
        handleSuccessfulLogin(data, navigate);
        return true; // Return true for successful login
      }
    } catch (error) {
      console.log(error)
      console.log(error.response.data.errorType)
      if (error.response.data.errorType === 'incorrectPassword') {
        handleLoginError(error.response.data.errorType, error.response.data.message)
      }
      else if(error.response.data.errorType === 'userNotFound') {
        handleLoginError(error.response.data.errorType, error.response.data.message)
      }
      else if(error.response.data.errorType === 'accountLocked') {
        handleLoginError(error.response.data.errorType, error.response.data.message)
      }
      else {
        handleLoginError('otherError', 'Login request failed');
      }
      return false; // Return false for unsuccessful login
    }
  };

  // Handle successful login
  const handleSuccessfulLogin = (data, navigate) => {
    const { user, session, token } = data;

    setIsLoggedIn(true);
    localStorage.setItem('selectedItems', JSON.stringify(session));
    Cookies.set('myAppCookie', JSON.stringify({ token, user }), { sameSite: 'none', secure: true });

    setUser(user);

    // Navigate after successful login
    navigate('/all-products');
  };

  // Function to handle login errors
  const handleLoginError = (errorType, message) => {
    switch (errorType) {
      case 'incorrectPassword':
        toast.error('Incorrect password');
        break;
      case 'userNotFound':
        toast.error('User not found');
        break;
      case 'accountLocked':
      case 'tooManyAttempts':
        toast.error(message);
        break;
      default:
        console.log(message)
        toast.error('Other error occurred');
    }
  };

  const value = {
    isLoggedIn,
    user, // Include the user information in the context
    handleLogout,
    handleLogin,
    checkAuthenticationStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

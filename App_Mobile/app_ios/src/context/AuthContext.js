import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    };
    loadSession();
  }, []);

  const login = async (token) => {
    setToken(token);
    setIsLoggedIn(true);
    await AsyncStorage.setItem('authToken', token);
  };

  const logout = async () => {
    setToken(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

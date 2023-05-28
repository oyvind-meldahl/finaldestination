// AuthContext.js
import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // Whenever the userId state changes, update the user state
  useEffect(() => {
    if (userId) {
      setUser(true);
    } else {
      setUser(null);
    }
  }, [userId]);

  const value = {
    user,
    setUser,
    userId,
    setUserId,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

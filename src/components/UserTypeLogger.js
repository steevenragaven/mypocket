// src/components/UserTypeLogger.js
import { useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';

const UserTypeLogger = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(`User role: ${user.role}`);
    } else {
      console.log('No user logged in');
    }
  }, [user]);

  return null;
};

export default UserTypeLogger;

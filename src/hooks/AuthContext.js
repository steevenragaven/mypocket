import React, { createContext, useState, useContext } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      const decodedUser = JSON.parse(atob(data.token.split('.')[1])); // Decode JWT token
      setUser({ username: decodedUser.username, role: decodedUser.role });
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const register = async (newUser) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await fetch(`http://localhost:3000/check-username?username=${username}`);

      if (!response.ok) {
        throw new Error('Error checking username');
      }

      const data = await response.json();
      return data.exists;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const checkEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/check-email?email=${email}`);

      if (!response.ok) {
        throw new Error('Error checking email');
      }

      const data = await response.json();
      return data.exists;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, checkUsername, checkEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

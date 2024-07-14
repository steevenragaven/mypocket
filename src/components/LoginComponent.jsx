// src/components/LoginComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../Products/meat/meat.jpg'; // Replace with the actual path to your image
import { useAuth } from '../hooks/AuthContext'; // Ensure the path is correct

const SplitScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ImageSide = styled.div`
  flex: 1;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
`;

const FormSide = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LoginInput = styled.input`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const LoginButton = styled.button`
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 30px;
`;

const ForgotPasswordLink = styled.a`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  display: block;
  margin-bottom: 30px;
  text-align: right;
`;

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/shop');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <SplitScreen>
      <ImageSide />
      <FormSide>
        <LoginForm onSubmit={handleLogin}>
          <Title>Sign in</Title>
          <Subtitle>Welcome back!</Subtitle>
          <LoginInput 
            type="text" 
            placeholder="Enter User name" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <LoginInput 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <LoginButton type="submit">Login</LoginButton>
        </LoginForm>
      </FormSide>
    </SplitScreen>
  );
};

export default LoginComponent;

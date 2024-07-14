// src/components/RegisterComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../images/homepage/bas.jpg'; // Ensure you have the correct path to your image
import { useAuth } from '../hooks/AuthContext';
import { toast } from 'sonner';

const SplitScreen = styled.div`
  display: flex;
  height: 100vh; // Full viewport height
`;

const LeftPanel = styled.div`
  flex: 1;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const RightPanel = styled.div`
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: black;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: black;
  margin-bottom: 2rem;
`;

const RegisterForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const RegisterInput = styled.input`
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const RegisterButton = styled.button`
  padding: 1rem;
  background-color: #0056b3;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, checkUsername } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const usernameExists = await checkUsername(username);
    if (usernameExists) {
      toast.error('Username already exists');
      return;
    }

    const emailExists = await checkUsername(email);
    if (emailExists) {
      toast.error('Email already exists');
      return;
    }

    const newUser = {
      username,
      password,
      email,
      fullname: fullName,
      address,
      postcode: postCode,
      mobilenumber: mobile,
      telephonenumber: telephone,
    };

    const success = await register(newUser);
    if (success) {
      toast.success('Registration successful!');
      navigate('/shop');
    } else {
      toast.error('Registration failed');
    }
  };

  return (
    <SplitScreen>
      <LeftPanel>
        <Title>Welcome to PocketMart</Title>
        <Subtitle>Where Convenience Meets Quality</Subtitle>
      </LeftPanel>
      <RightPanel>
        <RegisterForm onSubmit={handleRegister}>
          <Label htmlFor="email">Enter Email</Label>
          <RegisterInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <Label htmlFor="fullName">Enter Full Name</Label>
          <RegisterInput id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          
          <Label htmlFor="userName">Enter User Name</Label>
          <RegisterInput id="userName" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          
          <Label htmlFor="address">Full Address</Label>
          <RegisterInput id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          
          <Label htmlFor="postCode">Post Code</Label>
          <RegisterInput id="postCode" type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} required />
          
          <Label htmlFor="mobile">Mobile number</Label>
          <RegisterInput id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          
          <Label htmlFor="telephone">Telephone number</Label>
          <RegisterInput id="telephone" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          
          <Label htmlFor="password">Password</Label>
          <RegisterInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <RegisterInput id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          
          <RegisterButton type="submit">Register</RegisterButton>
        </RegisterForm>
      </RightPanel>
    </SplitScreen>
  );
};

export default RegisterComponent;
// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { AiOutlineCreditCard, AiOutlinePhone } from 'react-icons/ai';
import  leafBackground  from '../images/homepage/leaf.jpg'; // Replace with the actual path
import visaIcon from '../images/footer/visa.png'; // Adjust the import path as necessary

const Foot = styled.footer`
  background: url(${leafBackground}) no-repeat center center;
  background-size: cover;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
`;
const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterNavItem = styled.div`
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const SubscribeSection = styled.div`
  text-align: center;
`;

const SubscribeInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
`;

const SubscribeButton = styled.button`
  background-color: orange;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkorange;
  }
`;

const ContactPayment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CopyRight = styled.p`
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
`;

const IconBox = styled.div`
  background-color: black;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
const PaymentIcon = styled.img`
  width: auto; // Adjust as needed
  height: 20px; // Adjust as needed
`;
function Footer() {
    return (
        <Foot>
            <FooterNav>
                <FooterNavItem>Home</FooterNavItem>
                <FooterNavItem>Shop</FooterNavItem>
                <FooterNavItem>My Cart</FooterNavItem>
                <FooterNavItem>Contact us</FooterNavItem>
            </FooterNav>
            <SubscribeSection>
                <p>Get Exclusive Deals in your Inbox</p>
                <SubscribeInput placeholder="youremail@gmail.com" />
                <SubscribeButton>Subscribe</SubscribeButton>
            </SubscribeSection>
            <ContactPayment>
                <IconBox>
                    <AiOutlinePhone />
                    <span>Call us on: 631-1234</span>
                </IconBox>
                <IconBox>
                    <AiOutlineCreditCard />
                    <span>Secure Payment</span>
                </IconBox>
                <PaymentIcon src={visaIcon} alt="Visa" />
                            </ContactPayment>
            <CopyRight>© PocketMart 2024 | All Rights Reserved | Privacy Policy | Terms & Conditions</CopyRight>
        </Foot>
    );
}

export default Footer;

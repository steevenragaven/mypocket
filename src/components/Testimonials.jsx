import React from 'react';
import styled from 'styled-components';
import { GiTruck } from 'react-icons/gi'; // Already imported
import { FaHeadphonesAlt, FaLock } from 'react-icons/fa'; 

const TestimonialsSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f8f8f8; // Match your actual background color
  padding: 2rem 0;
`;

const Feature = styled.div`
  text-align: center;
  flex-basis: calc(100% / 3); // Distribute space evenly for 3 features
`;

const IconWrapper = styled.div`
  color: #84c225; // Icon color
  font-size: 3rem; // Icon size
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const FeatureText = styled.p`
  color: #666;
`;

const GreenLine = styled.hr`
  border: none;
  height: 5px;
  background-color: #84c225; // Line color
  margin-top: 2rem;
`;

const Testimonials = () => {
  return (
    <TestimonialsSection>
      <Feature>
        <IconWrapper>
          <GiTruck />
        </IconWrapper>
        <FeatureTitle>Delivery Available</FeatureTitle>
        <FeatureText>Fast and reliable</FeatureText>
      </Feature>
      
      <Feature>
        <IconWrapper>
          <FaHeadphonesAlt /> {/* This represents the support icon */}
        </IconWrapper>
        <FeatureTitle>Great Support 24/7</FeatureTitle>
        <FeatureText>Instant access to Contact</FeatureText>
      </Feature>
      
      <Feature>
        <IconWrapper>
          <FaLock /> {/* This represents the secure payment icon */}
        </IconWrapper>
        <FeatureTitle>100% Secure Payment</FeatureTitle>
        <FeatureText>We ensure your money is safe</FeatureText>
      </Feature>
      
      <GreenLine />
    </TestimonialsSection>
  );
};

export default Testimonials;
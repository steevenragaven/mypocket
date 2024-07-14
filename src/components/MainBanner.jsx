import React from 'react';
import styled from 'styled-components';
import bannerImage from '../images/homepage/background.jpg'; // Ensure this path is correct
import leaf from '../images/homepage/leaf.jpg';
import { useNavigate } from 'react-router-dom';

// Styled components for the MainBanner
const Banner = styled.section`
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 0 10%;
`;

const TextSection = styled.div`
  flex-basis: 50%;
  padding-right: 5%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BannerTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const BannerSubtitle = styled.p`
  font-size: 1.25rem;
  color: #333;
  margin: 0 0 2rem 0;
`;

const ShopNowButton = styled.button`
  background-image: url(${leaf});
  background-size: cover;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #739f1a;
  }
`;

const ImageSection = styled.div`
  flex-basis: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
`;

const BannerImage = styled.img`
  position: absolute;
  top: 200px; /* Adjust as needed */
  right: 600px;
  width: 80%;
  height: auto;
  max-height: 200vh;
  object-fit: contain;
  transform: rotate(-130deg);
  transform-origin: top right;
`;

// MainBanner component
function MainBanner() {
  let navigate = useNavigate(); // Hook for navigation

  // Function to handle click, which navigates to the '/shop' route
  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <Banner>
      <ContentWrapper>
        <TextSection>
          <BannerTitle>Welcome to PocketMart</BannerTitle>
          <BannerSubtitle>Where Convenience Meets Quality</BannerSubtitle>
          <ShopNowButton onClick={handleShopNowClick}>SHOP NOW</ShopNowButton>
        </TextSection>
        <ImageSection>
          <BannerImage src={bannerImage} alt="PocketMart" />
        </ImageSection>
      </ContentWrapper>
    </Banner>
  );
}

export default MainBanner;
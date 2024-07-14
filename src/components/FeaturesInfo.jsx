import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBox, FaTag, FaUserFriends, FaArrowLeft, FaArrowRight, FaShoppingCart, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import leaf from '../images/homepage/leaf.jpg'; 
import placeOrderImage from '../images/homepage/leaf.jpg'; // Replace with the path to your image
import trackProgressImage from '../images/homepage/leaf.jpg'; // Replace with the path to your image
import getOrderImage from '../images/homepage/leaf.jpg'; //
// Styled components
const Container = styled.div`
  font-family: 'Arial', sans-serif; // Replace with your desired font
`;

const ReviewsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const ReviewCarousel = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-top: 1rem;
`;

const CarouselButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  z-index: 10;
  &:hover {
    opacity: 0.8;
  }
`;

const ReviewCard = styled.div`
  flex: 0 0 auto;
  margin: 0 1rem;
  padding: 1rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: start;
`;

const ReviewText = styled.p`
  font-style: italic;
  margin-bottom: 0.5rem;
`;

const ReviewerName = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  color: #ffd700;
`;

const ReviewerAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const FeaturesSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const FeatureSquare = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
  text-align: center;
`;

const SquareTitle = styled.h3`
  margin: 1rem 0;
`;

const SquareIcon = styled.div`
  color: #84c225;
  font-size: 3rem;
`;

const ActionButton = styled.button`
  background-color: #84c225;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 1rem 2rem;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #739f1a;
  }
`;

const InfoPanel = styled.section`
  background-color: #333; // Choose your desired background color
  color: white;
  padding: 2rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StatBox = styled.div`
  text-align: center;
  & > h2 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  & > p {
    font-size: 1rem;
  }
`;

const FAQPanel = styled.div`
background: rgba(0,0,0,0.1);
  padding: 1rem;
  color:#fff;

  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  // You may need to adjust widths and margins depending on your layout
`;

const FAQQuestion = styled.p`
  font-weight: bold;
  color:#fff;
`;

const LeafBackground = styled.div`
  background: url(${leaf}); // Replace with your background
  background-size: cover;
  padding: 2rem;
`;

const OrderProcessSection = styled.section`
  display: flex;
  justify-content: space-around;
  background-color: #84c225;
  padding: 2rem;
`;

const ProcessSquare = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
  text-align: center;
`;

const ProcessIcon = styled.div`
  color: #84c225;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ProcessTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;
const ProcessStep = styled.div`
  background: #fff; // Adjust if you have a specific background color
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  padding: 2rem;
  margin: 0 1rem;
`;

const ProcessImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  // Add any necessary styles for your images
`;


const FeaturesAndReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Define the reviews array
  const reviews = [
    {
      name: "Luke Skyw.",
      text: "Good customer service",
      rating: 5,
      avatar: "../images/avatar.jpeg", // Replace with the path to your avatar images
    },
    {
      name: "Alex Quentin",
      text: "Easy to use",
      rating: 4,
      avatar: "../images/avatar.jpeg", // Replace with the path to your avatar images
    },
    {
      name: "Mathieu ARION",
      text: "Time Saver",
      rating: 5,
      avatar: "../images/avatar.jpeg", // Replace with the path to your avatar images
    },
    // ... more reviews
  ];

  return (
    <Container>
      <FeaturesSection>
        <FeatureSquare>
          <SquareIcon><FaTag /></SquareIcon>
          <SquareTitle>SUMMER SALE</SquareTitle>
          <ActionButton>Shop Now</ActionButton>
        </FeatureSquare>
        <FeatureSquare>
          <SquareIcon><FaUserFriends /></SquareIcon>
          <SquareTitle>Invite Friends</SquareTitle>
          <ActionButton>Invite friends</ActionButton>
        </FeatureSquare>
        <FeatureSquare>
          <SquareIcon><FaBox /></SquareIcon>
          <SquareTitle>Special Products</SquareTitle>
          <ActionButton>Shop Now</ActionButton>
        </FeatureSquare>
      </FeaturesSection>
      <ReviewsSection>
        <CarouselButton onClick={handlePrevClick} style={{ left: '10px' }}>
          <FaArrowLeft />
        </CarouselButton>
        <ReviewCarousel>
          {reviews.map((review, index) => (
            <ReviewCard key={index} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              <ReviewerAvatar src={review.avatar} alt={`Avatar of ${review.name}`} />
              <ReviewText>"{review.text}"</ReviewText>
              <ReviewerName>{review.name}</ReviewerName>
              <Rating>
                {Array.from({ length: review.rating }, (_, i) => (
                  <AiFillStar key={i} />
                ))}
              </Rating>
            </ReviewCard>
          ))}
        </ReviewCarousel>
        <CarouselButton onClick={handleNextClick} style={{ right: '10px' }}>
          <FaArrowRight />
        </CarouselButton>
      </ReviewsSection>
      <LeafBackground>
      <OrderProcessSection>
        <ProcessSquare>
          <ProcessIcon><FaShoppingCart /></ProcessIcon>
          <ProcessTitle>Place an order</ProcessTitle>
        </ProcessSquare>
        <ProcessSquare>
          <ProcessIcon><FaMapMarkerAlt /></ProcessIcon>
          <ProcessTitle>Track Progress</ProcessTitle>
        </ProcessSquare>
        <ProcessSquare>
          <ProcessIcon><FaTruck /></ProcessIcon>
          <ProcessTitle>Get your order</ProcessTitle>
        </ProcessSquare>
      </OrderProcessSection>
        <FAQPanel>
          <FAQQuestion>How do Pocket Mart work?</FAQQuestion>
          <p>Can I track my order in real-time?</p>
          <p>Are there any special discounts or promotions available?</p>
          <p>What payment methods are accepted?</p>
        </FAQPanel>
        
      </LeafBackground>
      <InfoPanel>
        <StatBox>
          <h2>546+</h2>
          <p>Registered Riders</p>
        </StatBox>
        <StatBox>
          <h2>789,900+</h2>
          <p>Orders Delivered</p>
        </StatBox>
        <StatBox>
          <h2>100+</h2>
          <p>Grocery Shop Partnered</p>
        </StatBox>
        <StatBox>
          <h2>17,457+</h2>
          <p>Food items</p>
        </StatBox>
      </InfoPanel>
  
    </Container>
  );
};

export default FeaturesAndReviews;

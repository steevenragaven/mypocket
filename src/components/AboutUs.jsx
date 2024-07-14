import React from 'react';
import styled from 'styled-components';
import aboutUsImage from '../images/homepage/bas.jpg';
import aboutUsBackground from '../images/homepage/bas.jpg';// Replace with your image path
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ContactUsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #f7f7f7;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const ContactText = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
`;

const SocialIcons = styled.div`
  color: #267D34;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;

  & > * {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;

const Address = styled.p`
  display: flex;
  align-items: center;
  color: #267D34;
  font-size: 0.9rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const Map = styled.iframe`
  border: none;
  width: 50%;
  height: 250px;
  border-radius: 8px;
`;


const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding-top: 2rem;
  background-color:black;
`;

const AboutUsContactContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  background: url(${aboutUsBackground}) no-repeat center center;
  background-size: cover;
  color: white; // Assuming white text for a dark background image
  border-radius: 8px; // Adjust if needed
  margin-right: 2rem; // Ensure some space between the text section and the image
`;
// Update the Map styling if necessary

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  background: url(${aboutUsBackground}) no-repeat center center;
  background-size: cover;
  color: white; // Assuming white text for a dark background image
  border-radius: 8px; // Adjust if needed
  margin-right: 2rem; // Ensure some space between the text section and the image
`;

const AboutHeader = styled.h2`
  font-size: 2rem;
  color: #333; // Adjust the color to match your design
  margin-bottom: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 80%;
  max-width: 1200px; // Adjust the max-width to suit your design's content width
  margin: 0 auto;
  background: #ffffff; // Adjust the background color to match your design
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // This adds a subtle shadow to the content wrapper
  padding: 2rem;
  border-radius: 10px; // Adjust border-radius to match your design
`;

const TextSection = styled.div`
  flex: 1;
  padding-right: 2rem;
`;

const AboutText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666; // Adjust the color to match your design
  margin-bottom: 2rem;
`;

const FounderInfo = styled.div`
  text-align: center;
`;

const FounderTitle = styled.p`
  font-weight: bold;
  color: #333; // Adjust the color to match your design
  margin-top: 1rem;
`;

const AboutImage = styled.img`
  max-width: 50%;
  height: auto;
  border-radius: 8px; // Match this to the border-radius in your design
`;

const AboutUs = () => {
    return (
      <AboutUsContactContainer>
      <AboutHeader>About Us</AboutHeader>
      <ContentWrapper>
        <TextSection>
          <AboutText>
          Welcome to PocketMart, your premier online grocery destination! Established in 2024, we embraced the digital transformation to make shopping easier and more accessible for everyone. At PocketMart, we understand the value of your time. That’s why we bring a complete grocery store experience right to your doorstep, all with just a few clicks. 

Our platform is designed with your convenience and security in mind. From a seamless shopping experience to secure payment options, we ensure that every part of your journey with us is safe and enjoyable. With PocketMart, you can rest assured that your groceries will be delivered safely and swiftly, directly to your home. 

Experience the future of grocery shopping with PocketMart – Where quality meets convenience.
          </AboutText>
          <FounderInfo>
            <FounderTitle>Trisha Ragoobur</FounderTitle>
            <AboutText>Owner and Founder</AboutText>
          </FounderInfo>
        </TextSection>
        <AboutImage src={aboutUsImage} alt="About Us" />
      </ContentWrapper>
      <ContactUsContainer>
        <ContactDetails>
          <ContactTitle>Contact us</ContactTitle>
          <ContactText>
            Donec ornare lacinia nulla, id ornare ligula euismod nec. Mauris pulvinar tincidunt ante. Vivamus sit amet augue...
          </ContactText>
          <SocialIcons>
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedinIn />
          </SocialIcons>
          <Address>
            <FaMapMarkerAlt />
           Mahebourg
          </Address>
          <Address>
            <FaClock />
          7/7
          </Address>
          <Address>
            <FaPhoneAlt />
           631 1234
          </Address>
        </ContactDetails>
        <Map
  src="https://maps.google.com/maps?q=Mahebourg%2C%20Mauritius&t=&z=13&ie=UTF8&iwloc=&output=embed"
  allowFullScreen
/>
      </ContactUsContainer>
    </AboutUsContactContainer>
  );
};

export default AboutUs;
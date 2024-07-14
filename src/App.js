// src/App.js
import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import MainBanner from './components/MainBanner';
import Testimonials from './components/Testimonials';
import FeaturesInfo from './components/FeaturesInfo';
import Footer from './components/Footer';
import ShopMainPage from './components/ShopMainPage';
import AboutUs from './components/AboutUs';
import ShoppingComponent from './components/ShoppingComponent ';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import CartComponent from './components/CartComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';
import UserTypeLogger from './components/UserTypeLogger'; // Import UserTypeLogger
import { Toaster } from 'sonner'; // Import Toaster
import ProductDetailsComponent from './components/ProductDetailsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePage from './components/ProfileComponent'; 
import OrderHistory from './components/OrderHistory';
import OrderTracking from './components/OrderTrack';
import PaymentPage from './components/PaymentPage';
import CheckoutForm from './components/CheckoutForm';
const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrap = styled.div`
  flex: 1;
`;

function App() {
  return (
    <AuthProvider>
      <Router>
        <UserTypeLogger /> {/* Include UserTypeLogger */}
        <Toaster richColors /> {/* Include Toaster */}
        <PageLayout>
          <Navbar />
          <ContentWrap>
            <Routes>
              <Route path="/" element={
                <>
                  <MainBanner />
                  <Testimonials />
                  <FeaturesInfo />
                </>
              } />
              <Route path="/shop" element={<ShopMainPage />} />
              <Route path="/category/:categoryid/:categoryName" element={<ShoppingComponent />} />
              <Route path="/product/:productName" element={<ProductDetailsComponent />} />
              <Route path="/profile" element={<ProfilePage />} />

              <Route path="/about" element={<AboutUs />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/cart" element={<CartComponent />} />
              <Route path="/OrderHistory" element={<OrderHistory />} />
              <Route path="/OrderTracking" element={<OrderTracking />} />
              <Route path="/PaymentPage" element={<PaymentPage />} />
              <Route path="/CheckoutForm" element={<CheckoutForm />} />

              {/* Add more routes as needed */}
            </Routes>
          </ContentWrap>
          <Footer />
        </PageLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #267D34;
  padding: 0 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #FFF;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #267D34;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  color: #FFF;
  transition: color 0.3s;
  position: relative;

  &:hover {
    color: #f60;
  }

  & > a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const DropdownMenu = styled.ul`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #73D77E;
  padding: 1rem;
  border-radius: 8px;
  list-style: none;
  margin: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 20;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #267D34;
  transition: color 0.3s;

  &:hover {
    color: #f60;
  }

  & > a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid #FFF;
  color: #FFF;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 20px;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: #FFF;
    color: #267D34;
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  color: #FFF;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navbar({ onAboutClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  return (
    <Nav>
      <Logo>Logo</Logo>
      <HamburgerMenu onClick={toggleMenu}>
        {showMenu ? <CloseIcon /> : <MenuIcon />}
      </HamburgerMenu>
      <NavList show={showMenu}>
        <NavItem>
          <Link to="/"><HomeIcon /> Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/shop"><ShoppingCartIcon /> Shop</Link>
        </NavItem>
        <NavItem onClick={toggleDropdown}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AccountCircleIcon /> My Corner
          </div>
          <DropdownMenu show={showDropdown}>
            <DropdownItem><Link to="/profile">My Profile</Link></DropdownItem>
            <DropdownItem><Link to="/OrderHistory">My Order History</Link></DropdownItem>
            <DropdownItem><Link to="/cart">My Cart Item</Link></DropdownItem>
            <DropdownItem><Link to="/OrderTracking">Track Order</Link></DropdownItem>
          </DropdownMenu>
        </NavItem>
        <NavItem>
          <Link to="/about"><InfoIcon /> About Us</Link>
        </NavItem>
        <ButtonsContainer show={showMenu}>
          <Button><Link to="/register">Register</Link></Button>
          <Button><Link to="/login">Login</Link></Button>
        </ButtonsContainer>
      </NavList>
    </Nav>
  );
}

export default Navbar;

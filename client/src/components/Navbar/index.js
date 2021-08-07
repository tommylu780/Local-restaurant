
import React, { useState } from "react";
import styled from "styled-components";


const Navbar = () => {
  // function showLogin() {
  //   if(Auth.loggedIn()){
  //     return (
  //       <>
  //       <MenuLink to="/orderHistory">Order History</MenuLink>
  //       <MenuLink href="/" onClick={() => Auth.logout()}>Logout</MenuLink>
  //       </>
  //     )
  //   }else{
  //     <>
  //       <MenuLink to="/signup">Signup</MenuLink>
  //       <MenuLink href="/login" onClick={() => Auth.logout()}>Login</MenuLink>
  //     </>
  //   }
  // }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <Logo href="/">
        Local<span>Restaurant</span>
      </Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink href="/">Signup</MenuLink>
        <MenuLink href="/shop">Shop</MenuLink>
      </Menu>
    </Nav>
  );
};

export default Navbar;

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  &:hover {
    color: #ffc500;
  }
`;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #e31837;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #fff;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
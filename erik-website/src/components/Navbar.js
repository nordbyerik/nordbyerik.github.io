import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #61dafb;
  padding: 10px;
`;

const Navbar = () => (
  <Nav>
    <Link to="/">Home</Link> | <Link to="/education">Education</Link> | <Link to="/work">Work Experience</Link> | <Link to="/portfolio">Portfolio</Link>
  </Nav>
);

export default Navbar;

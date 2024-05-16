import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #282c34;
  padding: 10px;
  color: white;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; 2024 Your Name</p>
  </FooterContainer>
);

export default Footer;

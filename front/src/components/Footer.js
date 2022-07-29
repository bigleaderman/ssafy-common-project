import React from 'react';
import styled from 'styled-components';
import '../style.js';
import '../color.css';

const Footer = (props) => {
  return (
    <FooterContainer>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
    position: fixed;
    width: 100%;
    bottom: 0px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    padding: 0 40px 0 40px;
    height: 30px;
    background-color: var(--color-5);
`

export default Footer;

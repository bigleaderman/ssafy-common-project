import React from 'react';
import styled from 'styled-components';
import '../style.js';
import '../color.css';

const Footer = (props) => {
  return (
    <FooterContainer>
      Designed by Gun
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
    color:#cccccc;
    font-size:12px;
    font-weght:300;
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
    background-color: rgba(0,0,0,0);
`

export default Footer;

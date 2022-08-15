import React from "react";
import { Container, styleButton } from '../style.js';
import styled from 'styled-components';
import { Link } from  "react-router-dom";


const WelcomeMessagePage = (props) => {
  return (
    <Container>
      <Content>
        <div>
          <h4>환영합니다!</h4>
          <br />
          <span>
          <p>모두의 마피아에 가입되었습니다.</p>
          </span>
          <br />
        </div>
      </Content>
      <Link style={styleButton} to="/">메인으로</Link>
    </Container>
  )
};

const Content = styled.div`
  color: #dddddd;
  overflow: hidden;
  display: block;
  text-align: center;
`

export default WelcomeMessagePage;
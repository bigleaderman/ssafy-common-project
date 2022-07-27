import React from "react";
import { Container, styleButton } from '../style.js';
import { Link } from  "react-router-dom";

const MainPage = (props) => {
  return (
    <Container>
      <span>MainPage</span>
      <Link style={styleButton} to="/board">공지사항</Link>
    </Container>
  );
};

export default MainPage;



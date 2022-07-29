import React from "react";
import { Container, styleButton } from '../style.js';
import { Link } from  "react-router-dom";
import RoomList from '../components/RoomList';

const MainPage = (props) => {
  return (
    <Container>
      <span>메인 페이지</span>
      
      <RoomList />
      <Link style={styleButton} to="/board">공지사항</Link>
    </Container>
  );
};

export default MainPage;



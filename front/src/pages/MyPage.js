import React from "react";
import styled from 'styled-components';
import { Container, Button } from '../style.js';


const MyPage = (props) => {
  return (
    <Container>
      <span>MyPage</span>
      <Content>
        <label for="email">이메일</label>
        <input id="email" name="email"></input>
        <Button>중복검사</Button>
      </Content>
      <Content>
        <label for="nickname">닉네임</label>
        <input id="nickname" name="nickname"></input>
        <Button>중복검사</Button>
      </Content>
      <Content>
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password"></input>
      </Content>
      <Content>
        <label for="password-check">비밀번호 확인</label>
        <input type="password" id="password-check" name="password-check"></input>
      </Content>
      <Content>
        <label>가입일자 </label>
        <span id="signup-date">2022.07.25</span>
      </Content>
      <Content>
        <div id="record">
          <label>전적 </label>
          <span>17</span>
          <span>승 </span>
          <span>5</span>
          <span>패 </span>
          <span>77.3</span>
          <span>%</span>
        </div>
      </Content>
      <span>당신은 Red User입니다. 매너있는 게임 플레이를 해주세요.</span>
      <span>
        <Button>정보 수정</Button>
        <Button>탈퇴하기</Button>
        <Button>뒤로 가기</Button>
      </span>
    </Container>
  );
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default MyPage;
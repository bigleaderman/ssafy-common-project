import React from "react";
import styled from 'styled-components';
import { Container, Button } from '../style.js';


const ConfirmWithdrawalModal = (props) => {
  return (
    <Modal>
        <span>탈퇴하시겠습니까?</span>
        <Content>
            <input type="password" id="password" name="password"></input>
            <Button>탈퇴</Button>
            <Button onClick={() => {props.setOpenModal(false)}}>취소</Button>
        </Content>
    </Modal>
  );
};

const Modal = styled.div`
  width: 720px;
  height: 360px;
  overflow: hidden;
  position: fixed;
  text-align: center;
  background-color: var(--color-2);
`

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default ConfirmWithdrawalModal;
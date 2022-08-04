import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from  "react-router-dom";
import { logout } from "../redux/slice/UserSlice";
import { Container, styleButton, styleModal } from '../style.js';
import { Modal, Box, Button } from '@mui/material';
import axios from 'axios';


const SignOutPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(state => state.user.accessToken);
  const [modalOpened, setModalOpened] = useState(!!token);

  const handleLogoutClose = () => {
    setModalOpened(false);
    navigate("/");
  };
  
  useEffect(() => {
    if (!modalOpened && !token) {
      navigate("/");
    } else if (!!token) {
      axios({
        method: 'delete',
        url: '/api/user/logout',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(response => {
        // console.log(response.status);
        dispatch(logout());
      })
      .catch(error => {
        console.log(error);
      })
    }
  })
  
  return(
    <Container>
      <Modal
        open={modalOpened}
        onClose={handleLogoutClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{ ...styleModal, width: 400 }}>
          <h2 id="modal-title">로그아웃되었습니다.</h2>
          <Button style={styleButton} onClick={handleLogoutClose}>확인</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default SignOutPage;
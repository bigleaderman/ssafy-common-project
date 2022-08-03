import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from  "react-router-dom";
import { logout } from "../redux/slice/UserSlice";
import { Container, styleButton, styleModal } from '../style.js';
import { Modal, Box, Button } from '@mui/material';

const SignOutPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(useSelector(state => state.user.accessToken) ? true : false);

  const handleLogoutClose = () => {
    setIsLoggedIn(false);
    navigate("/");
  };
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    dispatch(logout());
  })
  
  return(
    <Container>
      { isLoggedIn ?
        <Modal
          open={isLoggedIn}
          onClose={handleLogoutClose}
          aria-labelledby="modal-title"
        >
          <Box sx={{ ...styleModal, width: 400 }}>
            <h2 id="modal-title">로그아웃되었습니다.</h2>
            <Button style={styleButton} onClick={handleLogoutClose}>확인</Button>
          </Box>
        </Modal>
      : null }
    </Container>

  );
};

export default SignOutPage;
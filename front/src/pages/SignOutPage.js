import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/UserSlice";
import { Container, middleButton, styleModal } from "../style.js";
import { Modal, Box, Button } from "@mui/material";
import axios from "axios";

const SignOutPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.accessToken);
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
        method: "delete",
        url: "/api/user/logout",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then(() => {
          // console.log(response.status);
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(logout());
    }
  });

  return (
    <Container>
      <Modal open={modalOpened} onClose={handleLogoutClose} aria-labelledby='modal-title'>
        <Box sx={{ ...styleModal, border: '2px solid #999', width: 400, height:150, backgroundColor:'rgba(50,50,50,0.3)'}}>
          <h2 style={{ color: '#dcdcdc'}} id='modal-title'>로그아웃되었습니다.</h2>
          <Button sx={{...middleButton, position:'relative', left:105, marginTop:2}} onClick={handleLogoutClose}>
            확인
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default SignOutPage;

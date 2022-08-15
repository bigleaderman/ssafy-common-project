import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Paper, Container } from '@mui/material';
import { styleButton } from "../style.js";
import MenuIcon from "@mui/icons-material/Menu";

export default function SwipeableTemporaryDrawer() {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user.authority) === "ROLE_ADMIN" ? true : false;
  const token = useSelector((state) => state.user.accessToken);
  const goMainPage = () => {
    navigate("/");
  };
  // const goSignUpPage = () => {
  //     navigate("/signup");
  // };
  const goSignInPage = () => {
    navigate("/signin");
  };
  const goSignOutPage = () => {
    navigate("/signout");
  };
  const goMyPage = () => {
    navigate("/mypage");
  };
  const goUserListPage = () => {
    navigate("/userlist");
  };
  const goNoticeListPage = () => {
    navigate("/board");
  };
  const goRankPage = () => {
    navigate("/rankpage")
  }

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250, height:'100%' }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ backgroundColor: "rgba(0,0,0, 0.68)", height:'100%'}}>
        {token ? (
          <>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}}  onClick={goMainPage}>HOME</ListItemButton>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}}  onClick={goNoticeListPage}>공지사항</ListItemButton>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}}  onClick={goRankPage}>랭킹페이지</ListItemButton>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}}  onClick={goMyPage}>마이페이지</ListItemButton>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}}  onClick={goSignOutPage}>로그아웃</ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}} onClick={goMainPage}>HOME</ListItemButton>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}} onClick={goNoticeListPage}>공지사항</ListItemButton>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}} onClick={goRankPage}>랭킹페이지</ListItemButton>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}} onClick={goSignInPage}>로그인</ListItemButton>
          </>
        )}
        <Divider />
        {isAdmin ? (
          <>
            <ListItemButton style={{color:"#dcdcdc", fontSize:25}} onClick={goUserListPage}>유저 관리</ListItemButton>
          </>
        ) : null}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <Fragment key={anchor}>
          <Button
            onMouseOver={toggleDrawer(anchor, true)}
            style={{ position: "absolute", top: "5px", left: "5px", padding: "0", width: "100px",fontSize: "130%",
            color: "white"}}
          >MENU
          </Button>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            style={{backgroundColor: "rgba(0,0,0, 0.3)"}}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
}

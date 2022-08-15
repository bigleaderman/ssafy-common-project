import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableContainer,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";

import axios from "axios";

function Friends({ friends, sendF }) {
  const me = useSelector((state) => state.user);

  // 1. 친구 누르면 (친구 전적 보기 + 친구 삭제)
  const [ff, setFf] = useState([]); // 친구 정보
  // 친구 누르면 dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(0);
  const handleClick = (fri, target) => {
    setOpen(1);
    setFf(fri);
    setAnchorEl(target.currentTarget);
  };
  // 친구 누를 때 나타나는 창 닫기
  const handleClose = () => {
    setOpen(0);
    setAnchorEl(null);
  };
  // 2. 유저 전적 보기
  const [nameColor, setNameColor] = useState(""); // 레드유저?
  const userProfile = () => {
    axios({
      method: "post",
      url: "/api/user/findUserByNickname",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${me.accessToken}`,
      },
      data: ff.nickname,
    }).then((res) => {
      setOpen(0);
      setOpen(3);
      setFf(res.data);
      if (res.data.redUser) {
        setNameColor("red");
      } else {
        setNameColor('')
      }
    });
  };
  // 3. 친구 삭제
  const sendFriend = () => {
    const data = {
      header: {
        type: "delete",
      },
      data: {
        friendSeq: ff.friendSeq,
        from: me.nickname,
        to: ff.nickname,
      },
    };
    sendF(ff.nickname, data);
  };

  return (
    <Box sx={{ minHeight: "408px" }}>
      <TableContainer style={{ padding: "20px", height: "407px", backgroundColor: "rgba(0,0,0,0)","&::WebkitScrollbar": {
            width: 20
            },
            "&::WebkitScrollbarTrack": {
            backgroundColor: "rgba(0,0,0,0.5)"
            },
            "&::WebkitScrollbarThumb": {
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: '1px'
            } }} component={Paper}>
        <Table size='medium'>
          <TableBody>
            {friends &&
              friends.map((f, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ p: 0 }}>
                    <Button
                      sx={{ width: "100%", color:"#ccc" }}
                      id='demo-positioned-button'
                      aria-controls={open ? "demo-positioned-menu" : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(f, e)}
                    >
                      {f.nickname}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 친구 */}
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open === 1}
        onClose={handleClose}
        // anchorOrigin={{
        //   vertical: "top",
        //   horizontal: "left",
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "left",
        // }}
      >
        <MenuItem onClick={userProfile}>전적 보기</MenuItem>
        <MenuItem
          onClick={() => {
            sendFriend();
            handleClose();
          }}
        >
          친구 삭제
        </MenuItem>
      </Menu>
      {/* 전적보기 */}
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open === 3}
        onClose={handleClose}
        // anchorOrigin={{
        //   vertical: "top",
        //   horizontal: "left",
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "left",
        // }}
      >
        <div style={{width:220, backgroundColor:'rgba(220,220,220,0.1)', height:'100%', padding:0}}>
          <h2 style={{ color: nameColor, marginLeft:10, marginBottom:10, textAlign:'left' }}>{ff.nickname}</h2>
          <p style={{fontWeight:'bolder', marginLeft:10, fontSize:20}}><span style={{marginRight:10}}>Win</span><span style={{position:'relative', left:63}}>{ff.winCount}</span></p>
          <p style={{fontWeight:'bolder', marginLeft:10, fontSize:20}}><span style={{marginRight:10}}>Lose</span><span style={{position:'relative', left:52}}>{ff.loseCount}</span></p>
          <p style={{fontWeight:'bolder', marginLeft:10, fontSize:20}}><span style={{marginRight:10}}>RankPoint</span>{ff.rankPoint}</p>
          {/* <p>Lose   {ff.loseCount}</p>
          <p>RankPoint   {ff.rankPoint}</p> */}
        </div>
      </Menu>
    </Box>
  );
}
export default Friends;

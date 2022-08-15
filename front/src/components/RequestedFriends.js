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
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

import axios from "axios";

function RequestedFriends({ requestedList, sendF }) {
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
  // 3. 친구 수락/거절
  const handleYesNo = (fri, target) => {
    setOpen(2);
    setFf(fri);
    setAnchorEl(target.currentTarget);
  };

  // 4. 친구 수락
  const acceptFriend = () => {
    const data = {
      header: {
        type: "offer-accept",
      },
      data: {
        friendSeq: ff.friendSeq,
        from: me.nickname,
        to: ff.nickname,
      },
    };
    sendF(ff.nickname, data);
  };
  // 5. 친구 거절
  const rejectFriend = () => {
    const data = {
      header: {
        type: "offer-deny",
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
      <TableContainer style={{ padding: "20px", height: "407px",backgroundColor: "rgba(0,0,0,0)" ,"&::WebkitScrollbar": {
            width: 20
            },
            "&::WebkitScrollbarTrack": {
            backgroundColor: "rgba(0,0,0,0.5)"
            },
            "&::WebkitScrollbarThumb": {
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: '1px'
            }}} component={Paper}>
        <Table size='medium'>
          <TableBody>
            {requestedList &&
              requestedList.map((f, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ p: 0 }}>
                    <Stack direction='row'>
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
                      <Button
                        sx={{ width: "10%" }}
                        id='demo-positioned-button'
                        aria-controls={open ? "demo-positioned-menu" : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleYesNo(f, e)}
                      >
                        O/X
                      </Button>
                    </Stack>
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
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={userProfile}>전적 보기</MenuItem>
      </Menu>
      {/* 친구 수락/거절 */}
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open === 2}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            acceptFriend();
            handleClose();
          }}
        >
          친구 수락
        </MenuItem>
        <MenuItem
          onClick={() => {
            rejectFriend();
            handleClose();
          }}
        >
          친구 거절
        </MenuItem>
      </Menu>
      {/* 전적보기 */}
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open === 3}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div style={{ margin: 10 }}>
          <div style={{ color: nameColor }}>{ff.nickname}</div>
          <br />
          이긴 횟수: {ff.winCount}
          <br />진 횟수: {ff.loseCount}
          <br />
          랭크포인트 : {ff.rankPoint}
        </div>
      </Menu>
    </Box>
  );
}
export default RequestedFriends;

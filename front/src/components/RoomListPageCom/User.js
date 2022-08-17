import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Button,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

import { useSelector } from "react-redux";

import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blueGrey[50],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});



function User({ loginUser, sendF }) {
  const me = useSelector((state) => state.user);
  const friendList = useSelector((state) => state.friendList);

  const loginUsers = loginUser.filter((e) => e.nickname !== me.nickname); // 로그인 유저 목록에서 내 이름 빼기

  // 1. 유저 검색
  const [search, setSearch] = useState("");
  const [nick, setNick] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  // 유저 검색 (버튼 눌러서, 엔터)
  const searchUser = () => {
    axios({
      method: "post",
      url: "/api/user/findUserByNicknameElement",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${me.accessToken}`,
      },
      data: search,
    })
      .then((res) => {
        // 내 자신은 빼고
        if (res.data.length !== 0) {
          const data = res.data.filter((e) => e.nickname !== me.nickname);
          setNick(data);
          setSearchResult(true);
        } else {
          setSearchResult(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 1-1.엔터 키 입력
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter" && search) {
      searchUser();
    }
  };

  // 2. 유저 누르면 (친구면 전적보기만, 친구가 아니면 전적보기 + 친구신청)
  const [ff, setFf] = useState([]); // 유저 정보
  // 유저 누르면 dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(0);

  const handleClick = (fri, target) => {
    const friendYesNo = friendList.filter((e) => e.nickname === fri.nickname);
    // 내친구인가?
    if (friendYesNo.length !== 0) {
      setOpen(2); // 내친구
    } else {
      setOpen(1); // 친구 아님
    }
    setFf(fri);
    setAnchorEl(target.currentTarget);
  };
  // 유저 누를 때 나타나는 창 닫기
  const handleClose = () => {
    setOpen(0);
    setAnchorEl(null);
  };

  // 3. 유저 전적 보기
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
        setNameColor("");
      }
    });
  };

  // 4. 친구 신청
  const sendFriend = () => {
    const data = {
      header: {
        type: "offer",
      },
      data: {
        friendSeq: "null",
        from: me.nickname,
        to: ff.nickname,
      },
    };
    sendF(ff.nickname, data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "374px" }}>
        <Stack
          sx={{ m: 1 }}
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
        >
          <TextField
            InputProps={{
              sx: {
                "& input": {
                  color: "#ccc",
                },
                height: "30px",
              },
            }}
            sx={{
              minHeight: "30px",
              maxHeight: "30px",
              border: "rgba(255,255,255) 1px solid",
              borderRadius: "2px",
            }}
            fullWidth
            id='outlined-textarea'
            placeholder='UserSearch'
            variant='outlined'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyPress={handleOnKeyPress}
            size='small'
          />
          {searchResult === "" ? (
            <Button
              sx={{
                width: "20%",
                minHeight: "30px",
                maxHeight: "30px",
                color: "rgba(255,255,255)",
                border: "rgba(255,255,255) 1px solid",
                borderRadius: "2px",
              }}
              size='small'
              variant='outlined'
              onClick={() => {
                searchUser();
              }}
            >
              <SearchIcon />
            </Button>
          ) : (
            <Button
              sx={{
                minHeight: "30px",
                maxHeight: "30px",
                width: "20%",
                color: "rgba(255,255,255)",
                border: "rgba(255,255,255) 1px solid",
                borderRadius: "2px",
              }}
              size='small'
              variant='outlined'
              onClick={() => {
                setSearchResult("");
              }}
            >
              <ClearIcon />
            </Button>
          )}
        </Stack>
        <div>
          {searchResult === "" ? (
            <TableContainer
              style={{
                padding: "10px",
                height: "335px",
                backgroundColor: "rgba(0,0,0,0)",
              }}
              sx={{
                "&::-webkit-scrollbar": {
                  width: 15,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "black",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "white",
                  borderRadius: '1px',
                },
              }}
              component={Paper}
            >
              <Table size='medium'>
                <TableBody>
                  {loginUsers &&
                    loginUsers.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ p: 0, border: "rgba(0,0,0,0) 1px solid" }}>
                          <Button
                            sx={{ width: "100%", color: "#ccc", fontSize: "20px", mt: "2px" }}
                            id='demo-positioned-button'
                            aria-controls={open ? "demo-positioned-menu" : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => handleClick(user, e)}
                            style={{ justifyContent: "flex-start" }}
                          >
                            {user.nickname}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : searchResult === true ? (
            <TableContainer
              style={{ padding: "10px", minHeight: "323px", backgroundColor: "rgba(0,0,0,0)" }}
              component={Paper}
              sx={{
                "&::-webkit-scrollbar": {
                  width: 15,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "black",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "white",
                  borderRadius: '1px',
                },
              }}
            >
              <Table size='medium'>
                <TableBody>
                  {nick &&
                    nick.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ p: 0,border: "rgba(0,0,0,0) 1px solid"  }}>
                          <Button
                            sx={{ width: "100%", color: "#ccc" ,fontSize: "20px", }}
                            id='demo-positioned-button'
                            aria-controls={open ? "demo-positioned-menu" : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => handleClick(user, e)}
                            style={{ justifyContent: "flex-start" }}
                          >
                            {user.nickname}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div style={{ color: "white" }}>"존재하지 않는 닉네임 입니다."</div>
          )}
        </div>
        {/* 친구가 아닌사람 */}
        <Menu
          sx={{ height: "100%" }}
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          anchorEl={anchorEl}
          open={open === 1}
          onClose={handleClose}
        >
          <MenuItem onClick={userProfile}>전적 보기</MenuItem>
          <MenuItem
            onClick={() => {
              sendFriend();
              handleClose();
            }}
          >
            친구 신청
          </MenuItem>
        </Menu>
        {/* 친구 */}
        <Menu
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          anchorEl={anchorEl}
          open={open === 2}
          onClose={handleClose}
        >
          <MenuItem onClick={userProfile}>전적 보기</MenuItem>
        </Menu>
        {/* 전적보기 */}
        <Menu
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          anchorEl={anchorEl}
          open={open === 3}
          onClose={handleClose}
          sx={{ height: "100%" }}
        >
          <div
            style={{
              width: 220,
              padding: 10,
              backgroundColor: "rgba(220,220,220,0.1)",
              height: "100%",
            }}
          >
            <h2 style={{ color: nameColor, marginLeft: 10, marginBottom: 10, textAlign: "left" }}>
              {ff.nickname}
            </h2>
            <p style={{ fontWeight: "bolder", marginLeft: 10, fontSize: 20 }}>
              <span style={{ marginRight: 10 }}>승리</span>
              <span style={{ position: "relative", left: 63 }}>{ff.winCount}회</span>
            </p>
            <p style={{ fontWeight: "bolder", marginLeft: 10, fontSize: 20 }}>
              <span style={{ marginRight: 10 }}>패배</span>
              <span style={{ position: "relative", left: 63 }}>{ff.loseCount}회</span>
            </p>
            <p style={{ fontWeight: "bolder", marginLeft: 10, fontSize: 20 }}>
              <span style={{ marginRight: 10 }}>랭크</span>
              <span style={{ position: "relative", left: 63 }}>{ff.rankPoint}점</span>
            </p>
          </div>
        </Menu>
      </Box>
    </ThemeProvider>
  );
}

export default User;

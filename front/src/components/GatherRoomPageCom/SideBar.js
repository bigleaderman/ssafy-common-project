import React, {
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Paper,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";

import axios from "axios";

import { selectUser } from "../../redux/slice/UserSlice";

//socktjs
import SockJS from "sockjs-client";

//redux
import { useSelector, useDispatch } from "react-redux";
import {} from "../../redux/slice/UserSlice";

const StompJs = require("@stomp/stompjs");

//===================================================
//about mui tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//end mui tabs
//===================================================

export const SideBar = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    onMessageReceived,
  }));
  const roomNum = useSelector((state) => state.roomNum);
  const pubAddr = `/sub/room/${roomNum}`;
  const myNickName = useSelector(selectUser).nickname;
  const [value, setValue] = useState(0);
  const [chats, setChats] = useState([]);
  const [userList, setUserList] = useState([]);
  const acToken = useSelector(selectUser).accessToken;
  props.client.webSocketFactory = () => {
    return new SockJS("https://i7d106.p.ssafy.io:8080/ws");
  };

  //채팅과 유저목록만 입력받음
  const onMessageReceived = (payload) => {
    let parsedData = JSON.parse(payload.body);
    // console.log("↓↓↓in SideBar payload↓↓↓");
    // console.log(parsedData);
    if (parsedData.header.type === "chat") {
      chats.push({ nickname: parsedData.data.nickname, message: parsedData.data.message });
      setChats([...chats]);
    } else if (parsedData.header.type === "list") {
      console.log("SideBar user list: ", parsedData.data.users);
      setUserList([...parsedData.data.users]);
    } else if (parsedData.header.type === "join") {
      console.log("check user join: ", parsedData.data);
    } else if (parsedData.header.type === "leave") {
      console.log("check user leave: ", parsedData.data);
      let tmp = userList.filter((user) => {
        return user.nickname !== parsedData.data.nickname;
      });
      setUserList(tmp);
    }
  };

  const sendData = (data) => {
    props.client.publish({
      destination: pubAddr,
      headers: { "content-type": "application/json", token: acToken },
      body: JSON.stringify({
        header: {
          type: "chat",
        },
        data: {
          nickname: data.nickname,
          message: data.message,
        },
      }),
      skipContentLengthHeader: true,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: "600px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          TabIndicatorProps={{ style: { background: "rgba(255,255,255)" } }}
          value={value}
          onChange={handleChange}
        >
          <Tab sx={{ width: "33%" }} style={{ color: "#ccc" }} label='채팅' {...a11yProps(0)} />
          <Tab
            sx={{ width: "33%" }}
            style={{ color: "#ccc" }}
            label='대기실 유저'
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      {value === 0 ? (
        <ChatBar sendData={sendData} chats={chats} />
      ) : (
        <UserBar userList={userList} />
      )}
    </Box>
  );
});

export default SideBar;

//https://mui-treasury.com/components/chat-msg/ 채팅창 참고

//채팅 컴포넌트
const ChatBar = (props) => {
  console.log("chat rerender");
  const myNickName = useSelector(selectUser).nickname;
  useEffect(() => {
    document.getElementById("text").addEventListener("keydown", ({ key, composed, target }) => {
      if (key === "Enter" && composed) {
        props.sendData({ nickname: myNickName, message: target.value });
        target.value = "";
      }
    });

    return () => {};
  }, []);
  // 채팅 스크롤 아래로 고정
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [props]);

  return (
    <Box sx={{ p: 0.5 }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          p: 0.5,
          minHeight: "550px",
          maxHeight: "550px",
          backgroundColor: "rgba(0,0,0,0)",

          "&::-webkit-scrollbar": {
            width: 15,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "black",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "white",
            borderRadius: "1px",
          },
        }}
      >
        <Table>
          <TableBody ref={scrollRef} sx={{ p: 0 }}>
            {props.chats &&
              props.chats.map((data, index) => (
                <TableRow key={index} sx={{ p: 0 }}>
                  <TableCell
                    sx={{
                      fontSize: "20px",
                      p: 0.5,
                      color: "#ccc",
                      border: "rgba(0,0,0,0) 1px solid",
                    }}
                  >
                    {data.nickname} : {data.message}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <input
        id='text'
        type='text'
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          color: "#ffffff",
          marginBottom: 2,
          marginTop: 0,
          height: "40px",
          border: "rgba(255,255,255) 1px solid",
          borderRadius: "2px",
          textAlign:'left',
          paddingLeft:'2px'
        }}
      />
    </Box>
  );
};

const UserBar = (props) => {
  console.log("userBar rerender");
  const me = useSelector((state) => state.user);
  const friendList = useSelector((state) => state.user);

  // 1. 유저 누르면 (친구면 전적보기만, 친구가 아니면 전적보기 + 친구신청)
  const [ff, setFf] = useState([]); // 유저 정보
  // 유저 누르면 dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(0);

  const handleClick = (fri, target) => {
    const friendYesNo = Array.from(friendList).filter((e) => e.nickname === fri.nickname);
    // 내친구인가?
    if ((friendYesNo.length !== 0) | (fri.nickname === me.nickname)) {
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
      console.log("여기를봐용", res.data);
      if (res.data.redUser) {
        setNameColor("red");
      } else {
        setNameColor("");
      }
    });
  };
  // 3. 친구신청
  const sendFriend = () => {
    console.log('친구친구',ff)
    axios({
      method: "post",
      url: "/api/user/friend/request",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${me.accessToken}`,
      },
      data: ff.userSeq,
    }).then((res) => console.log("친구 신청 성공"));
  };
  return (
    <>
      <TableContainer
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
        style={{ padding: "20px", height: "600px", backgroundColor: "rgba(0,0,0,0)" }}
        component={Paper}
      >
        <Table size='medium'>
          <TableBody>
            {props.userList.map((user, index) => (
              <TableRow key={index}>
                <TableCell sx={{ p: 0 ,border: "rgba(0,0,0,0) 1px solid"}}>
                  <Button
                    sx={{ width: "100%", color: "#ccc",fontSize:'20px',mt:'2px', }}
                    id='demo-positioned-button'
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => handleClick(user, e)}
                    style={{justifyContent: "flex-start", }}
                  >
                    {user.nickname}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableContainer,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[50],
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

function Chat({ Chats, sendChat }) {
  const me = useSelector((state) => state.user);

  // 채팅 스크롤 아래로 고정
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [Chats]);

  // 내가 보내는 채팅
  const [myChat, setMyChat] = useState({
    header: {
      type: "chat",
    },
    data: {
      nickname: me.nickname,
      message: "",
    },
  });

  // 1. 채팅 적기
  const handleMessage = (event) => {
    const { value } = event.target;
    setMyChat({
      ...myChat,
      data: {
        nickname: me.nickname,
        message: value,
      },
    });
  };

  // 2. 채팅 전송(버튼 누르기, 엔터)
  const sendMyChat = () => {
    if (myChat.data.message) {
      sendChat(myChat);
    }
    setMyChat({
      ...myChat,
      data: {
        nickname: me.nickname,
        message: "",
      },
    });
  };

  // 2-1. 엔터 키 입력으로 채팅 전송하기
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter" && myChat.data.message) {
      sendMyChat(myChat); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          p: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          border: "rgba(0,0,0) 1px solid",
          borderRadius: "2px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            height: "145px",
            mb: 1,
            backgroundColor: "rgba(0,0,0,0)",
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
          <Table>
            <TableBody ref={scrollRef}>
              {Chats &&
                Chats.map((chat, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        fontSize: "20px",
                        p: 0.5,
                        color: "#ccc",
                        border: "rgba(0,0,0,0) 1px solid",
                      }}
                    >
                      {chat.data.nickname} : {chat.data.message}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
          <TextField
            InputProps={{
              sx: {
                "& input": {
                  color: "#ccc",
                },
              },
            }}
            sx={{ border: "rgba(255,255,255) 1px solid", borderRadius: "2px" }}
            fullWidth
            id='outlined-basic'
            placeholder='Chat'
            size='small'
            value={myChat.data.message}
            onChange={(e) => {
              handleMessage(e);
            }}
            onKeyPress={(e) => {
              handleOnKeyPress(e);
            }}
          />
          <Button
            variant='outlined'
            sx={{
              width: "20%",
              minHeight: "43px",
              color: "rgba(255,255,255)",
              border: "rgba(255,255,255) 1px solid",
              borderRadius: "2px",
            }}
            onClick={sendMyChat}
          >
            send
          </Button>
        </Stack>
      </Paper>
    </ThemeProvider>
  );
}
export default Chat;

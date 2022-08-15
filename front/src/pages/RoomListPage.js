import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";

import Nav from "../components/RoomListPageCom/Nav";
import SideBar from "../components/RoomListPageCom/SideBar";
import RoomList from "../components/RoomListPageCom/RoomList";
import MyProfile from "../components/RoomListPageCom/MyProfile";
import Chat from "../components/RoomListPageCom/Chat";

// 소켓
import SockJS from "sockjs-client";
import { over } from "stompjs";

// 리덕스
import { useSelector } from "react-redux";

var stompClient = null;
function RoomListPage() {
  const me = useSelector((state) => state.user);
  let headers = {
    token: `${me.accessToken}`,
  };

  // 소켓 : roomListPage 들어오면 연결 + roomListPage 나가면 해지
  useEffect(() => {
    connect();
    return () => {
      stompClient.disconnect();
    };
  }, []);
  const connect = () => {
    let Sock = new SockJS("https://i7d106.p.ssafy.io:8080/ws");
    stompClient = over(Sock);
    stompClient.debug = null;
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    stompClient.subscribe("/sub/lobby", receivedLobby); // 1. 받는 데이터 : 로비에서 채팅 + 로그인유저 목록
    const data = {
      header: {
        type: "join",
      },
      data: {
        token: me.accessToken,
        nickname: me.nickname,
      },
    };
    stompClient.send("/pub/lobby", {}, JSON.stringify(data)); // 나의 입장을 알림
    stompClient.subscribe(`/sub/friend/${me.nickname}`, receivedFriend); // 2. 받는 데이터 : 친구 목록 + 나에게 친구신청한 목록
  };
  const onError = (err) => {
    console.log(err);
  };

  // 1.
  // 채팅
  const [Chats, setChats] = useState([]);
  // 로그인 유저 목록
  const [loginUser, setLoginUser] = useState([]);
  // '/sub/lobby'로부터 받은 데이터
  const receivedLobby = (payload) => {
    var payloadData = JSON.parse(payload.body); // JSON 문자열을 JavaScript 객체로 변환
    // 채팅
    if (payloadData.header.type === "chat") {
      Chats.push(payloadData);
      setChats([...Chats]);
    } // 로그인 유저 목록
    else if (payloadData.header.type === "join") {
      setLoginUser(payloadData.data.users);
    }
  };
  // '/pub/lobby'로 채팅 보내기
  const sendChat = (data) => {
    if (stompClient.ws.readyState === 1) {
      // 연결이 되었을 때 보내기
      return stompClient.send("/pub/lobby", headers, JSON.stringify(data));
    }
  };

  // 2.
  // 친구 목록 redux
  const friendList = useSelector((state) => state.friendList);
  const [friends, setFriends] = useState(friendList);
  // 나에게 친구 신청한 목록 redux
  const requestedF = useSelector((state) => state.requestedF);
  const [requestedList, setRequestedList] = useState(requestedF);
  // '/sub/friend/내닉네임'로부터 받은 데이터
  const receivedFriend = (payload) => {
    var payloadData = JSON.parse(payload.body);
    // 친구 목록
    if (payloadData.header.type === "list") {
      setFriends(payloadData.friendResponseDataDto.users);
    } // 나에게 친구 신청한 목록
    else if (payloadData.header.type === "offer-list") {
      setRequestedList(payloadData.friendResponseDataDto.users);
    }
  };
  // '/pub/friend/상대닉네임'로 친구신청/수락/거절/삭제 보내기
  const sendF = (nickname, data) => {
    if (stompClient.ws.readyState === 1) {
      return stompClient.send(`/pub/friend/${nickname}`, headers, JSON.stringify(data));
    }
  };

  return (
    <Container sx={{ height: "100vh", display: "flex", alignItems: "center", minWidth: "1500px" }}>
      <Grid container spacing={1.44}>
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid item xs={2.5}>
          <SideBar
            loginUser={loginUser}
            friends={friends}
            sendF={sendF}
            requestedList={requestedList}
          />
        </Grid>
        <Grid item xs={9.5}>
          <RoomList />
        </Grid>
        <Grid item xs={2.5}>
          <MyProfile />
        </Grid>
        <Grid item xs={9.5}>
          <Chat Chats={Chats} sendChat={sendChat} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default RoomListPage;

import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import {
    Paper,
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import styled from "styled-components";

// <남은 일>
// 닉네임을 받아와야함 : login하면 닉네임이 redux에 저장되니 거기서 가져오자

var stompClient = null;
function Chat() {
    // 채팅 목록
    const [Chats, setChats] = useState([]);
    // 보내는 채팅
    const [userChat, setUserChat] = useState({
        senderNickname: "이름",
        message: "",
    });
    // roomListPage 들어오면 연결
    useEffect(() => {
        connect();
    }, []);

    const connect = () => {
        let Sock = new SockJS("https://i7d106.p.ssafy.io:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe("/sub/lobby-chat", onMessageReceived);
    };

    // 채팅 받기
    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        Chats.push(payloadData);
        setChats([...Chats]);
    };

    const onError = (err) => {
        console.log(err);
    };

    // 채팅 적기
    const handleMessage = (event) => {
        const { value } = event.target;
        setUserChat({ ...userChat, message: value });
    };

    // 채팅 전송
    const sendValue = () => {
        
        if (stompClient) {
            var chatMessage = {
                senderNickname: userChat.senderNickname,
                message: userChat.message,
            };
            stompClient.send("/pub/lobby-chat", {}, JSON.stringify(chatMessage));
            setUserChat({ ...userChat, message: "" });
        }
    };

    return (
        <Paper sx={{width:800, height:'130px'}}>
            <Border>
                <Box sx={{pb:0.5, height:70}}>
                    <UL>
                        {Chats.map((chat, index) => {
                            return (
                                <li key={index}>
                                    <Typography sx={{ mb: 1 }} align="left">
                                        {chat.senderNickname} : {chat.message}
                                    </Typography>
                                </li>
                            );
                        })}
                    </UL>
                </Box>

                <Stack direction="row" sx={{p:0.5}}>
                    <input
                        type="text"
                        style={{height:20,width:'100%'}}
                        value={userChat.message}
                        onChange={handleMessage}
                    />
                    {/* <button onClick={sendValue}>send</button> */}
                    <Button variant="outlined" sx={{ml:1,height:25}} onClick={sendValue}>send</Button>
                </Stack>
            </Border>
        </Paper>
    );
}
const UL = styled.section`
    list-style: none;
    display: flex;
    flex-direction: column;
`;
const Border = styled.section`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin: 0.5em
    
`;

export default Chat;

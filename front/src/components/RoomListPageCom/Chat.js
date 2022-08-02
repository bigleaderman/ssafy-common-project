import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

// <남은 일>
// 닉네임을 받아와야함 : login하면 닉네임이 redux에 저장되니 거기서 가져오자
var stompClient = null;
function Chat() {
    // 채팅 목록
    const [Chats, setChats] = useState([]);
    // 보내는 채팅
    const [userChat, setUserChat] = useState({
        nickname: "이름",
        message: "",
    });
    // roomListPage 들어오면 연결
    useEffect(() => {
        connect();
    }, []);

    const connect = () => {
        let Sock = new SockJS("https://i7d106.p.ssafy.io:8000/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe("/sub/lobby", onMessageReceived);
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
                senderName: userChat.nickname,
                message: userChat.message,
            };
            stompClient.send("/pub/lobby", {}, JSON.stringify(chatMessage));
            setUserChat({ ...userChat, message: "" });
        }
    };

    return (
        <div>
            <div>
                <h1>Chat</h1>
                <ul>
                    {Chats.map((chat, index) => {
                        return (
                            <li key={index}>
                                {chat.senderName} : {chat.message}
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <input
                        type="text"
                        value={userChat.message}
                        onChange={handleMessage}
                    />
                    <button onClick={sendValue}>send</button>
                </div>
            </div>
        </div>
    );
}
export default Chat;


import React, { useState, useRef,useEffect } from "react";
import { Paper, TextField, Container, Button, Grid } from "@mui/material";
import io from "socket.io-client";

function Chat() {
    // 채팅 목록
    const [chats, setChats] = useState([]);
    // 내가 지금 보낼 채팅
    const [chat, setChat] = useState("");

    const socketRef = useRef();

    useEffect(()=>{
        socketRef.current = io.connect('/')
        socketRef.current.on('chatting',(chat) => {
            receivedChat(chat)
        })
    },[])

    // 채팅 받기
    function receivedChat(chat){
        setChats(oldChats => [...oldChats,chat])
    }
    // 채팅 보내기
    function sendChat(){
        const chatInfo = {
            nickname : 'nickname',
            body : chat
        }
        console.log(chatInfo)
        setChat('')
        socketRef.current.emit('chatting',chatInfo)
    }
    function handleChange(e) {
        setChat(e.target.value);
    }
    
    return (
        <Paper>
            <Container>
                <h1>Chat</h1>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        {chats.map((chat,index) => {
                            return (
                                <div key={index}>
                                    {chat.nickname} : {chat.body}
                                </div>
                                
                            )
                        })}
                    </Grid>
                    
                    <Grid item xs={11}>
                        <TextField
                            fullWidth
                            id="outlined-textarea"
                            value = {chat}
                            onChange={handleChange}
                            placeholder="Chat"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="outlined" size="medium" onClick={sendChat}>
                            전송
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}
export default Chat;

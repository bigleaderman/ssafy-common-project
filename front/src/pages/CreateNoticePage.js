import React, { useState } from "react";
import { Container, styleTextField, styleButton } from "../style.js";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"
import axios from 'axios';

const CreateNoticePage = (props) => {
    const navigate = useNavigate();
    const token = useSelector(state=>state.user.accessToken)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const resetForm = () => {
        setTitle("");
        setContent("");
    };

    const goNoticeListPage = () => {
        navigate("/board");
    };

    const createNotice =()=>{
        axios.post('/api/admin/board',{
            content,
            title
        },{
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            navigate(`/board/${response.data.noticeSeq}`);
        })
    }







    return (
        <Container>

            <input
                style={{backgroundColor: "rgba(0,0,0,0.3)", color: "white", width:"70%", height:"5%", textAlign:'left', fontSize:25, height:50, alignItems:'center'}}
                id="title"
                name="title"
                placeholder="제목을 작성하세요"
                value={title}
                
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            ></input>
            <br/>
            <textarea
                style={{backgroundColor: "rgba(0,0,0,0.3)", color: "white", width: "70%", height:"80%", overflow:"auto", fontSize:20, padding:30}}
                id="content"
                name="content"
                placeholder="내용을 작성하세요"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            ></textarea>

            <span>
                <Button sx={{...styleButton, position:'relative', top:30}} onClick={resetForm}>
                    초기화
                </Button>
                <Button sx={{...styleButton, position:'relative', top:30}} onClick={createNotice}>
                    작성 완료
                </Button>
                <Button sx={{...styleButton, position:'relative', top:30}} onClick={goNoticeListPage}>
                    목록으로
                </Button>
            </span>
        </Container>
    );
};

export default CreateNoticePage;

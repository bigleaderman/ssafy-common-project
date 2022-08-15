import React, { useState } from "react";
import { Container, styleTextField, styleButton } from '../style.js';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams, useLocation } from  "react-router-dom";
import {useSelector} from "react-redux"
import axios from "axios";


const UpdateNoticePage = (props) => {

  const {state} = useLocation();

  const token = useSelector(state=>state.user.accessToken)

  const { noticeId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);

  const goNoticeListPage = () => {
    navigate("/board");
  };
  const goNoticeDetailPage = () => {
    navigate(`/board/${noticeId}`);
  };

  const reset = () => {
      setTitle(state.title);
      setContent(state.content);
  }

  const updateNotice = () => {
    axios.put(`/api/admin/board/${noticeId}`,{
      content,
      title
  },{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(goNoticeDetailPage)
  }



  return (
    <Container>

      <input 
      style={{backgroundColor: "rgba(220,220,220,0.3)", width:"70%", color:"white", height:"5%"}} name="title" placeholder="제목" value={title}
       onChange={(e) => {setTitle(e.target.value)}}>
       </input>
       <br/>
      <textarea style={{backgroundColor: "rgba(220,220,220,0.3)", width: "70%",color:"white", height:"80%", overflow:"auto", fontSize:"24px"}}
                id="content" name="content" placeholder="내용" value={content} 
                onChange={(e) => {setContent(e.target.value)}}></textarea>
      <span>
        <Button style={styleButton} onClick={reset}>수정 취소</Button>
        <Button style={styleButton} onClick={updateNotice}>수정 완료</Button>
        <Button style={styleButton} onClick={goNoticeListPage}>목록으로</Button>
      </span>
    </Container>
  );
};

export default UpdateNoticePage;
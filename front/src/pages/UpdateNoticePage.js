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
      <h2>공지사항 수정 페이지</h2>

      <label htmlFor="title">제목</label>
      <TextField style={styleTextField} id="title" name="title" placeholder="제목" value={title} onChange={(e) => {setTitle(e.target.value)}}></TextField>
      <label htmlFor="content">내용</label>
      <TextField style={styleTextField} id="content" name="content" placeholder="내용" value={content} onChange={(e) => {setContent(e.target.value)}}></TextField>
      
      <span>
        <Button style={styleButton} onClick={reset}>수정 취소</Button>
        <Button style={styleButton} onClick={updateNotice}>수정 완료</Button>
        <Button style={styleButton} onClick={goNoticeListPage}>목록으로</Button>
      </span>
    </Container>
  );
};

export default UpdateNoticePage;
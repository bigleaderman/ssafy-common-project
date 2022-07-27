import React, { useState } from "react";
import { Container, styleTextField, styleButton } from '../style.js';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from  "react-router-dom";


const UpdateNoticePage = (props) => {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('제목');
  const [content, setContent] = useState('내용');

  const resetForm = () => {
    setTitle('제목');
    setContent('내용');
  }

  const goNoticeListPage = () => {
    navigate("/board");
  };
  const goNoticeDetailPage = () => {
    navigate(`/board/${noticeId}`);
  };

  return (
    <Container>
      <h2>공지사항 수정 페이지</h2>

      <label htmlFor="title">제목</label>
      <TextField style={styleTextField} id="title" name="title" placeholder="제목" value={title} onChange={(e) => {setTitle(e.target.value)}}></TextField>
      <label htmlFor="content">내용</label>
      <TextField style={styleTextField} id="content" name="content" placeholder="내용" value={content} onChange={(e) => {setContent(e.target.value)}}></TextField>
      
      <span>
        <Button style={styleButton} onClick={goNoticeListPage}>수정 취소</Button>
        <Button style={styleButton} onClick={goNoticeDetailPage}>수정 완료</Button>
        <Button style={styleButton} onClick={goNoticeListPage}>목록으로</Button>
      </span>
    </Container>
  );
};

export default UpdateNoticePage;
import React from "react";
import { Container, styleButton } from '../style.js';
import { useParams } from  "react-router-dom";
import { Button } from '@mui/material';
import { useNavigate } from  "react-router-dom";

const NoticeDetailPage = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  const goNoticeListPage = () => {
    navigate("/board");
  };
  const goUpdateNoticePage = () => {
    navigate(`/board/${noticeId}/update`);
  };

  return (
    <Container>
      <h2>{noticeId}번 게시글 상세 페이지</h2>
      <h3>제목</h3>
      <p>2022.07.27</p>
      <p>내용</p>
      <span>
        <Button style={styleButton} onClick={goUpdateNoticePage}>수정하기</Button>
        <Button style={styleButton} onClick={goNoticeListPage}>삭제하기</Button>
        <Button style={styleButton} onClick={goNoticeListPage}>목록으로</Button>
      </span>
    </Container>
  );
};

export default NoticeDetailPage;
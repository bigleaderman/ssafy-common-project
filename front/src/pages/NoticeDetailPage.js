import React,{useEffect,useState} from "react";
import { Container, styleButton } from '../style.js';
import { useParams } from  "react-router-dom";
import { Button } from '@mui/material';
import { useNavigate } from  "react-router-dom";
import {useSelector} from "react-redux"
import axios from 'axios';



const NoticeDetailPage = () => {

  const [noticeData, setNoticeData] = useState({});
  const token = useSelector(state=>state.user.accessToken)

  const { noticeId } = useParams();
  const navigate = useNavigate();

  const goNoticeListPage = () => {
    navigate("/board");
  };
  const goUpdateNoticePage = () => {
    navigate(`/board/${noticeId}/update`);
  };
  useEffect(() => {
    axios.get(`/api/board/${noticeId}`,{},{
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    .then(response => {
      console.log(response.data);
      setNoticeData(response.data);
    });
  }, []);



  return (
    <Container>
      <h2>{noticeId}번 게시글 상세 페이지</h2>
      <h3>제목:{noticeData.title}</h3>
      <p>작성일자:{noticeData.createAt}</p>
      <p>내용:{noticeData.content}</p>
      <p>작성자:{noticeData.writer}</p>
      <span>
        <Button style={styleButton} onClick={goUpdateNoticePage}>수정하기</Button>
        <Button style={styleButton} onClick={goNoticeListPage}>삭제하기</Button>
        <Button style={styleButton} onClick={goNoticeListPage}>목록으로</Button>
      </span>
    </Container>
  );
};

export default NoticeDetailPage;
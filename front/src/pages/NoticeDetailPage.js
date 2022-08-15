import React,{useEffect,useState} from "react";
import { Container, styleButton } from '../style.js';
import { useParams } from  "react-router-dom";
import { Button } from '@mui/material';
import { useNavigate } from  "react-router-dom";
import {useSelector} from "react-redux"
import axios from 'axios';
import { Box, Stack } from "@mui/system";
import Loading from "../components/Loading.js";



const NoticeDetailPage = () => {

  const [noticeData, setNoticeData] = useState(null);
  const token = useSelector(state=>state.user.accessToken)
  const isAdmin = useSelector((state) => state.user.authority) === "ROLE_ADMIN" ? true : false;

  const { noticeId } = useParams();
  const navigate = useNavigate();

  const goNoticeListPage = () => {
    navigate("/board");
  };

  const deleteNotice = () => {
    axios.delete(`/api/admin/board/${noticeId}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(goNoticeListPage)
  } 

  const goUpdateNoticePage = () => {
    navigate(`/board/${noticeId}/update`, {state : noticeData});
  };
  useEffect(() => {
    axios.get(`/api/board/${noticeId}`,{})
    .then(response => {
      setNoticeData(response.data);
    });
  }, []);




  return (
    <Container style={{fontSize:"24px"}}>
      {noticeData === null ? <Loading /> :<>
        <div style={{
          textAlign:"left",
          overflow:"auto",
          backgroundColor: "rgba(0,0,0,0.3)",
          width:"70%", height:"80%", borderRadius: '15px'}}>
          <h1 style={{color:"#dcdcdc",fontSize:45, marginLeft:48, marginTop:30}} >{noticeData.title}</h1>
          <Box sx={{height:35, alignItems:'center', marginLeft:6, marginY:2}}>
            
            <span style={{color:"#d2d2d2", fontSize:25}} >관리자명</span>
            <span style={{color:"#b4b4b4", fontSize:16}}> | {noticeData.writer}</span>
            <span style={{color:"#b4b4b4", fontSize:16}}> | {(noticeData.createAt+"").substring(0,10)}</span>
          </Box>
          <hr style={{width:1200, position:'relative', left:50}} />
          <br />
          <p
          style={{ color:"#b4b4b4", width:"93%", height:"60%", position:'relative', left:50}}
          >{noticeData.content}</p>
          
        </div>
        <span>
          {isAdmin ? 
          <>
            <Button sx={{...styleButton, position:'relative', top:30}} onClick={goUpdateNoticePage}>수정하기</Button>
            <Button sx={{...styleButton, position:'relative', top:30}} onClick={deleteNotice}>삭제하기</Button>
          </> : null} 
          <Button sx={{...styleButton, position:'relative', top:30}} onClick={goNoticeListPage}>목록으로</Button>
        </span>
      </>}
    </Container>
  );
};

export default NoticeDetailPage;
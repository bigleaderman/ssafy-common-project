import React, { useState,useEffect } from "react";
import { Container, styleTableContainer, styleButton } from '../style.js';
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { useNavigate, useParams } from  "react-router-dom";
import {useSelector} from "react-redux"
import axios from 'axios';


const UserDetailPage = (props) => {

  const token = useSelector(state=>state.user.accessToken)
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [reportedList, setReportedList] = useState([]);
  const [reportingList, setReportingList] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //유저 정보 불러오기
  const getUser = () =>{
    axios.get(`/api/admin/${userId}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(res =>{
      setUser(res.data);
    });
  }
  useEffect(() => {
    getUser();
  }, []);

  //유저를 대상으로한 신고목록 가져오기
  useEffect(() => {
    axios.get(`/api/admin/${userId}/reported-list`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(res =>{
      setReportedList(res.data);
    });
  }, []);

  //유저가 신고한 목록 가져오기
  useEffect(() => {
    axios.get(`/api/admin/${userId}/reporting-list`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(res =>{
      setReportingList(res.data)
    });
  }, []);

  //페이지 이동용
  const navigate = useNavigate();
  const goUserListPage = () => {
    navigate("/users");
  };

  // 레드유저 등록,해제
  const changeRed = () => { 
    axios.post(`/api/admin/red/${userId}`,{},{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(r=>{
      getUser();
    })
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }



  const check = () => {
    console.log(user);
    console.log(reportedList);
    console.log(reportingList);
  }

  return (
    <Container>
      {/* <div style={{backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "10px", width:"75%", height: "32%",fontSize: "24px"
    ,color:"#dcdcdc"}}>
        <p style={{margin:10}}>유저 닉네임: {user.nickname}</p>
        <p style={{marginBottom:8}}>이메일: {user.email}</p>
        <p style={{marginBottom:8}}> 가입일자: {user.createdAt}</p>
        <p style={{marginBottom:8}}> 신고당한 횟수: {user.reportedCount}</p>
        <p style={{marginBottom:8}}>전적: {user.winCount+user.loseCount}전 {user.winCount}승 {user.loseCount}패</p>
        <p style={{marginBottom:8}}>{user.redUser ? <p style={{marginBottom:5}} >레드유저입니다</p >  : <p style={{marginBottom:5}}>일반유저입니다</p>}
        {user.redUser ? <button style={{"color":"red", fontSize:30}} onClick={changeRed}>레드유저 해제</button> : <button style={{"color":"#B90000", fontSize:30}} onClick={changeRed}>레드유저 등록</button>}
        </p>
      </div> */}
      <h2 style={{"color":"#dcdcdc", margin:10}}>유저 정보</h2>
      <TableContainer sx={{...styleTableContainer, height:350}} component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell style={{color:'#dcdcdc'}}>닉네임</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>계정</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>가입일자</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>신고당한 횟수</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>전적</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>상태</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>레드유저등록</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{color:'#dcdcdc'}}>{user.nickname}</TableCell>
                <TableCell style={{color:'#dcdcdc'}}>{user.email}</TableCell>
                <TableCell style={{color:'#dcdcdc'}}>{user.createdAt}</TableCell>
                <TableCell style={{color:'#dcdcdc'}}>{user.reportedCount}</TableCell>
                <TableCell style={{color:'#dcdcdc'}}>{user.winCount+user.loseCount}전 {user.winCount}승 {user.loseCount}패</TableCell>
                <TableCell style={{color:'#dcdcdc'}}>{user.redUser ? <p style={{marginBottom:5}} >레드유저입니다</p >  : <p style={{marginBottom:5}}>일반유저입니다</p>}</TableCell>
                <TableCell style={{color:'#dcdcdc'}}>{user.redUser ? <button style={{"color":"#B90000", position:'relative', right:150}} onClick={changeRed}>레드유저 해제</button> : <button style={{"color":"#B90000", position:'relative', right:150}} onClick={changeRed}>레드유저 등록</button>}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <h2 style={{"color":"#B90000", margin:10}}>신고한 내역</h2>
      <TableContainer sx={{...styleTableContainer, height:450}} component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell style={{color:'#dcdcdc'}}>신고내용</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>유저 이메일</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>신고일시</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {reportingList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((reportData, i) => (
                  <TableRow key={i}>
                    <TableCell style={{color:'#dcdcdc'}}>{reportData.reportType}</TableCell>
                    <TableCell style={{color:'#dcdcdc'}}>{reportData.reportedUser}</TableCell>
                    <TableCell style={{color:'#dcdcdc'}}>{reportData.reportingAt}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={page}
                count={reportingList.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{color:'#dcdcdc'}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <h2 style={{"color":"#B90000", margin:10}}>신고당한 내역</h2>
      <TableContainer sx={{...styleTableContainer, height:450}} component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell style={{color:'#dcdcdc'}}>신고내용</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>유저 이메일</TableCell>
              <TableCell style={{color:'#dcdcdc'}}>신고일시</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {reportedList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((reportedData, i) => (
                  <TableRow key={i}>
                    
                    <TableCell style={{color:'#dcdcdc'}}>{reportedData.reportType}</TableCell>
                    <TableCell style={{color:'#dcdcdc'}}>{reportedData.reportingUser}</TableCell>
                    <TableCell style={{color:'#dcdcdc'}}>{reportedData.reportingAt}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={page}
                count={reportedList.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{color:'#dcdcdc'}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>



    </Container>
  );
};

export default UserDetailPage;
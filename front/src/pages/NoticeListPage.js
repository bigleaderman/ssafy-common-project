import React, { useEffect, useState } from "react";
import { Container, styleTableContainer, styleButton } from '../style.js';
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination, Button, Stack } from '@mui/material';
import { Link, useNavigate } from  "react-router-dom";
import {useSelector} from "react-redux"
import axios from 'axios';
import Loading from "../components/Loading.js";


const NoticeListPage = (props) => {

  const isAdmin = useSelector((state) => state.user.authority) === "ROLE_ADMIN" ? true : false;
  const [noticeData, setNoticeData] = useState(null); 

  const token = useSelector(state=>state.user.accessToken)

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios.get('/api/board',{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      setNoticeData(response.data);
    });
  }, []);

  const searchKeyword = () =>{
    axios.get(`/api/board/search/${keyword ? keyword : null}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    .then(response => {
      setNoticeData(response.data);
    });
  }


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  
  // const navigate = useNavigate();

  // const goNoticeDetail = (id) => {
  //   navigate("/"+id)
  // };
  // const { onChangePage, onChangeRowsPerPage } = props;
  // constonChangeRowsPerPage.bind(props);
  
  const goCreateNoticePage = () => {
    navigate("/board/create");
  };

  return (
    <Container>
      {noticeData === null ? <Loading />
      :<>
        <Stack direction="row" spacing={2}
        style={{marginBottom:"1%", width:"30%"}}>
          <input id="search" type={'text'}
          style={{backgroundColor:"rgba(0,0,0,0.7)", color:'white', position:'relative', top:70, borderRadius: '4px'}}
          value={keyword}
          onChange={(e) => {
              setKeyword(e.target.value);
          }}
          ></input>
          <button
          style={{ border: 'solid 2px var(--color-2)',
                  color: 'var(--color-2)',
                  backgroundColor: 'var(--color-5)',
                  padding: '2px 10px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                width:"30%", position:'relative', top:72}}
          onClick={searchKeyword}>검색</button>
        </Stack>
        {/* <p>{noticeData}</p> */}
        <TableContainer style={{...styleTableContainer, height:"110%", position:'relative', top:70}} component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight:'bold', color:"white", fontSize:"150%"}}>글 번호</TableCell>
                <TableCell sx={{fontWeight:'bold', color:"white", fontSize:"150%"}} align="center">제목</TableCell>
                <TableCell sx={{fontWeight:'bold', color:"white", fontSize:"150%"}} align="right">작성일자</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {noticeData
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(({ noticeSeq, title, createAt }, i) => (
                    <TableRow key={noticeSeq}>
                      <TableCell component="th" scope="row" sx={{color:"white"}}>{noticeSeq}</TableCell>
                      <TableCell align="center"><Link style={{textDecorationLine:"none", color:"white"}} to={`/board/${noticeSeq}`}>{title}</Link></TableCell>
                      <TableCell align="right" sx={{color:"white"}}>{createAt.substring(0,10)}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
            <TableFooter>
              <TableRow>

              
              
                <TablePagination
                  sx={{color:"white", fontSize:"100%"}}
                  page={page}
                  count={noticeData.length}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        {isAdmin ? 
              <>
                <Button style={styleButton} onClick={goCreateNoticePage}>작성하기</Button>
              </> :
              null  
                }
      </> }
    </Container>
  );
};

export default NoticeListPage;
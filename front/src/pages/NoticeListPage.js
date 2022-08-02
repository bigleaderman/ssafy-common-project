import React, { useEffect, useState } from "react";
import { Container, styleTableContainer, styleButton } from '../style.js';
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { Link, useNavigate } from  "react-router-dom";
import {useSelector} from "react-redux"
import axios from 'axios';


const NoticeListPage = (props) => {
  const [noticeData, setNoticeData] = useState([]);

  const token = useSelector(state=>state.user.accessToken)

  useEffect(() => {
    axios.get('/api/board',{},{
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

  const noticeDataList = [
    {
      id: 1,
      title: '제목1',
      content: '내용1',
      username: '이름1',
      createdAt: '2022.07.27',
    },
    {
      id: 2,
      title: '제목2',
      content: '내용2',
      username: '이름2',
      createdAt: '2022.07.27',
    },
    {
      id: 3,
      title: '제목3',
      content: '내용3',
      username: '이름3',
      createdAt: '2022.07.27',
    },
  ];

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
      <h2>공지사항</h2>
      <p>{noticeData}</p>
      <TableContainer style={styleTableContainer} component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>글 번호</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="right">작성일자</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {noticeDataList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map(({ id, title, createdAt }, i) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell align="center"><Link to={`/board/${id}`}>{title}</Link></TableCell>
                    <TableCell align="right">{createdAt}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
            <Button style={styleButton} onClick={goCreateNoticePage}>작성하기</Button>
              <TablePagination
                page={page}
                count={noticeDataList.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default NoticeListPage;
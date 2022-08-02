import React, { useEffect, useState } from "react";
import { Container, styleTableContainer, styleButton } from '../style.js';
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { Link, useNavigate } from  "react-router-dom";
import axios from 'axios';


const NoticeListPage = (props) => {
  const [noticeData, setNoticeData] = useState([]);

  useEffect(() => {
    axios.get('/api/board')
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
    handleChangeRowsPerPage(); // 일단 여기에 추가해둠
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
              <TablePagination
                page={page}
                count={Math.ceil(noticeDataList.length/rowsPerPage)}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                // onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Button style={styleButton} onClick={goCreateNoticePage}>작성하기</Button>
    </Container>
  );
};

export default NoticeListPage;
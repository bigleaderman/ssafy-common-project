import React, { useState } from "react";
import { Container, styleTableContainer } from '../style.js';
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination } from '@mui/material';

const NoticeListPage = (props) => {

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Container>
      <h2>공지사항</h2>
      
      <TableContainer style={styleTableContainer} component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
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
                    <TableCell align="center"><a href={'/'+id}>{title}</a></TableCell>
                    <TableCell align="right">{createdAt}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default NoticeListPage;
import React, { useState } from "react";
import { Container, styleTableContainer } from '../style.js';
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination } from '@mui/material';
import { Link } from  "react-router-dom";


const UserListPage = (props) => {
  const userDataList = [
    { id: 1, nickname: '김싸피', email: 'ssafy123@ssafy.com', record: { win: 12, lose: 5 }, createdAt: '2022.07.27', },
    { id: 2, nickname: '이싸피', email: 'ssafy123@ssafy.com', record: { win: 12, lose: 5 }, createdAt: '2022.07.27', },
    { id: 3, nickname: '박싸피', email: 'ssafy123@ssafy.com', record: { win: 12, lose: 5 }, createdAt: '2022.07.27', },
    { id: 4, nickname: '강싸피', email: 'ssafy123@ssafy.com', record: { win: 12, lose: 5 }, createdAt: '2022.07.27', },
    { id: 5, nickname: '최싸피', email: 'ssafy123@ssafy.com', record: { win: 12, lose: 5 }, createdAt: '2022.07.27', },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleChangeRowsPerPage(); // 일단 여기에 추가해둠
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Container>
      <h2>유저 목록 조회</h2>

      <TableContainer style={styleTableContainer} component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>유저 닉네임</TableCell>
              <TableCell>전적</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {userDataList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((userData, i) => (
                  <TableRow key={userData.id}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell><Link to={`/users/${userData.id}`} state={{ userData: userData }}>{userData.nickname}</Link></TableCell>
                    <TableCell>{userData.record.win+userData.record.lose}({userData.record.win} / {userData.record.lose})</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={page}
                count={Math.ceil(userDataList.length/rowsPerPage)}
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

export default UserListPage;
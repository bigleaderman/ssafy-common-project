import React, { useState } from "react";
import { Container, styleTableContainer, styleButton } from '../style.js';
import { useLocation } from  "react-router-dom";
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { useNavigate } from  "react-router-dom";


const UserDetailPage = (props) => {

  const reportDataList = [
    { id: 1, from: '이싸피', to: '김싸피', content: '욕설', createdAt: '2022.07.27', },
    { id: 2, from: '박싸피', to: '김싸피', content: '욕설', createdAt: '2022.07.27', },
    { id: 3, from: '강싸피', to: '김싸피', content: '욕설', createdAt: '2022.07.27', },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { userData } = location.state;

  const goUserListPage = () => {
    navigate("/users");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }


  return (
    <Container>
      <h2>유저 상세 조회 페이지</h2>
      <span>유저 닉네임: {userData.nickname}</span>
      <span>
        이메일: {userData.email} 가입일자: {userData.createdAt}
      </span>
      <span>신고 받은 내용</span>
      <TableContainer style={styleTableContainer} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>신고 유저</TableCell>
              <TableCell>항목</TableCell>
              <TableCell>일시</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {reportDataList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((reportData, i) => (
                  <TableRow key={reportData.id}>
                    <TableCell>{reportData.id}</TableCell>
                    <TableCell>{reportData.from}</TableCell>
                    <TableCell>{reportData.content}</TableCell>
                    <TableCell>{reportData.createdAt}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={page}
                count={Math.ceil(reportDataList.length/rowsPerPage)}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <span>신고한 내용</span>
      {/* 표 위치만 잡기 위해 추가한 부분으로(신고 받은 내용과 동일) 백 연결 시 변경 필요 */}
      <TableContainer style={styleTableContainer} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>신고 유저</TableCell>
              <TableCell>항목</TableCell>
              <TableCell>일시</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {reportDataList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((reportData, i) => (
                  <TableRow key={reportData.id}>
                    <TableCell>{reportData.id}</TableCell>
                    <TableCell>{reportData.from}</TableCell>
                    <TableCell>{reportData.content}</TableCell>
                    <TableCell>{reportData.createdAt}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={page}
                count={Math.ceil(reportDataList.length/rowsPerPage)}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <span>전적: {userData.record.win+userData.record.lose}전 {userData.record.win}승 {userData.record.lose}패</span>
      <span>
        <Button style={styleButton} onClick={goUserListPage}>목록으로</Button>
      </span>
    </Container>
  );
};

export default UserDetailPage;
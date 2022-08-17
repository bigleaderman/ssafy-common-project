import React, { useState, useEffect } from "react";
import { Container, styleTableContainer } from '../style.js';
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination } from '@mui/material';
import { Link } from  "react-router-dom";
import {useSelector} from "react-redux"
import axios from 'axios';


const UserListPage = (props) => {
  
  const [userDataList, setUserDataList] = useState([]);
  
  const token = useSelector(state=>state.user.accessToken)

  useEffect(() => {
    axios.get('/api/admin/all/list',{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      setUserDataList(response.data);
    });
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  // const check = () => {
  //     console.log(userDataList)
  // }


  return (
    <Container>
      {/* <button onClick={check}>체크해보자</button> */}
      <TableContainer style={styleTableContainer} component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell style={{color:"white"}}>유저 번호</TableCell>
              <TableCell style={{color:"white"}}>유저 이메일</TableCell>
              <TableCell style={{color:"white"}}>누적 신고 횟수</TableCell>
              <TableCell style={{color:"white"}}>전적</TableCell>
            </TableRow>
          </TableHead>
            <TableBody >
              {userDataList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((userData, i) => (
                  <TableRow key={userData.userSeq} style={{color:"white"}}>
                    <TableCell component="th" scope="row" style={{color:"white"}}>
                      {userData.userSeq}
                    </TableCell>
                    <TableCell style={{color:"white"}}><Link style={{color:"white", textDecorationLine:"none"}} to={`/users/${userData.userSeq}`}>{userData.email}</Link></TableCell>
                    <TableCell style={{color:"white"}}>{userData.reportedCount}</TableCell>
                    <TableCell style={{color:"white"}}>{userData.winCount+userData.loseCount}({userData.winCount} / {userData.loseCount})</TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter >
            <TableRow>
              <TablePagination
                page={page}
                count={userDataList.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{color:"white"}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserListPage;
import React, { useEffect, useState } from "react";
import { Container, styleTableContainer, styleContainer } from '../style.js';
import { Table, TableHead, TableFooter, TableContainer, TableBody, Paper, TableRow, TableCell, TablePagination, Button, Stack } from '@mui/material';
import { Link, useNavigate } from  "react-router-dom";
import Loading from "../components/Loading.js";
import {useSelector} from "react-redux"
import axios from 'axios';
import { CenterFocusStrong } from "@mui/icons-material";


const RankPage = (props) => {
  const [rankData, setRankData] = useState(null);
  const [searchData, setSearchData] = useState([]); 
  const [booleanSearch, setBooleanSearch] = useState(false);

  useEffect(() => {
    axios.get('/api/game/topRank',{
      // headers: {
      //   "Content-Type": "application/json",
      //   "Authorization": `Bearer ${token}`
      // }
    })
    .then(response => {
      console.log(response.data)
      console.log(response);
      setBooleanSearch(false)
      setRankData(response.data);
    });
  }, []);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchContent, setSearchContent] = useState("");
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const findUser = () => {
    // var hello = Array()
    setSearchData([])
    rankData.map((data, num) => {
      if (data[0]?.includes(searchContent)){
        // hello.push({...data, rank:num+1});
        setSearchData(currentData=>[...currentData, {...data, rank:num+1}])
      }
    });
    setBooleanSearch(true)
    console.log(searchData)
    
    // while (start !== rankData.length) {
    //   if (rankData[start][0].includes(searchContent)){
    //     searchData.push(rankData[start]);
    //     console.log(searchData);
    //   }
    //   start += 1;
    // }
    // setRankData(searchData)
  }

  
  // const navigate = useNavigate();

  // const goNoticeDetail = (id) => {
  //   navigate("/"+id)
  // };
  // const { onChangePage, onChangeRowsPerPage } = props;
  // constonChangeRowsPerPage.bind(props);

  return (
    <Container>
      {rankData === null ? <Loading/>
      :<>
      {/* <span style={{marginBottom:20}}>
        <label style={{color:"#dcdcdc", fontSize:'1.5em'}} align="right" htmlFor="search">검색</label>
        <input id="search" type={'text'}
        value={keyword} align="right"
        onChange={(e) => {
            setKeyword(e.target.value);
        }}
        ></input>
        <button style={styleButton} align="right"
        onClick={searchKeyword}>검색</button>
      </span> */}
      {/* <p>{noticeData}</p> */}
      <Stack sx={{position:'relative', bottom:30}} direction="row" spacing={2}
      style={{marginBottom:"1%", width:"30%"}}>
        <input id="search" type={'text'}
        style={{backgroundColor:"rgba(0,0,0,0.7)", color:'white', position:'relative', top:70, borderRadius: '2px'}}
        value={searchContent}
        onChange={(e) => {
          setSearchContent(e.target.value);
        }}
        ></input>
        <button
        style={{ border: 'solid 2px var(--color-2)',
                color: 'var(--color-2)',
                backgroundColor: 'var(--color-5)',
                padding: '2px 10px',
                borderRadius: '2px',
                fontSize: '16px',
                marginLeft: '10px',
                cursor: 'pointer',
                textDecoration: 'none',
              width:"30%", position:'relative', top:72}}
        onClick={findUser}>검색</button>
      </Stack>
      <TableContainer sx={{...styleContainer, position:'relative', top:30}} component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{color:"#dcdcdc", fontWeight:'bold', width:100, textAlign:"center", fontSize:20}}>순 위</TableCell>
              <TableCell sx={{color:"#dcdcdc",fontWeight:'bold', width:100, fontSize:20}} align="center">아이디</TableCell>
              <TableCell sx={{color:"#dcdcdc",fontWeight:'bold', position:"relative", left:20, width:80, fontSize:20}} align="center">승리</TableCell>
              <TableCell sx={{color:"#dcdcdc",fontWeight:'bold', position:"relative", left:20, width:80, fontSize:20}} align="center">패배</TableCell>
              <TableCell sx={{color:"#dcdcdc",fontWeight:'bold', position:"relative", left:20, width:80, fontSize:20}} align="center">RP</TableCell>
            </TableRow>
          </TableHead>
          {booleanSearch? 
          <TableBody>
          {searchData
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((data, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{color:"#dcdcdc", width:100, textAlign:"center", fontSize:20}} component="th" scope="row">
                  {data["rank"]}
                </TableCell>
                <TableCell sx={{color:"#dcdcdc",position:"relative", width:80, textAlign:"center", fontSize:20}}>{data[0]}</TableCell>
                <TableCell sx={{color:"#dcdcdc",position:"relative", left:20, width:80, textAlign:"center", fontSize:20}}>{data[1]}</TableCell>
                <TableCell sx={{color:"#dcdcdc",position:"relative", left:20, width:80, textAlign:"center", fontSize:20}}>{data[2]}</TableCell>
                <TableCell sx={{color:"#dcdcdc",position:"relative", left:20, width:80, textAlign:"center", fontSize:20}}>{data[3]}</TableCell>
              </TableRow>
            ))}
        </TableBody >
          : <TableBody>
          {rankData
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((data, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{color:"#dcdcdc", width:100, textAlign:"center", fontSize:20}} component="th" scope="row">
                  {page * 10 + idx+1}
                </TableCell>
                <TableCell sx={{color:"#dcdcdc",position:"relative", width:80, textAlign:"center", fontSize:20}}>{data[0]}</TableCell>
                <TableCell sx={{color:"#dcdcdc",position:"relative", left:20, width:80, textAlign:"center", fontSize:20}}>{data[1]}</TableCell>
                <TableCell sx={{color:"#dcdcdc",position:"relative", left:20, width:80, textAlign:"center", fontSize:20}}>{data[2]}</TableCell>
                <TableCell sx={{color:"#dcdcdc",position:"relative", left:20, width:80, textAlign:"center", fontSize:20}}>{data[3]}</TableCell>
              </TableRow>
            ))}
      </TableBody >}
            
          <TableFooter>
            <TableRow >
              <TablePagination 
                style={{color:"#dcdcdc"}}
                page={page}
                count={rankData.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      </>}
    </Container>
  );
};

export default RankPage;
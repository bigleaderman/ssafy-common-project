import React, { useState } from "react";
import styled from 'styled-components';
import { Pagination, Grid } from '@mui/material';
import { stylePagination } from '../style.js'
// import { useNavigate } from  "react-router-dom";

const RoomList = (props) => {
  const [page, setPage] = useState(0);

  const roomDataList = [
    { id: 1, title: '방 제목1', maximum: 8, member: [{}, {}, {}, {}, {}, {}], password: 1234, },
    { id: 2, title: '방 제목2', maximum: 8, member: [{}, {}, {}, {}, {}], password: null, },
    { id: 3, title: '방 제목3', maximum: 9, member: [{}, {}, {}], password: 1234, },
    { id: 4, title: '방 제목4', maximum: 8, member: [{},], password: null, },
    { id: 5, title: '방 제목5', maximum: 8, member: [{},], password: null, },
    { id: 6, title: '방 제목6', maximum: 7, member: [{}, {},], password: 1234, },
    { id: 7, title: '방 제목7', maximum: 8, member: [{}, {}, {}, {}], password: null, },
    { id: 8, title: '방 제목8', maximum: 8, member: [{}, {}, {}, {}], password: null, },
    { id: 9, title: '방 제목9', maximum: 10, member: [{}, {}, {}, {}, {}, {}], password: null, },
    { id: 10, title: '방 제목10', maximum: 8, member: [{}, {}, {}, {}], password: 1234, },
    { id: 11, title: '방 제목11', maximum: 8, member: [{}, {}, {}, {}], password: 1234, },
    { id: 12, title: '방 제목12', maximum: 6, member: [{}, {}, {}, {}, {}, {}], password: null, },
    { id: 13, title: '방 제목13', maximum: 11, member: [{}, {}, {}, {}], password: null, },
    { id: 14, title: '방 제목14', maximum: 8, member: [{}, {}, {}, {}, {}], password: null, },
    { id: 15, title: '방 제목15', maximum: 7, member: [{}, {}, {}, {}], password: 1234, },
    { id: 16, title: '방 제목16', maximum: 8, member: [{}, {}, {}, {}, {}], password: null, },
  ];

  const [filteredRoomDataList, setfilteredRoomDataList] = useState(roomDataList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage-1);
  }

  const filter = (f) => {
    switch(f) {
      case (1):
        setfilteredRoomDataList(roomDataList.filter((roomData) => !roomData.password))
        break;
      case (2):
        setfilteredRoomDataList([...roomDataList].sort(function (a, b) {return a.maximum - b.maximum}));
        break;
      case (3):
        setfilteredRoomDataList([...roomDataList].sort(function (a, b) {return b.maximum - a.maximum}));
        break;
      case (4):
        setfilteredRoomDataList([...roomDataList].sort(function (a, b) {return (a.maximum-a.member.length) - (b.maximum-b.member.length)}));
        break;
      case (5):
        setfilteredRoomDataList([...roomDataList].sort(function (a, b) {return (b.maximum-b.member.length) - (a.maximum-a.member.length)}));
        break;
      case (6):
        setfilteredRoomDataList([...roomDataList].sort(function (a, b) {return b.id - a.id}));
        break;
      case (7):
        setfilteredRoomDataList([...roomDataList].sort(function (a, b) {return a.id - b.id}));
        break;
      case (8):
        setfilteredRoomDataList(roomDataList.filter((roomData) => roomData.maximum > roomData.member.length));
        break;
      default:
        break;
    }
  }

  return (
    <>
      <span>
        필터
        <button onClick={() => {filter(1)}}>비밀번호 없는 방</button>
        <button onClick={() => {filter(2)}}>최대인원 오름차순</button>
        <button onClick={() => {filter(3)}}>최대인원 내림차순</button>
        <button onClick={() => {filter(4)}}>남은자리 오름차순</button>
        <button onClick={() => {filter(5)}}>남은자리 내림차순</button>
        <button onClick={() => {filter(6)}}>개설 최신순(id 내림차순)</button>
        <button onClick={() => {filter(7)}}>개설 오래된순(id 오름차순)</button>
        <button onClick={() => {filter(8)}}>최대인원 방 제외</button>
        <button onClick={() => {console.log(Math.floor(Math.random()*roomDataList.length) + 1+'번 방 입장')}}>빠른 입장</button>
      </span>
      <RoomListContainer>
        <Grid container spacing={2}>
          {filteredRoomDataList
            .slice(page * 8, (page + 1) * 8)
            .map(({ id, title, member, maximum, password }, i) => (
              <Grid item xs={6} key={id}>
                <RoomItemContainer onClick={() => {console.log(id+'번 방 입장')}}>
                  <span>
                    <p align="center">
                      {title}
                      {password ? <img src="lock-solid.svg" /> : null}
                    </p>
                    <p align="center">{member.length} / {maximum}</p>
                  </span>
                </RoomItemContainer>
              </Grid>
            ))}
        </Grid>
        <Pagination style={stylePagination} count={2} page={page+1} onChange={handleChangePage} showFirstButton={true} showLastButton={true} shape="rounded" />
      </RoomListContainer>
    </>
  );
};

const RoomListContainer = styled.section`
    width: 920px;
    height: 420px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: var(--color-5);
`

const RoomItemContainer = styled.section`
    width: 430px;
    height: 70px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    background-color: var(--color-2);
    cursor: pointer;

    img {
      width: 20px;
    }
`

export default RoomList;
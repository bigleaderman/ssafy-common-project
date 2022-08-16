import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

//redux데이터 호출
import { useSelector } from "react-redux";
import { selectCntCivil } from "../../redux/slice/CntCivilSlice";
import { selectCntCon } from "../../redux/slice/CntConSlice";
import { selectCntCop } from "../../redux/slice/CntCopSlice";
import { selectCntDoc } from "../../redux/slice/CntDocSlice";
import { selectCntLimit } from "../../redux/slice/CntLimitSlice";
import { selectCntMaf } from "../../redux/slice/CntMafSlice";
import { selectRoomTitle } from "../../redux/slice/RoomTitleSlice";

export function MainBar(props) {
  console.log("props.stateTimer: ", props.stateTimer);
  let letTImer = props.stateTimer;
  let outerInterval = setInterval(() => {
    letTImer--;
    document.getElementById("timer").innerText = letTImer;
  }, 1000);
  setTimeout(() => {
    clearInterval(outerInterval);
  }, letTImer * 1000);

  // useEffect(() => {
  //   let CDTimer = "";
  //   if (Number(timer) && timer > 0) {
  //     CDTimer = setInterval(() => {
  //       setTimer((timer) => timer - 1);
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(CDTimer);
  //     clearInterval(outerInterval);
  //     console.log("returned mainbar");
  //   };
  // }, [props.stateTimer]);

  // const me = useSelector((state) => state.user);
  const roomNum = useSelector((state) => state.roomNum);

  const ForGameState = () => {
    if (props.myRole !== "") {
      return (
        <>
          <Grid>당신의 역할 :{props.myRole}</Grid>
          <Grid>
            타이머 : <span id='timer'></span>
          </Grid>
        </>
      );
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        빙 번호 : {roomNum} 방 제목 : {useSelector(selectRoomTitle)}
      </Grid>
      <Grid item xs={4}>
        <Grid>
          현재 인원 / 최대 인원 : {useSelector(selectCntCon)}/{useSelector(selectCntLimit)}
        </Grid>
        <Grid>
          시민 : {useSelector(selectCntCivil)}명
          <br />
          의사 : {useSelector(selectCntDoc)} 명
          <br />
          경찰 : {useSelector(selectCntCop)}명
          <br />
          마피아 : {useSelector(selectCntMaf)}명
        </Grid>
        <Grid>{props.currentGameState}</Grid>
        <ForGameState />
      </Grid>
    </Grid>
  );
}

export default MainBar;

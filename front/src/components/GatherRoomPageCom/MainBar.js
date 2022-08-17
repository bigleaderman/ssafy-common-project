import React from "react";
import { Grid, Stack } from "@mui/material";

//redux데이터 호출
import { useSelector } from "react-redux";
import { selectCntCivil } from "../../redux/slice/CntCivilSlice";
import { selectCntCon } from "../../redux/slice/CntConSlice";
import { selectCntCop } from "../../redux/slice/CntCopSlice";
import { selectCntDoc } from "../../redux/slice/CntDocSlice";
import { selectCntLimit } from "../../redux/slice/CntLimitSlice";
import { selectCntMaf } from "../../redux/slice/CntMafSlice";
import { selectRoomTitle } from "../../redux/slice/RoomTitleSlice";
import { selectNightTime, selectTalkTime, selectVoteTime } from "../../redux/slice/GameTimeSlice";

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
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item xs={4} sx={{ pt: 0 }}>
        <h4 style={{ textAlign: "left", color: "#ccc" }}>
          방 번호 : {roomNum} / 방 제목 : {useSelector(selectRoomTitle)}
        </h4>
        <h3 id='timer' style={{ textAlign: "left", color: "#ccc", marginTop: 55 }}>
          제한시간: {props.timer.current}
        </h3>
      </Grid>
      <Grid item xs={4}>
        <h2 style={{ color: "#ccc" }}>{props.currentGameState}</h2>
        {props.myRole !== "" ? (
          <h5 style={{ color: "#ccc", marginTop: 45 }}>당신의 역할 :{props.myRole}</h5>
        ) : null}
      </Grid>
      <Grid item xs={4} sx={{ pr: 2, pt: 3 }}>
        <h4 style={{ textAlign: "right", marginBottom: 2, color: "#ccc" }}>
          현재 인원 / 최대 인원 : {useSelector(selectCntCon)}/{useSelector(selectCntLimit)}
        </h4>
        <Grid container spacing={2} justifyContent='flex-end'>
          <Grid item ws={6}>
            <h5 style={{ textAlign: "right", color: "#ccc" }}>
              낮 시간 : {useSelector(selectTalkTime)}초
            </h5>
            <h5 style={{ textAlign: "right", color: "#ccc" }}>
              투표 시간 : {useSelector(selectVoteTime)}초
            </h5>
            <h5 style={{ textAlign: "right", color: "#ccc" }}>
              밤 시간 : {useSelector(selectNightTime)}초
            </h5>
          </Grid>
          <Grid item ws={6}>
            <h5 style={{ textAlign: "right", color: "#ccc" }}>
              시민 : {useSelector(selectCntCivil)}명
            </h5>
            <h5 style={{ textAlign: "right", color: "#ccc" }}>
              의사 : {useSelector(selectCntDoc)}명
            </h5>
            <h5 style={{ textAlign: "right", color: "#ccc" }}>
              경찰 : {useSelector(selectCntCop)}명
            </h5>
            <h5 style={{ textAlign: "right", color: "#ccc" }}>
              마피아 : {useSelector(selectCntMaf)}명
            </h5>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainBar;

import React, { useEffect } from "react";
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
  useEffect(() => {
    return () => {
      clearInterval(outerInterval);
    };
  }, [outerInterval]);

  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item xs={3} sx={{ pt: 0 }}>
        <h4 style={{ textAlign: "left", color: "#ccc" }}>
          [{roomNum}] {useSelector(selectRoomTitle)}
        </h4>
        {/* <h4 style={{ textAlign: "left", color: "#ccc" }}></h4> */}
        <h3 id='timer' style={{ textAlign: "left", color: "#ccc", marginTop: 55 }}>
          {props.timer.current}
          {Number.isInteger(props.timer.current) ? "초 남았습니다." : null}
        </h3>
      </Grid>
      <Grid item xs={5}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <h2 style={{ color: props.currentGameState[1] }}>{props.currentGameState[0]}</h2>
          {props.myRole !== "" ? (
            <h5 style={{ color: "#ccc" }}>당신의 역할은 [{props.myRole}] 입니다.</h5>
          ) : null}
        </div>
      </Grid>
      <Grid item xs={4} sx={{ pr: 2, pt: 3 }}>
        <h4 style={{ textAlign: "right", marginBottom: 2, color: "#ccc" }}>
          참여자 {useSelector(selectCntCon)}/{useSelector(selectCntLimit)}
        </h4>
        <Grid container spacing={2} justifyContent='flex-end'>
          <Grid item ws={6}>
            <h5 style={{ textAlign: "right", color: "#ccc" }}>
              토론 시간 : {useSelector(selectTalkTime)}초
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
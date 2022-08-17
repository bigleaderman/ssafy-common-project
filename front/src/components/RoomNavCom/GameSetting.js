//react
import React, { useState } from "react";
import { middleButton } from "../../style.js";

//redux
import { useSelector } from "react-redux";
import { setNightTime, setTalkTime, setVoteTime } from "../../redux/slice/GameTimeSlice";

//mui library
import { Grid, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectCntCon } from "../../redux/slice/CntConSlice";
import { setCivil, selectCntCivil } from "../../redux/slice/CntCivilSlice";
import { setCop, selectCntCop } from "../../redux/slice/CntCopSlice";
import { setDoc, selectCntDoc } from "../../redux/slice/CntDocSlice";
import { setLimit, selectCntLimit } from "../../redux/slice/CntLimitSlice";
import { setMaf, selectCntMaf } from "../../redux/slice/CntMafSlice";
import { selectRoomTitle, SetRoomTitle } from "../../redux/slice/RoomTitleSlice";

// import {
//     SetRoomTitle,
//     selectRoomTitle,
// } from "../../redux/slice/RoomTitleSlice";
//의사, 경찰, 마피아수 변경 기능

export const GameSetting = (props) => {
  const dispatch = useDispatch();
  const roomTitle = useSelector(selectRoomTitle);
  const roomNum = useSelector((state) => state.roomNum);
  const token = useSelector((state) => state.user.accessToken);
  const [ArrLimit] = useState([6, 7, 8]);
  const prevLimit = useSelector(selectCntLimit),
    prevCivil = useSelector(selectCntCivil),
    prevDoc = useSelector(selectCntDoc),
    prevCop = useSelector(selectCntCop),
    prevMaf = useSelector(selectCntMaf),
    prevTitle = useSelector(selectRoomTitle);
  let actLimit = [0, 1, 2, 3, 4, 5, 6, 7];
  const cntCon = useSelector(selectCntCon);
  const UpdateGameSetting = () => {
    const pubAddr = `/pub/room/${roomNum}`;
    let inputTitle = document.getElementById("inputTitle").value;
    let conLimit = document.getElementById("conLimit");
    let doc = document.getElementById("doc");
    let cop = document.getElementById("cop");
    let maf = document.getElementById("maf");
    let conLimitV = Number(conLimit.options[conLimit.selectedIndex].value),
      docV = Number(doc.options[doc.selectedIndex].value),
      copV = Number(cop.options[cop.selectedIndex].value),
      mafV = Number(maf.options[maf.selectedIndex].value),
      voteTimeV = Number(document.getElementById("voteTime").value),
      nightTImeV = Number(document.getElementById("nightTime").value),
      talkTimeV = Number(document.getElementById("talkTime").value);
    console.log("inputTitle: ", inputTitle);
    if (docV + copV + mafV > conLimitV) {
      console.log("역할 초과 합: ", docV + copV + mafV);
      document.getElementById("checkValue").innerText = "배정한 역할이 너무 많습니다.";
      return;
    }
    if (mafV === 0) {
      document.getElementById("checkValue").innerText = "마피아는 최소 1명이여야 합니다.";
      return;
    }
    if (inputTitle === "") {
      document.getElementById("checkValue").innerText = "제목은 한글자 이상 입력해야 합니다.";
      return;
    }
    if (
      10 > voteTimeV ||
      voteTimeV > 180 ||
      10 > nightTImeV ||
      nightTImeV > 180 ||
      10 > talkTimeV ||
      talkTimeV > 180
    ) {
      document.getElementById("checkValue").innerText = "정확한 시간을 입력해주세요.";
      return;
    }

    if (cntCon > conLimit) {
      document.getElementById("checkValue").innerText =
        "현재 입장 중인 유저보다 더 적게 인원을 설정할 수 없습니다.";
      return;
    }

    dispatch(SetRoomTitle(inputTitle));
    dispatch(setLimit(conLimitV));
    dispatch(setDoc(docV));
    dispatch(setCop(copV));
    dispatch(setMaf(mafV));
    dispatch(setCivil(conLimitV - docV - copV - mafV));
    dispatch(setVoteTime(voteTimeV));
    dispatch(setNightTime(nightTImeV));
    dispatch(setTalkTime(talkTimeV));
    console.log(roomTitle);
    console.log("before client pub");
    props.client.publish({
      destination: pubAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        header: { type: "settings" },
        data: {
          title: inputTitle,
          gameSeq: roomNum, // 게임 번호 (방 번호랑 다름)
          capacity: conLimitV, // 방 수용 인원
          mafia: mafV, // 마피아 수
          doctor: docV, // 의사 수
          police: copV, // 경찰 수
          talkTime: talkTimeV, // 회의 시간 (초)
          voteTime: voteTimeV, // 투표 시간 (초)
          nightTime: nightTImeV, // 밤 시간 (초)
        },
      }),
      skipContentLengthHeader: true,
    });
    props.setOpen(false);
  };
  return (
    <div style={{ borderRadius: '2px', height: 580, width: 600, paddingTop: 10,backgroundColor:'#ffffff' }}>
      <Stack direction='column' spacing={2} justifyContent='center' alignItems='center'>
        <Stack direction='row' spacing={2}>
          {/* 방 제목 변경  */}
          <label style={{ textAlign: "left", fontSize: 20, width: 160, marginTop: 20 }}>
            방 제목 :{" "}
          </label>
          <input
            id='inputTitle'
            type='text'
            placeholder='방 제목 입력'
            style={{ width: 130 }}
            defaultValue={prevTitle}
          />
        </Stack>
        <Stack direction='row' spacing={2}>
          {/* 인원 수 클릭 시 해당  */}
          <label style={{ textAlign: "left", fontSize: 20, width: 200, marginTop: 20 }}>
            인원 수 :{" "}
          </label>
          <select
            defaultValue={prevLimit}
            id='conLimit'
            style={{
              marginTop: "20px",
              height: "30px",
              width: 90,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {ArrLimit.map((data, idx) => {
              return (
                <option key={idx} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </Stack>
        <Stack direction='row' spacing={2}>
          <label style={{ textAlign: "left", fontSize: 20, width: 200, marginTop: 20 }}>
            의사 수 :{" "}
          </label>
          <select
            defaultValue={prevDoc}
            id='doc'
            style={{
              marginTop: "20px",
              height: "30px",
              width: 90,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {actLimit.map((data, idx) => {
              return (
                <option key={idx} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </Stack>
        <Stack direction='row' spacing={2}>
          <label style={{ textAlign: "left", fontSize: 20, width: 200, marginTop: 20 }}>
            경찰 수 :{" "}
          </label>
          <select
            defaultValue={prevCop}
            id='cop'
            style={{
              marginTop: "20px",
              height: "30px",
              width: 90,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {actLimit.map((data, idx) => {
              return (
                <option key={idx} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </Stack>
        <Stack direction='row' spacing={2}>
          <label style={{ textAlign: "left", fontSize: 20, width: 200, marginTop: 20 }}>
            마피아 수 :{" "}
          </label>
          <select
            id='maf'
            defaultValue={prevMaf}
            style={{
              marginTop: "20px",
              height: "30px",
              width: 90,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {actLimit.map((data, idx) => {
              return (
                <option key={idx} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </Stack>
        <Stack direction='row' spacing={2}>
          <label style={{ textAlign: "left", fontSize: 20, width: 160, marginTop: 20 }}>
            낮 시간 :{" "}
          </label>
          <input
            id='talkTime'
            type='number'
            min='10'
            max='180'
            placeholder='10-180'
            style={{ width: 130 }}
          />
        </Stack>
        <Stack direction='row' spacing={2}>
          <label style={{ textAlign: "left", fontSize: 20, width: 160, marginTop: 20 }}>
            투표 시간 :{" "}
          </label>
          <input
            id='voteTime'
            type='number'
            min='10'
            max='180'
            placeholder='10-180'
            style={{ width: 130 }}
          />
        </Stack>
        <Stack direction='row' spacing={2}>
          <label style={{ textAlign: "left", fontSize: 20, width: 160, marginTop: 20 }}>
            밤 시간 :{" "}
          </label>
          <input
            id='nightTime'
            type='number'
            min='10'
            max='180'
            placeholder='10-180'
            style={{ width: 130 }}
          />
        </Stack>
      </Stack>
      <br />
      <Button
        variant='outlined'
        onClick={() => {
          UpdateGameSetting();
        }}
        sx={{
          ...middleButton,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          left: 245,
          m: 0,
          mt: 1,
        }}
      >
        확인
      </Button>
      <div id='checkValue' style={{ color: "red", textAlign: "center" }}></div>
    </div>
  );
};

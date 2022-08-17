import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { middleButton } from "../../style.js";
export function Helper({handleClose}) {
  const [Rules, setRules] = useState(0);
  const [Acts, setActs] = useState(0);
  const method = ["역할", "목표"];
  const position = ["시민", "의사", "경찰", "마피아"];
  const helpContext = [
    [
      "시민",
      //역할
      "아무 능력이 없습니다. 시민들은 토론을 통해 마피아를 찾아야합니다.",
      //게임 규칙
      "(시민측)마피아가 누군지 가려서 낮의 재판에서 마피아를 모두 처형한다.",
      //게임 방법
      // "자신이 시민임을 증명하고 마피아를 찾아내 처형해야 합니다.",
    ],
    [
      "의사",
      "밤에 한명을 지목해 마피아의 대상이 됐을 경우 살릴 수가 있습니다.",
      "(시민측)치료의 유무를 통해서 마피아가 누군지 가려서 낮의 재판에서 마피아를 모두 처형한다.",
      // "밤에 원하는 1명을 살릴 수 있습니다.",
    ],
    [
      "경찰",
      "밤에 마피아로 추측되는 사람을 1명 지목합니다. 지목한 사람이 마피아인지 아닌지 사회자가 알려줄 것입니다.",
      "(시민측)추측을 통해서 마피아가 누군지 가려서 낮의 재판에서 마피아를 모두 처형한다.",
      // "낮에 투표권을 하나 받습니다. 투표 시간 때 다른 참여자에게 투표할 수 있습니다. 최다 투표자는 처형당합니다.",
      // "밤에 원하는 1명의 직업을 알 수 있습니다.",
    ],

    [
      "마피아",
      "밤에 시민 중 1명을 지목합니다. 지목 당한 시민은 낮이 오면 살해당합니다.",
      "(마피아측)마피아는 시민을 현재 살아있는 마피아의 숫자와 같아질 때까지 죽인다. ",
    ],
  ];
  // function SwitchRules(value) {
  //     console.log(value);
  // }

  // function SwitchActs(value) {
  //     console.log(value);
  // }
  const [r1, setR1] = useState("#000000");
  const [r2, setR2] = useState("#ccc");
  const SwitchRules = (value) => {
    if (value === 1) {
      setR1("#ccc");
      setR2("#000000");
    } else {
      setR1("#000000");
      setR2("#ccc");
    }
    setRules(value);
  };
  const [a1, setA1] = useState("#000000");
  const [a2, setA2] = useState("#ccc");
  const [a3, setA3] = useState("#ccc");
  const [a4, setA4] = useState("#ccc");
  const SwitchActs = (value) => {
    if (value === 0) {
      setA1("#000000");
      setA2("#ccc");
      setA3("#ccc");
      setA4("#ccc");
    } else if (value === 1) {
      setA1("#ccc");
      setA2("#000000");
      setA3("#ccc");
      setA4("#ccc");
    } else if (value === 2) {
      setA1("#ccc");
      setA2("#ccc");
      setA3("#000000");
      setA4("#ccc");
    } else {
      setA1("#ccc");
      setA2("#ccc");
      setA3("#ccc");
      setA4("#000000");
    }
    setActs(value);
  };

  return (
    <div style={{ borderRadius: 8, height: 400,width:590,backgroundColor:'#ffffff' }}>
      <br/>
      <h1 style={{ padding: 10, textAlign: "center" }}>게임 설명</h1>
      <br/>
      <p style={{ textAlign: "center", fontWeight: "bolder" }}>
        직업, 역할/목표를 선택하여 게임설명을 볼 수 있습니다.
      </p>
      <br/>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={3} style={{ height: 180, position: "relative", top: 30 }}>
          <br />
          <Button
            style={{ width: 120, fontWeight: "bold", marginBottom: 35, fontSize: 20 }}
            sx={{ color: r1 }}
            onClick={() => {
              SwitchRules(0);
            }}
          >
            역할
          </Button>
          <Button
            style={{ width: 120, fontWeight: "bold", marginBottom: 20, fontSize: 20 }}
            sx={{ color: r2 }}
            onClick={() => {
              SwitchRules(1);
            }}
          >
            목표
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Grid>
            <Button
              style={{ width: 90, fontWeight: "bold", fontSize: 20 }}
              sx={{ color: a1 }}
              onClick={() => {
                SwitchActs(0);
              }}
            >
              {helpContext[0][0]}
            </Button>
            <Button
              style={{ width: 90, fontWeight: "bold", fontSize: 20 }}
              sx={{ color: a2 }}
              onClick={() => {
                SwitchActs(1);
              }}
            >
              {helpContext[1][0]}
            </Button>
            <Button
              style={{ width: 90, fontWeight: "bold", fontSize: 20 }}
              sx={{ color: a3 }}
              onClick={() => {
                SwitchActs(2);
              }}
            >
              {helpContext[2][0]}
            </Button>
            <Button
              style={{ width: 90, fontWeight: "bold", fontSize: 20 }}
              sx={{ color: a4 }}
              onClick={() => {
                SwitchActs(3);
              }}
            >
              {helpContext[3][0]}
            </Button>
            
          </Grid>
          {/* 데이터 출력 장소 */}
          <Grid sx={{ position: "relative", top: 15 }}>
            <p style={{ padding: 5, fontSize: 20 }}>{helpContext[Acts][Rules + 1]}</p>
          </Grid>
          
        </Grid>
        <Button
            variant='outlined'
            onClick={() => {
              handleClose();
            }}
            sx={{
              ...middleButton,
              display: "flex",
              justifyContent: "center",
              position: "relative",
              left: 245,
              borderRadius: '2px'
            }}
          >
            확인
          </Button>
      </Grid>
      
    </div>
  );
}

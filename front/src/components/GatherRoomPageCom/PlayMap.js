import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectColor, selectX, selectY, setColor, setX, setY } from "../../redux/slice/CharSlice";
import { selectUser } from "../../redux/slice/UserSlice";
import { useBeforeunload } from "react-beforeunload";
// import { useNavigate } from "react-router-dom";
// import { selectCntCivil, setCivil } from "../../redux/slice/CntCivilSlice";
import { setCop } from "../../redux/slice/CntCopSlice";
import { setDoc } from "../../redux/slice/CntDocSlice";
import { setLimit } from "../../redux/slice/CntLimitSlice";
import { setMaf } from "../../redux/slice/CntMafSlice";
// import { selectRoomTitle, RoomTitleSlice } from "../../redux/slice/RoomTitleSlice";
import { setNightTime, setTalkTime, setVoteTime } from "../../redux/slice/GameTimeSlice";
//리로딩되었는지 검사
// import { selectChkRL, setChkRL } from "../../redux/slice/CheckReloadSlice";
//방 번호 필요

//socktjs
import SockJS from "sockjs-client";
import { decreCon, increCon, setCon } from "../../redux/slice/CntConSlice";

import {
  //배경
  BG,
  BG2,
  //1. 파랑 공룡
  DLS,
  DLW,
  DRS,
  DRW,
  //2. 개구리
  FLS,
  FLW,
  FRS,
  FRW,
  //3. 파랑 공룡
  GDLR,
  GDLS,
  GDLW,
  GDRR,
  GDRS,
  GDRW,
  //4. 핑크 몬스터
  PMLS,
  PMLW,
  PMRS,
  PMRW,
  //5. 빨간 공룡
  RDLS,
  RDLW,
  RDRS,
  RDRW,
  //6. 화이트 몬스터
  WMLS,
  WMLW,
  WMRS,
  WMRW,
  //7. 노랑 공룡
  YDLS,
  YDLW,
  YDRS,
  YDRW,
  //8. 젤다
  ZeldaBS,
  ZeldaBW,
  ZeldaFS,
  ZeldaFW,
  ZeldaLS,
  ZeldaLW,
  ZeldaRS,
  ZeldaRW,
} from "../../img/ExportImg";

var StompJs = require("@stomp/stompjs");
export default function PlayMap() {
  //리로드 확인
  useBeforeunload((event) => {
    if (true) {
      client.publish({
        destination: pubAddr,
        headers: { token: acToken, "content-type": "application/json" },
        body: JSON.stringify({
          header: {
            type: "leave",
          },
          data: {
            nickname: myNickName,
          },
        }),
        skipContentLengthHeader: true,
      });
      event.preventDefault();
    }
  });

  const mapSize = 1083;
  //맵 출력 테이블 위치, 사이즈
  const table = {
    tbTop: 240,
    tbLeft: 440,
    width: 200,
    height: 120,
  };

  const chairs = [
    [180, 450], // 상1
    [180, 520], // 상2
    [180, 590], // 상3
    [280, 390], // 왼
    [280, 650], // 오
    [390, 450], // 왼
    [390, 510], // 아
    [390, 600], // 아
  ];

  let chairSeatState = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false };
  const charSize = 50;
  const chairSize = 40;
  //y, x
  const objectSize = {
    wall: [60, 520],
    wallRight: [60, 460],
    pcTable: [230, 50],
    bar: [400, 80],
    table: [65, 135],
    chair: [30, 30],
  };
  const object = {
    wall_1: [0, 0],
    wallRight_2: [0, 610],
    wall_3: [567, 50],
    wallRight_4: [567, 610],
    table_1: [265, 480],
    pcTable_1: [157, 45],
    bar_1: [225, 960],
    chair_1: [220, 480], // 상1
    chair_2: [220, 530], // 상2
    chair_3: [220, 580], // 상3
    chair_4: [285, 440], // 왼
    chair_5: [285, 630], // 오
    chair_6: [360, 480], // 하1
    chair_7: [360, 533], // 하2
    chair_8: [360, 585], // 하3,
  };
  const dispatch = useDispatch();
  let startYX = { y: 600, x: 300 };
  const roomNum = useSelector((state) => state.roomNum);
  let subGatherRoom = null;
  const acToken = useSelector(selectUser).accessToken;
  const myNickName = useSelector(selectUser).nickname;
  const myCharNum = useRef();
  let myColor = "#" + Math.round(Math.random() * 0xffffff).toString(16);

  let seatNum, seatChange, seatNothing;

  //맵에 출력할 의자 위치 (top, left)

  //포커싱 지정을 위한 변수
  const mapFocus = useRef();

  //div태그를 아바타 객체로 지정
  const myChar = useRef(document.getElementById("myCharacter"));
  // let myChar = document.getElementById("myCharacter");

  //키 입력 시 값 저장 배열, 움직였을 때 위치 저장, 속도
  let keyPress = {},
    pX = useRef(350),
    pY = useRef(490),
    speed = 3;

  //타 유저의 데이터 저장
  let otherUserData = {},
    //현재 몇번에 유저가 저장되어있는지 확인
    remainNum = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false };

  const subAddr = `/sub/room/${roomNum}`;
  const pubAddr = `/pub/room/${roomNum}`;

  const client = new StompJs.Client({
    //websocket 주소만 입력 가능 * ws://, wss:// 로 시작
    // brokerURL: "https://i7d106.p.ssafy.io:8080/ws",
    connectHeaders: {},
    // debug: function (str) {
    //   console.log(str);
    // },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.webSocketFactory = () => {
    return new SockJS("https://i7d106.p.ssafy.io:8080/ws");
  };

  client.onConnect = (frame) => {
    console.log("playMap onCon");
    subGatherRoom = client.subscribe(subAddr, onMessageReceived);
    userJoin();
  };

  client.onWebSocketClose = () => {
    "playMap 소켓 종료";
  };

  //에러 발생시 실행되는 코드
  client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  const userJoin = () => {
    client.publish({
      destination: pubAddr,
      headers: { token: acToken },
      body: JSON.stringify({
        header: {
          type: "join",
        },
        data: {
          nickname: myNickName,
          y: pY.current,
          x: pX.current,
          color: myColor,
        },
      }),
      skipContentLengthHeader: true,
    });
  };

  const charMove = (imgSrc, characterNum, dir) => {
    console.log("imgSrc: ", imgSrc);
    console.log("characterNum: ", characterNum);
    console.log("dir: ", dir);
    if (dir === undefined || dir === null) {
      console.log("character set");
      if (characterNum === 1) {
        imgSrc.children[0].src = DRS;
        console.log(imgSrc.children[0].src);
      } else if (characterNum === 2) {
        imgSrc.children[0].src = FRS;
      } else if (characterNum === 3) {
        imgSrc.children[0].src = GDRS;
      } else if (characterNum === 4) {
        imgSrc.children[0].src = PMRS;
      } else if (characterNum === 5) {
        imgSrc.children[0].src = RDRS;
      } else if (characterNum === 6) {
        imgSrc.children[0].src = WMRS;
      } else if (characterNum === 7) {
        imgSrc.children[0].src = YDRS;
      } else if (characterNum === 8) {
        imgSrc.children[0].src = ZeldaFS;
      }
      return;
    } else {
      //Blue Dino
      if (characterNum === 1) {
        //왼쪽 이동이면서 누르면서 이전 모션이 왼쪽 무빙이 아닐 때
        if (dir === "a" && imgSrc.children[0].src !== DLW) {
          imgSrc.children[0].src = DLW;
        }
        //오른쪽 이동이면서 이전 모션이 오른쪽 무빙이 아닐 때
        else if (dir === "d" && imgSrc.children[0].src !== DRW) {
          imgSrc.children[0].src = DRW;
        }
        //상, 하 입력일 때 왼쪽으로 서있었다면 왼쪽 이동 모션
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === DLS) {
          imgSrc.children[0].src = DLW;
        }
        //상, 하 입력일 때 오른쪽 스탠딩이면 오른쪽 이동 모션
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === DRS) {
          imgSrc.children[0].src = DRW;
        }
        //멈춰섰을 때
        if (dir === "p") {
          if (imgSrc.children[0].src === DRW) {
            imgSrc.children[0].src = DRS;
          } else if (imgSrc.children[0].src === DLW) {
            imgSrc.children[0].src = DLS;
          }
        }
      }
      //2번 개구리
      else if (characterNum === 2) {
        //왼쪽 이동이면서 누르면서 이전 모션이 왼쪽 무빙이 아닐 때
        if (dir === "a" && imgSrc.children[0].src !== FLW) {
          imgSrc.children[0].src = FLW;
        }
        //오른쪽 이동이면서 이전 모션이 오른쪽 무빙이 아닐 때
        else if (dir === "d" && imgSrc.children[0].src !== FRW) {
          imgSrc.children[0].src = FRW;
        }
        //상, 하 입력일 때 왼쪽으로 서있었다면 왼쪽 이동 모션
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === FLS) {
          imgSrc.children[0].src = FLW;
        }
        //상, 하 입력일 때 오른쪽 스탠딩이면 오른쪽 이동 모션
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === FRS) {
          imgSrc.children[0].src = FRW;
        }
        //멈춰섰을 때
        if (dir === "p") {
          if (imgSrc.children[0].src === FRW) {
            imgSrc.children[0].src = FRS;
          } else if (imgSrc.children[0].src === FLW) {
            imgSrc.children[0].src = FLS;
          }
        }
      }
      //Yellow dino
      else if (characterNum === 3) {
        if (dir === "a" && imgSrc.children[0].src !== GDLW) imgSrc.children[0].src = GDLW;
        else if (dir === "d" && imgSrc.children[0].src !== GDRW) imgSrc.children[0].src = GDRW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === GDLS)
          imgSrc.children[0].src = GDLW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === GDRS)
          imgSrc.children[0].src = GDRW;

        if (dir === "p") {
          if (imgSrc.children[0].src === GDRW) imgSrc.children[0].src = GDRS;
          else if (imgSrc.children[0].src === GDLW) imgSrc.children[0].src = GDLS;
        }
      }
      //pink monster
      else if (characterNum === 4) {
        if (dir === "a" && imgSrc.children[0].src !== PMLW) imgSrc.children[0].src = PMLW;
        else if (dir === "d" && imgSrc.children[0].src !== PMRW) imgSrc.children[0].src = PMRW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === PMLS)
          imgSrc.children[0].src = PMLW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === PMRS)
          imgSrc.children[0].src = PMRW;

        if (dir === "p") {
          if (imgSrc.children[0].src === PMRW) imgSrc.children[0].src = PMRS;
          else if (imgSrc.children[0].src === PMLW) imgSrc.children[0].src = PMLS;
        }
      }
      //red dino
      else if (characterNum === 5) {
        if (dir === "a" && imgSrc.children[0].src !== RDLW) imgSrc.children[0].src = RDLW;
        else if (dir === "d" && imgSrc.children[0].src !== RDRW) imgSrc.children[0].src = RDRW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === RDLS)
          imgSrc.children[0].src = RDLW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === RDRS)
          imgSrc.children[0].src = RDRW; 

        if (dir === "p") {
          if (imgSrc.children[0].src === RDRW) imgSrc.children[0].src = RDRS;
          else if (imgSrc.children[0].src === RDLW) imgSrc.children[0].src = RDLS;
        }
      }
      //white monster
      else if (characterNum === 6) {
        if (dir === "a" && imgSrc.children[0].src !== WMLW) imgSrc.children[0].src = WMLW;
        else if (dir === "d" && imgSrc.children[0].src !== WMRW) imgSrc.children[0].src = WMRW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === WMLS)
          imgSrc.children[0].src = WMLW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === WMRS)
          imgSrc.children[0].src = WMRW;

        if (dir === "p") {
          if (imgSrc.children[0].src === WMRW) imgSrc.children[0].src = WMRS;
          else if (imgSrc.children[0].src === WMLW) imgSrc.children[0].src = WMLS;
        }
      }
      //yellow
      else if (characterNum === 7) {
        if (dir === "a" && imgSrc.children[0].src !== YDLW) imgSrc.children[0].src = YDLW;
        else if (dir === "d" && imgSrc.children[0].src !== YDRW) imgSrc.children[0].src = YDRW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === YDLS)
          imgSrc.children[0].src = YDLW;
        else if ((dir === "w" || dir === "s") && imgSrc.children[0].src === YDRS)
          imgSrc.children[0].src = YDRW;

        if (dir === "p") {
          if (imgSrc.children[0].src === YDRW) imgSrc.children[0].src = YDRS;
          else if (imgSrc.children[0].src === YDLW) imgSrc.children[0].src = YDLS;
        }
      }
      //가만히 있는데 걸음
      else if (characterNum === 8) {
        if (dir === "a" && !imgSrc.children[0].src.includes("ZLW."))
          imgSrc.children[0].src = ZeldaLW;
        if (dir === "d" && !imgSrc.children[0].src.includes("ZRW."))
          imgSrc.children[0].src = ZeldaRW;
        if (dir === "w" && !imgSrc.children[0].src.includes("ZBW."))
          imgSrc.children[0].src = ZeldaBW;
        if (dir === "s" && !imgSrc.children[0].src.includes("ZFW."))
          imgSrc.children[0].src = ZeldaFW;

        if (dir === "p") {
          if (imgSrc.children[0].src.includes("ZLW.")) {
            imgSrc.children[0].src = ZeldaLS;
          } else if (imgSrc.children[0].src.includes("ZRW.")) {
            imgSrc.children[0].src = ZeldaRS;
          } else if (imgSrc.children[0].src.includes("ZFW.")) {
            imgSrc.children[0].src = ZeldaFS;
          } else if (imgSrc.children[0].src.includes("ZBW.")) {
            imgSrc.children[0].src = ZeldaBS;
          }
        }
      }
    }
  };
  //소켓으로 정보를 받았을 때 처리 함수
  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log("PlayMap onMR: ", payloadData);

    //자신 포함 모든 유저의 입장 신호 수신 시
    if (payloadData.header.type === "join") {
      //본인 전송 join 무시 필요
      if (payloadData.data.nickname === myNickName) {
        console.log("↑↑↑↑myData↑↑↑↑");
        //내 캐릭터만 지정받고 종료
        myCharNum.current = payloadData.data.character;
        charMove(myChar.current, payloadData.data.character);
        return;
      }

      //이미 방에 접속해있는 유저인 경우 처리해주지 않음
      if (otherUserData[payloadData.data.nickname]) return;
      //새로 접속해온 경우 남아있는 자리를 확인 후 입력
      for (let i in remainNum) {
        if (!remainNum[i]) {
          remainNum[i] = true;

          otherUserData[payloadData.data.nickname] = {
            color: payloadData.data.color,
            num: i,
            character: payloadData.data.character,
          };
          charMove(document.getElementById(`char${i}`), payloadData.data.character);

          document.getElementById(`char${i}`).style.left = payloadData.data.x + "px";
          document.getElementById(`char${i}`).style.top = payloadData.data.y + "px";
          document.getElementById(`char${i}Name`).innerText = payloadData.data.nickname;
          document.getElementById(`char${i}`).style.display = "block";
          break;
        }
      }
    }
    //반환된 값을 받은 경우
    else if (payloadData.header.type === "list") {
      let data = payloadData.data.users;
      console.log("PlayMap user list: ", data);
      dispatch(setCon(data.length));

      //저장된 유저의 정보를 입력
      for (let i = 0; i < data.length; i++) {
        //본인 닉네임,이미 포함된 유저 제외
        if (data[i].nickname === myNickName) {
          continue;
        }
        //이미 존재하는 유저는 제외
        if (otherUserData[data[i].nickname]) {
          console.log("PlayMap " + i + " 번째, already exist data.users: ", data[i]);
          continue;
        }
        //다른 유저의 정보를 모두 저장
        else {
          //새로 접속해온 경우 남아있는 자리를 확인
          for (let j in remainNum) {
            //빈 자리에 입력
            if (!remainNum[j]) {
              //해당 자리 할당
              remainNum[j] = true;
              //해당 유저의 구분값, 번호 저장
              otherUserData[data[i].nickname] = {
                color: data[i].color,
                num: j,
                character: data[i].character,
              };
              charMove(document.getElementById(`char${j}`), data[i].character);
              //해당 번호의 캐릭터에 값 입력
              document.getElementById(`char${j}`).style.left = data[i].x + "px";
              document.getElementById(`char${j}`).style.top = data[i].y + "px";
              document.getElementById(`char${j}Name`).innerText = data[i].nickname;
              document.getElementById(`char${j}`).style.display = "block";
              break;
            }
          }
        }
      }
    }

    //유저 방 퇴장
    else if (payloadData.header.type === "leave") {
      let userNum = otherUserData[payloadData.data.nickname].num;
      remainNum[userNum] = false;
      document.getElementById(`char${userNum}`).style.display = "none";
      document.getElementById(`char${userNum}Name`).innerText = "";
      document.getElementById(`char${userNum}Name`).left = startYX.x;
      document.getElementById(`char${userNum}Name`).top = startYX.y;

      otherUserData[payloadData.data.nickname] = null;
    }
    //상호작용
    else if (payloadData.header.type === "interact") {
      console.log("PM ↑↑interact↑↑");
      let eachUser = otherUserData[payloadData.data.nickname];
      //본인 움직임은 제외
      if (payloadData.data.nickname === myNickName || eachUser === undefined) return;

      charMove(
        document.getElementById(`char${eachUser.num}`),
        eachUser.character,
        payloadData.data.dir
      );
      document.getElementById(`char${otherUserData[payloadData.data.nickname].num}`).style.left =
        payloadData.data.x + "px";
      document.getElementById(`char${otherUserData[payloadData.data.nickname].num}`).style.top =
        payloadData.data.y + "px";

      //의자에 앉았을 때 해당 의자 비활성화
      if (payloadData.data.status === "ready") {
      }
      //의자 일어섰을 때 해당 의자 활성화
      else if (payloadData.data.status === "stand") {
      }
    } else if (payloadData.header.type === "start") {
      console.log("start: ", payloadData.data);
    }
    //게임 설정 변경 데이터 수신
    else if (payloadData.header.type === "setting") {
      console.log("setting: ", payloadData.data);
      //방 제목 변경 추후
      dispatch(setLimit(payloadData.data.capacity));
      dispatch(setMaf(payloadData.data.mafia));
      dispatch(setDoc(payloadData.data.doctor));
      dispatch(setCop(payloadData.data.police));
      dispatch(setMaf(payloadData.data.mafia));
      dispatch(setTalkTime(payloadData.data.talkTime));
      dispatch(setVoteTime(payloadData.data.voteTime));
      dispatch(setNightTime(payloadData.data.nightTime));
    }
    //해당 되지 않는 타입 출력
    else {
      console.log("else: ", payloadData);
    }
  };

  window.onbeforeunload = function () {};

  //웹소켓 코드 끝

  //첫 렌더링될 때만 입력받는 input태그로 focus
  useEffect(() => {
    myChar.current = document.getElementById("myCharacter");
    // myChar.current.style.background = myColor;
    myChar.current.style.display = "block";
    mapFocus.current.focus();

    //랜더링 종료 시 인터벌 종료
    return () => {
      otherUserData = {};
      client.publish({
        destination: pubAddr,
        headers: { token: acToken, "content-type": "application/json" },
        body: JSON.stringify({
          header: {
            type: "leave",
          },
          data: {
            nickname: myNickName,
          },
        }),
        skipContentLengthHeader: true,
      });

      // client.deactivate();
      //랜더링 종료될 때 leave 신호 전송
      clearInterval(inputCheck);
      clearInterval(sendMyPos);
    };
  }, [myColor, myChar]);

  //약 60fps로 위치 정보 전송, 움직일 때만 전송
  const sendMyPos = setInterval(() => {
    if (client) {
      //w, s, a, d
      if (keyPress[87] || keyPress[83] || keyPress[65] || keyPress[68]) {
        let dir = "";
        if (keyPress[87]) dir = "w";
        if (keyPress[83]) dir = "s";
        if (keyPress[65]) dir = "a";
        if (keyPress[68]) dir = "d";

        charMove(myChar.current, myCharNum.current, dir);
        client.publish({
          destination: pubAddr,
          headers: { "content-type": "application/json", token: acToken },
          body: JSON.stringify({
            header: {
              type: "interact",
            },
            data: {
              nickname: myNickName,
              status: "move",
              chairNum: null,
              x: pX.current,
              y: pY.current,
              color: myColor,
              dir: dir,
            },
          }),
          skipContentLengthHeader: true,
        });
      }
    }
  }, 16);
  let objName, objNum;
  //부드러운 움직임을 위한 변수 선언
  //일정 초마다 키 입력 확인
  const inputCheck = setInterval(() => {
    if (keyPress[87]) pY.current -= speed;
    if (keyPress[83]) pY.current += speed; // down - s
    if (keyPress[65]) pX.current -= speed; // left - a
    if (keyPress[68]) pX.current += speed;

    // 모든 벽에 대한 충돌 감지
    seatNum = -1;
    for (const key in object) {
      //object명
      objName = key.slice(0, key.indexOf("_"));
      objNum = key.substring(key.indexOf("_") + 1);

      //의자 일 때
      if (objName === "chair") {
        if (
          object[key][1] < objectSize[objName][1] + pX.current &&
          object[key][1] + objectSize[objName][1] > pX.current &&
          object[key][0] < objectSize[objName][0] + pY.current &&
          object[key][0] + objectSize[objName][0] > pY.current
        ) {
          seatNum = objNum;
          if (seatNum !== seatChange) {
            seatNothing = true;
            seatChange = objNum;

            client.publish({
              destination: pubAddr,
              headers: { "content-type": "application/json", token: acToken },
              body: JSON.stringify({
                header: {
                  type: "interact",
                },
                data: {
                  nickname: myNickName,
                  status: "ready",
                  chairNum: seatChange,
                  y: pY.current,
                  x: pX.current,
                  color: myColor,
                  dir: null,
                },
              }),
              skipContentLengthHeader: true,
            });
          }
        }
      }
      //의자 외
      else {
        if(pX.current < object[key][1] + objectSize[objName][1] &&
          pX.current + charSize > object[key][1] &&
          pY.current < object[key][0] + objectSize[objName][0] &&
          charSize + pY.current > object[key][0]){
          if (keyPress[87]) pY.current += speed;
          if (keyPress[83]) pY.current -= speed; // down - s
          if (keyPress[65]) pX.current += speed; // left - a
          if (keyPress[68]) pX.current -= speed;
          }
      }
    }

    //자리에서 벗어났을 시 소켓으로 준비 완료 해제 전송
    if (seatNum === -1 && seatNothing === true) {
      seatNothing = false;

      client.publish({
        destination: pubAddr,
        headers: { "content-type": "application/json", token: `Bearer ${acToken}` },
        body: JSON.stringify({
          header: {
            type: "interact",
          },
          data: {
            nickname: myNickName,
            status: "stand",
            chairNum: -1,
            color: myColor,
            y: pY.current,
            x: pX.current,
            dir: null,
          },
        }),
        skipContentLengthHeader: true,
      });
    }
    //외부 벽 충돌 감지
    if (pY.current < 10) pY.current = 10;
    if (pY.current >= 650 - charSize - 10) pY.current = 650 - charSize - 10;
    if (pX.current < 33) pX.current = 33;
    if (pX.current >= mapSize - charSize - 33) pX.current = mapSize - charSize - 33;

    //캐릭터 좌표 최신화
    myChar.current.style.left = pX.current + "px";
    myChar.current.style.top = pY.current + "px";
  }, 16);

  //맵 클릭 시 입력 포커싱 지정
  const changeFocus = () => {
    mapFocus.current.focus();
  };

  //키 눌렀을 때 해당 값 true로 변환
  const handleKeyDown = (e) => {
    keyPress[e.keyCode.toString()] = true;
  };

  //키 땠을 때 해당 값 false로 변환
  const handleKeyUp = (e) => {
    keyPress[e.keyCode.toString()] = false;
    client.publish({
      destination: pubAddr,
      headers: { "content-type": "application/json", token: acToken },
      body: JSON.stringify({
        header: {
          type: "interact",
        },
        data: {
          nickname: myNickName,
          status: "move",
          chairNum: null,
          x: pX.current,
          y: pY.current,
          color: myColor,
          dir: "p",
        },
      }),
      skipContentLengthHeader: true,
    });
    charMove(myChar.current, myCharNum.current, "p");
  };

  client.activate();
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* 맵 사이즈 */}
      <div
        id='map'
        onClick={changeFocus}
        style={{
          width: mapSize,
          height: 650,
          position: "relative",
          left: 0,
          top: 0,
        }}
      >
        {/* 배경 이미지 출력 */}
        <img src={BG2} alt='BackgroundImg' style={{ width: "100%", height: "100%" }} />
        
        {/* 모든 충돌감지 오브젝트 출력 */}
        {Object.entries(object).map((entrie, idx) => {
          console.log("entrie: " + entrie[0]);
          console.log("entrie[0].indexOf('_'): " + entrie[0].slice(0, entrie[0].indexOf("_")));
          console.log(
            "objectSize[entrie[0].indexOf('_')][0]: " +
              objectSize[entrie[0].slice(0, entrie[0].indexOf("_"))][0]
          );
          return (
            <div
              key={entrie[0]}
              id={entrie[0]}
              style={{
                height: objectSize[entrie[0].slice(0, entrie[0].indexOf("_"))][0],
                width: objectSize[entrie[0].slice(0, entrie[0].indexOf("_"))][1],
                top: entrie[1][0],
                left: entrie[1][1],
                position: "absolute",
              }}
            ></div>
          );
        })}
        <div
          id='myCharacter'
          style={{
            margin: `0px`,
            width: charSize,
            height: charSize,
            position: "absolute",
            display: "none",
          }}
        >
          <img alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
          <div style={{ top: -20, width: 200, position: "absolute", left: -100 + 25 }}>
            {myNickName !== undefined ? myNickName : "need login"}
          </div>
        </div>
        {/* 다른 유저의 캐릭터 */}

        <div
          id='char1'
          style={{
            margin: `0px`,
            width: charSize,
            height: charSize,
            position: "absolute",
            display: "none",
          }}
        >
          <img alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
          <div
            id='char1Name'
            style={{ top: -20, width: 200, position: "absolute", left: -100 + 25 }}
          ></div>
        </div>
        <div
          id='char2'
          style={{
            margin: `0px`,
            width: charSize,
            height: charSize,
            position: "absolute",
            display: "none",
          }}
        >
          <img alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
          <div
            id='char2Name'
            style={{ top: -20, width: 200, position: "absolute", left: -100 + 25 }}
          ></div>
        </div>
        <div
          id='char3'
          style={{
            margin: `0px`,
            width: charSize,
            height: charSize,
            position: "absolute",
            display: "none",
          }}
        >
          <img alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
          <div
            id='char3Name'
            style={{ top: -20, width: 200, position: "absolute", left: -100 + 25 }}
          ></div>
        </div>
        <div
          id='char4'
          style={{
            margin: `0px`,
            width: charSize,
            height: charSize,
            position: "absolute",
            display: "none",
          }}
        >
          <img alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
          <div
            id='char4Name'
            style={{ top: -20, width: 200, position: "absolute", left: -100 + 25 }}
          ></div>
        </div>
        <div
          id='char5'
          style={{
            margin: `0px`,
            width: charSize,
            height: charSize,
            position: "absolute",
            display: "none",
          }}
        >
          <img alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
          <div
            id='char5Name'
            style={{ top: -20, width: 200, position: "absolute", left: -100 + 25 }}
          ></div>
        </div>
        <div
          id='char6'
          style={{
            margin: `0px`,
            width: charSize,
            height: charSize,
            position: "absolute",
            display: "none",
          }}
        >
          <img alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
          <div
            id='char6Name'
            style={{ top: -20, width: 200, position: "absolute", left: -100 + 25 }}
          ></div>
        </div>
        <div
          id='char7'
          style={{
            margin: `0px`,
            width: charSize,
            height: charSize,
            position: "absolute",
            display: "none",
          }}
        >
          <img alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
          <div
            id='char7Name'
            style={{ top: -20, width: 200, position: "absolute", left: -100 + 25 }}
          ></div>
        </div>
        <input
          id='inputTag'
          value=''
          type='text'
          ref={mapFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          readOnly
          style={{
            color: "rgba(30,30,30,0.0)",
            border: "none",
            cursor: "default",
            margin: "0",
            position: "absolute",
            top: 5,
            left: 5,
          }}
        />
        <button
          type='hidden'
          style={{ color: "rgba(30,30,30,0.0)" }}
          onClick={() => {
            console.log(otherUserData);
          }}
        >
          현재 접속 목록 확인
        </button>
      </div>
    </div>
  );
}

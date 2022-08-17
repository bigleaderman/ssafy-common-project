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
// import { selectCntCon, increCon, decreCon, setCon } from "../../redux/slice/CntConSlice";
//방 번호 필요

//socktjs
import SockJS from "sockjs-client";
import { decreCon, increCon } from "../../redux/slice/CntConSlice";

//img
import DLS from "../../img/character/dino/dinoLeftStand.gif";
import DLW from "../../img/character/dino/dinoLeftWalk.gif";
import DRW from "../../img/character/dino/dinoRightWalk.gif";
import DRS from "../../img/character/dino/dinoRightStand.gif";
import BG from "../../img/character/dino/background.png";
var StompJs = require("@stomp/stompjs");
export default function PlayMap() {
  //리로드 확인
  useBeforeunload((event) => {
    if (true) {
      event.preventDefault();
      dispatch(setX(pX.current));
      dispatch(setY(pY.current));
    }
  });

  const mapSize = 1083;
  //맵 출력 테이블 위치, 사이즈
  const table = {
    tbTop: 150,
    tbLeft: 470,
    width: 200,
    height: 300,
  };
  const chairs = [
    [110, 500], // 위
    [110, 620], // 위
    [180, 700], // 오
    [400, 700], // 오
    [470, 500], // 아
    [470, 620], // 아
    [180, 420], // 왼
    [400, 420], // 왼
  ];
  let chairSeatState = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false };
  const charSize = 50;
  const chairSize = 20;
  const dispatch = useDispatch();
  let startYX = { y: 600, x: 300 };
  const roomNum = useSelector((state) => state.roomNum);
  let subGatherRoom = null;
  const acToken = useSelector(selectUser).accessToken;
  const myNickName = useSelector(selectUser).nickname;
  let myColor = "#" + Math.round(Math.random() * 0xffffff).toString(16);

  let seatNum, seatChange, seatCnt, seatNothing;

  //맵에 출력할 의자 위치 (top, left)

  //포커싱 지정을 위한 변수
  const mapFocus = useRef();

  //div태그를 아바타 객체로 지정
  const myChar = useRef(document.getElementById("myCharacter"));
  // let myChar = document.getElementById("myCharacter");

  //키 입력 시 값 저장 배열, 움직였을 때 위치 저장, 속도
  let keyPress = {},
    pX = useRef(350),
    pY = useRef(550),
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
    console.log("when send join color, x, y:", myColor + " " + pX.current + " " + pY.current);
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

  //소켓으로 정보를 받았을 때 처리 함수
  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log("payloadData: ", payloadData);

    //다른 유저의 입장 신호 수신 시
    if (payloadData.header.type === "join") {
      //본인 전송 join 무시 필요
      if (payloadData.data.nickname === myNickName) return;

      //이미 방에 접속해있는 유저인 경우 처리해주지 않음
      if (otherUserData[payloadData.data.nickname]) return;
      dispatch(increCon());
      //새로 접속해온 경우 남아있는 자리를 확인 후 입력
      for (let i in remainNum) {
        if (!remainNum[i]) {
          remainNum[i] = true;
          console.log("undefined user: " + payloadData);
          otherUserData[payloadData.data.nickname] = { color: payloadData.data.color, num: i };
          document.getElementById(`char${i}`).style.left = payloadData.data.x;
          document.getElementById(`char${i}`).style.top = payloadData.data.y;
          document.getElementById(`char${i}`).style.background = payloadData.data.color;
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
      //저장된 유저의 정보를 입력
      for (let i = 0; i < data.length; i++) {
        //본인 닉네임 제외
        if (data[i].nickname === myNickName || otherUserData[data[i].nickname]) {
          console.log(i + " 번째, returned data.users: ", data[i]);
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
              otherUserData[data[i].nickname] = { color: data[i].color, num: j };
              //해당 번호의 캐릭터에 값 입력
              document.getElementById(`char${j}`).style.left = data[i].x + "px";
              document.getElementById(`char${j}`).style.top = data[i].y + "px";
              document.getElementById(`char${j}`).style.background = data[i].color;
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
      dispatch(decreCon());
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
      // console.log("interact, payloadData:", payloadData.data);
      //본인 움직임은 제외
      if (
        payloadData.data.nickname === myNickName ||
        otherUserData[payloadData.data.nickname] === undefined
      )
        return;

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

  //웹소켓 코드 끝

  //첫 렌더링될 때만 입력받는 input태그로 focus
  useEffect(() => {
    myChar.current = document.getElementById("myCharacter");
    // myChar.current.style.background = myColor;
    myChar.current.style.display = "block";
    mapFocus.current.focus();

    //랜더링 종료 시 인터벌 종료
    return () => {
      client.deactivate();
      //랜더링 종료될 때 leave 신호 전송
      clearInterval(inputCheck);
      clearInterval(sendMyPos);
      dispatch(setX(pX.current));
      dispatch(setY(pY.current));
    };
  }, [myColor, myChar]);

  //약 60fps로 위치 정보 전송, 움직일 때만 전송
  const sendMyPos = setInterval(() => {
    if (client) {
      //w, s, a, d
      if (keyPress[87] || keyPress[83] || keyPress[65] || keyPress[68]) {
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
            },
          }),
          skipContentLengthHeader: true,
        });
        if (keyPress[65] && myChar.current.children[0].src !== DLW) {
          myChar.current.children[0].src = DLW;
        } else if (keyPress[68] && myChar.current.children[0].src !== DRW) {
          myChar.current.children[0].src = DRW;
        } else if ((keyPress[87] || keyPress[83]) && myChar.current.children[0].src === DLS) {
          myChar.current.children[0].src = DLW;
        } else if ((keyPress[87] || keyPress[83]) && myChar.current.children[0].src === DRS) {
          myChar.current.children[0].src = DRW;
        }
      }
    }
  }, 16);

  //부드러운 움직임을 위한 변수 선언
  //일정 초마다 키 입력 확인
  const inputCheck = setInterval(() => {
    if (keyPress[87]) pY.current -= speed;
    if (keyPress[83]) pY.current += speed; // down - s
    if (keyPress[65]) pX.current -= speed; // left - a
    if (keyPress[68]) pX.current += speed;

    //테이블 충돌 감지
    if (
      pX.current < table.tbLeft + table.width &&
      pX.current + charSize > table.tbLeft &&
      pY.current < table.tbTop + table.height &&
      charSize + pY.current > table.tbTop
    ) {
      if (keyPress[87]) pY.current += speed;
      if (keyPress[83]) pY.current -= speed; // down - s
      if (keyPress[65]) pX.current += speed; // left - a
      if (keyPress[68]) pX.current -= speed;
    }

    seatNum = -1;
    //의자 충돌 감지
    for (let i = 0; i < 8; i++) {
      if (
        chairs[i][1] < pX.current + charSize &&
        chairs[i][1] + chairSize > pX.current &&
        chairs[i][0] < charSize + pY.current &&
        chairs[i][0] + chairSize > pY.current
      ) {
        seatNum = i;
        //자리에 앉았을 시 소켓으로 준비 완료 전송
        if (seatNum !== seatChange) {
          seatNothing = true;
          seatChange = i;

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
              },
            }),
            skipContentLengthHeader: true,
          });
        }
        //자리와 이전 자리가 같을 시
      }
    }
    //자리에서 벗어났을 시 소켓으로 준비 완료 해제 전송
    if (seatNum === -1 && seatNothing === true) {
      seatCnt = 0;
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
          },
        }),
        skipContentLengthHeader: true,
      });
    }
    //외부 벽 충돌 감지
    if (pY.current < 30) pY.current = 30;
    if (pY.current >= 650 - charSize - 30) pY.current = 650 - charSize - 30;
    if (pX.current < 30) pX.current = 30;
    if (pX.current >= mapSize - charSize - 30) pX.current = mapSize - charSize - 30;

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
        },
      }),
      skipContentLengthHeader: true,
    });
    if (myChar.current.children[0].src === DRW) {
      myChar.current.children[0].src = DRS;
    } else if (myChar.current.children[0].src === DLW) {
      myChar.current.children[0].src = DLS;
    }
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
        <img src={BG} alt='BackgroundImg' style={{ width: "100%", height: "100%" }} />
        <div
          id='table'
          style={{
            width: table.width,
            height: table.height,
            left: table.tbLeft,
            top: table.tbTop,
            background: "green",
            position: "absolute",
          }}
        >
          이미지와 사이즈 맞추기 위해 일단 삽입
        </div>

        {chairs.map((e, idx) => {
          return (
            <div
              key={idx}
              id={"chair" + idx}
              style={{
                top: e[0],
                left: e[1],
                height: chairSize,
                width: chairSize,
                background: "blue",
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
          <img src={DLS} alt='DinoLeftStand' style={{ width: charSize, height: charSize }} />
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
            background: "red",
            position: "absolute",
            display: "none",
            left: startYX.x,
            top: startYX.y,
          }}
        >
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
            background: "red",
            position: "absolute",
            display: "none",
            left: startYX.x,
            top: startYX.y,
          }}
        >
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
            background: "red",
            position: "absolute",
            display: "none",
            left: startYX.x,
            top: startYX.y,
          }}
        >
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
            // background: "red",
            position: "absolute",
            display: "none",
            left: startYX.x,
            top: startYX.y,
          }}
        >
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
            background: "red",
            position: "absolute",
            display: "none",
            left: startYX.x,
            top: startYX.y,
          }}
        >
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
            background: "red",
            position: "absolute",
            display: "none",
            left: startYX.x,
            top: startYX.y,
          }}
        >
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
            background: "red",
            position: "absolute",
            display: "none",
            left: startYX.x,
            top: startYX.y,
          }}
        >
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

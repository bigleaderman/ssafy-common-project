import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SavePosX, selectPosX } from "../../redux/slice/MapPosXSlice";
import { SavePosY, selectPosY } from "../../redux/slice/MapPosYSlice";
import { getUser } from "../../redux/slice/UserSlice";
import { useBeforeunload } from "react-beforeunload";
import axios from "axios";

//방 번호 필요

//socktjs
import { over } from "stompjs";
import SockJS from "sockjs-client";

//memo : 값을 메모이
//callback : 함수를 메모이
export default function PlayMap() {
    var stompClient = null;
    var subGatherRoom = null;
    const dispatch = useDispatch();
    let seatNum, seatChange, seatCnt, seatNothing;
    const mapSize = 700;
    const charSize = 50;
    const chairSize = 20;
    const table = {
        tbTop: 100,
        tbLeft: 200,
        width: 300,
        height: 300,
    };
    const chairs = [
        [40, 300],
        [40, 400],
        [160, 100],
        [300, 100],
        [450, 300],
        [450, 400],
        [160, 550],
        [300, 550],
    ];

    //다른 StompJs 코드

    //주기적으로 내 위치 정보를 전송

    //주기적으로 상대방들의 정보 송신

    //송신받은 정보를 저장
    const [userData, setUserData] = useState({
        username: dispatch(getUser).nickname,
        connected: false,
        message: "",
    });
    //맵 크기
    //포커싱 지정을 위한 변수
    const mapFocus = useRef();
    //div태그를 아바타 객체로 지정
    let myChar;

    let keyPress = {},
        pX = useRef(useSelector(selectPosX)),
        pY = useRef(useSelector(selectPosY)),
        speed = 5;

    //SockJs + StompJs
    var StompJs = require("@stomp/stompjs");

    const client2 = new StompJs.Client({
        //websocket 주소만 입력 가능 * ws://, wss:// 로 시작
        // brokerURL: "https://i7d106.p.ssafy.io:8080/ws",
        connectHeaders: {},
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    client2.webSocketFactory = () => {
        return new SockJS("https://i7d106.p.ssafy.io:8080/ws");
    };
    console.log(" client2.onConnect");
    client2.onConnect = (frame) => {
        //구독하는 곳
        subGatherRoom = client2.subscribe("/sub/room/0", onMessageReceived);

        console.log("frame: ", frame);

        //유저 방 입장
        userJoin();
    };

    client2.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
    };
    console.log("client2.activate();");
    client2.activate();

    //웹 소켓 코드 끝

    //웹소켓 코드 시작
    const connect = () => {
        console.log("function connect");
        //소켓 주소를 탑재한 객체 생성
        let Sock = new SockJS("https://i7d106.p.ssafy.io:8080/ws");
        console.log("let Sock: ", Sock);
        //스톰프 프로토콜 탑재
        stompClient = over(Sock);
        console.log("1 let stompClient: ", stompClient);
        //연결, 에러 콜백함수 탑재해서 연결 시도
        stompClient.connect({}, onConnected, onError);
        console.log("2 let stompClient: ", stompClient);
    };

    const onConnected = () => {
        console.log("let stompClient: ", stompClient);
        console.log("function onConnected");
        // setUserData({ ...userData, connected: true });
        //세부 주소 구독
        stompClient.subscribe("/sub/room/0", onMessageReceived);
        userJoin();
        console.log("let stompClient: ", stompClient);
    };

    const userJoin = () => {
        client2.publish({
            destination: "/sub/room/0",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                header: {
                    type: "join",
                },
                data: {
                    nickname: "닉네임",
                },
            }),
            skipContentLengthHeader: true,
        });
    };

    const onError = (err) => {
        console.log("function onError");
        console.log(err);
    };

    const onMessageReceived = (payload) => {
        console.log("function onMessageReceived");
        console.log("payload: ", payload);
        var payloadData = JSON.parse(payload.body);
        console.log("payloadData: ", payloadData);
    };

    const handleMessage = (event) => {
        console.log("function handleMessage");
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };

    const sendValue = () => {
        client2.publish({
            destination: "/sub/room/0",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                header: {
                    type: "join",
                },
                data: {
                    nickname: "닉네임",
                },
            }),
            skipContentLengthHeader: true,
        });

        // console.log(stompClient);
        // if (stompClient) {
        //     var chatMessage = {
        //         header: {
        //             type: "join",
        //         },
        //         data: {
        //             nickname: "닉네임",
        //         },
        //     };
        //     console.log(chatMessage);
        //     stompClient.send("/pub/room/0", {}, JSON.stringify(chatMessage));
        //     // setUserData({ ...userData, message: "" });
        // }
    };

    //웹소켓 코드 끝

    //렌더링될 때마다 myChar가 #myCharacter 를 가르킴
    useEffect(() => {
        myChar = document.getElementById("myCharacter");
        console.log("myChar rendered");
        //랜더링 종료 시 인터벌 종료
        return () => {
            clearInterval(inputCheck);

            console.log("pX : ", pX.current);
            console.log("pY : ", pY.current);
            dispatch(SavePosX(pX.current));
            dispatch(SavePosY(pY.current));
            console.log("render returned");
        };
    });

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
                if (seatNum != seatChange) {
                    seatNothing = true;
                    document.getElementById("inputTag").value = "준비 완료";
                    console.log("SeatNum: ", seatNum);
                    console.log("send ready");
                    seatChange = i;

                    client2.publish({
                        destination: "/sub/room/0",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({
                            header: {
                                type: "interact",
                            },
                            data: {
                                nickname: "Jik",
                                status: "ready",
                                chairNum: seatChange,
                                y: pY.current,
                                x: pX.current,
                            },
                        }),
                        skipContentLengthHeader: true,
                    });
                }
                //자리와 이전 자리가 같을 시
            }
        }
        //자리에서 벗어났을 시 소켓으로 준비 완료 해제 전송
        if (seatNum == -1 && seatNothing == true) {
            console.log("send not ready");
            document.getElementById("inputTag").value = "준비 중";
            seatCnt = 0;
            seatNothing = false;

            client2.publish({
                destination: "/sub/room/0",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    header: {
                        type: "interact",
                    },
                    data: {
                        nickname: "Jik",
                        status: "stand",
                        chairNum: -1,
                        y: pY.current,
                        x: pX.current,
                    },
                }),
                skipContentLengthHeader: true,
            });
        }
        if (pY.current < 0)
            //외부 벽 충돌 감지
            pY.current = 0;
        if (pY.current >= mapSize - charSize) pY.current = mapSize - charSize;
        if (pX.current < 0) pX.current = 0;
        if (pX.current >= mapSize - charSize) pX.current = mapSize - charSize;

        //캐릭터 좌표 최신화
        myChar.style.left = pX.current + "px";
        myChar.style.top = pY.current + "px";
    }, 16);

    //첫 렌더링될 때만 입력받는 input태그로 focus
    useEffect(() => {
        console.log("useEffect focus once");
        mapFocus.current.focus();

        // connect();
    }, []);

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
    };

    //중간에 게임방을 나갈 때 진짜 나갈 것인지 확인 받기
    const [Value, setValue] = useState("");
    useBeforeunload((e) => {
        if (Value !== "") e.preventDefault();
    });

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}
        >
            <button onClick={sendValue}>전송버튼</button>
            <input
                id="inputTag"
                onChange={(e) => setValue(e.target.value)}
                value="준비 중"
                type="text"
                ref={mapFocus}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                readOnly
                style={{
                    border: "none",
                    cursor: "default",
                    margin: "0",
                    position: "absolute",
                    top: 5,
                    left: 5,
                }}
            />
            <div
                id="map"
                onClick={changeFocus}
                style={{
                    width: mapSize,
                    height: mapSize,
                    background: "orange",
                    position: "relative",
                    left: 0,
                    top: 0,
                }}
            >
                <div
                    id="table"
                    style={{
                        width: table.width,
                        height: table.height,
                        left: table.tbLeft,
                        top: table.tbTop,
                        background: "green",
                        position: "absolute",
                    }}
                ></div>

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
                    id="myCharacter"
                    style={{
                        margin: `0px`,
                        width: charSize,
                        height: charSize,
                        background: "red",
                        position: "absolute",
                    }}
                ></div>
                {/* 다른 유저의 캐릭터 작성 */}
                <div
                    id="char1"
                    style={{
                        margin: `0px`,
                        width: charSize,
                        height: charSize,
                        background: "red",
                        position: "absolute",
                        display: "none",
                    }}
                ></div>
                <div
                    id="char2"
                    style={{
                        margin: `0px`,
                        width: charSize,
                        height: charSize,
                        background: "red",
                        position: "absolute",
                        display: "none",
                    }}
                ></div>
                <div
                    id="char3"
                    style={{
                        margin: `0px`,
                        width: charSize,
                        height: charSize,
                        background: "red",
                        position: "absolute",
                        display: "none",
                    }}
                ></div>
                <div
                    id="char4"
                    style={{
                        margin: `0px`,
                        width: charSize,
                        height: charSize,
                        background: "red",
                        position: "absolute",
                        display: "none",
                    }}
                ></div>
                <div
                    id="char5"
                    style={{
                        margin: `0px`,
                        width: charSize,
                        height: charSize,
                        background: "red",
                        position: "absolute",
                        display: "none",
                    }}
                ></div>
                <div
                    id="char6"
                    style={{
                        margin: `0px`,
                        width: charSize,
                        height: charSize,
                        background: "red",
                        position: "absolute",
                        display: "none",
                    }}
                ></div>
                <div
                    id="char7"
                    style={{
                        margin: `0px`,
                        width: charSize,
                        height: charSize,
                        background: "red",
                        position: "absolute",
                        display: "none",
                    }}
                ></div>
            </div>
        </div>
    );
}

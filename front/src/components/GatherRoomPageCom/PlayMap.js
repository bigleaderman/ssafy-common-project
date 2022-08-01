import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SavePosX, selectPosX } from "../../redux/slice/GatherMapPosXSlice";
import { SavePosY, selectPosY } from "../../redux/slice/GatherMapPosYSlice";
import { useBeforeunload } from "react-beforeunload";
import axios from "axios";
//memo : 값을 메모이
//callback : 함수를 메모이

export default function PlayMap(props) {
    const dispatch = useDispatch();
    let seatNum, seatChange;
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

    //맵 크기
    //포커싱 지정을 위한 변수
    const mapFocus = useRef();
    //div태그를 아바타 객체로 지정
    let myChar;

    let keyPress = {},
        pX = useRef(useSelector(selectPosX)),
        pY = useRef(useSelector(selectPosY)),
        speed = 5;

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

        //의자 충돌 감지
        for (let i = 0; i < 8; i++) {
            if (
                chairs[i][1] < pX.current + charSize &&
                chairs[i][1] + chairSize > pX.current &&
                chairs[i][0] < charSize + pY.current &&
                chairs[i][0] + chairSize > pY.current
            ) {
                seatNum = i;
                //자리와 이전 자리 번호가 다를 시
                if (seatNum != seatChange) {
                    document.getElementById("inputTag").value = "준비 완료";
                    console.log("send ready");
                    seatChange = i;

                    //ws 통신으로 준비신호보냄
                }
                console.log("SeatNum: s", seatNum);
            }
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
    }, []);

<<<<<<< HEAD
=======
    //렌더링될 때마다 myChar가 #myCharacter 를 가르킴
    useEffect(() => {
        myChar = document.getElementById("myCharacter");

        //랜더링 종료 시 인터벌 종료
        return () => {
            clearInterval(inputCheck);
            console.log("pX : ", pX.current);
            console.log("pY : ", pY.current);
        };
    });

>>>>>>> 32528ff (S07P12D106-110/아바타조작 구현 중)
    //맵 클릭 시 입력 포커싱 지정
    const changeFocus = () => {
        mapFocus.current.focus();
    };

<<<<<<< HEAD
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
            <input
                id="inputTag"
                onChange={(e) => setValue(e.target.value)}
                value={"a"}
=======
    const handleKeyDown = (e) => {
        keyPress[e.keyCode.toString()] = true;
    };
    const handleKeyUp = (e) => {
        keyPress[e.keyCode.toString()] = false;
    };
    return (
        <div>
            <div
                onClick={changeFocus}
                style={{
                    width: size,
                    height: size,
                    background: "orange",
                }}
            >
                <div
                    id="myCharacter"
                    style={{
                        width: 50,
                        height: 50,
                        background: "red",
                        position: "relative",
                    }}
                ></div>
            </div>
            <input
>>>>>>> 32528ff (S07P12D106-110/아바타조작 구현 중)
                // style={{ display: "none" }}
                type="text"
                ref={mapFocus}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                readOnly
<<<<<<< HEAD
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
            </div>
=======
            />
            playMap
>>>>>>> 32528ff (S07P12D106-110/아바타조작 구현 중)
        </div>
    );
}

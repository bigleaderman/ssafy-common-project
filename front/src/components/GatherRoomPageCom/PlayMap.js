import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SavePosX, selectPosX } from "../../redux/slice/GatherMapPosXSlice";
import { SavePosY, selectPosY } from "../../redux/slice/GatherMapPosYSlice";
export default function PlayMap(props) {
    const dispatch = useDispatch();

    const listener = (event) => {
        event.preventDefault();
        event.returnValue = "";
        dispatch(SavePosX(pX.current));
        dispatch(SavePosY(pY.current));
    };

    const enablePrevent = () =>
        window.addEventListener("beforeunload", listener);

    //맵 크기
    const size = 700;
    //포커싱 지정을 위한 변수
    const mapFocus = useRef();
    // const charX = useRef(useSelector(selectPosX));
    // const charY = useRef(useSelector(selectPosY));
    let myChar;

    //부드러운 움직임을 위한 변수 선언
    let keyPress = {},
        // pX = useSelector(selectPosX),
        // pY = useSelector(selectPosY),
        pX = useRef(useSelector(selectPosX)),
        pY = useRef(useSelector(selectPosY)),
        speed = 5;

    //0.1초마다 키 입력 확인
    const inputCheck = setInterval(() => {
        if (keyPress[87]) pY.current -= speed;
        if (keyPress[83]) pY.current += speed; // down - s
        if (keyPress[65]) pX.current -= speed; // left - a
        if (keyPress[68]) pX.current += speed;

        myChar.style.left = pX.current + "px";
        myChar.style.top = pY.current + "px";
        console.log("interval");
    }, 10);

    //첫 렌더링될 때만 입력받는 input태그로 focus
    useEffect(() => {
        mapFocus.current.focus();
    }, []);

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

    //맵 클릭 시 입력 포커싱 지정
    const changeFocus = () => {
        mapFocus.current.focus();
    };

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
                // style={{ display: "none" }}
                type="text"
                ref={mapFocus}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                readOnly
            />
            playMap
        </div>
    );
}

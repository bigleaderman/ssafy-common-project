<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { setCivil } from "../../redux/slice/CntCivilSlice";
import { setCop } from "../../redux/slice/CntCopSlice";
import { setDoc } from "../../redux/slice/CntDocSlice";
import { setLimit } from "../../redux/slice/CntLimitSlice";
import { setMaf } from "../../redux/slice/CntMafSlice";
import {
    SetRoomTitle,
    selectRoomTitle,
} from "../../redux/slice/RoomTitleSlice";
//의사, 경찰, 마피아수 변경 기능

export const GameSetting = (props) => {
    const dispatch = useDispatch();

    const [ArrLimit, setArrLimit] = useState([5, 6, 7, 8]);
    const [StateLimit, setStateLimit] = useState(5);
    const [StateDoc, setStateDoc] = useState(0);
    let actLimit = [0, 1, 2, 3, 4, 5, 6, 7];
    const [StateCop, setStateCop] = useState(0);
    const [StateMaf, setStateMaf] = useState(0);

    const tmp = useRef();
    //소켓 통신으로 변경 완료 알림
    //1번 조건에 맞는지 확인
    useEffect(() => {
        // inputFocus.current.focus();
    }, []);

    const UpdateGameSetting = () => {
        console.log(StateDoc + StateCop);
        if (
            parseInt(StateDoc) + parseInt(StateCop) + parseInt(StateMaf) >
            StateLimit
        ) {
            console.log(StateDoc + StateCop + StateMaf);
            document.getElementById("checkValue").innerText =
                "배정한 역할이 너무 많습니다.";
            return;
        } else if (StateMaf == 0) {
            document.getElementById("checkValue").innerText =
                "마피아는 최소 1명입니다.";
            return;
        }
        console.log("StateLimit: ", StateLimit);
        dispatch(setLimit(StateLimit));
        dispatch(setDoc(StateDoc));
        dispatch(setCop(StateCop));
        dispatch(setMaf(StateMaf));
        dispatch(setCivil(StateLimit - StateDoc - StateCop - StateMaf));
        props.setOpen(false);
    };
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item ws={6}>
                    <Grid>
                        {/* 인원 수 클릭 시 해당  */}
                        <label>인원 수 : </label>
                        <select
                            onChange={(e) => {
                                console.log(e.target.value);
                                setStateLimit(e.target.value);
                            }}
                        >
                            {ArrLimit.map((data, idx) => {
                                return <option key={idx}>{data}</option>;
                            })}
                        </select>
                    </Grid>
                    <Grid>
                        <label>의사 수 : </label>
                        <select
                            onChange={(e) => {
                                setStateDoc(e.target.value);
                            }}
                        >
                            {actLimit.map((data, idx) => {
                                return <option key={idx}>{data}</option>;
                            })}
                        </select>
                    </Grid>
                    <Grid>
                        <label>경찰 수 : </label>
                        <select
                            onChange={(e) => {
                                setStateCop(e.target.value);
                            }}
                        >
                            {actLimit.map((data, idx) => {
                                return <option key={idx}>{data}</option>;
                            })}
                        </select>
                    </Grid>
                    <Grid>
                        <label>마피아 수 : </label>
                        <select
                            onChange={(e) => {
                                setStateMaf(e.target.value);
                            }}
                        >
                            {actLimit.map((data, idx) => {
                                return <option key={idx}>{data}</option>;
                            })}
                        </select>
                    </Grid>
                </Grid>
                <Grid item ws={6}></Grid>
            </Grid>
            <button onClick={UpdateGameSetting}>확인</button>
            <div id="checkValue" style={{ color: "red" }}></div>
        </React.Fragment>
=======
import React, { useEffect, useRef } from "react";

//의사, 경찰, 마피아 수 검사
export const GameSetting = (props) => {
    const inputFocus = useRef();
    //소켓 통신으로 변경 완료 알림
    //1번 조건에 맞는지 확인
    useEffect(() => {
        inputFocus.current.focus();
    }, []);
    return (
        <div>
            <label>인원 수 : </label>
            <select>
                {() => {
                    for (let i = 5; i <= 8; i++) {
                        return <option>i</option>;
                    }
                }}
            </select>
            <input type="text" id="conLimit" ref={inputFocus} />
            <label>의사 수 : </label>
            <input type="text" id="cntDoc" />
            <label>경찰 수 : </label>
            <input type="text" id="cntCop" />
            <label>마피아 수 : </label>
            <input type="text" id="cntMaf" />
            <button>확인</button>
            <button>취소</button>
        </div>
>>>>>>> d35ed52730101ba88ba5ca8d2ce8448a46dca88b
    );
};

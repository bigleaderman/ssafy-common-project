import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
    incrementCrntCon,
    decrementCrntCon,
    selectConCnt,
} from "../../redux/slice/GatherConCntSlice";

import {
    changeName,
    selectGatherName,
} from "../../redux/slice/GatherNameSlice";
import { selectNum } from "../../redux/slice/GatherNumSlice";
export function MainBar() {
    // const count = useSelector(selectConCnt);
    // const name = useSelector(selectGatherName);
    const RoomData = {
        count: useSelector(selectConCnt),
        name: useSelector(selectGatherName),
        number: useSelector(selectNum),
    };
    // const roomNum;
    // const maxCnt;
    const dispatch = useDispatch();
    return (
        <Grid container>
            <Grid item xs={4}>
                <input
                    type="text"
                    onChange={(e) => {
                        dispatch(changeName(e.target.value));
                    }}
                />
                <p>빙 번호 : [??]</p>
                <p>방 제목 : {RoomData.name}</p>
            </Grid>
            <Grid item xs={4}>
                <Grid>
                    <p>
                        현재 인원 / 최대 인원 : [{RoomData.count}] / [최대 인원]
                    </p>
                    <button onClick={() => dispatch(incrementCrntCon())}>
                        +
                    </button>
                </Grid>
                <Grid>
                    <p>시민 : [???]명</p>
                    <p>의사 : [???]명</p>
                    <p>경찰 : [???]명</p>
                    <p>마피아 : [???]명</p>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainBar;

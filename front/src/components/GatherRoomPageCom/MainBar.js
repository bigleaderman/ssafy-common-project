import React from "react";
import Grid from "@mui/material/Grid";

//redux데이터 호출
import { useSelector } from "react-redux";
import { setCivil, selectCntCivil } from "../../redux/slice/CntCivilSlice";
import { setCon, selectCntCon } from "../../redux/slice/CntConSlice";
import { setCop, selectCntCop } from "../../redux/slice/CntCopSlice";
import { setDoc, selectCntDoc } from "../../redux/slice/CntDocSlice";
import { setLimit, selectCntLimit } from "../../redux/slice/CntLimitSlice";
import { setMaf, selectCntMaf } from "../../redux/slice/CntMafSlice";
import {
    SetRoomTitle,
    selectRoomTitle,
} from "../../redux/slice/RoomTitleSlice";

export function MainBar() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                빙 번호 : tmp 방 제목 : {useSelector(selectRoomTitle)}
            </Grid>
            <Grid item xs={4}>
                <Grid>
                    현재 인원 / 최대 인원 : {useSelector(selectCntCon)}/
                    {useSelector(selectCntLimit)}
                </Grid>
                <Grid>
                    시민 : {useSelector(selectCntCivil)}명
                    <br />
                    의사 : {useSelector(selectCntDoc)} 명
                    <br />
                    경찰 : {useSelector(selectCntCop)}명
                    <br />
                    마피아 : {useSelector(selectCntMaf)}명
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainBar;

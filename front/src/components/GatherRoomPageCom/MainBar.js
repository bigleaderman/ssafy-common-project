import React from "react";
import Grid from "@mui/material/Grid";
export function MainBar(props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                빙 번호 : {props.RoomNum} 방 제목 : {props.RoomTitle}
            </Grid>
            <Grid item xs={4}>
                <Grid>
                    현재 인원 / 최대 인원 : [{props.ConCrnt}] / [
                    {props.ConLimit}]
                </Grid>
                <Grid>
                    시민 : [{props.CntCivil}]명
                    <br />
                    의사 : [{props.CntDoc}]명
                    <br />
                    경찰 : [{props.CntCop}]명
                    <br />
                    마피아 : [{props.CntMaf}]명
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainBar;

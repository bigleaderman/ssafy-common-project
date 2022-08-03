import React from "react";
import Grid from "@mui/material/Grid";
export function MainBar() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                빙 번호 : ??? 방 제목 : ???
            </Grid>
            <Grid item xs={4}>
                <Grid>현재 인원 / 최대 인원 : [현재 인원] / [최대 인원]</Grid>
                <Grid>
                    시민 : [???]명 의사 : [???]명 경찰 : [???]명 마피아 :
                    [???]명
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainBar;

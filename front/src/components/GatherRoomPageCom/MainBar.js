import React from "react";
import Grid from "@mui/material/Grid";
export function MainBar() {
    return (
        <Grid container>
            <Grid xs={4}>
                <p>빙 번호 : ???</p>
                <p>방 제목 : ???</p>
            </Grid>
            <Grid xs={4}>
                <Grid>
                    <p>현재 인원 / 최대 인원 : [현재 인원] / [최대 인원]</p>
                </Grid>
                <Grid>
                    <p>
                        시민 : [???]명
                        <p>의사 : [???]명</p>
                        <p>경찰 : [???]명</p>
                        <p>마피아 : [???]명</p>
                    </p>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainBar;

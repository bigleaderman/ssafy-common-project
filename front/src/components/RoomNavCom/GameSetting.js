import React, { useState } from "react";
import Grid from "@mui/material/Grid";
export const GameSetting = (props) => {
    const PrintMaxCon = () => {};
    return (
        <Grid container spacing={2}>
            <Grid item ws={6}>
                <Grid>
                    <label>게임 인원</label>
                    <select></select>
                </Grid>
            </Grid>
            <Grid item ws={6}></Grid>
        </Grid>
    );
};

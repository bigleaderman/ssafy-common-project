import React from "react";
import { Grid } from "@mui/material";
export default function AllCam() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Grid>cam1</Grid>
                <Grid>cam4</Grid>
                <Grid>cam6</Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid>cam2</Grid>
                <Grid>empty</Grid>
                <Grid>cam7</Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid>cam3</Grid>
                <Grid>cam5</Grid>
                <Grid>cam8</Grid>
            </Grid>
        </Grid>
    );
}

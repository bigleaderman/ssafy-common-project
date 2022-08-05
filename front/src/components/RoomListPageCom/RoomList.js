import React from "react";
import RoomItem from './RoomItem';
import {Container, Paper, Grid } from "@mui/material";

function RoomList() {
    return (
        <Paper>
            <Container maxWidth="lg">
            <h1>RoomList</h1>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RoomItem/>
                </Grid>
                <Grid item xs={6}>
                    <RoomItem/>
                </Grid>
            </Grid>
            </Container>
        </Paper>
    );
}
export default RoomList;

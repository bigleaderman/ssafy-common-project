import React from "react";
import RoomItem from "./RoomItem";
import { Container, Paper, Grid } from "@mui/material";
import styled from "styled-components";

function RoomList() {
    return (
        <Paper sx={{ width: "100%", height: "250px" }}>
            <Border sx={{height:500}}>
                <Container maxWidth="lg" >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RoomItem />
                        </Grid>
                        <Grid item xs={6}>
                            <RoomItem />
                        </Grid>
                    </Grid>
                </Container>
            </Border>
        </Paper>
    );
}
const Border = styled.section`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin: 0.5em;
`;
export default RoomList;

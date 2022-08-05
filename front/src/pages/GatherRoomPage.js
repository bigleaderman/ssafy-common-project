import React, { useState } from "react";

//자체 컴포넌트
import MainBar from "../components/GatherRoomPageCom/MainBar";
import NaviBar from "../components/GatherRoomPageCom/NaviBar";
import PlayMap from "../components/GatherRoomPageCom/PlayMap";
import SideBar from "../components/GatherRoomPageCom/SideBar";
import AllCam from "../components/GameRoomPageCom/AllCam";

//mui 컴포넌트
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

export function GatherRoom() {
    const [IsGameStart, setIsGameStart] = useState(false);

    const GameStart = () => {
        if (IsGameStart) {
            return <AllCam />;
        } else return <PlayMap />;
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {/* 따로 xs 크기를 지정해주지 않으면 row*/}
                    <Grid>
                        <Paper elevation={3}>
                            <MainBar />
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper elevation={3}>
                            <GameStart />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid>
                        <Paper elevation={3} style={{ height: 50 }}>
                            <NaviBar
                                IsGameStart={IsGameStart}
                                setIsGameStart={setIsGameStart}
                            />
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper elevation={3}>
                            스톰프 테스트
                            <SideBar />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default GatherRoom;

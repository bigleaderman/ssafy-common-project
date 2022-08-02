import React, { useState } from "react";
import MainBar from "../components/GatherRoomPageCom/MainBar";
import NaviBar from "../components/GatherRoomPageCom/NaviBar";
import PlayMap from "../components/GatherRoomPageCom/PlayMap";
import SideBar from "../components/GatherRoomPageCom/SideBar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

export function GatherRoom(props) {
    //현재 방을 클릭했을 때 props로 방 관련 데이터를 받아옴
    //방 번호, 방 제목, 현재 인원, 최대 인원, 시민 수, 의사 수, 경찰 수, 마피아 수
    //각 정보를 하위 컴포넌트들에게 뿌려주기

    //넘겨받은 방 객체 정보를 저장
    const [RoomData, setRoomData] = useState(props.RoomData);
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {/* 따로 xs 크기를 지정해주지 않으면 row*/}
                    <Grid>
                        <Paper elevation={3}>
                            <MainBar
                                // test용도로 임시값 입력
                                RoomNum={0}
                                RoomTitle={"Test Title A"}
                                ConCrnt={1}
                                ConLimit={8}
                                CntCivil={5}
                                CntDoc={1}
                                CntCop={1}
                                CntMaf={1}
                            />
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper elevation={3}>
                            <IsGameStart start={start} />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid>
                        <Paper elevation={3} style={{ height: 50 }}>
                            <NaviBar crntStart={start} onClick={setStart} />
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper elevation={3}>
                            <SideBar />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default GatherRoom;

import React from "react";
import Nav from "../components/RoomListPageCom/Nav";
import SideBar from "../components/RoomListPageCom/SideBar";
import RoomList from "../components/RoomListPageCom/RoomList";
import MyProfile from "../components/RoomListPageCom/MyProfile";
import Chat from "../components/RoomListPageCom/Chat";
import { Container, Grid, Stack } from "@mui/material";

// 내브바, 유저목록(친구), 방목록, 내 전적, 채팅
function RoomListPage() {
    return (
        <div>
            <Container maxWidth="lg" sx={{mt:1}}>
                {/* <Grid container spacing={2}> */}
                    {/* <Grid item xs={12}> */}
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Nav />
                        {/* </Grid> */}
                        {/* <Grid item xs={3}> */}
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <SideBar />
                                <MyProfile />
                            </Stack>
                            {/* </Grid> */}
                            {/* <Grid item xs={9}> */}
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <RoomList />
                                <Chat />
                            </Stack>
                            {/* </Grid> */}
                        </Stack>
                    </Stack>
                {/* </Grid> */}
            </Container>
        </div>
    );
}
export default RoomListPage;

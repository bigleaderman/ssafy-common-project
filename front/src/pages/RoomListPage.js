import React from "react";
import Nav from "../components/RoomListPageCom/Nav";
import SideBar from "../components/RoomListPageCom/SideBar";
import RoomList from "../components/RoomListPageCom/RoomList";
import MyProfile from "../components/RoomListPageCom/MyProfile";
import Chat from "../components/RoomListPageCom/Chat";
import { Container, Grid } from "@mui/material";

// 내브바, 유저목록(친구), 방목록, 내 전적, 채팅
function RoomListPage() {
    return (
        <div>
            <h1>RoomListPage</h1>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Nav />
                    </Grid>
                    <Grid item xs={3}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={9}>
                        <RoomList />
                    </Grid>
                    <Grid item xs={3}>
                        <MyProfile />
                    </Grid>
                    <Grid item xs={9}>
                        <Chat />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default RoomListPage;

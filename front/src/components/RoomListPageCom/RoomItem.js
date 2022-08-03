import React from "react";
import { Paper,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function RoomItem() {
    const navigate = useNavigate();
    const GoRoom = () => {
        navigate('/gatherroom')
    }
    return (
        <Paper>
            <h1>RoomItem</h1>
            <Button onClick={GoRoom}>방으로</Button>
        </Paper>
    );
}
export default RoomItem;
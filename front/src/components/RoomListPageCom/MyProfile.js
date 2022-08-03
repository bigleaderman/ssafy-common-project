import React from "react";
import { Paper,Box } from "@mui/material";
import styled from "styled-components";

function MyProfile() {
    return (
        <Paper sx={{width:'100%', height:'130px' }}>
            <Border>
                <Box sx={{height:'90px'}}>
                    <h1>MyProfile</h1>
                </Box>
            </Border>
        </Paper>
    );
}
const Border = styled.section`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin: 0.5em
`;
export default MyProfile;

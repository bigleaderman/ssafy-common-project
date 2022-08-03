import React from "react";
import styled from "styled-components";
import { Box, Typography, Grid } from "@mui/material";
import axios from "axios";

const Rank = () => {
    const RankTen = [
        "가싸피ㅇㅇㅇㅇㅇㅇ",
        "나싸피",
        "다싸피",
        "라싸피",
        "마싸피",
        "바싸피",
        "사싸피",
        "아싸피",
        "자싸",
        "이싸피",
    ];
    // axios({
    //     method: "get",
    //     url: "api/game/topRank",
    // }).then((res) => {
    //     RankTen = res.data;
    // });
    return (
        <Box sx={{ border: "solid 1px", p: 0.5, width: "80%", m: 2 }}>
            <Typography sx={{ mb: 1 }} align="center">
                Rank
            </Typography>
            <UL>
                {RankTen.map((name, index) => {
                    return (
                        <li key={index}>
                            <Grid container>
                                <Grid item xs={3}>{index + 1}</Grid>
                                <Grid item xs={9}>
                                    <Typography sx={{ mb: 1 }} align="left">
                                    {name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                })}
            </UL>
        </Box>
    );
};
const UL = styled.section`
    list-style: none;
`;
export default Rank;

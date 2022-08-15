import React, { useEffect, useState } from "react";
import { Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from "@mui/material";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import StarIcon from "@mui/icons-material/Star";

import styled from "styled-components";
import { useSelector } from "react-redux";

function MyProfile() {
  const me = useSelector((state) => state.user);
  const [nameColor, setNameColor] = useState("#ccc");
  // 레드유저인가?
  useEffect(() => {
    if (me.redUser) {
      setNameColor("red");
    }
  }, []);
  return (
    <Paper
      sx={{
        minHeight: "209px",
        p: 1,
        pl: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor:"rgba(0,0,0,0.5)",
        border:'rgba(0,0,0) 1px solid',borderRadius: "2px"

      }}
    >
      <h1 style={{ color: nameColor, marginTop:10 }}>{me.nickname}</h1>
      <List style={{color:"#ccc"}}>
        <ListItem sx={{p:0.5,pl:2}}>
          <ListItemAvatar>
            {/* <ThumbUpAltIcon /> */}Win
          </ListItemAvatar>
          <ListItemText primary={me.winCount} />
        </ListItem>
        <ListItem sx={{p:0.5,pl:2}}>
          <ListItemAvatar>
            {/* <ThumbDownAltIcon /> */}Lose
          </ListItemAvatar>
          <ListItemText primary={me.loseCount} />
        </ListItem>
        <ListItem sx={{p:0.5,pl:2}}>
          <ListItemAvatar>
            {/* <StarIcon /> */}Rank
          </ListItemAvatar>
          <ListItemText primary={me.rankPoint} />
        </ListItem>
      </List>
    </Paper>
  );
}
const Border = styled.section`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 0.5em;
`;
export default MyProfile;

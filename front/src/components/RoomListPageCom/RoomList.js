import React, { useState, useEffect } from "react";
import RoomItem from "./RoomItem";
import {
  Container,
  Box,
  Paper,
  Grid,
  Button,
  Stack,
  ClickAwayListener,
  Tooltip,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

import { useSelector } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blueGrey[50],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const dummy = [
  {
    title: "",
  },
  {
    title: "",
  },
  {
    title: "",
  },
  {
    title: "",
  },
  {
    title: "",
  },
  {
    title: "",
  },
];
function RoomList() {
  const me = useSelector((state) => state.user);
  // 1. 방 목록
  const roomList = useSelector((state) => state.roomList);
  // 2. 방 페이징
  const [page, setPage] = React.useState(1);
  const beforePage = () => {
    setPage(page - 1);
  };
  const afterPage = () => {
    setPage(page + 1);
  };
  // 3. 방검색
  const [searchResult, setSearchResult] = useState([]);
  const [searchYes, setSearchYes] = useState(false);
  // 방 검색 실패 tooltip
  const [doNot, setDoNot] = useState(false);
  const DoNotOpen = () => setDoNot(true);
  const DoNotClose = () => setDoNot(false);
  const [searchTitle, setSearchTitle] = useState("");
  const searchRoom = () => {
    if (searchTitle) {
      axios
        .post(
          "/api/room/list",
          {
            capacity: 6,
            mafiaNum: 1,
            title: searchTitle,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${me.accessToken}`,
            },
          }
        )
        .then((res) => {
          setSearchTitle("");
          if (res.data.length) {
            setSearchYes(true);
            setSearchResult(res.data);
          } else {
            DoNotOpen();
          }
        })
        .catch((err) => {
          console.log("실패", err);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Paper sx={{ width: "100%", height: "457px", backgroundColor: "rgba(0,0,0,0.5)" ,border:'rgba(0,0,0) 1px solid',borderRadius: "2px"}}>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1} sx={{ p: 2 }}>
        <ClickAwayListener onClickAway={DoNotClose}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={DoNotClose}
            open={doNot}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title='검색된 방이 없습니다.'
          >
            <TextField

              InputProps={{
                sx: {
                  "& input": {
                    color: "#ccc",
                  },
                },
              }}
              sx={{ border: "rgba(255,255,255) 1px solid", borderRadius: "4px",borderRadius: "2px"}}
              fullWidth
              id='outlined-textarea'
              placeholder='RoomSearch'
              size='small'
              value={searchTitle}
              onChange={(e) => {
                setSearchTitle(e.target.value);
              }}
            />
          </Tooltip>
        </ClickAwayListener>
        {searchYes ? (
          <Button

            sx={{
              width: "15%",
              minHeight: "42px",
              color: "rgba(255,255,255)",
              border: "rgba(255,255,255) 1px solid",
              borderRadius: "2px"
            }}
            variant='outlined'
            onClick={() => {
              setSearchResult([]);
              setSearchYes(false);
            }}
          >
            <ClearIcon />
          </Button>
        ) : (
          <Button

            variant='outlined'
            onClick={() => {
              searchRoom();
            }}
            sx={{
              width: "15%",
              minHeight: "42px",
              color: "rgba(255,255,255)",
              border: "rgba(255,255,255) 1px solid",
              borderRadius: "2px"
            }}
          >
            <SearchIcon />
          </Button>
        )}
      </Stack>
      {searchYes ? (
        // {/* 검색 결과 방목록 */}
        <Paper sx={{ backgroundColor: "rgba(0,0,0,0)" }}>
          <Grid
            container
            spacing={1}
            sx={{ minHeight: "364px", backgroundColor: "rgba(30,30,30,0.1)" }}
          >
            {searchResult &&
              Array.from([...searchResult, ...dummy])
                .slice((page - 1) * 8, page * 8)
                .map((room, index) => (
                  <Grid item xs={6} key={index}>
                    <RoomItem room={room} />
                  </Grid>
                ))}
          </Grid>
          {page === 1 ? (
            <Button onClick={beforePage} disabled>
              <KeyboardArrowLeftIcon />
            </Button>
          ) : (
            <Button onClick={beforePage}>
              <KeyboardArrowLeftIcon />
            </Button>
          )}
          {page < Math.floor(searchResult.length / 8 + 1) ? (
            <Button onClick={afterPage}>
              <KeyboardArrowRightIcon />
            </Button>
          ) : (
            <Button onClick={afterPage} disabled>
              <KeyboardArrowRightIcon />
            </Button>
          )}
        </Paper>
      ) : (
        // {/* 전체 방목록 */}
        <Paper sx={{ backgroundColor: "rgba(0,0,0,0)" }}>
          <Grid
            container
            spacing={0.5}
            sx={{ minHeight: "352px", backgroundColor: "rgba(30,30,30,0.1)" }}
          >
            {roomList &&
              Array.from(roomList)
                .slice((page - 1) * 8, page * 8)
                .map((room, index) => (
                  <Grid item xs={6} key={index}>
                    <RoomItem room={room} />
                  </Grid>
                ))}
          </Grid>
          {page === 1 ? (
            <Button onClick={beforePage} disabled>
              <KeyboardArrowLeftIcon sx={{ color: "#ccc" }} />
            </Button>
          ) : (
            <Button onClick={beforePage}>
              <KeyboardArrowLeftIcon sx={{ color: "#ccc" }} />
            </Button>
          )}
          {page < parseInt(roomList.length / 8 + 1) ? (
            <Button onClick={afterPage}>
              <KeyboardArrowRightIcon sx={{ color: "#ccc" }} />
            </Button>
          ) : (
            <Button onClick={afterPage} disabled>
              <KeyboardArrowRightIcon sx={{ color: "#ccc" }} />
            </Button>
          )}
        </Paper>
      )}
    </Paper>
    </ThemeProvider>
  );
}

export default RoomList;

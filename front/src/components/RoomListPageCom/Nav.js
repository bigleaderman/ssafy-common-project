import React, { useState } from "react";
import { Paper, Stack, Button, Container, TextField,Modal,Box,Typography } from "@mui/material";

// 아이콘
import AddIcon from "@mui/icons-material/Add";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 모달 창 style
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
};
const Logo = styled.a`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    img {
        display: block;
        width: 30px;
    }
`;

// 방만들기(모달), 랜덤매칭, 방검색(검색창 옆으로), 새로고침, 환경설정(모달), 도움말(모달)
function Nav() {
    // 방 검색
    const [search, setSearch] = useState(false);
    // 방 생성 모달
    const [openRoom, setOpenRoom] = useState(false);
    const HandleOpenRoom = () => {
        setOpenRoom(true);
    };
    const HandleCloseRoom = () => {
        setOpenRoom(false);
    };
    const navigate = useNavigate();
    const GoRoom = () => {
        navigate('/gatherroom')
    }
    // 환경설정 모달
    const [openSett, setOpenSett] = useState(false);
    const HandleOpenSett = () => {
        setOpenSett(true);
    };
    const HandleCloseSett = () => {
        setOpenSett(false);
    };
    // 도움말 모달
    const [openHelp, setOpenHelp] = useState(false);
    const HandleOpenHelp = () => {
        setOpenHelp(true);
    };
    const HandleCloseHelp = () => {
        setOpenHelp(false);
    };

    const searchClick = () => {
        setSearch(!search);
    };
    return (
        <Paper sx={{width:1000}}>
            <Container sx={{p:1}}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button variant="outlined" onClick={HandleOpenRoom}>
                            <AddIcon />
                        </Button>
                        <Button variant="outlined">
                            <ShuffleIcon />
                        </Button>
                        {search ? (
                            <Stack direction="row">
                                <TextField
                                    fullWidth
                                    id="outlined-textarea"
                                    placeholder="Search"
                                    size="small"
                                />
                                <Button
                                    variant="outlined"
                                    onClick={searchClick}
                                >
                                    <SearchIcon />
                                </Button>
                            </Stack>
                        ) : (
                            <Button variant="outlined" onClick={searchClick}>
                                <SearchIcon />
                            </Button>
                        )}
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button variant="outlined">
                            <RefreshIcon />
                        </Button>
                        <Button variant="outlined" onClick={HandleOpenHelp}>
                            <LibraryBooksIcon />
                        </Button>
                        <Button variant="outlined" onClick={HandleOpenSett}>
                            <SettingsIcon />
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            
            {/* 방 생성 모달 */}
            <Modal
                open={openRoom}
                onClose={HandleCloseRoom}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            width: 402,
                            height: 31,
                            backgroundColor: "var(--color-5);",
                        }}
                    >
                        <Logo>
                            <img src="logo.svg" alt="logo" />
                        </Logo>
                    </Box>
                    <Container>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{
                                my: 2,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                        방 만들기
                        </Typography>
                        
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                p: 1,
                                m: 1,
                                bgcolor: "background.paper",
                                borderRadius: 1,
                            }}
                        >
                            <Button variant="outlined" onClick={GoRoom}>
                                방 생성
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={HandleCloseRoom}
                                size="small"
                                sx={{ width: "25%" }}
                            >
                                취소
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Modal>
            {/* 도움말 모달 */}
            <Modal
                open={openHelp}
                onClose={HandleCloseHelp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            width: 402,
                            height: 31,
                            backgroundColor: "var(--color-5);",
                        }}
                    >
                        <Logo>
                            <img src="logo.svg" alt="logo" />
                        </Logo>
                    </Box>
                    <Container>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{
                                my: 2,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                        도움말
                        </Typography>
                        
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                p: 1,
                                m: 1,
                                bgcolor: "background.paper",
                                borderRadius: 1,
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={HandleCloseHelp}
                                size="small"
                                sx={{ width: "25%" }}
                            >
                                확인
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Modal>
            {/* 방 생성 모달 */}
            <Modal
                open={openSett}
                onClose={HandleCloseSett}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            width: 402,
                            height: 31,
                            backgroundColor: "var(--color-5);",
                        }}
                    >
                        <Logo>
                            <img src="logo.svg" alt="logo" />
                        </Logo>
                    </Box>
                    <Container>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{
                                my: 2,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                        환경 설정
                        </Typography>
                        
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                p: 1,
                                m: 1,
                                bgcolor: "background.paper",
                                borderRadius: 1,
                            }}
                        >
                            <Button variant="outlined">
                                설정
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={HandleCloseSett}
                                size="small"
                                sx={{ width: "25%" }}
                            >
                                취소
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Modal>
        </Paper>
    );
}
export default Nav;

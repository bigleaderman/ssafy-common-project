import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    Container,
    Button,
    Modal,
    Box,
    Typography,
    TextField,
    ClickAwayListener,
    Tooltip,
    Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Rank from "../components/Rank";

// 모달 창 style
const style = {
    position: "absolute",
    top: "50%",
    left: "65%",
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

const MainPage = () => {
    // redux에 내 정보 가져오기
    // const me = useSelector(state => state.user);
    // const dispatch = useDispatch();
    const me = {};
    const navigate = useNavigate();
    // 닉네임 중복
    const [dup, setDup] = useState(false);

    // 로그인 되지 않은 경우
    const [openOne, setOpenOne] = useState(false);
    // 로그인은 되었지만 닉네임이 없는 경우
    const [openTwo, setOpenTwo] = useState(false);
    // 닉네임
    const [nickname, setNewNickname] = useState("");
    const HandleOpenOne = () => {
        setOpenOne(true);
    };
    const HandleCloseOne = () => {
        setOpenOne(false);
    };

    const HandleOpenTwo = () => {
        setOpenTwo(true);
    };
    const HandleCloseTwo = () => {
        setOpenTwo(false);
    };

    // 상태 구분
    const HandleOpen = () => {
        // 로그인 안 된 상태
        console.log('gg',me)
        if (me === {}) {
            console.log('gg')
            return HandleOpenOne();
        } // 로그인 되었지만 닉네임이 없어
        else {
            if (me.nickname === null) {
                return HandleOpenTwo();
            } // 로그인 되고 닉네임 있음
            else {
                return (
                    // dispatch(userList());
                    // dispatch(friend(me.seq));
                    // dispatch(wantedFriend(me.id))
                    navigate("/roomList")
                );
            }
        }
    };

    // 닉네임 입력
    const InputNickname = (event) => {
        setNewNickname(event.target.value);
        console.log(event.target.value);
    };

    // 닉네임 중복 검사
    const CheckNickname = () => {
        axios({
            method: "get",
            url: "api/checkNickname",
            data: {
                nickname: nickname,
            },
        }).then((response) => {
            // 사용 가능
            if (response) {
                setDup(true);
                alert("사용 가능한 닉네임입니다!");
            } else {
                alert("이미 존재하는 닉네임입니다!");
            }
        });
    };

    // 게임 시작 버튼
    const CheckGameGo = () => {
        // 중복 검사 통과
        if (dup) {
            // 닉네임 등록
            axios({
                method: "post",
                url: "api/user/enrollNickname",
                data: {
                    nickname,
                },
            }).then(() => {
                // store에 nickname 변경 : UserSlice.js 건드려야함 : 머지 후 하기
                // 유저정보 받아오기
                // dispatch(userList());
                // dispatch(friend(me.seq));
                // dispatch(wantedFriend(me.id))
                navigate("/roomList");
            });
        } else {
            alert("닉네임 등록이 필요합니다.");
        }
    };
    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Rank />
                </Grid>
                <Grid item
                    xs={8}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <ClickAwayListener onClickAway={HandleCloseOne}>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={HandleCloseOne}
                                open={openOne}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="로그인 하세요"
                            >
                                <Button variant="outlined" onClick={HandleOpen}>
                                    Game Start
                                </Button>
                            </Tooltip>
                        </ClickAwayListener>
                    </Box>
                </Grid>
            </Grid>
            <Modal
                open={openTwo}
                onClose={HandleCloseTwo}
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
                            닉네임 등록이 필요합니다.
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                m: 1,
                                my: 3,
                                bgcolor: "background.paper",
                                borderRadius: 1,
                            }}
                        >
                            <TextField
                                fullWidth
                                id="nickname"
                                label="닉네임"
                                size="small"
                                onChange={InputNickname}
                                sx={{ width: "100%", mr: 1 }}
                            />
                            <Button
                                variant="outlined"
                                onClick={CheckNickname}
                                // size='small'
                            >
                                중복
                            </Button>
                        </Box>
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
                            <Button variant="outlined" onClick={CheckGameGo}>
                                게임 시작
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={HandleCloseTwo}
                                size="small"
                                sx={{ width: "25%" }}
                            >
                                취소
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Modal>
        </Container>
    );
};

export default MainPage;

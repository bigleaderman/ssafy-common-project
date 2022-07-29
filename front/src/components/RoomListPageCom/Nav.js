import React, { useState } from "react";
import { Paper, Stack, Button, Container, TextField } from "@mui/material";

// 아이콘
import AddIcon from "@mui/icons-material/Add";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";

// 방만들기(모달), 랜덤매칭, 방검색(검색창 옆으로), 새로고침, 환경설정(모달), 도움말(모달)
function Nav() {
    const [search, setSearch] = useState(false);
    const searchClick = () => {
        setSearch(!search);
    };
    return (
        <Paper>
            <Container>
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
                        <Button variant="outlined">
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
                        <Button variant="outlined">
                            <LibraryBooksIcon />
                        </Button>
                        <Button variant="outlined">
                            <SettingsIcon />
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Paper>
    );
}
export default Nav;

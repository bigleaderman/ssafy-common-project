import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Helper } from "../RoomNavCom/Helper";
//MUI 모달 참조: https://mui.com/material-ui/react-modal/
import Modal from "@mui/material/Modal";
import { GameSetting } from "../RoomNavCom/GameSetting";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function NaviBar(props) {
    const [SwitchModalValue, setSwitchModalValue] = useState(0);
    const theme = createTheme({
        typography: {
            fontSize: 10,
        },
    });

    const [open, setOpen] = useState(false);
    const handleOpen = (value) => {
        setSwitchModalValue(value);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const SwitchModals = () => {
        if (SwitchModalValue === 0) {
            return <Helper />;
        } else if (SwitchModalValue === 1) {
            return <GameSetting />;
        }
    };
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Stack spacing={1} direction="row">
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            handleOpen(0);
                        }}
                    >
                        도움말
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            handleOpen(1);
                        }}
                    >
                        게임설정
                    </Button>
                    <Button variant="contained" size="small">
                        환경설정
                    </Button>
                    <Button variant="contained" size="small">
                        나가기
                    </Button>
                </Stack>
            </ThemeProvider>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <SwitchModals />
                </Box>
            </Modal>
        </div>
    );
}

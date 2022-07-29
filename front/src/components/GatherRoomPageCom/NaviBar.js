import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export default function NaviBar() {
    const theme = createTheme({
        typography: {
            fontSize: 10,
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={1} direction="row">
                <Button variant="contained" size="small">
                    게임 설정
                </Button>
                <Button variant="contained" size="small">
                    환경 설정
                </Button>
                <Button variant="contained">도움말</Button>
                <Button variant="contained">게임 시작</Button>
                <Button variant="contained">나가기</Button>
            </Stack>
        </ThemeProvider>
    );
}

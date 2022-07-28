import React from "react";
import { Paper, TextField, Container, Button, Grid } from "@mui/material";

function Chat() {
    return (
        <Paper>
            <Container>
                <h1>Chat</h1>
                <Grid container spacing={0}>
                <Grid item xs={12}>
                    
                </Grid>
                    <Grid item xs={11}>
                        <TextField
                            fullWidth
                            id="outlined-textarea"
                            placeholder="Chat"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="outlined" size="medium">전송</Button>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}
export default Chat;

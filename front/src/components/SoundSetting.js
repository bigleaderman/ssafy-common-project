import React,{useState} from "react";
import {Slider,Box,Stack,Button} from '@mui/material';
// import { middleButton } from "../style.js";
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

export function SoundSetting({handleClose}) {
  const [value, setValue] = useState(30);
  return (
    <Box sx={{ width: 600,height:160,p:6 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center" justifyContent="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={value} onChange={(e) => {setValue(e.target.value)}} />
        <VolumeUp />
      </Stack>
      <Button
            variant='outlined'
            // onClick={() => {
            //   handleClose();
            // }}
            // sx={{
            //   ...middleButton,
            //   display: "flex",
            //   justifyContent: "center",
            //   position: "relative",
            //   left: 200,
            // }}
          >
            확인
          </Button>
    </Box>
  );
}


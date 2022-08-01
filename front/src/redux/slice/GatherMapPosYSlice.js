import { createSlice } from "@reduxjs/toolkit";

export const GatherMapPosYSlice = createSlice({
    name: "GatherMapPosY",
    initialState: {
<<<<<<< HEAD
        value: 600,
=======
        value: 0,
>>>>>>> 32528ff (S07P12D106-110/아바타조작 구현 중)
    },
    reducers: {
        SavePosY: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { SavePosY } = GatherMapPosYSlice.actions;

export const selectPosY = (state) => state.posY.value;

export default GatherMapPosYSlice.reducer;

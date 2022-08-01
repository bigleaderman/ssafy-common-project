import { createSlice } from "@reduxjs/toolkit";

export const GatherMapPosXSlice = createSlice({
    name: "GatherMapPosX",
    initialState: {
<<<<<<< HEAD
        value: 350,
=======
        value: 0,
>>>>>>> 32528ff (S07P12D106-110/아바타조작 구현 중)
    },
    reducers: {
        SavePosX: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { SavePosX } = GatherMapPosXSlice.actions;

export const selectPosX = (state) => state.posX.value;

export default GatherMapPosXSlice.reducer;

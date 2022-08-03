import { createSlice } from "@reduxjs/toolkit";

export const GatherMapPosXSlice = createSlice({
    name: "GatherMapPosX",
    initialState: {
        value: 350,
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

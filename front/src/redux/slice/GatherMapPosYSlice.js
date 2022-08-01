import { createSlice } from "@reduxjs/toolkit";

export const GatherMapPosYSlice = createSlice({
    name: "GatherMapPosY",
    initialState: {
        value: 0,
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

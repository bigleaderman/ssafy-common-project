import { createSlice } from "@reduxjs/toolkit";

export const MapPosYSlice = createSlice({
    name: "GatherMapPosY",
    initialState: {
        value: 600,
    },
    reducers: {
        SavePosY: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { SavePosY } = MapPosYSlice.actions;

export const selectPosY = (state) => state.posY.value;

export default MapPosYSlice.reducer;

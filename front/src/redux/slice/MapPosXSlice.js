import { createSlice } from "@reduxjs/toolkit";

export const MapPosXSlice = createSlice({
    name: "MapPosX",
    initialState: {
        value: 350,
    },
    reducers: {
        SavePosX: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { SavePosX } = MapPosXSlice.actions;

export const selectPosX = (state) => state.posX.value;

export default MapPosXSlice.reducer;

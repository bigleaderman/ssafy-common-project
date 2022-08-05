import { createSlice } from "@reduxjs/toolkit";

export const CntConSlice = createSlice({
    name: "CntConSlice",
    initialState: {
        value: 0,
    },
    reducers: {
        setCon: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { incrementCrntCon, decrementCrntCon } = CntConSlice.actions;

export const selectCntCon = (state) => state.cntCon.value;

export default CntConSlice.reducer;

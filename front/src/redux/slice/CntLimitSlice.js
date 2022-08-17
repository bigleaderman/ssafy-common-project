import { createSlice } from "@reduxjs/toolkit";

export const CntLimitSlice = createSlice({
    name: "CntLimitSlice",
    initialState: {
        value: 8,
    },
    reducers: {
        setLimit: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setLimit } = CntLimitSlice.actions;

export const selectCntLimit = (state) => state.cntLimit.value;

export default CntLimitSlice.reducer;

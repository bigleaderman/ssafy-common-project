import { createSlice } from "@reduxjs/toolkit";

export const CntCopSlice = createSlice({
    name: "CntCopSlice",
    initialState: {
        value: 1,
    },
    reducers: {
        setCop: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCop } = CntCopSlice.actions;

export const selectCntCop = (state) => state.cntCop.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default CntCopSlice.reducer;

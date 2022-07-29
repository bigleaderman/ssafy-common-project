import { createSlice } from "@reduxjs/toolkit";

export const GatherCntCopSlice = createSlice({
    name: "GatherCntCop",
    initialState: {
        value: 1,
    },
    reducers: {
        incrementCivil: (state) => {
            state.value += 1;
        },

        decrementCivil: (state) => {
            state.value -= 1;
        },
    },
});

export const { incrementCrntCon, decrementCrntCon } = GatherCntCopSlice.actions;

export const selectConCnt = (state) => state.cop.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default GatherCntCopSlice.reducer;

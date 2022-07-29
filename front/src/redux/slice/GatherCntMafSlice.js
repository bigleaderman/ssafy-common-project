import { createSlice } from "@reduxjs/toolkit";

export const GatherCntMafSlice = createSlice({
    name: "GatherCntMaf",
    initialState: {
        value: 2,
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

export const { incrementCrntCon, decrementCrntCon } = GatherCntMafSlice.actions;

export const selectConCnt = (state) => state.maf.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default GatherCntMafSlice.reducer;

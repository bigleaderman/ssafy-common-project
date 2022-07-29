import { createSlice } from "@reduxjs/toolkit";

export const GatherCntDocSlice = createSlice({
    name: "GatherCntDoc",
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

export const { incrementCrntCon, decrementCrntCon } = GatherCntDocSlice.actions;

export const selectConCnt = (state) => state.doc.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default GatherCntDocSlice.reducer;

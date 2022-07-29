import { createSlice } from "@reduxjs/toolkit";

export const GatherCntCivilSlice = createSlice({
    name: "GatherCntCivil",
    initialState: {
        value: 4,
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

export const {
    incrementCrntCon,
    decrementCrntCon,
} = GatherCntCivilSlice.actions;

export const selectConCnt = (state) => state.civil.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default GatherCntCivilSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const GatherNumSlice = createSlice({
    name: "GatherNumSlice",
    initialState: {
        value: 0,
    },
    reducers: {
        incrementMaxCon: (state) => {
            state.value += 1;
        },

        decrementMaxCon: (state) => {
            state.value -= 1;
        },
    },
});

export const { incrementMaxCon, decrementMaxCon } = GatherNumSlice.actions;

export const selectNum = (state) => state.maxCon.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default GatherNumSlice.reducer;

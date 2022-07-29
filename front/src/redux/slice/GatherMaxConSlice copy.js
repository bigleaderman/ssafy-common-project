import { createSlice } from "@reduxjs/toolkit";

export const GatherMaxConSlice = createSlice({
    name: "GatherMaxCon",
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

export const { incrementMaxCon, decrementMaxCon } = GatherMaxConSlice.actions;

export const selectMaxCon = (state) => state.maxCon.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default GatherMaxConSlice.reducer;

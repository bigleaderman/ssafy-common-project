import { createSlice } from "@reduxjs/toolkit";

export const GatherRoomSlice = createSlice({
    name: "CrntRoomConCnt",
    initialState: {
        value: 0,
    },
    reducers: {
        incrementCrntCon: (state) => {
            state.value += 1;
        },

        decrementCrntCon: (state) => {
            state.value -= 1;
        },
    },
});

export const { incrementCrntCon, decrementCrntCon } = GatherRoomSlice.actions;

export const selectConCnt = (state) => state.conCnt.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default GatherRoomSlice.reducer;

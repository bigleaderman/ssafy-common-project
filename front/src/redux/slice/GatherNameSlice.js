import { createSlice } from "@reduxjs/toolkit";

export const GatherRoomSlice = createSlice({
    name: "gatherNameSlice",
    initialState: {
        value: "",
    },
    reducers: {
        changeName: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeName } = GatherRoomSlice.actions;

export const selectGatherName = (state) => state.gatherName.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default GatherRoomSlice.reducer;

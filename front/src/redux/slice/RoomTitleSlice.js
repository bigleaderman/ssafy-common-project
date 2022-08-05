import { createSlice } from "@reduxjs/toolkit";

export const RoomTitleSlice = createSlice({
    name: "RoomTitleSlice",
    initialState: {
        value: "Default Room Title",
    },
    reducers: {
        SetRoomTitle: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { changeName } = RoomTitleSlice.actions;

export const selectRoomTitle = (state) => state.roomTitle.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default RoomTitleSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const RoomNumSlice = createSlice({
  name: "roomNum",
  initialState: {
    roomNum: 0,
  },
  reducers: {
    roomNum: (state, action) => {
      return action.payload;
    },
  },
});

export const { roomNum } = RoomNumSlice.actions;

// export const selectRoomNum = (state) => state.RoomNum;

export default RoomNumSlice.reducer;

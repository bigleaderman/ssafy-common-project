import { createSlice } from "@reduxjs/toolkit";
const dummy = [
    {
      title: "",
    },
    {
      title: "",
    },
    {
      title: "",
    },
    {
      title: "",
    },
    {
      title: "",
    },
    {
      title: "",
    },
  ];
export const RoomListSlice = createSlice({
    name: "roomList",
    initialState: {
        roomList: []
    },
    reducers: {
        roomList: (state, action) => {
            // state.roomList =[...action.payload,...Array.from(dummy)]
            // console.log(state.roomList)
            return action.payload
        },
    },
});

export const { roomList } = RoomListSlice.actions;

export const selectRoomList = (state) => state.RoomList;

export default RoomListSlice.reducer;

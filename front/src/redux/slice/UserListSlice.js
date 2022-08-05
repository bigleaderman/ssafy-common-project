// import { createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

// // url머지?, 받아오는 데이터가 어떻게 생겼지?
// export const UserList = createSlice({
//     name: "userList",
//     initialState: {

//     },
//     reducers: {
//         userList: (state, action) => {
//             axios({
//                 method: 'get',
//                 url: '/api/',
//             })
//             .then((response) => {
//                 state = {
//                     response.data
//                 };
//                 return state;
//             })
//         }
//     },
// });

// export const { userList } = UserList.actions;

// export const selectUserList = (state) => state.userList;

// export default UserList.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const Friend = createSlice({
    name: "friend",
    initialState: {
        wantedFriend : [],
        friend : []
    },
    reducers: {
        wantedFriend: (state, action) => {
            axios({
                method: 'get',
                url: '/api/user/firend/request-list',
                headers: {
                    Authorization: `Bearer ` + state.accessToken,
                }
            })
            .then((response) => {
                state = {
                    wantedFriend : response.data,
                    friend
                };
                return state;
            })
        },
        friend: (state, action) => {
            axios({
                method: 'get',
                url: '/api/user/friend/friend-list',
                headers: {
                    Authorization: `Bearer ` + state.accessToken,
                }
            })
            .then((response) => {
                state = {
                    wantedFriend,
                    friend : response.data
                };
                return state;
            })
        },
    },
});

export const { wantedFriend, friend } = UserSlice.actions;

export const selectUser = (state) => state.user;

export default UserSlice.reducer;

import React from "react";
import axios from "axios";

// 친구 수락 : 친구신청 pk와 친구 seq을 가지고 있는데 친구 신청pk를 되돌려주면됩니다!!
function ResponseFriend(friendSeq, friendPk) {
    const SendResponse = () => {
        return axios
            .post(`/user/friend/accept/${friendSeq}`, {
                pk: { friendPk },
            })
            .then(function(res) {
                console.log(res);
            });
    };
    return (
        <React.Fragment>
            <button onClick={SendResponse}>친구 수락</button>
        </React.Fragment>
    );
}
export default ResponseFriend;

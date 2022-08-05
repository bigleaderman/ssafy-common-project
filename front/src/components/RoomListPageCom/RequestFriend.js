import axios from "axios";
import React from "react";

// 친구 신청 : 내 seq와 다른 유저의 seq를 db에 전송

// <남은 일>
// data이름 맞추기
// 내 seq는 login하면 redux에 저장되는데 그걸 가져오자
// 너 seq는 받아와야지... 어디서? props로? 

function RequestFriend() {
    const SendRequest = () => {
        return axios.post(
            "https://i7d106.p.ssafy.io:8080/user/friend/request",
            {
               me: "1",
                friend: "2",
            }).then((res) =>{
                console.log(res);
                // 모달로 친구신청했다.
            })
    };
    return (
        <React.Fragment>
            <button onClick={SendRequest}>친구 신청</button>
        </React.Fragment>
    );
}
export default RequestFriend;

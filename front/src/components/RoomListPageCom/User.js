import React from "react";
import RequestFriend from "./RequestFriend";

// 모든 유저 검색창(닉네임으로)
// + 로그인 된 유저 목록 (프로필 / 친구 신청 버튼)
function User() {
    return (
        <React.Fragment>
            User
            <RequestFriend />
        </React.Fragment>
    );
}
export default User;

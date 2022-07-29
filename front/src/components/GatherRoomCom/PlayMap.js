import React from "react";

//컴포넌트가 호출되면 캐릭터 맵 호출
//캐릭터 세팅
//움직임 호출
export default function PlayMap() {
    return (
        <div>
            {/* 게임맵 */}
            <div
                style={{ width: 500, height: 500, background: "orange" }}
            >
                {/* 플레이어 */}
                <div style={{width:20, height:20, background:}}></div>
            </div>
            <a>playmap</a>
        </div>
    );
}

import React, { useEffect, useRef } from "react";

//의사, 경찰, 마피아 수 검사
export const GameSetting = (props) => {
    const inputFocus = useRef();
    //소켓 통신으로 변경 완료 알림
    //1번 조건에 맞는지 확인
    useEffect(() => {
        inputFocus.current.focus();
    }, []);
    return (
        <div>
            <label>인원 수 : </label>
            <select>
                {() => {
                    for (let i = 5; i <= 8; i++) {
                        return <option>i</option>;
                    }
                }}
            </select>
            <input type="text" id="conLimit" ref={inputFocus} />
            <label>의사 수 : </label>
            <input type="text" id="cntDoc" />
            <label>경찰 수 : </label>
            <input type="text" id="cntCop" />
            <label>마피아 수 : </label>
            <input type="text" id="cntMaf" />
            <button>확인</button>
            <button>취소</button>
        </div>
    );
};

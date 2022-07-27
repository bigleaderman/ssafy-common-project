import React from "react";
import { useSelector, useDispatch } from "react-redux";

export function MainBar() {
  return (
    <div>
      <div>
        <p>빙 번호 : ???</p>
        <p>방 제목 : ???</p>
      </div>
      <div>
        <p>
          <span>현재 인원 / 최대 인원 : [현재 인원] / [최대 인원]</span>
        </p>
        <div>
          <p>
            시민 : [???]명
            <p>의사 : [???]명</p>
            <p>경찰 : [???]명</p>
            <p>마피아 : [???]명</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainBar;

import React from "react";
import {Button} from "@mui/material";

export function Random({num,noMatch}) {
  console.log("안녕");
  return (
    <div >
        
      <div>매칭 중입니다.</div>
      로딩 이미지 넣기
      <div>현재 대기 인원 {num}명입니다.</div>
        <Button sx={{borderRadius: '2px'}} onClick = {()=>{noMatch()}}>매칭 취소</Button>
    </div>
  );
}

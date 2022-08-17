import React, { useState } from "react";
import { Container } from '../style.js';


const GameRoomPage = (props) => {

  // 게임 설정 및 역할 분배(백에서 처리하는지?)
  const [mafiaCount, setMafiaCount] = useState(0);
  const [policemanCount, setPolicemanCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);

  const roleName = ['시민', '마피아', '경찰', '의사'];

  const participants = [
    {
      id: 1,
      username: '김싸피',
      role: 0,
    },
    {
      id: 2,
      username: '이싸피',
      role: 0,
    },
    {
      id: 3,
      username: '박싸피',
      role: 0,
    },
    {
      id: 4,
      username: '강싸피',
      role: 0,
    },
    {
      id: 5,
      username: '고싸피',
      role: 0,
    },
    {
      id: 6,
      username: '최싸피',
      role: 0,
    },
    {
      id: 7,
      username: '채싸피',
      role: 0,
    },
    {
      id: 8,
      username: '독고싸피',
      role: 0,
    },
    {
      id: 9,
      username: '정싸피',
      role: 0,
    },
    {
      id: 10,
      username: '유싸피',
      role: 0,
    },
  ];
  const [shuffledRoleList, setShuffledRoleList] = useState(new Array(participants.length).fill(0));

  function shuffle() {
    let temp = [];
    while (1) {
      let idx = Math.floor(Math.random() * participants.length);
      if (!(temp.includes(idx))) {
        temp.push(idx);
      }
      if (temp.length >= participants.length) {
        break;
      }
    }

    setShuffledRoleList(temp);
  }

  const increaseMafiaCount = () => {
    if (mafiaCount + policemanCount + doctorCount < participants.length) {
      setMafiaCount(mafiaCount + 1);
    }
  }
  const decreaseMafiaCount = () => {
    if (mafiaCount > 0) {
      setMafiaCount(mafiaCount - 1)
    }
  }
  const increasePolicemanCount = () => {
    if (mafiaCount + policemanCount + doctorCount < participants.length) {
      setPolicemanCount(policemanCount + 1)
    }
  }
  const decreasePolicemanCount = () => {
    if (policemanCount > 0) {
      setPolicemanCount(policemanCount - 1)
    }
  }
  const increaseDoctorCount = () => {
    if (mafiaCount + policemanCount + doctorCount < participants.length) {
      setDoctorCount(doctorCount + 1)
    }
  }
  const decreaseDoctorCount = () => {
    if (doctorCount > 0) {
        setDoctorCount(doctorCount - 1)
    }
  }

  const citizenCount = () => {
    return participants.length - (mafiaCount + policemanCount + doctorCount);
  }

  const roleList = () => {
    return [...new Array(citizenCount()).fill(0), ...new Array(mafiaCount).fill(1), ...new Array(policemanCount).fill(2), ...new Array(doctorCount).fill(3)];
  }

  const resetCount = () => {
    setMafiaCount(0);
    setPolicemanCount(0);
    setDoctorCount(0);
  }

  return (
    <Container>
      <span>GameRoomPage</span>
      <br />
      <span>게임 설정</span>
      <span>전체 인원 수: {participants.length}
      </span>
      <span>일반 시민 수: {citizenCount()}
        <button onClick={resetCount}>리셋</button>
      </span>
      <span>마피아 수: {mafiaCount}
        <button onClick={increaseMafiaCount}>+</button>
        <button onClick={decreaseMafiaCount}>-</button>
      </span>
      <span>경찰 수: {policemanCount}
        <button onClick={increasePolicemanCount}>+</button>
        <button onClick={decreasePolicemanCount}>-</button>
      </span>
      <span>의사 수: {doctorCount}
        <button onClick={increaseDoctorCount}>+</button>
        <button onClick={decreaseDoctorCount}>-</button>
      </span>
      <span>역할: {roleList()} {shuffledRoleList}</span>
      <br />
      <span>참여자</span>

        {participants.map((participant, idx) => (
          <div key={idx}>
            <span>{participant.username} {roleName[roleList()[shuffledRoleList[idx]]]}</span>
          </div>
        ))}

      <button onClick={shuffle}>셔플</button>
    </Container>
  );
};

export default GameRoomPage;
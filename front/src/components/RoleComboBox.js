import React, { useState } from "react";
import styled from 'styled-components';
import '../style.js';
import '../color.css';


const RoleComboBox = (props) => {
  const roleList = ['시민', '의사', '경찰', '마피아']
  const [role, setRole] = useState(null);

  return (
    <Box>
      <div>
        <ul>
          {roleList.map((roleName, index) => (
            <li key={index}>
              <button onClick={() => {setRole(index)}}>{roleName}</button>
            </li>
          ))}
        </ul>
        <button id="roleState" onClick={() => {setRole(null)}}>
          {role === null ? '역할' : roleList[role]}
        </button>
      </div>
    </Box>
  );
};

const Box = styled.div`
  font-size: 14px;
  width: 320px;
  height: 40px;
  display: flex;
  justify-content: end;
  align-items: center;
  text-decoration: none;
  div {
    display: flex;
  }
  ul {
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  li {
    display: none;
    button {
      font-size: 14px;
      width: 50px;
      color: #ccc;
    }
  }
  #roleState {
    font-size: 14px;
    width: 50px;
    color: #ccc;
  }
  &:hover {
    li {
      display: block;
    }
  }
`

export default RoleComboBox;

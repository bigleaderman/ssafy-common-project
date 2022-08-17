import React, { useState } from "react";
import User from "./User";
import Friends from "../Friends";
import RequestedFriends from "../RequestedFriends";
import { Paper, Tabs, Tab, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';

// 탭쓰기 위한 작업
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SideBar({ loginUser, friends, sendF, requestedList }) {
  // 탭
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ width: "100%", backgroundColor:"rgba(0,0,0,0.5)",border:'rgba(0,0,0) 1px solid',borderRadius: "2px"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
        }}
      >
        <Tabs TabIndicatorProps={{ style: { background: "rgba(255,255,255)" } }} value={value} onChange={handleChange} aria-label='basic tabs example' textColor="secondary">
          <Tab sx={{ width: "30%" }} style={{color:"#ccc"}} icon = {<PersonIcon/>} label='로그인' {...a11yProps(0)} />
          <Tab sx={{ width: "30%" }} style={{color:"#ccc"}} icon = {<PeopleAltIcon/>} label='친구' {...a11yProps(1)} />
          <Tab sx={{ width: "30%" }} style={{color:"#ccc"}} icon={<GroupAddIcon/>} label='친구신청' {...a11yProps(2)} />
        </Tabs>
      </Box>
      {value === 0 ? (
        <User loginUser={loginUser} sendF={sendF} />
      ) : value === 1 ? (
        <Friends friends={friends} sendF={sendF} />
      ) : (
        <RequestedFriends requestedList={requestedList} sendF={sendF}/>
      )}
    </Paper>
  );
}

export default SideBar;

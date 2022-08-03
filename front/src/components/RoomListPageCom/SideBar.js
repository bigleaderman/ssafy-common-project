import React,{useState} from "react";
import User from "./User";
import Friends from "./Friends";
import {Paper,Tabs,Tab,Typography,Box} from '@mui/material';
import PropTypes from 'prop-types';
// 대기실에 있는 전체 목록, 친구 목록 : 탭

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function SideBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{width:'100%',height:'250px'}}>
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Friends" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <User/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Friends/>
            </TabPanel>
        </Box>
    </Paper>
  );
}

export default SideBar;

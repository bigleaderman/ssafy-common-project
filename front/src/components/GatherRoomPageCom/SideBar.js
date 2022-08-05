import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//redux
import { useSelector, useDispatch } from "react-redux";
import {} from "../../redux/slice/UserSlice";

//socktjs
import { over } from "stompjs";
import SockJS from "sockjs-client";

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
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function SideBar() {
    //웹소켓 코드 시작
    var stompClient = null;

    const [userData, setUserData] = useState({
        username: "",
        connected: false,
        message: "",
    });

    const connect = () => {
        console.log("function connect");
        //소켓 주소를 탑재한 객체 생성
        let Sock = new SockJS("https://i7d106.p.ssafy.io:8080/ws");
        console.log("let Sock: ", Sock);
        //스톰프 프로토콜 탑재
        stompClient = over(Sock);
        console.log("let stompClient: ", stompClient);
        //연결, 에러 콜백함수 탑재해서 연결 시도
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("function onConnected");
        setUserData({ ...userData, connected: true });
        //세부 주소 구독
        stompClient.subscribe(
            "https://i7d106.p.ssafy.io:8080/ws/sub/room/0",
            onMessageReceived
        );
        userJoin();
    };

    const userJoin = () => {
        var chatMessage = {
            header: {
                type: "join",
            },
            data: {
                nickname: "닉네임",
            },
        };
        stompClient.send(
            "https://i7d106.p.ssafy.io:8080/ws/pub/room/0",
            {},
            JSON.stringify(chatMessage)
        );
    };

    const onError = (err) => {
        console.log("function onError");
        console.log(err);
    };

    const onMessageReceived = (payload) => {
        console.log("function onMessageReceived");
        var payloadData = JSON.parse(payload.body);
        console.log("payloadData: ", payloadData);
    };

    const handleMessage = (event) => {
        console.log("function handleMessage");
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };

    const sendValue = () => {
        console.log(stompClient);
        if (stompClient) {
            var chatMessage = {
                header: {
                    type: "join",
                },
                data: {
                    nickname: "닉네임",
                },
            };
            console.log(chatMessage);
            stompClient.send(
                "https://i7d106.p.ssafy.io:8080/ws/pub/room/0",
                {},
                JSON.stringify(chatMessage)
            );
            setUserData({ ...userData, message: "" });
        }
    };
    useEffect(() => {
        // connect();
    }, []);

    //웹소켓 코드 끝
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="채팅" {...a11yProps(0)} />
                    <Tab label="접속 유저" {...a11yProps(1)} />
                    <Tab label="친구 목록" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ChatBar />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserBar />
            </TabPanel>
            <TabPanel value={value} index={2}></TabPanel>
        </div>
    );
}

function ChatBar() {
    return <span>this is ChatBar</span>;
}

function UserBar() {
    return <span>this is UserBar</span>;
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import MyPage from "./pages/MyPage";
import UserListPage from "./pages/UserListPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoticeListPage from "./pages/NoticeListPage";
import CreateNoticePage from "./pages/CreateNoticePage";
import UpdateNoticePage from "./pages/UpdateNoticePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";

// import VideoRoomPage from "./pages/VideoRoomPage";
// import GameRoomPage from "./pages/GameRoomPage";

import RoomListPage from './pages/RoomListPage';

import React from "react";
import "./App.css";
import "./color.css";


function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<MainPage />} />  {/* 테스트 위해 MainPage 대신 VideoRoomPage로 연결 */}
                    <Route exact path="/signup" element={<SignUpPage />} />
                    <Route exact path="/signin" element={<SignInPage />} />
                    <Route exact path="/signout" element={<SignOutPage />} />
                    <Route exact path="/mypage" element={<MyPage />} />
                    <Route exact path="/userlist" element={<UserListPage />} />
                    <Route exact path="/board" element={<NoticeListPage />} />
                    <Route exact path="/board/create" element={<CreateNoticePage />} />
                    <Route exact path="/board/:noticeId" element={<NoticeDetailPage />} />
                    <Route exact path="/board/:noticeId/update" element={<UpdateNoticePage />} />
                    <Route exact path="/findpassword" element={<FindPasswordPage />} />
                    <Route exact path="/changepassword" element={<ChangePasswordPage />} />
                    <Route exact path="/*" element={<PageNotFoundPage />} />
                </Routes>
                <Footer />
            </Router>
            <RoomListPage/>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <span>
                    <span>Learn </span>
                    <a
                        className="App-link"
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux-toolkit.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux Toolkit
                    </a>
                    ,<span> and </span>
                    <a
                        className="App-link"
                        href="https://react-redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React Redux
                    </a>
                </span>
            </header>
        </div>
    );
}

export default App;

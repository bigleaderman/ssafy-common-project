import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
// import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import RoomPage from "./pages/GatherRoomPage";
import MyPage from "./pages/MyPage";
import RankPage from "./pages/RankPage";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoticeListPage from "./pages/NoticeListPage";
import CreateNoticePage from "./pages/CreateNoticePage";
import UpdateNoticePage from "./pages/UpdateNoticePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import WelcomeMessagePage from "./pages/WelcomeMessagePage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import EmailAuthPage from "./pages/EmailAuthPage";
import ChannelService from "./components/ChannelService";

// import VideoRoomPage from "./pages/VideoRoomPage";
// import GameRoomPage from "./pages/GameRoomPage";

import RoomListPage from "./pages/RoomListPage";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./App.css";
import "./color.css";
import $ from "jquery";
import Rain from "./CSS/Rain.css";
import zIndex from "@mui/material/styles/zIndex";
import KakaoLoginPage from "./pages/KakaoLoginPage";
import SoundManager from "./components/SoundManager";

function App() {
  const token = useSelector((state) => state.user.accessToken);
  const userSeq = useSelector((state) => state.user.userSeq) ? true : false;
  const auth = useSelector((state) => state.user.auth);
  const isAdmin = useSelector((state) => state.user.isAdmin) === "ROLE_ADMIN" ? true : false;

  var makeItRain = function () {
    //clear out everything
    $(".rain").empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
      //random number between 5 and 2
      var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops +=
        '<div class="drop" style="left: ' +
        increment +
        "%; bottom: " +
        (randoFiver + randoFiver - 1 + 100) +
        "%; animation-delay: 0." +
        randoHundo +
        "s; animation-duration: 0.5" +
        randoHundo +
        's;"><div class="stem" style="animation-delay: 0.' +
        randoHundo +
        "s; animation-duration: 0.5" +
        randoHundo +
        's;"></div><div class="splat" style="animation-delay: 0.' +
        randoHundo +
        "s; animation-duration: 0.5" +
        randoHundo +
        's;"></div></div>';
    }

    $(".rain.front-row").append(drops);
    $(".rain.back-row").append(backDrops);
  };

  useEffect(() => {
    makeItRain();
  }, []);


  ChannelService.boot({
    pluginKey: "50cc437f-3944-4cda-b781-dfc4712e44bb", //please fill with your plugin key
  });

  return (
    <div className=' App'>
      <SoundManager />

      <Router style={{ zIndex: 100 }}>
        <div className='rain front-row' style={{ zindex: -1, position: "absolute" }}></div>
        <div className='rain back-row' style={{ zindex: -1, position: "absolute" }}></div>
        <Header />
        <Routes>
          <Route exact path='/oauth/callback/kakao' element={<KakaoLoginPage />} />
          <Route
            exact
            path='/'
            element={
              // token && userSeq && !auth ? <Navigate to='/emailauth' /> : <MainPage />
              <MainPage />
            }
          />
          {/* <Route exact path='/signup' element={<SignUpPage />} /> */}
          <Route
            exact
            path='/signin'
            // element={token ? <Navigate to='/' /> : <SignInPage />}
            element={<SignInPage />}
          />
          <Route exact path='/signout' element={<SignOutPage />} />
          <Route exact path='/emailauth' element={<EmailAuthPage />} />
          <Route exact path='/mypage' element={<MyPage />} />
          <Route exact path='/rankpage' element={<RankPage />} />

          <Route
            exact
            path='/userlist'
            // element={isAdmin ? <UserListPage /> : <Navigate to='/' />}
            element={<UserListPage />}
          />
          <Route
            exact
            path='/board'
            // element={token ? <NoticeListPage /> : <Navigate to='/' />}
            element={<NoticeListPage />}
          />
          <Route
            exact
            path='/gatherroom'
            // element={token ? <RoomPage /> : <Navigate to='/' />}
            element={<RoomPage />}
          />
          <Route
            exact
            path='/board/create'
            // element={isAdmin ? <CreateNoticePage /> : <Navigate to='/' />}
            element={<CreateNoticePage />}
          />
          <Route
            exact
            path='/board/:noticeId'
            // element={token ? <NoticeDetailPage /> : <Navigate to='/' />}
            element={<NoticeDetailPage />}
          />
          <Route
            exact
            path='/board/:noticeId/update'
            // element={isAdmin ? <UpdateNoticePage /> : <Navigate to='/' />}
            element={<UpdateNoticePage />}
          />
          <Route
            exact
            path='/findpassword'
            // element={token ? <FindPasswordPage /> : <Navigate to='/' />}
            element={<FindPasswordPage />}
          />
          <Route
            exact
            path='/changepassword'
            // element={token ? <ChangePasswordPage /> : <Navigate to='/' />}
            element={<ChangePasswordPage />}
          />
          <Route exact path='/welcome' element={<WelcomeMessagePage />} />
          <Route
            exact
            path='/users'
            // element={isAdmin ? <UserListPage /> : <Navigate to='/' />}
            element={<UserListPage />}
          />
          <Route
            exact
            path='/users/:userId'
            // element={isAdmin ? <UserDetailPage /> : <Navigate to='/' />}
            element={<UserDetailPage />}
          />
          <Route exact path='/roompage' element={<RoomPage />} />
          <Route exact path='/*' element={<PageNotFoundPage />} />
          <Route exact path='/roomList' element={<RoomListPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

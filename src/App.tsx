import React, { useEffect } from "react";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// pages
import Top from "pages/Top/Top";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import EasySetting from "pages/EasySetting/EasySetting";
import Main from "pages/Main/Main";
import Setting from "pages/Setting/Setting";

// user management
import { auth } from "firebase_auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateUserInfoAsync } from "services/user/user";

// define props
type Props = {};

export const App: React.FC<Props> = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  // ユーザ状態変更時にユーザ情報を更新
  useEffect(() => {
    dispatch(updateUserInfoAsync());
  }, [user]);

  return (
    <HashRouter>
      <h1>Routine Page</h1>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/easysetting" element={<EasySetting />} />
        <Route path="/main" element={<Main />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
      <div>
        <Link to="/">トップへ戻る</Link>
      </div>
    </HashRouter>
  );
};

export default App;

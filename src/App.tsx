import React from "react";
import { HashRouter, Route, Routes, Link } from "react-router-dom";

// pages
import Top from "pages/Top/Top";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import EasySetting from "pages/EasySetting/EasySetting";
import Main from "pages/Main/Main";
import Setting from "pages/Setting/Setting";

// define props
type Props = {};

export const App: React.FC<Props> = () => {
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

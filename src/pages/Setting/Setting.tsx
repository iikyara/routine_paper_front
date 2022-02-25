import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "store";

// define props
type Props = {};

export const Setting: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1>Setting</h1>
      <ul>
        <li>screenName: {user.user?.screenName}</li>
        <li>
          picture <br />
          <img src={user.user?.picture} alt={user.user?.picture} />
        </li>
        <li>date_joined: {user.user?.date_joined}</li>
        <li>
          <Link to="/main">メイン画面へ戻る</Link>
        </li>
      </ul>
    </div>
  );
};

export default Setting;

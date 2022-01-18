import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "store";
import { updateUserInfoAsync } from "services/user/user";

// define props
type Props = {};

export const EasySetting: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUserInfoAsync());
  }, []);

  return (
    <div>
      <h1>EasySetting</h1>
      <ul>
        <li>username: {user.user?.username}</li>
        <li>first_name: {user.user?.first_name}</li>
        <li>last_name: {user.user?.last_name}</li>
        <li>
          <Link to="/main">Main Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default EasySetting;

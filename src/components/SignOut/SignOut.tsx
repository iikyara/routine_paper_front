import React from "react";
import { useDispatch } from "react-redux";
import { signOutAsync } from "services/user/user";

type Props = {};

export const SignOut: React.FC<Props> = () => {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(signOutAsync())}>Sign Out</button>;
};

export default SignOut;

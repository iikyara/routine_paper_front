import React from "react";
import { Link } from "react-router-dom";

// define props
type Props = {};

export const Login: React.FC<Props> = () => {
  return (
    <div>
      <h1>Login</h1>
      <ul>
        <li>
          <Link to="/easysetting">EasySetting Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Login;

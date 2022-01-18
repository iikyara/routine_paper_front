import React from "react";
import { Link } from "react-router-dom";

// define props
type Props = {};

export const Register: React.FC<Props> = () => {
  return (
    <div>
      <h1>Register</h1>
      <ul>
        <li>
          <Link to="/easy_setting">EasySetting Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Register;

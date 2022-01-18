import React from "react";
import { Link } from "react-router-dom";

// define props
type Props = {};

export const Top: React.FC<Props> = () => {
  return (
    <div>
      <h1>Top</h1>
      <ul>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/register">Register Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Top;

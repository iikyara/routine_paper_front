import React from "react";
import { Link } from "react-router-dom";

// define props
type Props = {};

export const Main: React.FC<Props> = () => {
  return (
    <div>
      <h1>Main</h1>
      <ul>
        <li>
          <Link to="/setting">Setting Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Main;

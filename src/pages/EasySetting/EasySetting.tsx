import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const EasySetting: React.FC<Props> = () => {
  return (
    <div>
      <h1>EasySetting</h1>
      <ul>
        <li>
          <Link to="/main">Main Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default EasySetting;

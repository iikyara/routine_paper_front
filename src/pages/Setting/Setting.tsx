import React from "react";
import { Link } from "react-router-dom";

// define props
type Props = {};

export const Setting: React.FC<Props> = () => {
  return (
    <div>
      <h1>Setting</h1>
      <ul>
        <li>
          <Link to="/main">メイン画面へ戻る</Link>
        </li>
      </ul>
    </div>
  );
};

export default Setting;

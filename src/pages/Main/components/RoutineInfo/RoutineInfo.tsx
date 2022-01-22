import React from "react";

import { Routine } from "services/routine/routine";

// define props
type Props = {
  routines: Routine[];
};

export const RoutineInfo: React.FC<Props> = (prop: Props) => {
  return (
    <div>
      <ul>
        {prop.routines
          .sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
          })
          .map((item) => (
            <li key={item.id}>
              {item.start_time} ~ {item.finish_time} : {item.name},{" "}
              {item.description}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RoutineInfo;

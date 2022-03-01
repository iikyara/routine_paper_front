import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store";
import { Routine, getAllRoutinesAsync } from "services/routine/routine";

import SignOut from "components/SignOut/SignOut";
import RoutineInfo from "./components/RoutineInfo/RoutineInfo";

// define props
type Props = {};

export const Main: React.FC<Props> = () => {
  const routine = useSelector((state: RootState) => state.routine);
  const [daily_routine, setRoutine] = useState<Routine[]>([]);
  const dispatch = useDispatch();
  const _daily_routine: Routine[] = [];

  useEffect(() => {
    dispatch(getAllRoutinesAsync());
  }, []);

  //本日のルーティン一覧を絞り込む
  useEffect(() => {
    //特定の日ルーティンが存在するか
    const date = new Date();
    const date_str = date.toDateString();
    const week = date.getDay();
    if (
      date_str in routine.spec_day &&
      routine.spec_day[date_str].length != 0
    ) {
      for (let key in routine.spec_day[date_str].routines)
        _daily_routine.push(routine.spec_day[date_str].routines[key]);
    }
    //曜日ルーティンが存在するか
    else if (week in routine.week && routine.week[week].length != 0) {
      for (let key in routine.week[week].routines)
        _daily_routine.push(routine.week[week].routines[key]);
    }
    //毎日ルーティンを取得
    else {
      for (let key in routine.everyday.routines)
        _daily_routine.push(routine.everyday.routines[key]);
    }
    setRoutine(_daily_routine);
  }, [routine]);

  return (
    <div>
      <h1>Main</h1>
      <ul>
        <li>
          本日のルーティン一覧
          <RoutineInfo routines={daily_routine}></RoutineInfo>
        </li>
        <li>
          <SignOut />
        </li>
        <li>
          <Link to="/setting">Setting Page</Link>
        </li>
        <li>
          <Link to="/room">Go to Room</Link>
        </li>
      </ul>
    </div>
  );
};

export default Main;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosWithToken from "axios_with_token";

export type Routine = {
  id: string;
  name: string;
  description: string;
  start_time: Date;
  finish_time: Date;

  //データベースへの反映フラグ
  is_created?: boolean;
  is_changed?: boolean;
  is_deleted?: boolean;
};

// １日のルーティン
export type DailyRoutine = {
  routines: { [id: string]: Routine };
  length: number;
};

export type RoutineState = {
  everyday: DailyRoutine;
  week: { [week: number]: DailyRoutine };
  spec_day: { [key: string]: DailyRoutine };
};

export const Week = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
} as const;
export type WeekType = typeof Week[keyof typeof Week];

const routineSlice = createSlice({
  name: "routine",
  initialState: {
    everyday: {
      routines: {},
      length: 0,
    },
    week: {},
    spec_day: {},
  } as RoutineState,
  reducers: {
    // to Set DailyRoutine from DB
    initEveryday: (state, action: PayloadAction<DailyRoutine>) => {
      state.everyday = action.payload;

      // initialize routines
      for (let key in state.everyday.routines) {
        state.everyday.routines[key].is_created = false;
        state.everyday.routines[key].is_changed = false;
        state.everyday.routines[key].is_deleted = false;
      }

      // regist length
      state.everyday.length = Object.keys(state.everyday.routines).length;
    },
    initEveryweeks: (
      state,
      action: PayloadAction<{ week: WeekType; routine: DailyRoutine }[]>
    ) => {
      action.payload.forEach((elem) => {
        const { week, routine } = elem;
        state.week[week] = routine;
      });

      // initialize routines
      for (let key1 in state.week) {
        for (let key in state.week[key1].routines) {
          state.week[key1].routines[key].is_created = false;
          state.week[key1].routines[key].is_changed = false;
          state.week[key1].routines[key].is_deleted = false;
        }

        // regist length
        state.week[key1].length = Object.keys(state.week[key1].routines).length;
      }
    },
    initSpecDays: (
      state,
      action: PayloadAction<{ date: Date; routine: DailyRoutine }[]>
    ) => {
      action.payload.forEach((elem) => {
        const { date, routine } = elem;
        state.spec_day[date.toDateString()] = routine;
      });

      // initialize routines
      for (let key1 in state.spec_day) {
        for (let key in state.spec_day[key1].routines) {
          state.spec_day[key1].routines[key].is_created = false;
          state.spec_day[key1].routines[key].is_changed = false;
          state.spec_day[key1].routines[key].is_deleted = false;
        }

        // regist length
        state.spec_day[key1].length = Object.keys(
          state.spec_day[key1].routines
        ).length;
      }
    },
    clearEveryday: (state) => {
      state.everyday = { routines: {}, length: 0 };
    },
    clearEveryweeks: (state) => {
      state.week = {};
    },
    clearSpecdays: (state) => {
      state.spec_day = {};
    },
    clearAll: (state) => {
      state.everyday = { routines: {}, length: 0 };
      state.week = {};
      state.spec_day = {};
    },

    // to edit Routines
    // Everyday Routines
    addRoutinesToEveryday: (state, action: PayloadAction<Routine[]>) => {
      action.payload.forEach((routine) => {
        state.everyday.routines[routine.id] = routine;
        state.everyday.routines[routine.id].is_created = true;
        state.everyday.routines[routine.id].is_changed = true;
        state.everyday.routines[routine.id].is_changed = false;

        state.everyday.length++;
      });
    },
    updateRoutinesOfEveryDay: (state, action: PayloadAction<Routine[]>) => {
      action.payload.forEach((routine) => {
        state.everyday.routines[routine.id] = routine;
        state.everyday.routines[routine.id].is_changed = true;
      });
    },
    removeRoutinesFromEveryday: (state, action: PayloadAction<Routine[]>) => {
      action.payload.forEach((routine) => {
        //論理削除
        state.everyday.routines[routine.id].is_deleted = true;

        state.everyday.length--;
      });
    },

    // Everyweek Routines
    addRoutinesToEveryweeks: (
      state,
      action: PayloadAction<{ week: WeekType; routines: Routine[] }[]>
    ) => {
      action.payload.forEach((elem) => {
        const { week, routines } = elem;

        if (!(week in state.week))
          state.week[week] = { routines: {}, length: 0 };

        routines.forEach((routine) => {
          state.week[week].routines[routine.id] = routine;
          state.week[week].routines[routine.id].is_created = true;
          state.week[week].routines[routine.id].is_changed = true;
          state.week[week].routines[routine.id].is_changed = false;

          state.week[week].length++;
        });
      });
    },
    updateRoutinesOfEveryweeks: (
      state,
      action: PayloadAction<{ week: WeekType; routines: Routine[] }[]>
    ) => {
      action.payload.forEach((elem) => {
        const { week, routines } = elem;

        routines.forEach((routine) => {
          state.week[week].routines[routine.id] = routine;
          state.week[week].routines[routine.id].is_changed = true;
        });
      });
    },
    removeRoutinesOfEveryweeks: (
      state,
      action: PayloadAction<{ week: WeekType; routines: Routine[] }[]>
    ) => {
      action.payload.forEach((elem) => {
        const { week, routines } = elem;

        routines.forEach((routine) => {
          state.week[week].routines[routine.id].is_deleted = true;

          state.week[week].length--;
        });
      });
    },

    // Specific Day Routines
    addRoutinesToSpecdays: (
      state,
      action: PayloadAction<{ date: Date; routines: Routine[] }[]>
    ) => {
      action.payload.forEach((elem) => {
        const { date, routines } = elem;
        const date_str = date.toDateString();

        if (!(date_str in state.spec_day))
          state.spec_day[date_str] = { routines: {}, length: 0 };

        routines.forEach((routine) => {
          state.spec_day[date_str].routines[routine.id] = routine;
          state.spec_day[date_str].routines[routine.id].is_created = true;
          state.spec_day[date_str].routines[routine.id].is_changed = true;
          state.spec_day[date_str].routines[routine.id].is_deleted = false;

          state.spec_day[date_str].length++;
        });
      });
    },
    updateRoutinesToSpecdays: (
      state,
      action: PayloadAction<{ date: Date; routines: Routine[] }[]>
    ) => {
      action.payload.forEach((elem) => {
        const { date, routines } = elem;
        const date_str = date.toDateString();

        routines.forEach((routine) => {
          state.spec_day[date_str].routines[routine.id] = routine;
          state.spec_day[date_str].routines[routine.id].is_changed = true;
        });
      });
    },
    removeRoutinesToSpecdays: (
      state,
      action: PayloadAction<{ date: Date; routines: Routine[] }[]>
    ) => {
      action.payload.forEach((elem) => {
        const { date, routines } = elem;
        const date_str = date.toDateString();

        routines.forEach((routine) => {
          state.spec_day[date_str].routines[routine.id].is_deleted = true;

          state.spec_day[date_str].length--;
        });
      });
    },
  },
});

export const {
  initEveryday,
  initEveryweeks,
  initSpecDays,
  clearEveryday,
  clearEveryweeks,
  clearSpecdays,
  clearAll,
  addRoutinesToEveryday,
  updateRoutinesOfEveryDay,
  removeRoutinesFromEveryday,
  addRoutinesToEveryweeks,
  updateRoutinesOfEveryweeks,
  removeRoutinesOfEveryweeks,
  addRoutinesToSpecdays,
  updateRoutinesToSpecdays,
  removeRoutinesToSpecdays,
} = routineSlice.actions;

export const getAllRoutinesAsync = () => {
  return async (dispatch: any) => {
    dispatch(getRoutineEveryDayAsync());
    dispatch(getRoutineEveryWeekAsync());
    dispatch(getRoutineSpecDayAsync());
  };
};

export const getRoutineEveryDayAsync = () => {
  return async (dispatch: any) => {
    axiosWithToken
      .get("/routine/everyday")
      .then((res) => {
        const daily_routine: DailyRoutine = { routines: {}, length: 0 };

        //データをまとめる
        res.data.forEach((data: any) => {
          daily_routine.routines[data.id] = data;
        });

        //登録
        dispatch(initEveryday(daily_routine));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const getRoutineEveryWeekAsync = () => {
  return async (dispatch: any) => {
    axiosWithToken
      .get("/routine/everyweek")
      .then((res) => {
        const daily_routines: { week: WeekType; routine: DailyRoutine }[] = [];

        //１週間のデータをまとめる
        for (const week of Object.values(Week)) {
          const daily_routine: DailyRoutine = { routines: {}, length: 0 };

          res.data
            .filter((data: any) => data.week == week)
            .forEach((data: any) => {
              daily_routine.routines[data.id] = data;
            });
          daily_routines.push({ week: week, routine: daily_routine });
        }

        //登録
        dispatch(initEveryweeks(daily_routines));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const getRoutineSpecDayAsync = () => {
  return async (dispatch: any) => {
    axiosWithToken
      .get("/routine/specday")
      .then((res) => {
        const daily_routines: { [day: string]: DailyRoutine } = {};

        //データをまとめる
        res.data.forEach((data: any) => {
          const day_str = data.date;

          //初期化
          if (!(day_str in daily_routines)) {
            daily_routines[day_str] = { routines: {}, length: 0 };
          }

          daily_routines[day_str].routines[data.id] = data;
        });

        //整形
        const payload: { date: Date; routine: DailyRoutine }[] = [];
        for (let key in daily_routines)
          payload.push({ date: new Date(key), routine: daily_routines[key] });

        //登録
        dispatch(initSpecDays(payload));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export default routineSlice.reducer;

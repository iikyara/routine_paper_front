import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "services/user/user";
import { UserState } from "services/user/user";
import routineReducer from "services/routine/routine";
import { RoutineState } from "services/routine/routine";

export type RootState = {
  user: UserState;
  routine: RoutineState;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    routine: routineReducer,
  },
  middleware: [thunk],
});

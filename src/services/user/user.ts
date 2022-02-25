import { createSlice } from "@reduxjs/toolkit";
import axiosWithToken from "axios_with_token";

import { signOutAsync as firebaseSignOutAsync } from "firebase_auth";

export type User = {
  screenName?: string;
  picture?: string;
  date_joined?: Date;
};

export type UserState = {
  isLogin: boolean;
  user?: User;
};

const userSlice = createSlice({
  name: "user",
  initialState: { isLogin: false } as UserState,
  reducers: {
    signIn: (state) => {
      state.isLogin = true;
    },
    signOut: (state) => {
      state.isLogin = false;
      delete state.user;
    },
    update: (state, action: { type: string; payload: User }) => {
      state.isLogin = true;
      state.user = action.payload;
    },
  },
});

export const { signIn, signOut, update } = userSlice.actions;

export const signOutAsync = () => {
  return async (dispatch: any) => {
    firebaseSignOutAsync()
      .then(() => {
        dispatch(signOut());
      })
      .catch(() => {
        console.log("ログアウトに失敗しました");
      });
  };
};

export const updateUserInfoAsync = () => {
  return async (dispatch: any) => {
    axiosWithToken
      .get("/user/current/")
      .then((res) => {
        dispatch(
          update({
            screenName: res.data.screen_name,
            picture: res.data.picture,
            date_joined: res.data.date_joined,
          })
        );
      })
      .catch(() => {
        console.log("Error Update User Info");
      });
  };
};

export default userSlice.reducer;

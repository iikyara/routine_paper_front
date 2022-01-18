import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "config";
import { Cookies } from "react-cookie";

const drfClientId = Config.drf.clientId;
const drfClientSecret = Config.drf.clientSecret;
const cookies = new Cookies();

export type User = {
  username: string;
  first_name: string;
  last_name: string;
}

export type UserState = {
  isLogin: boolean;
  user?: User;
}

// to token
export type signInFormat = {
  username: string;
  password: string;
}

export type signUpFormat = {
  username: string;
  password: string;
  email: string;
  nickname: string;
}

export type authResponseFormat = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: { isLogin: false } as UserState,
  reducers: {
    signIn: (state) => {
      state.isLogin = true;
    },
    signOut: (state) => {
      state.isLogin = false;
      state.user = undefined;
    },
    update: (state, action: {type: string; payload: User}) => {
      state.isLogin = true;
      state.user = action.payload;
    }
  },
});

export const { signIn, signOut, update } = userSlice.actions;

export const signInAsync = (payload: signInFormat) => {
  return async (dispatch: any) => {
    axios
    .post("/auth/token", {
      client_id: drfClientId,
      client_secret: drfClientSecret,
      grant_type: "password",
      username: payload.username,
      password: payload.password
    })
    .then((res) => {
      const d = res.data as authResponseFormat;
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + d.expires_in);
      cookies.set("access_token", d.access_token, {expires: expires, httpOnly: true});
      cookies.set("token_type", d.token_type, {expires: expires, httpOnly: true});
      cookies.set("refresh_token", d.refresh_token, {expires: expires, httpOnly: true});
      dispatch(signIn());
      dispatch(updateUserInfoAsync());
    })
    .catch((err) => {
      console.error("Error SignIn", err);
    });
    dispatch(signIn());
  };
};

export const signOutAsync = () => {
  return async (dispatch: any) => {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    dispatch(signOut());
  };
};

// export const signUpAsync = (payload: signUpFormat) => {
//   return async (dispatch: any) => {
//     //TODO: signup処理
//   };
// };

export const signInWithGoogleAsync = (googleAccessToken: string) => {
  return async (dispatch: any) => {
    axios
    .post("/auth/convert-token", {
      token: googleAccessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: drfClientId,
      client_secret: drfClientSecret,
    })
    .then((res) => {
      const d = res.data as authResponseFormat;
      const expires = new Date();

      expires.setSeconds(expires.getSeconds() + d.expires_in);
      cookies.set("access_token", d.access_token, {expires: expires});
      cookies.set("token_type", d.token_type, {expires: expires});
      cookies.set("refresh_token", d.refresh_token, {expires: expires});

      dispatch(signIn());
      dispatch(updateUserInfoAsync());
    })
    .catch((err) => {
      console.error("Error Google login", err);
    });
  };
};

export const updateUserInfoAsync = () => {
  return async (dispatch: any) => {
    const access_token = cookies.get("access_token");
    const token_type = cookies.get("token_type");

    if(access_token === null) return;

    axios.get("/user/current/", {
      headers:{
        Authorization: `${token_type} ${access_token}`,
      }
    })
    .then((res) => {
      dispatch(update({
        username: res.data.username,
        first_name: res.data.first_name,
        last_name: res.data.last_name
      }));
    })
    .catch((err) => {
      console.error("Error Update User Info", err);
    })
  };
};

export default userSlice.reducer;

// {
//   "client_id":"",
//   "client_secret":"",
//   "grant_type":"password",
//   "username":"",
//   "password":""
// }

// {
//   "grant_type"="convert_token",
//   "client_id"="",
//   "client_secret"="",
//   "backend"="google-oauth2",
//   "token"=""
// }
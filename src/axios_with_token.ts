import axios, { Axios } from "axios";
import Config from "config";
import { getIdToken } from "firebase_config";

axios.defaults.baseURL = Config.api.host;

const instance: Axios = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    //tokenを取得
    const token = getIdToken();

    //tokenをヘッダーに設定
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      if (config.headers) delete config.headers["Authorization"];
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default instance;

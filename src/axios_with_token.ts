import axios, { Axios } from "axios";
import { Cookies } from "react-cookie";
import Config from "config";

axios.defaults.baseURL = Config.api.host;

const cookies = new Cookies();

const instance: Axios = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const access_token = cookies.get("access_token");
    const token_type = cookies.get("token_type");

    if (access_token) {
      if (!config.headers) config.headers = {};
      config.headers["Authorization"] = `${token_type} ${access_token}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default instance;

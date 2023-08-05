import axios from "axios";
import { REFRESH_TOKEN_INTERVAL } from "config/constants.config";
import customErrorToast from "lib/customErrorToast";
import customToast from "lib/customToast";
import { LoginParams } from "services/interfaces/auth.interface";
import { useAxiosCustom } from "services/setting/axios.custom";

// authorization 관련 hook > api
export const useAuth_a = () => {
  // my custom axios
  const instance = useAxiosCustom(false);

  const login = async (params: LoginParams) => {
    try {
      const res = await instance.post("/auth/login", params);
      return res.data;
    } catch (err: any) {
      if (err.response) customErrorToast(err.response.data.statusCode);
      console.log(err);
    }
  };

  const logout = async (mbId: string, callback: any) => {
    try {
      const res = await instance.post("/auth/logout", { mbId });
      document.cookie = `isAccess=;max-age=${"0"}`;
      clearInterval(REFRESH_TOKEN_INTERVAL);
      callback();
      return res.data;
    } catch (err: any) {
      if (err.response) customErrorToast(err.response.data.statusCode);
      console.log(err);
    }
  };

  // 토큰(instanceAuth :: 토큰 할당 axios)을 이용한 유저 정보 반환 API
  const getUserWithToken = async (token: string) => {
    try {
      const res = await axios.get("/auth/jwt", {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data;
    } catch (err: any) {
      if (err.response) customErrorToast(err.response.data.statusCode);
      console.log(err);
    }
  };

  // 토큰을 갱신하기 위한 API
  const silentRefresh = async () => {
    try {
      const res = await instance.post("/auth/refresh");
      return res;
    } catch (err: any) {
      document.cookie = `isAccess=;max-age=${"0"}`;
      clearInterval(REFRESH_TOKEN_INTERVAL);
      if (err.response) customErrorToast(err.response.data.statusCode);
      console.error(err);
    }
  };

  return { login, logout, getUserWithToken, silentRefresh };
};

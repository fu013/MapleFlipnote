/* eslint-disable react/jsx-pascal-case */
import Login from "page/auth/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getCookie } from "services/utils/cookie";
import { useResetRecoilState } from "recoil";
import { accessTokenAtom, userInfoAtom } from "services/recoil/auth";
import { useAuth_h } from "services/hooks/auth.hook";
import App from "./page/main/App";

const Router = () => {
  const useAuthH = useAuth_h();
  const setRefresh = useAuthH.useLogCheckOnBrowserRefresh();
  const resetUserInfoAtom = useResetRecoilState(userInfoAtom);
  const resetAccessTokenAtom = useResetRecoilState(accessTokenAtom);
  useEffect(() => {
    if (getCookie("isAccess") >= 1) {
      setRefresh.mutate();
    } else {
      resetUserInfoAtom();
      resetAccessTokenAtom();
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Spin } from "antd";

import tokenExpried from "./api/tokenExpired";

import { RedirectRole, UserRole, AdminRole } from "./pages/RouteGuard";

import Home from "./pages/Home";
import QuizSetting from "./pages/QuizSetting";
import Register from "./components/Register";
import Login from "./components/Login";

import {
  selectRole,
  selectAccessToken,
  selectRefreshToken,
  selectLoading,
} from "./redux/auth/selector";

import { refresh } from "./redux/auth/action";

function App() {
  const role = useSelector(selectRole);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && refreshToken) {
      tokenExpried(accessToken, () => {
        dispatch(refresh(refreshToken));
      });
    }
  }, [accessToken, refreshToken]);

  return (
    <Router>
      <Spin spinning={loading} tip="Loading...">
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route element={<RedirectRole accessToken={accessToken} role={role} />}>
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<UserRole accessToken={accessToken} role={role} />}>
                <Route path="/quizsetting" element={<QuizSetting />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Spin>
    </Router>
  );
}

export default App;

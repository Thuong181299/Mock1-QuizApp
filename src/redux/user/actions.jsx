import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";
import { getUsersSuccess, updateUserSuccess } from "./reducer";
import { loading, loadingDone } from "../auth/reducer";

export const getUsers = (accessToken) => async (dispatch) => {
  dispatch(loading());
  try {
    const { data } = await axios.get("/v1/users?limit=500", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(data.results));
  } catch (error) {
    Modal.error({
      title: "Get users failed",
    });
  } finally {
    dispatch(loadingDone());
  }
};

export const createUser = (values, accessToken, form) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.post(
      "/v1/users",
      {
        username: values.username,
        password: values.password,
        email: values.email,
        role: values.role,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    Modal.success({
      title: "Create successed",
    });
    form.resetFields();
  } catch (error) {
  } finally {
    dispatch(loadingDone());
  }
};

export const updateUser = (accessToken, userUpdate, userIdUpdate) => async (dispatch) => {
  dispatch(loading());
  try {
    const { data } = await axios.patch(`/v1/users/${userIdUpdate}`, userUpdate, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(updateUserSuccess(data));
    Modal.success({
      title: "Update user successed",
    });
  } catch (error) {
    Modal.error({
      title: "Update user failed",
    });
  } finally {
    dispatch(loadingDone());
  }
};

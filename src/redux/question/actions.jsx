import "antd/dist/antd.css";
import { Modal } from "antd";
import axios from "../../api/axios";
import { getQuestionSuccess, getQuestionAdminSuccess, updateQuestionSuccess } from "./reducer";

import { loading, loadingDone } from "../auth/reducer";

export const getQuestion = (accessToken, amount) => async (dispatch) => {
  dispatch(loading());
  try {
    const { data } = await axios.get(`/v1/questions?limit=${amount}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getQuestionSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Error getting questions",
    });
  } finally {
    dispatch(loadingDone());
  }
};

export const getQuestionsAdmin = (accessToken) => async (dispatch) => {
  dispatch(loading());
  try {
    const { data } = await axios.get("/v1/questions/edit?limit=500", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getQuestionAdminSuccess(data.results));
  } catch (error) {
    Modal.error({
      title: "Get question by admin failed",
    });
  } finally {
    dispatch(loadingDone());
  }
};

export const updateQuestion =
  (accessToken, questionUpdate, questionIdUpdate) => async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.patch(`/v1/questions/eidt/${questionIdUpdate}`, questionUpdate, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(updateQuestionSuccess(data));
      Modal.success({
        title: "Update question successed",
      });
    } catch (error) {
      Modal.error({
        title: "Update question failed",
      });
    } finally {
      dispatch(loadingDone());
    }
  };

export const createQuestion = (values, accessToken, form) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.post(
      "/v1/questions/edit",
      {
        question: values.question,
        answer1: values.answer1,
        answer2: values.answer2,
        answer3: values.answer3,
        answer4: values.answer4,
        correctanswer: values.correctanswer,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    Modal.success({
      title: "Create question successed",
    });
  } catch (error) {
  } finally {
    dispatch(loadingDone());
  }
};

export const deleteQuestion = (key, accessToken) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.delete(`/v1/questions/edit/${key}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    Modal.success({
      title: "Delete question successed",
    });
  } catch (error) {
    Modal.error({
      title: "Delete question failed",
    });
  } finally {
    dispatch(loadingDone());
  }
};

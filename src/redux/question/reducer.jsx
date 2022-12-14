import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    amount: 6,
    maxQuestions: 1000,
    questionsAdmin: [],
  },
  reducers: {
    getQuestionSuccess: (state, action) => {
      state.questions = action.payload.results;
      state.maxQuestions = action.payload.totalResults;
    },
    changeAmount: (state, action) => {
      state.amount = action.payload;
    },
    getQuestionAdminSuccess: (state, action) => {
      state.questionsAdmin = action.payload;
    },
    updateQuestionSuccess: (state, action) => {
      state.questionsAdmin.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return state.questionsAdmin;
      });
    },
  },
});

export const { getQuestionSuccess, changeAmount, getQuestionAdminSuccess, updateQuestionSuccess } =
  questionSlice.actions;

export default questionSlice.reducer;

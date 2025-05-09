import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IGameState,
  ISubmitGameRequest,
  RootState,
  AppDispatch,
} from "../utils/type";
import { toast } from "react-toastify";
import { Common } from "../utils/Common";
import { submitGameAction } from "./GameActions";

const initialState: IGameState = {
  msisdn: "",
  status: false,
  quiz: null,
  answer: "",
  error: "",
  secondsRemaining: 0,
  timerRunning: false,
};
export const submitQuiz = createAsyncThunk<
  string, // Return type of the payload creator
  void, // First argument to the payload creator
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("game/submitQuiz", async function (_, { getState, rejectWithValue }) {
  try {
    const state = getState();
    console.log(state);
    const payload: ISubmitGameRequest = {
      answer: state.game.answer,
      duration: state.game.secondsRemaining,
    };
    const response = await submitGameAction(payload);
    console.log(response.statusDescription);
    return response.statusDescription;
  } catch (error) {
    console.log(error);
    toast.error(Common.formatError(error));
    return rejectWithValue(Common.formatError(error));
  }
});

/*export const submitQuiz = createAsyncThunk<
  // Return type of the payload creator
  QuizResult,
  // First argument to the payload creator
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: MyKnownError;
  }
>("game/submitQuiz", async (_, { rejectWithValue }) => {
  const state = getState();
  const payload: ISubmitGameRequest = state.quiz.data;
  try {
    const response = await submitPlay(payload);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(Common.formatError(error));
    return rejectWithValue(Common.formatError(error));
  }
});*/
const gamingSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setMsisdn(state, action) {
      console.log(action);
      state.msisdn = action.payload;
    },
    setAnswer(state, action) {
      console.log(action);
      state.answer = state.answer.concat(action.payload);
    },
    removeAnswer(state) {
      if (state.answer.length > 0) state.answer = state.answer.slice(0, -1);
    },
    setQuiz(state, action) {
      console.log(action);
      state.quiz = action.payload;
      state.secondsRemaining = action.payload.duration;
      state.timerRunning = true;
    },
    setError(state, action) {
      console.log(action);
      state.error = action.payload;
    },
    setTimer(state) {
      console.log(state);
      state.secondsRemaining = state.secondsRemaining - 1;
    },
    setCurrentTime(state, action) {
      state.secondsRemaining = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(submitQuiz.pending, (state) => {
        state.status = true;
        state.error = "";
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.status = false;
        state.error = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        console.log(action);
        state.error = action.error.message ?? "";
        state.status = false;
      }),
});

export const {
  setMsisdn,
  setAnswer,
  setQuiz,
  removeAnswer,
  setError,
  setTimer,
  reset,
} = gamingSlice.actions;
export default gamingSlice.reducer;

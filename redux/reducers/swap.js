import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../services";

export const swapOut = createAsyncThunk(
  "swap/swapOut",
  async ({ token, from, to, first = true }, { rejectWithValue, getState }) => {
    try {
      const {
        swap: { input, output },
      } = getState();
      const response = await fetch(`${BASE_URL}/user/swap-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          amount: first ? input : output,
          from,
          to,
        }),
      });
      const data = await response.json();
      if (response.status === 200 || response.status === 304) {
        return { data, first };
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const swapPost = createAsyncThunk(
  "swap/swapPost",
  async ({ token, from, to, address }, { rejectWithValue, getState }) => {
    try {
      const {
        swap: { input },
      } = getState();
      const response = await fetch(`${BASE_URL}/user/swap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          amount: input,
          from,
          to,
          address,
        }),
      });
      const data = await response.json();
      if (response.status === 200 || response.status === 304) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const getDollarsWithHSR = createAsyncThunk(
  "swap/getDollarsWithHSR",
  async ({ token, amount, type }, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(`${BASE_URL}/transaction/HSR-amount-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          type,
        }),
      });
      const data = await response.json();
      if (response.status === 200 || response.status === 304) {
        return data;
      }
      return rejectWithValue(data?.msg);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const swapSlice = createSlice({
  name: "swap",
  initialState: {
    isFetching: false,
    isError: false,
    success: false,
    currentCoin: null,
    coins: [],
    errorMessage: "",
    isTransfered: false,
    output: "0",
    input: "0",
    swapError: false,
    dollarValue: "0",
    hsrValue: "0",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      state.isTransfered = false;
      state.output = "0";
      state.input = "0";
      state.swapError = false;
      state.dollarValue = "0";
      state.hsrValue = "0";
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
  },
  extraReducers: {
    [swapOut.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.success = false;
    },
    [swapOut.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.input = Number(
        payload.first
          ? payload?.data?.amountIn || 0
          : payload?.data?.amountOut || 0
      ).toFixed(4);
      state.output = Number(
        payload.first
          ? payload?.data?.amountOut || 0
          : payload?.data?.amountIn || 0
      ).toFixed(4);
      state.success = true;
      state.isError = false;
    },
    [swapOut.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.success = false;
    },
    [swapPost.pending]: (state) => {
      state.isFetching = true;
      state.swapError = false;
      state.success = false;
    },
    [swapPost.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isTransfered = true;
      state.success = true;
      state.swapError = false;
    },
    [swapPost.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.swapError = true;
      state.errorMessage = payload;
      state.success = false;
    },
    [getDollarsWithHSR.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.success = false;
    },
    [getDollarsWithHSR.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      state.success = true;
      state.dollarValue = payload.value_in_cent/100;
      state.hsrValue = payload.HSR/1000000000000000000;
    },
    [getDollarsWithHSR.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.success = false;
    }
  },
});

export const { clearState, setOutput, setInput } = swapSlice.actions;

export const swapSelector = (state) => state.swap;

export default swapSlice.reducer;

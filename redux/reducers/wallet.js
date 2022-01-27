import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BASE_URL } from "../services";

export const getWallet = createAsyncThunk(
  "wallet/getWallet",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

export const getCoins = createAsyncThunk(
  "wallet/getCoins",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/coin/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        return data;
      }
      return rejectWithValue(data?.msg);
    } catch (e) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const sendTransaction = createAsyncThunk(
  "wallet/sendTransaction",
  async (
    { token, receiver_acc_id, sender_acc_id, value, coin_id },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/user/transfer-balance?receiver_acc_id=${receiver_acc_id}&sender_acc_id=${sender_acc_id}&value=${value}&coin_id=${coin_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        return data;
      }
      return rejectWithValue(data?.msg);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getTransactionHistory = createAsyncThunk(
  "wallet/getTransactionHistory",
  async ({ token, limit }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/transaction/?offset=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        return data;
      }
      return rejectWithValue(data?.msg);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallet: [],
    isFetching: true,
    isError: false,
    success: false,
    currentCoin: null,
    coins: [],
    errorMessage: "",
    public_key: null,
    verified: false,
    isTransfered: false,
    transactions: [],
    total: 0,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      state.isTransfered = false;
      return state;
    },
    setCurrentCoin: (state, action) => {
      state.currentCoin = action.payload;
    },
    setVerify: (state, action) => {
      state.verified = action.payload;
    },
  },
  extraReducers: {
    [getWallet.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.success = false;
    },
    [getWallet.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.wallet = payload.accounts;
      state.total = payload.sum_dollar_value;
      state.success = true;
      state.isError = false;
    },
    [getWallet.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.success = false;
    },
    [getCoins.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.success = false;
    },
    [getCoins.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.coins = payload;
      state.success = true;
      state.isError = false;
    },
    [getCoins.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.success = false;
    },
    [sendTransaction.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.success = false;
    },
    [sendTransaction.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.success = true;
      state.isError = false;
      state.isTransfered = true;
    },
    [sendTransaction.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.success = false;
    },
    [getTransactionHistory.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.success = false;
    },
    [getTransactionHistory.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.transactions = [...state.transactions, ...payload];
      state.success = true;
      state.isError = false;
    },
    [getTransactionHistory.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.success = false;
    },
  },
});

export const { clearState, setCurrentCoin, setVerify } = walletSlice.actions;

export const walletSelector = (state) => state.wallet;

export default walletSlice.reducer;

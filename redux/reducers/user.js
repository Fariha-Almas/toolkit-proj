import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import { BASE_URL } from "../services";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ first_name, last_name, phone }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}user/sign-up`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          phone,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      console.warn("Error", e.response.data);
      return rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}user/signup-login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
        }),
      });
      let data = await response.json();
      console.warn("response", data);
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      console.warn("Error", e.response.data);
      rejectWithValue(e.response.data);
    }
  }
);
export const resendCode = createAsyncThunk(
  "user/resendCode",
  async (user, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;
      let id = user?.id;
      const response = await fetch(`${BASE_URL}user/resend-sms-code`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      let data = await response.json();
      console.warn("response", data);
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      console.warn("Error", e);
      rejectWithValue(e.response.data);
    }
  }
);

// verifyCode
export const verifyCode = createAsyncThunk(
  "user/verifyCode",
  async (code, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;
      let id = user?.id;
      const response = await fetch(`${BASE_URL}user/verify-account`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          code,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);
export const verifyLogin = createAsyncThunk(
  "user/verifyCode",
  async (code, { rejectWithValue, getState }) => {
    const { user } = getState().user;
    let id = user?.id;
    try {
      const response = await fetch(`${BASE_URL}user/verify-signup-login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          code,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      console.warn("Error", e.response.data);
      rejectWithValue(e.response.data);
    }
  }
);

export const imageUpload = createAsyncThunk(
  "user/imageUpload",
  async (result, { rejectWithValue, getState }) => {
    const {
      user: { token },
    } = getState();
    const formData = new FormData();
    const imagePart = result.uri.split(".");
    const imageType = imagePart[imagePart.length - 1];
    formData.append("image", {
      uri:
        Platform.OS === "ios" ? result.uri.replace("file://", "") : result.uri,
      type: `image/${imageType}`,
      name: new Date().toString(),
    });
    try {
      const response = await fetch(`${BASE_URL}user/upload-image`, {
        method: "POST",
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          timeout: 150000,
        },
        body: formData,
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ display_name, profile_pic }, { rejectWithValue, getState }) => {
    const {
      user: { token },
    } = getState();
    try {
      const response = await fetch(`${BASE_URL}user/user-profile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name,
          profile_pic,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);
export const enable2FA = createAsyncThunk(
  "user/enable2FA",
  async ({ value }, { rejectWithValue, getState }) => {
    const {
      user: { token },
    } = getState();
    try {
      const response = await fetch(
        `${BASE_URL}user/two-factor-authentication`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            twoFA: value.toString(),
          }),
        }
      );
      // alert(JSON.stringify(response, null, 2));
      let data = await response.json();
      // alert(JSON.stringify(data, null, 2));
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const verify2FA = createAsyncThunk(
  "user/verify2FA",
  async ({ id, code }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}user/verify-2fa`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          token: code,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstRun: true,
    user: "",
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
    isVerified: false,
    mPinEnabled: false,
    fingerPrint: false,
    faceId: false,
    mPin: "",
    freshLogin: true,
    updated: false
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      return state;
    },
    logout: (state) => {
      return {
        firstRun: false,
        user: "",
        token: "",
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
        isVerified: false,
        mPinEnabled: false,
        fingerPrint: false,
        faceId: false,
        mPin: "",
        freshLogin: true,
      };
    },
    enablePin: (state, { payload }) => {
      state.mPinEnabled = true;
      state.fingerPrint = false;
      state.faceId = false;
      state.mPin = payload;
    },
    disablePin: (state) => {
      state.mPinEnabled = false;
      state.mPin = "";
    },
    enableFingerPrint: (state) => {
      state.fingerPrint = true;
      state.faceId = false;
      state.mPinEnabled = false;
      state.mPin = "";
    },
    disableFingerPrint: (state) => {
      state.fingerPrint = false;
    },
    enableFaceId: (state) => {
      state.faceId = true;
      state.fingerPrint = false;
      state.mPinEnabled = false;
      state.mPin = "";
    },
    disableFaceId: (state) => {
      state.faceId = false;
    },
    changeFirstRun: (state) => {
      state.firstRun = false;
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.warn("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.successMessage = payload.msg;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = payload.msg;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.warn("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [verifyCode.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isVerified = true;
      state.user = payload.user;
      state.token = payload.token;
    },
    [verifyCode.pending]: (state) => {
      state.isFetching = true;
    },
    [verifyCode.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [verifyLogin.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.token = payload.token;
    },
    [verifyLogin.pending]: (state) => {
      state.isFetching = true;
    },
    [verifyLogin.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [resendCode.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [resendCode.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [resendCode.pending]: (state) => {
      state.isFetching = true;
    },
    [updateProfile.pending]: (state) => {
      state.isFetching = true;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.freshLogin = false;
    },
    [updateProfile.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [enable2FA.pending]: (state) => {
      state.isFetching = true;
    },
    [enable2FA.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
    },
    [enable2FA.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [verify2FA.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [verify2FA.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.token = payload.token;
    },
    [verify2FA.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.isSuccess = false;
    },
    [imageUpload.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    [imageUpload.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user.profile_pic = payload.url;
    },
    [imageUpload.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.isSuccess = false;
    },
  },
});

export const {
  clearState,
  logout,
  enablePin,
  disablePin,
  enableFingerPrint,
  disableFingerPrint,
  enableFaceId,
  disableFaceId,
  changeFirstRun,
  updateUser,
} = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;

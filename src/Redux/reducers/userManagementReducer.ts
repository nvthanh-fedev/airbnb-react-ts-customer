import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getStoreJson,
  setStoreJson,
  USER_LOGIN,
  http,
} from "../../utils/config";
import { SignInForm } from "../../Pages/Auth/SignIn/SignIn";
import { RoomBooked } from "./roomBookedManagementReducer";
import { RootState } from "../configStore";
import { AxiosRequestConfig } from "axios";
import { message } from "antd";
import { setShowDrawer } from "./uiManagementReducer";

const initStateUserSignIn = () => {
  let userLoginInit: UserSignInApi = {
    user: {
      id: 0,
      name: "",
      birthday: "",
      phone: "",
      avatar: "",
      email: "",
      gender: false,
      role: "",
    },
    token: "",
    tokenCybersoft: "",
  };

  if (getStoreJson(USER_LOGIN)) {
    userLoginInit = getStoreJson(USER_LOGIN);
  }

  return userLoginInit;
};

const initStateUser = () => {
  let userLoginInit: User = {
    id: 0,
    name: "",
    birthday: "",
    phone: "",
    avatar: "",
    email: "",
    gender: false,
    role: "",
  };

  if (getStoreJson(USER_LOGIN)) {
    userLoginInit = getStoreJson(USER_LOGIN).user;
  }

  return userLoginInit;
};

export interface User {
  id: number;
  name: string;
  birthday: string;
  phone: string;
  avatar: string;
  email: string;
  gender: boolean;
  role: string;
}

export interface UserSignInApi {
  user: User;
  token: string;
  tokenCybersoft: string;
}

export interface UserManagementState {
  userSignIn: UserSignInApi | undefined;
  isLoading: boolean;
  isLoadingListRoomBookedsByUserId: boolean;
  isShowModal: boolean;
  users: User[] | undefined;
  user: User | undefined;
  listRoomBookedsByUserId: RoomBooked[] | undefined;
}

const initialState: UserManagementState = {
  userSignIn: initStateUserSignIn(),
  isLoading: false,
  isLoadingListRoomBookedsByUserId: false,
  isShowModal: false,
  users: undefined,
  user: initStateUser(),
  listRoomBookedsByUserId: undefined,
};

const userManagementReducer = createSlice({
  name: "userManagementReducer",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setLoadingListRoomBookedsByUserId: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoadingListRoomBookedsByUserId = action.payload;
    },

    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.isShowModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsyncAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInAsyncAction.fulfilled, (state, action) => {
        state.userSignIn = action.payload;
        state.isLoading = false;
        message.success("Đăng nhập thành công!");
      })
      .addCase(signInAsyncAction.rejected, (state) => {
        state.isLoading = false;
        message.error("Đăng nhập thất bại!");
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUserByIdAction.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getListRoomBookedByUserIdAction.fulfilled, (state, action) => {
        state.listRoomBookedsByUserId = action.payload;
      })
      .addCase(uploadAvatarAction.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar = action.payload.content.avatar;
        }
        message.success("Cập nhật ảnh đại diện thành công!");
      })
      .addCase(uploadAvatarAction.rejected, (state) => {
        message.error("Ảnh không hợp lệ!");
      });
  },
});

export const signInAsyncAction = createAsyncThunk(
  "signInAsyncAction",
  async (userSignIn: SignInForm, { dispatch }) => {
    try {
      const res = await http.post("/api/auth/signin", userSignIn);
      setStoreJson(USER_LOGIN, res.data.content);
      await dispatch(getUserByIdAction(res.data.content.user.id));
      await dispatch(getListRoomBookedByUserIdAction(res.data.content.user.id));
      setStoreJson(USER_LOGIN, res.data.content);
      dispatch(setShowDrawer(false));
      return res.data.content;
    } catch (err) {
      throw err;
    }
  }
);

export const getUserAction = createAsyncThunk("getUserAction", async () => {
  try {
    const res = await http.get("/api/users");
    return res.data.content;
  } catch (err) {
    throw err;
  }
});

export const signUpAsyncAction = (userFrm: User) => {
  return async (dispatch: any) => {
    const res = await http.post("/api/auth/signup", userFrm);
    try {
      await dispatch(getUserAction());
      console.log(res);
      message.success("Đăng ký thành công!");
      dispatch(setShowDrawer(false));
    } catch (err) {
      message.error("Đăng ký thất bại !");
    }
  };
};

export const updateUserAsyncAction = (userFrm: User, userId: number) => {
  return async (dispatch: any) => {
    const res = await http.put(`/api/users/${userId}`, userFrm);
    await dispatch(getUserByIdAction(userFrm.id));
    await dispatch(getUserAction());
    console.log(res);
  };
};

export const getUserByIdAction = createAsyncThunk(
  "getUserByIdAction",
  async (userId: number, { dispatch }) => {
    const strApi = `/api/users/${userId}`;
    try {
      dispatch(setLoading(true));
      const res = await http.get(strApi);
      dispatch(setLoading(false));
      return res.data.content;
    } catch (err) {
      throw err;
    }
  }
);

export const getListRoomBookedByUserIdAction = createAsyncThunk(
  "getListRoomBookedByUserIdAction",
  async (userId: number, { dispatch }) => {
    try {
      dispatch(setLoadingListRoomBookedsByUserId(true));
      const strApi = `/api/dat-phong/lay-theo-nguoi-dung/${userId}`;
      const res = await http.get(strApi);
      dispatch(setLoadingListRoomBookedsByUserId(false));
      return res.data.content;
    } catch (err) {
      throw err;
    }
  }
);

type FormData = {
  append: (name: string, value: any) => void;
};

type UploadAvatarResponse = {
  content: any;
};

export const uploadAvatarAction = createAsyncThunk<
  UploadAvatarResponse,
  FormData
>("uploadAvatarAction", async (formData: FormData, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.userManagementReducer.userSignIn?.token;
  const tokenCybersoft = state.userManagementReducer.userSignIn?.tokenCybersoft;
  const strApi = `/api/users/upload-avatar`;

  const config: AxiosRequestConfig = {
    headers: {
      token: `${token}`,
      tokenCybersoft: `${tokenCybersoft}`,
    },
  };

  try {
    const response = await http.post<UploadAvatarResponse>(
      strApi,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteUserByIdAction = (userId: number) => {
  return async (dispatch: any) => {
    const strApi = `/api/users?id=${userId}`;
    try {
      const res = await http.delete(strApi);
      dispatch(deleteUserByIdSuccess(res.data.content));
      await dispatch(getUserAction());
    } catch (err) {
      dispatch(deleteUserByIdFailure(err));
    }
  };
};

const deleteUserByIdSuccess = (data: any) => {
  return {
    type: "DELETE_USER_BY_ID_SUCCESS",
    payload: data,
  };
};

const deleteUserByIdFailure = (error: any) => {
  return {
    type: "DELETE_USER_BY_ID_FAILURE",
    payload: error,
  };
};

export const { setShowModal, setLoading, setLoadingListRoomBookedsByUserId } =
  userManagementReducer.actions;

export default userManagementReducer.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../utils/config";
import { AxiosRequestConfig } from "axios";
import { RootState } from "../configStore";
import { message } from "antd";

export interface Comment {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

export interface CommentsRoom {
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  tenNguoiBinhLuan: string;
  avatar: string;
}

export interface CommentManagementState {
  isLoadingComment: boolean;
  isShowModal: boolean;
  comments: Comment[] | undefined;
  comment: Comment | undefined;
  commentsRoom: CommentsRoom[] | undefined;
}

const initialState: CommentManagementState = {
  isLoadingComment: false,
  isShowModal: false,
  comments: undefined,
  comment: undefined,
  commentsRoom: undefined,
};

const commentManagementReducer = createSlice({
  name: "commentManagementReducer",
  initialState,
  reducers: {
    updateComment: (state, action: PayloadAction<Comment>) => {
      state.comment = action.payload;
    },
    updateComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setLoadingComment: (state, action: PayloadAction<boolean>) => {
      state.isLoadingComment = action.payload;
    },

    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.isShowModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getCommentByIdAction.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(getCommentByRoomIdAction.fulfilled, (state, action) => {
        state.commentsRoom = action.payload;
      });
  },
});

export const getCommentAction = createAsyncThunk(
  "getCommentAction",
  async () => {
    try {
      const res = await http.get("/api/binh-luan");
      return res.data.content;
    } catch (err) {
      throw err;
    }
  }
);

export const addCommentAction = (roomFrm: Comment) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/binh-luan`;
      const state = getState() as RootState;
      const token = state.userManagementReducer.userSignIn?.token;
      const tokenCybersoft =
        state.userManagementReducer.userSignIn?.tokenCybersoft;
      const config: AxiosRequestConfig = {
        headers: {
          token: `${token}`,
          tokenCybersoft: `${tokenCybersoft}`,
        },
      };
      const res = await http.post(strApi, roomFrm, config);
      console.log(res);
      message.success("Đăng bài đánh giá thành công!");
      await dispatch(getCommentAction());
    } catch (err) {
      message.error("Đăng bài đánh giá thất bại!");
    }
  };
};

export const updateCommentAction = (commentFrm: Comment, commentId: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/binh-luan/${commentId}`;
      const state = getState() as RootState;
      const token = state.userManagementReducer.userSignIn?.token;
      const tokenCybersoft =
        state.userManagementReducer.userSignIn?.tokenCybersoft;
      const config: AxiosRequestConfig = {
        headers: {
          token: `${token}`,
          tokenCybersoft: `${tokenCybersoft}`,
        },
      };
      const res = await http.put(strApi, commentFrm, config);
      console.log(res);
      await dispatch(getCommentAction());
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCommentByIdAction = createAsyncThunk(
  "getCommentByIdAction",
  async (commentId: number, { dispatch }) => {
    const strApi = `/api/binh-luan/${commentId}`;
    try {
      dispatch(setLoadingComment(true));
      const res = await http.get(strApi);
      dispatch(setLoadingComment(false));
      return res.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const getCommentByRoomIdAction = createAsyncThunk(
  "getCommentByRoomIdAction",
  async (roomId: number, { dispatch }) => {
    const strApi = `/api/binh-luan/lay-binh-luan-theo-phong/${roomId}`;
    try {
      dispatch(setLoadingComment(true));
      const res = await http.get(strApi);
      dispatch(setLoadingComment(false));
      return res.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const deleteCommentByIdAction = (commentId: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/binh-luan/${commentId}`;
      const state = getState() as RootState;
      const token = state.userManagementReducer.userSignIn?.token;
      const tokenCybersoft =
        state.userManagementReducer.userSignIn?.tokenCybersoft;
      const config: AxiosRequestConfig = {
        headers: {
          token: `${token}`,
          tokenCybersoft: `${tokenCybersoft}`,
        },
      };
      const res = await http.delete(strApi, config);
      dispatch(deleteCommentByIdSuccess(res.data.content));
      await dispatch(getCommentAction());
    } catch (err) {
      console.log(err);
      dispatch(deleteCommentByIdFailure(err));
    }
  };
};

const deleteCommentByIdSuccess = (data: any) => {
  return {
    type: "DELETE_USER_BY_ID_SUCCESS",
    payload: data,
  };
};

const deleteCommentByIdFailure = (error: any) => {
  return {
    type: "DELETE_USER_BY_ID_FAILURE",
    payload: error,
  };
};

export const { setShowModal, setLoadingComment } =
  commentManagementReducer.actions;

export default commentManagementReducer.reducer;

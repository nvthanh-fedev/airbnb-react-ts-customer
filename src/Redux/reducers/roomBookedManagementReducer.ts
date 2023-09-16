import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../utils/config";
import { AxiosRequestConfig } from "axios";
import { RootState } from "../configStore";
import { Room } from "./roomManagementReducer";
import { history } from "../../index";

export interface RoomBooked {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

export interface RoomBookedManagementState {
  isLoading: boolean;
  isShowModal: boolean;
  roomBookeds: RoomBooked[] | undefined;
  roomBooked: RoomBooked | undefined;
}

const initialState: RoomBookedManagementState = {
  isLoading: false,
  isShowModal: false,
  roomBookeds: undefined,
  roomBooked: undefined,
};

export interface RoomBookedDetail extends Room {
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

const roomBookedManagementReducer = createSlice({
  name: "roomBookedManagementReducer",
  initialState,
  reducers: {
    updateRoomBooked: (state, action: PayloadAction<RoomBooked>) => {
      state.roomBooked = action.payload;
    },
    updateRoomBookeds: (state, action: PayloadAction<RoomBooked[]>) => {
      state.roomBookeds = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.isShowModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomBookedAction.fulfilled, (state, action) => {
        state.roomBookeds = action.payload;
      })
      .addCase(getRoomBookedByIdAction.fulfilled, (state, action) => {
        state.roomBooked = action.payload;
      });
  },
});

export const getRoomBookedAction = createAsyncThunk(
  "getRoomBookedAction",
  async () => {
    try {
      const res = await http.get("/api/dat-phong");
      return res.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const addRoomBookedAction = (roomFrm: RoomBooked) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/dat-phong`;
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
      await dispatch(getRoomBookedAction());

      history.push("/bookingsuccess");
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateRoomBookedAction = (
  roomBookedFrm: RoomBooked,
  roomBookedId: number
) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/dat-phong/${roomBookedId}`;
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
      const res = await http.put(strApi, roomBookedFrm, config);
      console.log(res);
      await dispatch(getRoomBookedAction());
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRoomBookedByIdAction = createAsyncThunk(
  "getRoomBookedByIdAction",
  async (roomBookedId: number) => {
    const strApi = `/api/dat-phong/${roomBookedId}`;
    try {
      const res = await http.get(strApi);
      return res.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const deleteRoomBookedByIdAction = (roomBookedId: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/dat-phong/${roomBookedId}`;
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
      dispatch(deleteRoomBookedByIdSuccess(res.data.content));
      await dispatch(getRoomBookedAction());
    } catch (err) {
      console.log(err);
      dispatch(deleteRoomBookedByIdFailure(err));
    }
  };
};

const deleteRoomBookedByIdSuccess = (data: any) => {
  return {
    type: "DELETE_USER_BY_ID_SUCCESS",
    payload: data,
  };
};

const deleteRoomBookedByIdFailure = (error: any) => {
  return {
    type: "DELETE_USER_BY_ID_FAILURE",
    payload: error,
  };
};

export const { setShowModal } = roomBookedManagementReducer.actions;

export default roomBookedManagementReducer.reducer;

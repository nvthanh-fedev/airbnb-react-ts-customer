import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../utils/config";
import { AxiosRequestConfig } from "axios";
import { RootState } from "../configStore";
import { setModeDetail } from "./uiManagementReducer";

export interface Room {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

export interface RoomManagementState {
  isLoading: boolean;
  isShowModal: boolean;
  rooms: Room[] | undefined;
  room: Room | undefined;
}

const initialState: RoomManagementState = {
  isLoading: false,
  isShowModal: false,
  rooms: undefined,
  room: undefined,
};

export const getRoomAction = createAsyncThunk(
  "getDataAllRoomAsyncAction",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await http.get("/api/phong-thue");
      dispatch(setLoading(false));
      return res.data.content;
    } catch (err) {
      throw err;
    }
  }
);

export const getRoomByIdAction = createAsyncThunk(
  "getRoomByIdAction",
  async (roomId: number, { dispatch }) => {
    const strApi = `/api/phong-thue/${roomId}`;
    try {
      dispatch(setLoading(true));
      const res = await http.get(strApi);
      dispatch(setLoading(false));
      dispatch(setModeDetail(true));
      return res.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const getRoomByLocationIdAction = createAsyncThunk(
  "getRoomByLocationIdAction",
  async (lodationId: number, { dispatch }) => {
    const strApi = `/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${lodationId}`;
    try {
      dispatch(setLoading(true));
      const res = await http.get(strApi);
      dispatch(setLoading(false));
      return res.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const addNewRoomAsyncAction = (roomFrm: Room) => {
  return async (dispatch: any) => {
    const res = await http.post("/api/rooms", roomFrm);
    await dispatch(getRoomByIdAction(roomFrm.id));
    dispatch(getRoomAction());
    console.log(res);
  };
};

export const updateRoomAsyncAction = (roomFrm: Room, roomId: number) => {
  return async (dispatch: any) => {
    const res = await http.put(`/api/phong-thue/${roomId}`, roomFrm);
    await dispatch(getRoomByIdAction(roomFrm.id));
    dispatch(getRoomAction());
    console.log(res);
  };
};

export const addRoomAction = (roomFrm: Room) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/phong-thue`;
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
      dispatch(getRoomAction());
    } catch (err) {
      console.log(err);
    }
  };
};

export const uploadRoomImageAction = (formFile: File, maPhong: number) => {
  console.log("uploadRoomImageAction");

  return async (dispatch: any, getState: any) => {
    try {
      const state = getState() as RootState;
      const token = state.userManagementReducer.userSignIn?.token;
      const tokenCybersoft =
        state.userManagementReducer.userSignIn?.tokenCybersoft;

      const strApi = `/api/phong-thue/upload-hinh-phong?maPhong=${maPhong}`;
      console.log(
        "🚀 ~ file: roomManagementReducer.ts:160 ~ return ~ strApi:",
        strApi
      );

      const config: AxiosRequestConfig = {
        headers: {
          token: `${token}`,
          tokenCybersoft: `${tokenCybersoft}`,
        },
      };

      const formData = new FormData();
      formData.append("formFile", formFile);
      const res = await http.post(strApi, formData, config);
      console.log(res);
      dispatch(getRoomAction());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteRoomByIdAction = (roomId: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/phong-thue/${roomId}`;
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
      dispatch(deleteRoomByIdSuccess(res.data.content));
      dispatch(getRoomAction());
    } catch (err) {
      console.log(err);
      dispatch(deleteRoomByIdFailure(err));
    }
  };
};

const deleteRoomByIdSuccess = (data: any) => {
  return {
    type: "DELETE_USER_BY_ID_SUCCESS",
    payload: data,
  };
};

const deleteRoomByIdFailure = (error: any) => {
  return {
    type: "DELETE_USER_BY_ID_FAILURE",
    payload: error,
  };
};

const roomManagementReducer = createSlice({
  name: "roomManagement",
  initialState,
  reducers: {
    updateRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
    updateRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
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
      .addCase(getRoomAction.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })

      .addCase(getRoomByLocationIdAction.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })

      .addCase(getRoomByIdAction.fulfilled, (state, action) => {
        state.room = action.payload;
      });
  },
});

export const { updateRoom, updateRooms, setLoading, setShowModal } =
  roomManagementReducer.actions;

export default roomManagementReducer.reducer;

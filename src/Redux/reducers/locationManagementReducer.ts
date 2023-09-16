import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../utils/config";
import { AxiosRequestConfig } from "axios";
import { RootState } from "../configStore";

export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface LocationManagementState {
  isLoadingLocation: boolean;
  isShowModal: boolean;
  locations: Location[] | undefined;
  location: Location | undefined;
}

const initialState: LocationManagementState = {
  isLoadingLocation: false,
  isShowModal: false,
  locations: undefined,
  location: undefined,
};

const locationManagementReducer = createSlice({
  name: "locationManagementReducer",
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    updateLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingLocation = action.payload;
    },

    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.isShowModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationAction.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(getLocationByIdAction.fulfilled, (state, action) => {
        state.location = action.payload;
      });
  },
});

export const getLocationAction = createAsyncThunk(
  "getLocationAction",
  async () => {
    try {
      const res = await http.get("/api/vi-tri");
      return res.data.content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
export const addLocationAction = (roomFrm: Location) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/vi-tri`;
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
      await dispatch(getLocationAction());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateLocationAction = (
  locationFrm: Location,
  locationId: number
) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/vi-tri/${locationId}`;
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
      const res = await http.put(strApi, locationFrm, config);
      console.log(res);
      await dispatch(getLocationAction());
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLocationByIdAction = createAsyncThunk(
  "getLocationByIdAction",
  async (locationId: number, { dispatch }) => {
    const strApi = `/api/vi-tri/${locationId}`;
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

export const deleteLocationByIdAction = (locationId: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      const strApi = `/api/vi-tri/${locationId}`;
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
      dispatch(deleteLocationByIdSuccess(res.data.content));
      await dispatch(getLocationAction());
    } catch (err) {
      console.log(err);
      dispatch(deleteLocationByIdFailure(err));
    }
  };
};

const deleteLocationByIdSuccess = (data: any) => {
  return {
    type: "DELETE_USER_BY_ID_SUCCESS",
    payload: data,
  };
};

const deleteLocationByIdFailure = (error: any) => {
  return {
    type: "DELETE_USER_BY_ID_FAILURE",
    payload: error,
  };
};

export const { setShowModal, setLoading } = locationManagementReducer.actions;

export default locationManagementReducer.reducer;

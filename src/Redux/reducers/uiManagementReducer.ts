import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoreJson, USER_LOGIN } from "../../utils/config";

const initStateUserLogged = () => {
  if (getStoreJson(USER_LOGIN)) {
    return true;
  }
  return false;
};

export interface UiManagementState {
  daysBetweenDates: number;
  isSearchDetail: boolean;
  isShowDrawer: boolean;

  titleDrawer: string;
  isSignIn: boolean;
  isModeProfile: boolean;
  isModeDetail: boolean;
  startDay: string;
  endDay: string;
  titleBooking: string;
  selectedUtility: { [key: string]: boolean };
  modeDrawer: string;
}

const initialState: UiManagementState = {
  daysBetweenDates: 0,
  isSearchDetail: false,
  isShowDrawer: false,
  titleDrawer: "",
  isSignIn: initStateUserLogged(),
  isModeProfile: false,
  isModeDetail: false,
  startDay: "",
  endDay: "",
  titleBooking: "Chọn ngày nhận phòng",
  selectedUtility: {},
  modeDrawer: "signIn",
};

const uiManagementReducer = createSlice({
  name: "uiManagementReducer",
  initialState,
  reducers: {
    setDaysBetweenDates: (state, action: PayloadAction<number>) => {
      state.daysBetweenDates = action.payload;
    },
    setShowSearchDetail: (state, action: PayloadAction<boolean>) => {
      state.isSearchDetail = action.payload;
    },
    setIsHome: (state) => {
      state.isModeDetail = false;
      state.isModeProfile = false;
    },
    setShowDrawer: (state, action: PayloadAction<boolean>) => {
      state.isShowDrawer = action.payload;
    },
    setTitleDrawer: (state, action: PayloadAction<string>) => {
      state.titleDrawer = action.payload;
    },
    setIsSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignIn = action.payload;
    },
    setModeProfile: (state, action: PayloadAction<boolean>) => {
      state.isModeProfile = action.payload;
    },
    setModeDetail: (state, action: PayloadAction<boolean>) => {
      state.isModeDetail = action.payload;
    },
    setStartDay: (state, action: PayloadAction<string>) => {
      state.startDay = action.payload;
    },
    setEndDay: (state, action: PayloadAction<string>) => {
      state.endDay = action.payload;
    },
    setTitleBooking: (state, action: PayloadAction<string>) => {
      state.titleBooking = action.payload;
    },
    selectedUtility: (
      state,
      action: PayloadAction<{ [key: string]: boolean }>
    ) => {
      state.selectedUtility = action.payload;
    },
    setModeDrawer: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        window.scrollTo(0, 0);
      }
      state.modeDrawer = action.payload;
    },
  },
});

export const {
  setShowSearchDetail,
  setShowDrawer,
  setTitleDrawer,
  setIsSignIn,
  setModeProfile,
  setModeDetail,
  setStartDay,
  setEndDay,
  setTitleBooking,
  setDaysBetweenDates,
  selectedUtility,
  setModeDrawer,
  setIsHome,
} = uiManagementReducer.actions;

export default uiManagementReducer.reducer;

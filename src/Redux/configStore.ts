import { configureStore } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import uiManagementReducer, {
  UiManagementState,
} from "./reducers/uiManagementReducer";

import userManagementReducer, {
  UserManagementState,
} from "./reducers/userManagementReducer";

import roomManagementReducer, {
  RoomManagementState,
} from "./reducers/roomManagementReducer";

import locationManagementReducer, {
  LocationManagementState,
} from "./reducers/locationManagementReducer";

import roomBookedManagementReducer, {
  RoomBookedManagementState,
} from "./reducers/roomBookedManagementReducer";

import commentManagementReducer, {
  CommentManagementState,
} from "./reducers/commentManagementReducer";

export interface RootState {
  userManagementReducer: UserManagementState;
  roomManagementReducer: RoomManagementState;
  uiManagementReducer: UiManagementState;
  commentManagementReducer: CommentManagementState;
  locationManagementReducer: LocationManagementState;
  roomBookedManagementReducer: RoomBookedManagementState;
}

export const store = configureStore({
  reducer: {
    userManagementReducer: userManagementReducer,
    roomManagementReducer: roomManagementReducer,
    uiManagementReducer: uiManagementReducer,
    commentManagementReducer: commentManagementReducer,
    locationManagementReducer: locationManagementReducer,
    roombookedManagementReducer: roomBookedManagementReducer,
  },
});

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type DispatchType = typeof store.dispatch;

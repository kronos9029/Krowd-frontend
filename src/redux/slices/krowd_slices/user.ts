import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { ListOfUser } from '../../../@types/krowd/user';
import { NotificationDetail, User_Investor } from '../../../@types/krowd/investor';
import { InvestorAPI } from '_apis_/krowd_apis/investor';

// ----------------------------------------------------------------------

type UserState = {
  isLoading: boolean;
  error: boolean;
  UserKrowd: {
    numOfUser: number;
    listOfUser: ListOfUser[];
  };
  UserDetailState: {
    isLoading: boolean;
    UserDetail: User_Investor | null;
    error: boolean;
  };
  NotificationDetailState: {
    isLoading: boolean;
    new: number;
    total: number;
    details: NotificationDetail[];
    error: boolean;
  };
  users: ListOfUser[];
  user: ListOfUser | null;
};

const initialState: UserState = {
  isLoading: false,
  error: false,
  UserKrowd: { numOfUser: 0, listOfUser: [] },
  users: [],
  user: null,
  UserDetailState: {
    isLoading: false,
    UserDetail: null,
    error: false
  },
  NotificationDetailState: {
    isLoading: false,
    new: 0,
    total: 0,
    details: [],
    error: false
  }
};

const slice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.UserKrowd = action.payload;
    },

    //-------------------DETAIL OF USER------------------
    // START LOADING
    startUserKrowdDetailLoading(state) {
      state.UserDetailState.isLoading = true;
    },

    // GET MANAGE USER DETAIL
    getUserKrowdByIdSuccess(state, action) {
      state.UserDetailState.isLoading = false;
      state.UserDetailState.UserDetail = action.payload;
    },
    // HAS ERROR
    hasUserKrowdDetailError(state, action) {
      state.UserDetailState.isLoading = false;
      state.UserDetailState.error = action.payload;
    },
    //-------------------DETAIL OF NOTIFICATION------------------
    // START LOADING
    startNotificationLoading(state) {
      state.NotificationDetailState.isLoading = true;
    },

    // GET MANAGE USER DETAIL
    gettNotificationListSuccess(state, action) {
      state.NotificationDetailState.isLoading = false;
      state.NotificationDetailState = action.payload;
    },
    // HAS ERROR
    hasUsertNotificationError(state, action) {
      state.NotificationDetailState.isLoading = false;
      state.NotificationDetailState.error = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getUserList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/users'
      );
      dispatch(slice.actions.getUserListSuccess(response.data));
      console.log('Users data:', response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getUserKrowdDetail(userID: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await InvestorAPI.get({ id: userID });
      dispatch(slice.actions.getUserKrowdByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getNotification(userId: string, seen: boolean) {
  return async () => {
    dispatch(slice.actions.startNotificationLoading());
    try {
      const response = await InvestorAPI.getNotification({ userId: userId, seen: seen });
      dispatch(slice.actions.gettNotificationListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasUsertNotificationError(error));
    }
  };
}

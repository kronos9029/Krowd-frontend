import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import axios from 'axios';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { REACT_APP_API_URL } from 'config';
import { Business } from '../../../@types/krowd/bussiness';
import { BusinessAPI } from '_apis_/krowd_apis/business';

// ----------------------------------------------------------------------

type BusinessState = {
  isLoading: boolean;
  error: boolean;
  businessLists: {
    isLoadingBusinessLists: boolean;

    numOfBusiness: number;
    listOfBusiness: Business[];
  };

  activeBussinessId: Business | null;
  status: string[];
};

const initialState: BusinessState = {
  isLoading: false,
  error: false,
  activeBussinessId: null,
  businessLists: { isLoadingBusinessLists: false, numOfBusiness: 0, listOfBusiness: [] },

  status: ['Đang hoạt động', 'Ngừng hoạt động', 'Bị khóa']
};

const slice = createSlice({
  name: 'business',
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
    getBusinessListSuccess(state, action) {
      state.businessLists.isLoadingBusinessLists = false;
      state.businessLists = action.payload;
    },

    getBusinessListIDSuccess(state, action) {
      state.isLoading = false;
      state.activeBussinessId = action.payload;
    },
    delBusinessListIDSuccess(state, action) {
      state.businessLists = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

export function getBusinessList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await BusinessAPI.gets();
      dispatch(slice.actions.getBusinessListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import { User_Investor } from '../../../@types/krowd/investor';
import { InvestorAPI } from '_apis_/krowd_apis/investor';

// ----------------------------------------------------------------------

export type User_InvestorState = {
  isLoading: boolean;
  investorKrowdDetail: User_Investor | null;
  error: boolean;
  investorKrowdDetailState: {
    isLoading: boolean;
    investorKrowdDetail: User_Investor | null;
    error: boolean;
  };
};

const initialState: User_InvestorState = {
  isLoading: false,
  investorKrowdDetail: null,
  error: false,
  //DETAILS
  investorKrowdDetailState: {
    isLoading: false,
    investorKrowdDetail: null,
    error: false
  }
};

const slice = createSlice({
  name: 'User_Investor',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    //
    getUserKrowdByIdSuccess(state, action) {
      state.isLoading = false;
      state.investorKrowdDetail = action.payload;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //-------------------DETAIL OF userKrowd------------------
    // START LOADING
    startUserKrowdDetailLoading(state) {
      state.investorKrowdDetailState.isLoading = true;
    },

    // GET MANAGE userKrowd DETAIL
    getUserKrowdDetailSuccess(state, action) {
      state.investorKrowdDetailState.isLoading = false;
      state.investorKrowdDetailState.investorKrowdDetail = action.payload;
    },
    // HAS ERROR
    hasUserKrowdDetailError(state, action) {
      state.investorKrowdDetailState.isLoading = false;
      state.investorKrowdDetailState.error = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

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

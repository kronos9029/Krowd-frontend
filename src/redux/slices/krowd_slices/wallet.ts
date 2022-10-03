import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../../store';
// utils
import axios from 'axios';
import { business, NewProjectEntityFormValues, Project1 } from '../../../@types/krowd/project';
import { REACT_APP_API_URL } from '../../../config';
import { ListOfInvestorWallet, WalletType } from '../../../@types/krowd/wallet';
import { WalletAPI } from '../../../_apis_/krowd_apis/wallet';
// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  walletList: {
    totalAsset: number;
    listOfInvestorWallet: ListOfInvestorWallet[];
    listOfProjectWallet: null;
  };
};

const initialState: ProjectState = {
  isLoading: false,
  error: false,
  walletList: { totalAsset: 0, listOfInvestorWallet: [], listOfProjectWallet: null }
};

const slice = createSlice({
  name: 'project',
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
    getWalletListSuccess(state, action) {
      state.isLoading = false;
      state.walletList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

//--------------------------------------
export function getWalletList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await WalletAPI.gets();
      dispatch(slice.actions.getWalletListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getWalletByID(Id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await WalletAPI.getbyID({ id: Id });
      dispatch(getWalletList());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

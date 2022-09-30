import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import { Transaction, WalletTransaction } from '../../../@types/krowd/transaction';
import { TransactionAPI } from '../../../_apis_/krowd_apis/transaction';
// ----------------------------------------------------------------------

type TransactionState = {
  transactionState: {
    isLoading: boolean;
    TransactionList: Transaction[];

    error: boolean;
  };
  walletTransactionState: {
    isLoading: boolean;
    walletTransactionList: WalletTransaction[];

    error: boolean;
  };
};

const initialState: TransactionState = {
  transactionState: {
    isLoading: false,
    TransactionList: [],
    error: false
  },
  walletTransactionState: {
    isLoading: false,
    walletTransactionList: [],
    error: false
  }
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // ------ GET ALL TRANSACTION ------------ //
    startLoadingTransactionList(state) {
      state.transactionState.isLoading = true;
    },
    hasGetTransactionError(state, action) {
      state.transactionState.isLoading = false;
      state.transactionState.error = action.payload;
    },
    getTransactionListSuccess(state, action) {
      state.transactionState.isLoading = false;
      state.transactionState.TransactionList = action.payload;
    },
    // ------ GET ALL TRANSACTION WALLET------------ //
    startLoadingWalletTransactionList(state) {
      state.walletTransactionState.isLoading = true;
    },
    hasGetWalletTransactionError(state, action) {
      state.walletTransactionState.isLoading = false;
      state.walletTransactionState.error = action.payload;
    },
    getWalletTransactionListSuccess(state, action) {
      state.walletTransactionState.isLoading = false;
      state.walletTransactionState.walletTransactionList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

//------- GET ALL TRANSACTION

export function getTransactionList() {
  return async () => {
    dispatch(slice.actions.startLoadingTransactionList());
    try {
      const response = await TransactionAPI.getsTransaction();
      dispatch(slice.actions.getTransactionListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetTransactionError(error));
    }
  };
}
export function getWalletTransactionList() {
  return async () => {
    dispatch(slice.actions.startLoadingWalletTransactionList());
    try {
      const response = await TransactionAPI.getsWalletTransaction();
      dispatch(slice.actions.getWalletTransactionListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetWalletTransactionError(error));
    }
  };
}

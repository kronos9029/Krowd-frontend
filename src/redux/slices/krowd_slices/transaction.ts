import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import {
  Investment,
  Payment,
  Transaction,
  WalletTransaction
} from '../../../@types/krowd/transaction';
import { TransactionAPI } from '../../../_apis_/krowd_apis/transaction';
// ----------------------------------------------------------------------

type TransactionState = {
  transactionState: {
    isLoading: boolean;
    TransactionList: Transaction[];

    error: boolean;
  };
  investmentState: {
    isLoading: boolean;
    investmentList: Investment[];
    error: boolean;
  };
  walletTransactionState: {
    isLoading: boolean;
    walletTransactionList: WalletTransaction[];
    error: boolean;
  };
  paymentListState: {
    isLoading: boolean;
    paymentList: Payment[];
    error: boolean;
  };
  paymentListRevenueState: {
    isLoadingPeriodRevenue: boolean;
    paymentListPeriodRevenue: Payment[];
    errorPeriodRevenue: boolean;
  };
};

const initialState: TransactionState = {
  transactionState: {
    isLoading: false,
    TransactionList: [],
    error: false
  },
  investmentState: {
    isLoading: false,
    investmentList: [],
    error: false
  },
  walletTransactionState: {
    isLoading: false,
    walletTransactionList: [],
    error: false
  },
  paymentListState: {
    isLoading: false,
    paymentList: [],
    error: false
  },
  paymentListRevenueState: {
    isLoadingPeriodRevenue: false,
    paymentListPeriodRevenue: [],
    errorPeriodRevenue: false
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
    },
    // ------ GET ALL PAYMETS ------------ //
    startLoadingPaymentList(state) {
      state.paymentListState.isLoading = true;
    },
    hasGetPaymentError(state, action) {
      state.paymentListState.isLoading = false;
      state.paymentListState.error = action.payload;
    },
    getPaymentListSuccess(state, action) {
      state.paymentListState.isLoading = false;
      state.paymentListState.paymentList = action.payload;
    },
    // ------ GET ALL REVENUE ------------ //
    startLoadingPeriodRevenueList(state) {
      state.paymentListRevenueState.isLoadingPeriodRevenue = true;
    },
    hasGetPeriodRevenueError(state, action) {
      state.paymentListRevenueState.isLoadingPeriodRevenue = false;
      state.paymentListRevenueState.errorPeriodRevenue = action.payload;
    },
    getPeriodRevenueListSuccess(state, action) {
      state.paymentListRevenueState.isLoadingPeriodRevenue = false;
      state.paymentListRevenueState.paymentListPeriodRevenue = action.payload;
    },
    // ------ GET ALL INVESTMENT ------------ //
    startLoadingInvestmentList(state) {
      state.investmentState.isLoading = true;
    },
    hasGetInvestmentError(state, action) {
      state.investmentState.isLoading = false;
      state.investmentState.error = action.payload;
    },
    getInvestmentListSuccess(state, action) {
      state.investmentState.isLoading = false;
      state.investmentState.investmentList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

//---------------------------- GET ALL TRANSACTION------------------------------

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
//---------------------------- GET WALLET TRANSACTION------------------------------

export function getWalletTransactionList(ID: string) {
  return async () => {
    dispatch(slice.actions.startLoadingWalletTransactionList());
    try {
      const response = await TransactionAPI.getsWalletTransaction({ id: ID });
      dispatch(slice.actions.getWalletTransactionListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetWalletTransactionError(error));
    }
  };
}
//---------------------------- GET ALL PAYMENTS------------------------------

export function getAllPaymentList() {
  return async () => {
    dispatch(slice.actions.startLoadingPaymentList());
    try {
      const response = await TransactionAPI.getsPayment();
      dispatch(slice.actions.getPaymentListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetPaymentError(error));
    }
  };
}
//---------------------------- GET ALL PAYMENTS------------------------------

export function getAllPaymentListRevenue() {
  return async () => {
    dispatch(slice.actions.startLoadingPeriodRevenueList());
    try {
      const response = await TransactionAPI.getsPaymentRevenue();
      dispatch(slice.actions.getPeriodRevenueListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetPeriodRevenueError(error));
    }
  };
}
//---------------------------- GET ALL INVESTMENT------------------------------

export function getInvestmentProjectID(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoadingInvestmentList());
    try {
      const response = await TransactionAPI.getsInvestment({ id: projectId });
      dispatch(slice.actions.getInvestmentListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetInvestmentError(error));
    }
  };
}

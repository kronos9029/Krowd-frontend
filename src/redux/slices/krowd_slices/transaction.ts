import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
// utils
import {
  Investment,
  ListOfDailyReport,
  Payment,
  Transaction,
  WalletTransaction,
  Bill,
  WithDrawRequest
} from '../../../@types/krowd/transaction';
import { TransactionAPI } from '../../../_apis_/krowd_apis/transaction';
// ----------------------------------------------------------------------

type TransactionState = {
  transactionState: {
    isLoading: boolean;
    TransactionList: Transaction[];

    error: boolean;
  };
  transactionWithdrawState: {
    isLoading: boolean;
    TransactionWithdrawList: WithDrawRequest[];

    error: boolean;
  };
  investmentState: {
    isLoading: boolean;
    investmentList: Investment[];
    error: boolean;
  };
  dailyReportState: {
    isLoading: boolean;
    listOfDailyReport: ListOfDailyReport[];
    numOfDailyReport: number;
    error: boolean;
  };
  dailyReportDetails: {
    isLoading: boolean;
    DailyDetails: ListOfDailyReport | null;
    numOfDailyReport: number;
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
  //====================BILLS IN DAILY REPORT=========================
  biilDailyReportState: {
    isLoading: boolean;
    listOfBill: Bill[];
    numOfBill: number;
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
  transactionWithdrawState: {
    isLoading: false,
    TransactionWithdrawList: [],
    error: false
  },
  investmentState: {
    isLoading: false,
    investmentList: [],
    error: false
  },
  dailyReportState: {
    isLoading: false,
    listOfDailyReport: [],
    numOfDailyReport: 0,
    error: false
  },
  //====================BILLS IN DAILY REPORT=========================
  biilDailyReportState: {
    isLoading: false,
    listOfBill: [],
    numOfBill: 0,
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
  dailyReportDetails: {
    isLoading: false,
    DailyDetails: null,
    numOfDailyReport: 0,
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
    // ------ GET ALL WITHDRAW REQUEST TRANSACTION ------------ //
    startLoadingWithdrawTransactionList(state) {
      state.transactionWithdrawState.isLoading = true;
    },
    hasGetWithdrawTransactionError(state, action) {
      state.transactionWithdrawState.isLoading = false;
      state.transactionWithdrawState.error = action.payload;
    },
    getWithdrawTransactionListSuccess(state, action) {
      state.transactionWithdrawState.isLoading = false;
      state.transactionWithdrawState.TransactionWithdrawList = action.payload;
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
    },
    // ------ GET ALL DAILY REPORT ------------ //
    startLoadingDailyReportList(state) {
      state.dailyReportState.isLoading = true;
    },
    hasGetDailyReportError(state, action) {
      state.dailyReportState.isLoading = false;
      state.dailyReportState.error = action.payload;
    },
    getDailyReportSuccess(state, action) {
      state.dailyReportState.isLoading = false;
      state.dailyReportState = action.payload;
    },
    // ------ GET ALL BILL IN DAILY REPORT------------ //
    startLoadingBillDailyReportList(state) {
      state.biilDailyReportState.isLoading = true;
    },
    hasGetBillDailyReportError(state, action) {
      state.biilDailyReportState.isLoading = false;
      state.biilDailyReportState.error = action.payload;
    },
    getBillDailyReportSuccess(state, action) {
      state.biilDailyReportState.isLoading = false;
      state.biilDailyReportState = action.payload;
    },
    // ------ GET ALL DAILY WITH ID------------ //
    startLoadingDailyReportDetails(state) {
      state.dailyReportDetails.isLoading = true;
    },
    hasGetDailyReportDetailsError(state, action) {
      state.dailyReportDetails.isLoading = false;
      state.dailyReportDetails.error = action.payload;
    },
    getDailyReportDetailsSuccess(state, action) {
      state.dailyReportDetails.isLoading = false;
      state.dailyReportDetails.DailyDetails = action.payload;
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
//---------------------------- GET ALL WITHDRAW REQUEST TRANSACTION------------------------------

export function getWithdrawRequestTransactionList(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingWithdrawTransactionList());
    try {
      const response = await TransactionAPI.getsWithdrawTransaction(id);
      dispatch(slice.actions.getWithdrawTransactionListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetWithdrawTransactionError(error));
    }
  };
}
//---------------------------- GET WALLET TRANSACTION------------------------------

export function getWalletTransactionList(id: string, pageIndex: number) {
  return async () => {
    dispatch(slice.actions.startLoadingWalletTransactionList());
    try {
      const response = await TransactionAPI.getsWalletTransaction(id, pageIndex);
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
//---------------------------- GET ALL DAILY REPORT------------------------------

export function getDailyReportProjectID(projectId: string, pageIndex: number) {
  return async () => {
    dispatch(slice.actions.startLoadingDailyReportList());
    try {
      const response = await TransactionAPI.getsDailyReport(projectId, pageIndex);
      dispatch(slice.actions.getDailyReportSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetDailyReportError(error));
    }
  };
}
//---------------------------- GET DAILY REPORT ID------------------------------

export function getDailyReportByID(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingDailyReportDetails());
    try {
      const response = await TransactionAPI.getsDailyReportByID(id);
      dispatch(slice.actions.getDailyReportDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetDailyReportDetailsError(error));
    }
  };
}
//---------------------------- GET ALL BILL IN DAILY REPORT------------------------------

export function getBillDailyReport(dailyId: string, pageIndex: number) {
  return async () => {
    dispatch(slice.actions.startLoadingBillDailyReportList());
    try {
      const response = await TransactionAPI.getsBillDailyReport(dailyId, pageIndex);
      dispatch(slice.actions.getBillDailyReportSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetBillDailyReportError(error));
    }
  };
}

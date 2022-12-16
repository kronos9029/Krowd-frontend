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
  ListOfWithdrawRequest,
  PeriodRevenue,
  ListOfInvestmentPayment,
  ListOfPeriodRevenuePayment,
  ListOfWalletTransaction,
  FilterCount,
  ListOfInvestment,
  FilterCountInvestment
} from '../../../@types/krowd/transaction';
import { TransactionAPI } from '../../../_apis_/krowd_apis/transaction';
// ----------------------------------------------------------------------

type TransactionState = {
  transactionState: {
    isLoading: boolean;
    listOfAccountTransaction: Transaction[];
    numOfAccountTransaction: number;
    error: boolean;
  };
  transactionWithdrawState: {
    isLoading: boolean;
    listOfWithdrawRequest: ListOfWithdrawRequest[];
    numOfWithdrawRequest: number;

    error: boolean;
  };
  transactionWithdrawDetail: {
    isLoading: boolean;
    TransactionWithdrawDetail: ListOfWithdrawRequest | null;
    error: boolean;
  };
  periodRevenueState: {
    isLoading: boolean;
    PeriodRevenueList: PeriodRevenue[];
    error: boolean;
  };
  investmentState: {
    isLoading: boolean;
    numOfInvestment: number;
    filterCount: FilterCountInvestment | null;

    listOfInvestment: ListOfInvestment[];
    error: boolean;
  };
  investmentDetailState: {
    isLoading: boolean;
    InvestmentDetail: ListOfInvestment | null;
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
    listOfWalletTransaction: ListOfWalletTransaction[];
    filterCount: FilterCount | null;
    numOfWalletTransaction: number;
    error: boolean;
  };
  paymentListState: {
    isLoading: boolean;
    numOfPayment: number;
    listOfInvestmentPayment: ListOfInvestmentPayment[];
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
    numOfPayment: number;
    listOfPeriodRevenuePayment: ListOfPeriodRevenuePayment[];
    errorPeriodRevenue: boolean;
  };
};

const initialState: TransactionState = {
  transactionState: {
    isLoading: false,
    listOfAccountTransaction: [],
    error: false,
    numOfAccountTransaction: 0
  },
  transactionWithdrawState: {
    isLoading: false,
    numOfWithdrawRequest: 0,
    listOfWithdrawRequest: [],
    error: false
  },
  transactionWithdrawDetail: {
    isLoading: false,
    TransactionWithdrawDetail: null,
    error: false
  },
  periodRevenueState: {
    isLoading: false,
    PeriodRevenueList: [],
    error: false
  },
  investmentState: {
    isLoading: false,
    numOfInvestment: 9,
    listOfInvestment: [],
    filterCount: null,
    error: false
  },
  investmentDetailState: {
    isLoading: false,
    InvestmentDetail: null,
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
    listOfWalletTransaction: [],
    filterCount: null,
    numOfWalletTransaction: 0,
    error: false
  },
  paymentListState: {
    isLoading: false,
    numOfPayment: 0,
    listOfInvestmentPayment: [],
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
    numOfPayment: 0,
    listOfPeriodRevenuePayment: [],
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
      state.transactionState = action.payload;
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
      state.transactionWithdrawState = action.payload;
    },
    // ------ GET ALL WITHDRAW REQUEST TRANSACTION BY ID------------ //
    startLoadingWithdrawTransactionById(state) {
      state.transactionWithdrawDetail.isLoading = true;
    },
    hasGetWithdrawTransactionByIdError(state, action) {
      state.transactionWithdrawDetail.isLoading = false;
      state.transactionWithdrawDetail.error = action.payload;
    },
    getWithdrawTransactionByIdSuccess(state, action) {
      state.transactionWithdrawDetail.isLoading = false;
      state.transactionWithdrawDetail.TransactionWithdrawDetail = action.payload;
    },
    // ------ GET ALL PERIOD REVENUE REPORT LIST ------------ //
    startLoadingPeriodRevenueReportList(state) {
      state.periodRevenueState.isLoading = true;
    },
    hasGetPeriodRevenueReportError(state, action) {
      state.periodRevenueState.isLoading = false;
      state.periodRevenueState.error = action.payload;
    },
    getPeriodRevenueReportSuccess(state, action) {
      state.periodRevenueState.isLoading = false;
      state.periodRevenueState.PeriodRevenueList = action.payload;
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
      state.walletTransactionState = action.payload;
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
      state.paymentListState = action.payload;
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
      state.paymentListRevenueState = action.payload;
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
      state.investmentState = action.payload;
    },
    // ------ GET INVESTMENT BY ID ------------ //
    startLoadingInvestmentById(state) {
      state.investmentDetailState.isLoading = true;
    },
    hasGetInvestmentByIdError(state, action) {
      state.investmentDetailState.isLoading = false;
      state.investmentDetailState.error = action.payload;
    },
    getInvestmentByIdSuccess(state, action) {
      state.investmentDetailState.isLoading = false;
      state.investmentDetailState.InvestmentDetail = action.payload;
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

export function getTransactionList(pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoadingTransactionList());
    try {
      const response = await TransactionAPI.getsTransaction({
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getTransactionListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetTransactionError(error));
    }
  };
}
//---------------------------- GET ALL WITHDRAW REQUEST TRANSACTION------------------------------

export function getWithdrawRequestTransactionList(
  userId: string,
  pageIndex: number,
  pageSize: number
) {
  return async () => {
    dispatch(slice.actions.startLoadingWithdrawTransactionList());
    try {
      const response = await TransactionAPI.getsWithdrawTransaction({
        userId: userId,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getWithdrawTransactionListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetWithdrawTransactionError(error));
    }
  };
}
//---------------------------- GET ALL WITHDRAW REQUEST TRANSACTION BY ID------------------------------

export function getWithdrawRequestTransactionById(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingWithdrawTransactionById());
    try {
      const response = await TransactionAPI.getsWithdrawTransactionById(id);
      dispatch(slice.actions.getWithdrawTransactionByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetWithdrawTransactionByIdError(error));
    }
  };
}
// ------ GET ALL PERIOD REVENUE REPORT LIST ------------ //

export function getPeriodRevenueReportList(pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoadingPeriodRevenueReportList());
    try {
      const response = await TransactionAPI.getsPeriodRevenueHistory({
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getPeriodRevenueReportSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetPeriodRevenueReportError(error));
    }
  };
}
//---------------------------- GET WALLET TRANSACTION------------------------------

export function getWalletTransactionList(walletId: string, pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoadingWalletTransactionList());
    try {
      const response = await TransactionAPI.getsWalletTransaction({
        walletId: walletId,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getWalletTransactionListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetWalletTransactionError(error));
    }
  };
}
//---------------------------- GET ALL PAYMENTS------------------------------

export function getAllPaymentList(pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoadingPaymentList());
    try {
      const response = await TransactionAPI.getsPayment({
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getPaymentListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetPaymentError(error));
    }
  };
}
//---------------------------- GET ALL PAYMENTS------------------------------

export function getAllPaymentListRevenue(pageIndex2: number, pageSize2: number, projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoadingPeriodRevenueList());
    try {
      const response = await TransactionAPI.getsPaymentRevenue({
        pageIndex: pageIndex2,
        pageSize: pageSize2,
        projectId: projectId
      });
      dispatch(slice.actions.getPeriodRevenueListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetPeriodRevenueError(error));
    }
  };
}
//---------------------------- GET ALL INVESTMENT------------------------------

export function getInvestmentProjectID(projectId: string, pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoadingInvestmentList());
    try {
      const response = await TransactionAPI.getsInvestment({
        projectId: projectId,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getInvestmentListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetInvestmentError(error));
    }
  };
}
//---------------------------- GET INVESTMENT BY ID------------------------------

export function getInvestmentByID(Id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingInvestmentById());
    try {
      const response = await TransactionAPI.getsInvestmentByID(Id);
      dispatch(slice.actions.getInvestmentByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetInvestmentByIdError(error));
    }
  };
}
//---------------------------- GET ALL DAILY REPORT------------------------------

export function getDailyReportProjectID(projectId: string, pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoadingDailyReportList());
    try {
      const response = await TransactionAPI.getsDailyReport(projectId, pageIndex, pageSize);
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

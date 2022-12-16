import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_ACCOUNT_TRANSACTION = '/account_transactions';
const API_WALLET_TRANSACTION = '/wallet_transactions';
const API_INVESTMENT = '/investments';
const API_DAILY_REPORT = '/daily_reports/project';
const API_PAYMENTS = '/payments/type/INVESTMENT';
const PERIOD_REVENUE = '/payments/type/PERIOD_REVENUE';
const API_BILL_DAILY_REPORT = '/bills/dailyReport';
const API_DAILY_REPORT_BY_ID = '/daily_reports';
const API_WITH_DRAW_REQUEST = '/withdraw_requests';
const API_PERIOD_REVENUE_HISTORY = '/period_revenue_histories';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

async function getsTransaction(params?: { pageIndex: number; pageSize: number }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_ACCOUNT_TRANSACTION}`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getsWithdrawTransaction(params: {
  userId: string;
  pageIndex: number;
  pageSize: number;
}) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_WITH_DRAW_REQUEST}`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getsWithdrawTransactionById(id: string) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_WITH_DRAW_REQUEST}/${id}`, {
    headers: headers
  });
  return response;
}
async function getsPeriodRevenueHistory(params: { pageIndex: number; pageSize: number }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PERIOD_REVENUE_HISTORY}`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getsInvestment(params: { projectId: string; pageIndex: number; pageSize: number }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_INVESTMENT}`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getsInvestmentByID(Id: string) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_INVESTMENT}/${Id}`, {
    headers: headers
  });
  return response;
}
async function getsDailyReport(id: string, pageIndex: number, pageSize: number) {
  const headers = getHeader();

  const response = await axios.get(
    REACT_APP_API_URL + `${API_DAILY_REPORT}/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      headers: headers
    }
  );
  return response;
}
async function getsWalletTransaction(params: {
  walletId: string;
  pageIndex: number;
  pageSize: number;
}) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_WALLET_TRANSACTION}`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getsPayment(params: { pageIndex: number; pageSize: number }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PAYMENTS}`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getsPaymentRevenue(params: {
  pageIndex: number;
  pageSize: number;
  projectId: string;
}) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${PERIOD_REVENUE}`, {
    headers: headers,
    params: params
  });
  return response;
}
async function getsBillDailyReport(id: string, pageIndex: number) {
  const headers = getHeader();

  const response = await axios.get(
    REACT_APP_API_URL + `${API_BILL_DAILY_REPORT}/${id}?pageIndex=${pageIndex}&pageSize=8`,
    {
      headers: headers
    }
  );
  return response;
}
async function getsDailyReportByID(id: string) {
  const headers = getHeader();

  const response = await axios.get(REACT_APP_API_URL + `${API_DAILY_REPORT_BY_ID}/${id}`, {
    headers: headers
  });
  return response;
}

async function approveWithdrawRequest({
  requestId,
  receipt
}: {
  requestId: string;
  receipt: File;
}) {
  const headers = getHeader();
  const formData = new FormData();
  formData.append('requestId', requestId);
  formData.append('receipt', receipt);
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + API_WITH_DRAW_REQUEST,
    params: { action: 'APPROVE' },
    data: formData,
    headers: headers
  });
  return response;
}

async function reportedWithdrawRequest({
  requestId,
  reportMessage
}: {
  requestId: string;
  reportMessage: string;
}) {
  const headers = getHeader();
  const formData = new FormData();
  formData.append('requestId', requestId);
  formData.append('reportMessage', reportMessage);
  const response = await axios({
    method: 'put',
    url: REACT_APP_API_URL + API_WITH_DRAW_REQUEST,
    params: { action: 'REPORT' },
    data: formData,
    headers: headers
  });
  return response;
}
export const TransactionAPI = {
  getsTransaction: getsTransaction,
  getsWalletTransaction: getsWalletTransaction,
  approveWithdrawRequest: approveWithdrawRequest,
  getsPayment: getsPayment,
  getsPaymentRevenue: getsPaymentRevenue,
  getsInvestment: getsInvestment,
  getsInvestmentByID: getsInvestmentByID,
  getsDailyReport: getsDailyReport,
  reportedWithdrawRequest: reportedWithdrawRequest,
  getsBillDailyReport: getsBillDailyReport,
  getsDailyReportByID: getsDailyReportByID,
  getsWithdrawTransaction: getsWithdrawTransaction,
  getsPeriodRevenueHistory: getsPeriodRevenueHistory,
  getsWithdrawTransactionById: getsWithdrawTransactionById
};

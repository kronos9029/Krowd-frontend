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
const API_WITH_DRAW_REQUEST = '/WithdrawRequest';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

async function getsTransaction() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_ACCOUNT_TRANSACTION}`, {
    headers: headers
  });
  return response;
}
async function getsWithdrawTransaction(investorId: string) {
  const headers = getHeader();
  const response = await axios.get(
    REACT_APP_API_URL + `${API_WITH_DRAW_REQUEST}?investorId=${investorId}`,
    {
      headers: headers
    }
  );
  return response;
}
async function getsInvestment({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_INVESTMENT}?projectId=${id}`, {
    headers: headers
  });
  return response;
}
async function getsDailyReport(id: string, pageIndex: number) {
  const headers = getHeader();

  const response = await axios.get(
    REACT_APP_API_URL + `${API_DAILY_REPORT}/${id}?pageIndex=${pageIndex}&pageSize=8`,
    {
      headers: headers
    }
  );
  return response;
}
async function getsWalletTransaction({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_WALLET_TRANSACTION}?walletId=${id}`, {
    headers: headers
  });
  return response;
}
async function getsPayment() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PAYMENTS}`, {
    headers: headers
  });
  return response;
}
async function getsPaymentRevenue() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${PERIOD_REVENUE}`, {
    headers: headers
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
export const TransactionAPI = {
  getsTransaction: getsTransaction,
  getsWalletTransaction: getsWalletTransaction,
  getsPayment: getsPayment,
  getsPaymentRevenue: getsPaymentRevenue,
  getsInvestment: getsInvestment,
  getsDailyReport: getsDailyReport,
  getsBillDailyReport: getsBillDailyReport,
  getsDailyReportByID: getsDailyReportByID,
  getsWithdrawTransaction: getsWithdrawTransaction
};

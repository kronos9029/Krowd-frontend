import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_ACCOUNT_TRANSACTION = '/account_transactions';
const API_WALLET_TRANSACTION = '/wallet_transactions';
const API_PAYMENTS = '/payments/type/INVESTMENT';
const PERIOD_REVENUE = '/payments/type/PERIOD_REVENUE';

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
async function getsWalletTransaction() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_WALLET_TRANSACTION}`, {
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

export const TransactionAPI = {
  getsTransaction: getsTransaction,
  getsWalletTransaction: getsWalletTransaction,
  getsPayment: getsPayment,
  getsPaymentRevenue: getsPaymentRevenue
};

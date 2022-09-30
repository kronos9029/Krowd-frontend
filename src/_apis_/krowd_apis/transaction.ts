import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_ACCOUNT_TRANSACTION = '/account_transactions';
const API_WALLET_TRANSACTION = '/wallet_transactions';

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

export const TransactionAPI = {
  getsTransaction: getsTransaction,
  getsWalletTransaction: getsWalletTransaction
};

import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_PACKAGE_ID = '/packages/project';
const API_PACKAGE_BY_ID = '/packages';
const API_PROJECT = '/projects';
const API_PROJECT_INVESTED = '/projects/investedProject';
const API_STAGE_ID = '/stages';
const API_TRANSACTION = '/account_transactions';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}
async function gets(params?: { businessId: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PROJECT}`, {
    params: params,
    headers: headers
  });
  return response;
}
async function getProjectInvested(params?: { businessId: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PROJECT_INVESTED}`, {
    params: params,
    headers: headers
  });
  return response;
}
async function getAllProject() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PROJECT}`, {
    headers: headers
  });
  return response;
}
async function get({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PROJECT}/${id}`, {
    headers: headers
  });
  return response;
}
async function getPackageID({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PACKAGE_ID}/${id}`, {
    headers: headers
  });
  return response;
}
async function getPackageBYID({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_PACKAGE_BY_ID}/${id}`, {
    headers: headers
  });
  return response;
}
async function getStageId({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_STAGE_ID}/${id}`, {
    headers: headers
  });
  return response;
}
async function getsTransaction() {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `${API_TRANSACTION}`, {
    headers: headers
  });
  return response;
}

export const ProjectAPI = {
  gets: gets,
  get: get,
  getPackageID: getPackageID,
  getAllProject: getAllProject,
  getStageId: getStageId,
  getPackageBYID: getPackageBYID,
  getProjectInvested: getProjectInvested,
  getsTransaction: getsTransaction
};

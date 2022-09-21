import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
const API_PACKAGE_ID = '/packages/project';
const API_PROJECT = '/projects';

function getToken() {
  return window.localStorage.getItem('accessToken');
}

function getHeaderFormData() {
  const token = getToken();
  return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };
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
export const ProjectAPI = {
  gets: gets,
  get: get,
  getPackageID: getPackageID,
  getAllProject: getAllProject
};

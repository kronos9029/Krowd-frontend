import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';

type BusinessFormPost = {
  name: string;
  address: string;
  email: string;
  phoneNum: string;
  taxIdentificationNumber: string;
  fieldId: string;
};
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
  const response = await axios.get(REACT_APP_API_URL + '/projects', {
    params: params,
    headers: headers
  });
  return response;
}
async function get({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `/projects/${id}`, {
    headers: headers
  });
  return response;
}
export const ProjectAPI = {
  gets: gets,
  get: get
};

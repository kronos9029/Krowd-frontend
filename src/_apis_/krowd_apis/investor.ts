import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';

type InvestorFormPostImage = {
  entityId: string | null;
  entityName: string;
  files: string | null | undefined;
};
type InvestorFormPut = {
  id: string;
  description: string | null | undefined;
  phoneNum: string | null | undefined;
  idCard: string | null | undefined;
  email: string | null | undefined;
  gender: string | null | undefined;
  //   dateOfBirth: string | null | undefined;
  taxIdentificationNumber: string | null | undefined;
  city: string | null | undefined;
  district: string | null | undefined;
  address: string | null | undefined;
  bankName: string | null | undefined;
  //   bankAccount: string | null | undefined;
  lastName: string | null | undefined;
  firstName: string | null | undefined;
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
async function put({
  firstName,
  address,
  email,
  phoneNum,
  taxIdentificationNumber,
  lastName,
  city,
  district,
  idCard,
  bankName,
  id
}: InvestorFormPut) {
  const header = getHeaderFormData();
  const formData = new FormData();
  formData.append('firstName', firstName ?? '');
  formData.append('email', email ?? '');
  formData.append('lastName', lastName ?? '');
  formData.append('phoneNum', phoneNum ?? '');
  formData.append('city', city ?? '');
  formData.append('district', district ?? '');
  formData.append('address', address ?? '');
  formData.append('idCard', 'idCard');
  formData.append('bankName', bankName ?? '');
  formData.append('roleId', 'ad5f37da-ca48-4dc5-9f4b-963d94b535e6');
  formData.append('dateOfBirth', '24/07/2000');
  formData.append('taxIdentificationNumber', '123');
  formData.append('bankAccount', '123');
  formData.append('gender', 'male');
  formData.append('description', '123');
  await axios({
    method: 'put',
    url: REACT_APP_API_URL + `/users/${id}`,
    data: formData,
    headers: header
  });
}
async function postImage({ investorId, files }: { investorId: string; files: File | null }) {
  const header = getHeaderFormData();
  const formData = new FormData();
  if (files === null) {
    throw new Error('No data');
  }
  formData.append('entityId', investorId);
  formData.append('entityName', 'User');
  formData.append('files', files);
  await axios({
    method: 'post',
    url: REACT_APP_API_URL + '/upload-files/firebase',
    data: formData,
    headers: header
  });
}
async function get({ id }: { id: string }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `/users/${id ?? '_'}`, {
    headers: headers
  });
  return response;
}
async function getNotification(params: { userId: string; seen: boolean }) {
  const headers = getHeader();
  const response = await axios.get(REACT_APP_API_URL + `/notifications`, {
    headers: headers,
    params: params
  });
  return response;
}
export const InvestorAPI = {
  put: put,
  postImage: postImage,
  getNotification: getNotification,
  get: get
};

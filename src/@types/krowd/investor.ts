export type User_Investor = {
  id: string;
  business: null;
  role: Role;
  description: null;
  phoneNum: null;
  idCard: null;
  email: string;
  gender: null;
  dateOfBirth: null;
  taxIdentificationNumber: null;
  city: null;
  district: null;
  address: null;
  bankName: null;
  bankAccount: null;
  image: string;
  status: null;
  createDate: string;
  createBy: null;
  updateDate: string;
  updateBy: null;
  isDeleted: boolean;
  lastName: string;
  firstName: null;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  createDate: string;
  createBy: null;
  updateDate: string;
  updateBy: null;
  isDeleted: boolean;
};

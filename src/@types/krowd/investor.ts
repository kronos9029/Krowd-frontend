export type User_Investor = {
  id: string | null;
  business: null;
  role: Role;
  description: string | null;
  phoneNum: string | null;
  idCard: string | null;
  email: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  taxIdentificationNumber: string | null;
  city: string | null;
  district: string | null;
  address: string | null;
  bankName: string | null;
  bankAccount: string | null;
  image: string;
  status: null;
  createDate: string;
  createBy: null;
  updateDate: string;
  updateBy: null;
  isDeleted: boolean;
  lastName: string | null;
  firstName: string | null;
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

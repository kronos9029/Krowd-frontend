export type UserKrowd = {
  numOfUser: number;
  listOfUser: ListOfUser[];
};

export type Business = {
  id: string;
  manager: ListOfUser;
  fieldList: Role[];
  image: string;
  numOfProject: number;
  numOfSuccessfulProject: number;
  successfulRate: number;
  status: number;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  isDeleted: boolean;
  name: string;
  phoneNum: string;
  email: string;
  description: string;
  taxIdentificationNumber: string;
  address: string;
};

export type ListOfUser = {
  id: string;
  business?: Business;
  role?: Role;
  description: string;
  phoneNum: string;
  idCard: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  taxIdentificationNumber: string;
  city: string;
  district: string;
  address: string;
  bankName: string;
  bankAccount: string;
  image: string;
  status: number;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  isDeleted: boolean;
  lastName: string;
  firstName: string;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  createDate: string;
  createBy: null | string;
  updateDate: string;
  updateBy: null | string;
  isDeleted: boolean;
};

//-----------------------------------------------------

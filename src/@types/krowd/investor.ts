export type User_Investor = {
  id: string;
  business: null;
  role: Role;
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
  status: string;
  createDate: string;
  createBy: Date | string | number;
  updateDate: string;
  updateBy: Date | string | number;
  isDeleted: boolean;
  lastName: string;
  firstName: string;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  createDate: string;
  createBy: Date | string | number;
  updateDate: string;
  updateBy: Date | string | number;
  isDeleted: boolean;
};

//================================NOTIFICATION=============================
export type Notification = {
  total: number;
  new: number;
  details: NotificationDetail[];
};

export type NotificationDetail = {
  title: string;
  entityId: string;
  image: string;
  createDate: string;
  seen: boolean;
};

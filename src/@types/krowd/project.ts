import { FormikProps } from 'formik';
export type FormikPropsShopView = FormikProps<ProjectFilter>;
export enum PROJECT_STATUS {
  CALLING_FOR_INVESTMENT = 'CALLING_FOR_INVESTMENT',
  ACTIVE = 'ACTIVE',
  DARFT = 'DARFT'
}
export type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projects: Project1[];
  project: Project1 | null;
  sortBy: string | null;
  filters: {
    status: string[];
    areaId: string;
  };
};

export type ProjectFilter = {
  status: string[];
  // businessId: string;
  areaId: string;
  // fieldId: string[];
};
export type business = {};
export type Project1 = {
  id: string;
  image: string;
  business: {
    id: string;
    manager: {
      id: string;
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
      createBy: any;
      updateDate: string;
      updateBy: any;
      isDeleted: boolean;
      lastName: string;
      firstName: string;
    };
    fieldList: {
      id: string;
      name: string;
      description: string;
      createDate: string;
      createBy: string;
      updateDate: string;
      updateBy: string;
      isDeleted: boolean;
    }[];
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
  manager: {
    id: string;
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
    createBy: any;
    updateDate: string;
    updateBy: any;
    isDeleted: boolean;
    lastName: string;
    firstName: string;
  };
  field: {
    id: string;
    name: string;
    description: string;
    createDate: string;
    createBy: string;
    updateDate: string;
    updateBy: string;
    isDeleted: boolean;
  };
  area: {
    id: string;
    city: string;
    district: string;
    createDate: string;
    createBy: any;
    updateDate: string;
    updateBy: any;
    isDeleted: boolean;
  };
  projectEntity: {
    type: string;
    typeItemList: {
      id: string;
      title: string;
      link: string;
      content: string;
      description: string;
      priority: number;
    }[];
  }[];
  memberList: any[];
  remainAmount: number;
  approvedDate: string;
  approvedBy: string;
  status: PROJECT_STATUS;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  isDeleted: boolean;
  name: string;
  description: string;
  address: string;
  investmentTargetCapital: number;
  investedCapital: number;
  sharedRevenue: number;
  multiplier: number;
  duration: number;
  numOfStage: number;
  startDate: string;
  endDate: string;
  businessLicense: string;
};
export type NewProjectEntityFormValues = {
  projectId: string;
  type: string;
  title: string;
  link: string;
  content: string;
  description: string;
};
export type NewProjectFormValues = {
  name: string;
  businessId: string;
  managerId: string;
  fieldId: string;
  areaId: string;
  address: string;
  description: string;
  investmentTargetCapital: string;
  investedCapital: string;
  sharedRevenue: string;
  multiplier: string;
  duration: string;
  numOfStage: string;
  businessLicense: string;
  startDate: string;
  endDate: string;
  image: File | any;
};
export type Package = {
  id: string;
  remainingQuantity: number;
  status: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  name: string;
  projectId: string;
  price: number;
  image: File | any;
  quantity: number;
  descriptionList: string[];
};

export type ALL_Project = {
  id: string;
  businessId: string;
  businessName: string;
  businessImage: string;
  managerId: string;
  fieldId: string;
  fieldName: string;
  fieldDescription: string;
  areaId: string;
  image: string;
  investedCapital: number;
  numOfStage: number;
  remainAmount: number;
  approvedDate: null;
  approvedBy: null;
  status: string;
  tagList: string[];
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  isDeleted: boolean;
  name: string;
  description: string;
  address: string;
  investmentTargetCapital: number;
  sharedRevenue: number;
  multiplier: number;
  duration: number;
  startDate: string;
  endDate: string;
};

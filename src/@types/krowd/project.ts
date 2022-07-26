import { FormikProps } from 'formik';
export const ProjectStatus = [
  { statusString: 'Chưa duyệt', color: undefined },
  { statusString: 'Từ chối', color: undefined },
  { statusString: 'Mở đầu tư', color: '#14B7CC' },
  { statusString: 'Quá hạn', color: '#FF3519' },
  { statusString: 'Thành công', color: '#19C157' },
  { statusString: 'Đóng dự án', color: undefined }
];
export type FormikPropsShopView = FormikProps<ProjectFilter>;

// export type Project = {
//   id: string;
//   manager: {
//     id: string;
//     businessId: string;
//     roleId: string;
//     description: string;
//     lastName: string;
//     firstName: string;
//     phoneNum: string;
//     image: string;
//     idCard: string;
//     email: string;
//     gender: string;
//     dateOfBirth: string;
//     taxIdentificationNumber: string;
//     city: string;
//     district: string;
//     address: string;
//     bankName: string;
//     bankAccount: string;
//     status: number;
//     createDate: string;
//     createBy: string;
//     updateDate: string;
//     updateBy: string;
//     isDeleted: boolean;
//   };
//   business: {
//     id: string;
//     name: string;
//     phoneNum: string;
//     image: string;
//     email: string;
//     description: string;
//     taxIdentificationNumber: string;
//     address: string;
//     numOfProject: number;
//     numOfSuccessfulProject: number;
//     successfulRate: number;
//     createDate: Date | string | number;
//     createBy: string;
//     updateDate: Date | string | number;
//     updateBy: string;
//     status?: 'Bị khóa' | 'Đang hoạt động' | 'Dừng hoạt động';
//   };
//   field: {
//     id: string;
//     name: string;
//     description: string;
//     createDate: Date;
//     createBy: string;
//     updateDate: Date;
//     updateBy: string;
//     isDeleted: boolean;
//   };
//   areaId: string;
//   name: string;
//   image: string;
//   description: string;
//   address: string;
//   investmentTargetCapital: number;
//   investedCapital: number;
//   sharedRevenue: number;
//   multiplier: number;
//   duration: number;
//   numOfStage: number;
//   remainAmount: number;
//   startDate: string;
//   endDate: string;
//   businessLicense: string;
//   approvedDate: string;
//   approvedBy: string;
//   status: number;
//   createDate: string;
//   createBy: string;
//   updateDate: string;
//   updateBy: string;
//   isDeleted: boolean;
// };

export type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projects: Project1[];
  project: Project1 | null;
  sortBy: string | null;
  filters: {
    status: string[];
    // businessId: string;
    areaId: string;
    // fieldId: string[];
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
  status: number;
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

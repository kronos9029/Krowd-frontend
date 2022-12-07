import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../../store';
// utils
import axios from 'axios';
import {
  ALL_Project,
  business,
  InvestedProjectDetail,
  ListOfProjectInvested,
  NewProjectEntityFormValues,
  Package,
  Project1
} from '../../../@types/krowd/project';
import { REACT_APP_API_URL } from '../../../config';
import { ProjectAPI } from '_apis_/krowd_apis/project';
import PackageVoucherCheckout from 'pages/dashboard/PackageVoucherCheckout';
import { BusinessAPI } from '_apis_/krowd_apis/business';
// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projectListLanding: {
    isLoadingProjectListLanding: boolean;
    numOfProject: number;
    listOfProject: ALL_Project[];
    errorProjectList: boolean;
  };
  listAllProjectLanding: {
    isLoadinglistAllProjectLanding: boolean;
    numOfProject: number;
    listOfProject: ALL_Project[];
    errorProjectlistAllProjectLanding: boolean;
  };
  listAllProjectLandingMostTransaction: {
    isLoadinglistAllProjectLanding: boolean;
    numOfProject: number;
    listOfProject: ALL_Project[];
    errorProjectlistAllProjectLanding: boolean;
  };
  projectList: {
    isLoadingProjectList: boolean;
    numOfProject: number;
    listOfProject: Project1[];
    errorProjectList: boolean;
  };
  projectListInvested: {
    isLoadingProjectListInvested: boolean;
    numOfProject: number;
    listOfProject: ListOfProjectInvested[];
    errorProjectListInvested: boolean;
  };
  InvestedProjectDetails: {
    isLoadingProjectListInvested: boolean;
    listOfProject: InvestedProjectDetail | null;
    errorProjectListInvested: boolean;
  };

  detailOfProject: {
    isLoadingDetailOfProjectID: boolean;
    detailOfProjectID: Project1 | null;
    errorDetailOfProjectID: boolean;
  };
  projectPackageDetails: {
    projectPackageDetailsLoading: boolean;
    PackageDetails: Package | null;
  };

  activeProjectEntityId: NewProjectEntityFormValues | null;

  projects: Project1[];

  project: Project1 | null;
  sortBy: Project1 | null;
  filters: {
    areaId: string;
    status: number[];
  };
  ProjectState: {
    isLoading: boolean;
    projectList: {
      numOfProject: number;
      listOfProject: Project1[];
    };
    error: boolean;
  };
  packageLists: {
    isPackageLoading: boolean;
    numOfPackage: number;
    listOfPackage: Package[];
  };
};

const initialState: ProjectState = {
  isLoading: false,
  error: false,

  detailOfProject: {
    isLoadingDetailOfProjectID: false,
    detailOfProjectID: null,
    errorDetailOfProjectID: false
  },

  activeProjectEntityId: null,
  projectList: {
    isLoadingProjectList: false,
    numOfProject: 0,
    listOfProject: [],
    errorProjectList: false
  },

  projectListLanding: {
    isLoadingProjectListLanding: false,
    numOfProject: 0,
    listOfProject: [],
    errorProjectList: false
  },
  listAllProjectLanding: {
    isLoadinglistAllProjectLanding: false,
    numOfProject: 0,
    listOfProject: [],
    errorProjectlistAllProjectLanding: false
  },
  listAllProjectLandingMostTransaction: {
    isLoadinglistAllProjectLanding: false,
    numOfProject: 0,
    listOfProject: [],
    errorProjectlistAllProjectLanding: false
  },

  projectListInvested: {
    isLoadingProjectListInvested: false,
    numOfProject: 0,
    listOfProject: [],
    errorProjectListInvested: false
  },
  InvestedProjectDetails: {
    isLoadingProjectListInvested: false,
    listOfProject: null,
    errorProjectListInvested: false
  },
  projects: [],
  project: null,
  sortBy: null,
  filters: {
    areaId: 'HCM',
    status: []
  },
  ProjectState: {
    isLoading: false,
    projectList: {
      numOfProject: 0,
      listOfProject: []
    },
    error: false
  },
  packageLists: {
    isPackageLoading: false,
    numOfPackage: 0,
    listOfPackage: []
  },
  projectPackageDetails: {
    projectPackageDetailsLoading: false,
    PackageDetails: null
  }
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ------ GET ALL PROJECT ------------ //
    startLoadingProjectList(state) {
      state.projectList.isLoadingProjectList = true;
    },
    hasGetAllProjectError(state, action) {
      state.projectList.isLoadingProjectList = false;
      state.projectList.errorProjectList = action.payload;
    },
    getProjectListSuccess(state, action) {
      state.isLoading = false;
      state.projectList = action.payload;
    },
    // ------ GET PROJECT BY FILTER 1/10/2022 ------------ //
    startLoadingProjectListLanding(state) {
      state.projectListLanding.isLoadingProjectListLanding = true;
    },
    hasGetAllProjectLandingError(state, action) {
      state.projectListLanding.isLoadingProjectListLanding = false;
      state.projectListLanding.errorProjectList = action.payload;
    },
    getProjectListLandingSuccess(state, action) {
      state.isLoading = false;
      state.projectListLanding = action.payload;
    },
    // ------ GET ALL PROJECT IN LANDING ------------ //
    startLoadingListAllProjectLanding(state) {
      state.listAllProjectLanding.isLoadinglistAllProjectLanding = true;
    },
    hasGetListAllProjectLandingError(state, action) {
      state.listAllProjectLanding.isLoadinglistAllProjectLanding = false;
      state.listAllProjectLanding.errorProjectlistAllProjectLanding = action.payload;
    },
    getListAllProjectLandingSuccess(state, action) {
      state.listAllProjectLanding.isLoadinglistAllProjectLanding = false;
      state.listAllProjectLanding = action.payload;
    },
    // ------ GET ALL PROJECT IN LANDING MOST TRANSACTION ------------ //
    startLoadingListAllProjectMostTransactionLanding(state) {
      state.listAllProjectLandingMostTransaction.isLoadinglistAllProjectLanding = true;
    },
    hasGetListAllProjectLandingMostTransactionError(state, action) {
      state.listAllProjectLandingMostTransaction.isLoadinglistAllProjectLanding = false;
      state.listAllProjectLandingMostTransaction.errorProjectlistAllProjectLanding = action.payload;
    },
    getListAllProjectLandingMostTransactionSuccess(state, action) {
      state.listAllProjectLandingMostTransaction.isLoadinglistAllProjectLanding = false;
      state.listAllProjectLandingMostTransaction = action.payload;
    },
    // ------ GET ALL PROJECT INVESTED ------------ //
    startLoadingProjectInvestedList(state) {
      state.projectListInvested.isLoadingProjectListInvested = true;
    },
    hasGetAllProjectInvestedError(state, action) {
      state.projectListInvested.isLoadingProjectListInvested = false;
      state.projectListInvested.errorProjectListInvested = action.payload;
    },
    getProjectListInvestedSuccess(state, action) {
      state.projectListInvested.isLoadingProjectListInvested = false;
      state.projectListInvested = action.payload;
    },
    // ------ GET PROJECT INVESTED BY ID------------ //
    startLoadingProjectInvestedById(state) {
      state.InvestedProjectDetails.isLoadingProjectListInvested = true;
    },
    hasGetProjectInvestedByIdError(state, action) {
      state.InvestedProjectDetails.isLoadingProjectListInvested = false;
      state.InvestedProjectDetails.errorProjectListInvested = action.payload;
    },
    getProjectListInvestedByIdSuccess(state, action) {
      state.InvestedProjectDetails.isLoadingProjectListInvested = false;
      state.InvestedProjectDetails.listOfProject = action.payload;
    },

    // ------ GET ALL PROJECT BY ID------------ //

    starDetailOfProjectIDtLoading(state) {
      state.detailOfProject.isLoadingDetailOfProjectID = true;
    },
    hasDetailOfProjectIDError(state, action) {
      state.detailOfProject.isLoadingDetailOfProjectID = false;
      state.detailOfProject.errorDetailOfProjectID = action.payload;
    },
    getProjectListIDSuccess(state, action) {
      state.detailOfProject.isLoadingDetailOfProjectID = false;
      state.detailOfProject.detailOfProjectID = action.payload;
    },

    // ------ GET ALL PACKAGE BY PROJECT ID------------ //
    // START LOADING
    startPackageListLoading(state) {
      state.packageLists.isPackageLoading = true;
    },

    getProjectPackageSuccess(state, action) {
      state.packageLists.isPackageLoading = false;
      state.packageLists = action.payload;
    },
    // ------ GET PACKAGE BY  ID------------ //
    // START LOADING
    startPackageIDLoading(state) {
      state.projectPackageDetails.projectPackageDetailsLoading = true;
    },

    getPackageIDSuccess(state, action) {
      state.projectPackageDetails.projectPackageDetailsLoading = false;
      state.projectPackageDetails.PackageDetails = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProjects(state, action) {
      state.sortBy = action.payload;
    },

    filterProjects(state, action) {
      state.filters.areaId = action.payload.areaId;
      state.filters.status = action.payload.status;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { sortByProjects, filterProjects } = slice.actions;

// ----------------------------------------------------------------------

// PACKAGE PROJECT
export function getProjectPackage(projectId: string) {
  return async () => {
    dispatch(slice.actions.startPackageListLoading());
    try {
      const response = await ProjectAPI.getPackageID({ id: projectId });
      dispatch(slice.actions.getProjectPackageSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// PACKAGE PROJECT BY ID

export function getPackageBYID(Id: string) {
  return async () => {
    dispatch(slice.actions.startPackageIDLoading());
    try {
      const response = await ProjectAPI.getPackageBYID({ id: Id });
      dispatch(slice.actions.getPackageIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ALL PROJECT
export function getAllProject() {
  return async () => {
    dispatch(slice.actions.startLoadingProjectList());
    try {
      const response = await ProjectAPI.getAllProject();
      dispatch(slice.actions.getProjectListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetAllProjectError(error));
    }
  };
}
// ALL PROJECT BY FILTER 1/10/2022
export function getProjectLandingByFilter() {
  return async () => {
    dispatch(slice.actions.startLoadingProjectListLanding());
    try {
      const response = await ProjectAPI.getAllProject();
      dispatch(slice.actions.getProjectListLandingSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetAllProjectLandingError(error));
    }
  };
}
// ALL PROJECT 1/10/2022
export function getListAllProjectLanding() {
  return async () => {
    dispatch(slice.actions.startLoadingListAllProjectLanding());
    try {
      const response = await ProjectAPI.getAllProject();
      dispatch(slice.actions.getListAllProjectLandingSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetListAllProjectLandingError(error));
    }
  };
}
// ALL PROJECT HIGHLIGHT 1/10/2022
export function getListAllProjectMostTransactionLanding() {
  return async () => {
    dispatch(slice.actions.startLoadingListAllProjectMostTransactionLanding());
    try {
      const response = await ProjectAPI.getAllProjectMostTransaction();
      dispatch(slice.actions.getListAllProjectLandingMostTransactionSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetListAllProjectLandingMostTransactionError(error));
    }
  };
}
// GET PROJECT BY ID
export function getProjectListById(projectId: string) {
  return async () => {
    dispatch(slice.actions.starDetailOfProjectIDtLoading());
    try {
      const response = await ProjectAPI.get({ id: projectId });
      dispatch(slice.actions.getProjectListIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasDetailOfProjectIDError(error));
    }
  };
}
//------- GET ALL PROJECT WITH PARAMS
export function getProjectList() {
  return async () => {
    dispatch(slice.actions.startLoadingProjectList());
    try {
      const response = await ProjectAPI.gets();
      dispatch(slice.actions.getProjectListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectListWithFilter(
  fieldIds: string[],
  businessId: string,
  investmentTargetCapital: string,
  status: string
) {
  return async () => {
    dispatch(slice.actions.startLoadingProjectListLanding());
    try {
      const response = await ProjectAPI.getProjectByFilter({
        fieldIds: fieldIds,
        businessId: businessId,
        investmentTargetCapital: investmentTargetCapital,
        status: status
      });
      dispatch(slice.actions.getProjectListLandingSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

//------- GET ALL PROJECT INVESTED WITH PARAMS
export function getProjectListInvested(pageIndex: number, pageSize: number) {
  return async () => {
    dispatch(slice.actions.startLoadingProjectInvestedList());
    try {
      const response = await ProjectAPI.getProjectInvested({
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      dispatch(slice.actions.getProjectListInvestedSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
//------- GET PROJECT INVESTED WITH ID
export function getProjectListInvestedById(Id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingProjectInvestedById());
    try {
      const response = await ProjectAPI.getProjectInvestedByID(Id);
      dispatch(slice.actions.getProjectListInvestedByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetProjectInvestedByIdError(error));
    }
  };
}

import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../../store';
// utils
import axios from 'axios';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { business, Project1, ProjectStatus } from '../../../@types/krowd/project';
import { REACT_APP_API_URL } from '../../../config';
// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projectList: {
    numOfProject: number;
    listOfProject: Project1[];
  };
  activeProjectId: Project1 | null;
  projects: Project1[];
  project: Project1 | null;
  sortBy: Project1 | null;
  filters: {
    areaId: string;
    status: number[];
  };
};

const initialState: ProjectState = {
  isLoading: false,
  error: false,
  activeProjectId: null,
  projectList: { numOfProject: 0, listOfProject: [] },
  projects: [],
  project: null,
  sortBy: null,
  filters: {
    areaId: 'HCM',
    status: []
  }
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET MANAGE USERS
    getProjectListSuccess(state, action) {
      state.isLoading = false;
      state.projectList = action.payload;
    },

    getProjectListIDSuccess(state, action) {
      state.isLoading = false;
      state.activeProjectId = action.payload;
    },
    delProjectListIDSuccess(state, action) {
      state.projectList = action.payload;
    },
    getProjectByBusinessIDSuccess(state, action) {
      state.isLoading = false;
      state.projectList = action.payload;
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

// ----------------------------------------------------------------------

export function getAllProject(temp_field_role: 'ADMIN' | 'INVESTOR' | 'BUSI') {
  return async () => {
    const { dispatch } = store;

    dispatch(slice.actions.startLoading());
    try {
      const response: { data: { products: Project1[] } } = await axios.get(
        REACT_APP_API_URL + 'projects',
        {
          params: { temp_field_role }
        }
      );
      dispatch(slice.actions.getProjectListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses'
      );

      dispatch(slice.actions.getProjectListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectListById(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses/${projectId}`
      );
      dispatch(slice.actions.getProjectListIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// export function getProjectId(projectId: string) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(
//         `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects/${projectId}`
//       );
//       dispatch(slice.actions.getProjectListIDSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
export function getProjectId(projectId: string, temp_field_role: 'ADMIN') {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects/${projectId}`,
        {
          params: { temp_field_role }
        }
      );
      dispatch(slice.actions.getProjectListIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getProjectByBusinessID(businessId: string, temp_field_role: 'ADMIN') {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects',
        {
          params: { businessId, temp_field_role }
        }
      );
      dispatch(slice.actions.getProjectByBusinessIDSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function delProjectListById(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses/${projectId}`
      );
      dispatch(getProjectList());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

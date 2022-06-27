import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../../store';
// utils
import axios from 'axios';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Project, ProjectStatus } from '../../../@types/krowd/project';
import { REACT_APP_API_URL } from '../../../config';
// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  projectLists: {
    numOfProject: number;
    listOfProject: Project[];
  };
  activeProjectId: Project | null;
  projects: Project[];
  project: Project | null;
  sortBy: Project | null;
  filters: {
    areaId: string;
    status: ProjectStatus[];
  };
};

const initialState: ProjectState = {
  isLoading: false,
  error: false,
  activeProjectId: null,
  projectLists: { numOfProject: 0, listOfProject: [] },
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
      state.projectLists = action.payload;
    },

    getProjectListIDSuccess(state, action) {
      state.isLoading = false;
      state.activeProjectId = action.payload;
    },
    delProjectListIDSuccess(state, action) {
      state.projectLists = action.payload;
    },
    getProjectByBusinessIDSuccess(state, action) {
      state.isLoading = false;
      console.log('t di qua day roi');
      state.projectLists = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.areaId = action.payload.areaId;
      state.filters.status = action.payload.status;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { sortByProducts, filterProducts } = slice.actions;
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getAllProject(temp_field_role: 'ADMIN') {
  return async () => {
    const { dispatch } = store;

    dispatch(slice.actions.startLoading());
    try {
      const response: { data: { products: Project[] } } = await axios.get(
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
      // const response = await axios.get(REACT_APP_API_URL + 'businesses');

      dispatch(slice.actions.getProjectListSuccess(response.data));
      // console.log('aaaaa', response.data);
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
export function getProjectId(projectId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('t vo goi api ne');
      const response = await axios.get(
        `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects/${projectId}`
      );
      dispatch(slice.actions.getProjectListIDSuccess(response.data));
      console.log('t tra duoc data project o day', response.data);
    } catch (error) {
      console.log('t tra duoc loi data ne');
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

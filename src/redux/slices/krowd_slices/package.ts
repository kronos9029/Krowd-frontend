import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../../store';
// utils
import axios from 'axios';
import { Package } from '../../../@types/krowd/project';

// ----------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean;
  error: boolean;
  packageLists: {
    numOfPackage: number;
    listOfPackage: Package[];
  };
  projectPackageDetails: Package | null;
};

const initialState: ProjectState = {
  isLoading: false,
  error: false,
  packageLists: {
    numOfPackage: 0,
    listOfPackage: []
  },
  projectPackageDetails: null
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

    // GET MANAGE Package
    getProjectPackageSuccess(state, action) {
      state.isLoading = false;
      state.packageLists = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

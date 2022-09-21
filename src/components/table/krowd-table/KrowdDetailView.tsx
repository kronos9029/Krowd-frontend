import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getProjectListById } from '../../../redux/slices/krowd_slices/project';
import React from 'react';
// material
// redux
import { useDispatch, useSelector, RootState } from '../../../redux/store';
// routes
// hooks
// components

// ----------------------------------------------------------------------
export enum VIEW_DETAIL_DATA_TYPE {
  PROJECT = '/project'
}

export default function KrowdDetailView() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id = '' } = useParams();

  const getViewOf =
    pathname.includes(VIEW_DETAIL_DATA_TYPE.PROJECT) && VIEW_DETAIL_DATA_TYPE.PROJECT;
  const props = useSelector((state: RootState) => {
    switch (getViewOf) {
      case VIEW_DETAIL_DATA_TYPE.PROJECT:
        return state.project;
    }
  });

  const getData = () => {
    switch (getViewOf) {
      case VIEW_DETAIL_DATA_TYPE.PROJECT: {
        dispatch(getProjectListById(id));
        return;
      }
      default:
        return null;
    }
  };

  const renderView = () => {
    switch (getViewOf) {
      case VIEW_DETAIL_DATA_TYPE.PROJECT: {
        // const { activeFieldId: item, isLoading } = props as FieldState;
        // return item && <FieldNewForm currentField={item} />;
      }
    }
  };
  useEffect(() => {
    getData();
  }, [dispatch]);

  return <>{renderView()}</>;
}

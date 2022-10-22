import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD, PATH_DASHBOARD_PROJECT, PATH_PAGE } from '../../routes/paths';
import { DATA_TYPE, KrowdReport, RowData } from './krowd-table/KrowdReport';
import { getProjectListInvested } from '../../redux/slices/krowd_slices/project';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { PROJECT_STATUS } from '../../@types/krowd/project';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'name', label: 'DỰ ÁN', align: 'left' },
  { id: 'multiplier', label: 'SỐ TIỀN', align: 'center' },
  { id: '', label: 'Chi tiết', align: 'center' }
];

export default function ProjectReportRevenue() {
  const { projectListInvested } = useSelector((state: RootState) => state.project);
  const { isLoadingProjectListInvested, listOfProject: list } = projectListInvested;
  useEffect(() => {
    dispatch(getProjectListInvested());
  }, [dispatch]);

  console.log(list);
  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'idx',
            value: _idx + 1,
            type: DATA_TYPE.NUMBER
          },

          {
            name: 'name',
            value: _item.name,
            type: DATA_TYPE.TEXT
          },

          {
            name: 'sharedRevenue',
            value: `${_item.sharedRevenue} %`,
            type: DATA_TYPE.NUMBER
          }
        ]
      };
    });
  };
  return (
    <KrowdReport
      headingTitle="BÁO CÁO CHI TIẾT HẰNG NGÀY"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoadingProjectListInvested}
      // viewPath={PATH_PAGE.details}
      viewPath={PATH_DASHBOARD_PROJECT.project.root}
    />
  );
}

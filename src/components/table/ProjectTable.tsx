import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getProjectListInvested } from '../../redux/slices/krowd_slices/project';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: 'HÌNH ẢNH', align: '' },
  { id: 'name', label: 'DỰ ÁN', align: 'left' },
  { id: 'business.name', label: 'TÊN DOANH NGHIỆP', align: 'left' },
  { id: 'investedCapital', label: 'BẠN ĐẦU TƯ', align: 'center' },
  { id: 'investmentTargetCapital', label: 'MỤC TIÊU DỰ ÁN', align: 'center' },
  { id: 'multiplier', label: 'HỆ SỐ NHÂN', align: 'center' },
  { id: 'duration', label: 'SỐ KỲ', align: 'left' },
  { id: 'sharedRevenue', label: 'DOANH THU CHIA SẺ', align: 'left' },
  { id: 'remainAmount', label: 'VỐN MỤC TIÊU CÒN THIẾU', align: 'left' }
  // { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function ProjectTable() {
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
            name: 'image',
            value: _item.image,
            type: DATA_TYPE.IMAGE
          },
          {
            name: 'name',
            value: _item.name,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'business',
            value: _item.business.name,
            type: DATA_TYPE.LIST_TEXT
          },
          {
            name: 'investedCapital',
            value: _item.investedCapital,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: 'rgb(20, 183, 204)'
          },
          {
            name: 'investmentTargetCapital',
            value: _item.investmentTargetCapital,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: 'rgb(102, 187, 106)'
          },
          {
            name: 'multiplier',
            value: `${_item.multiplier} x`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'duration',
            value: `${_item.duration} kỳ`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'sharedRevenue',
            value: `${_item.sharedRevenue} %`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'remainAmount',
            value: _item.remainAmount,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: 'rgb(255, 127, 86)'
          }
        ]
      };
    });
  };
  return (
    <KrowdTable
      headingTitle="DANH SÁCH DỰ ÁN ĐẦU TƯ"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoadingProjectListInvested}
      // viewPath={PATH_DASHBOARD.business.details}
    />
  );
}

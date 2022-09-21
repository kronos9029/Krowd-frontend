import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getProjectList } from '../../redux/slices/krowd_slices/project';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { SeverErrorIllustration } from 'assets';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: 'HÌNH ẢNH', align: '' },
  { id: 'name', label: 'DỰ ÁN', align: 'left' },
  { id: 'business.name', label: 'TÊN DOANH NGHIỆP', align: 'left' },
  { id: 'investedCapital', label: 'VỐN ĐẦU TƯ', align: 'center' },
  { id: 'investmentTargetCapital', label: 'MỤC TIÊU VỐN ĐẦU TƯ', align: 'center' },
  { id: 'multiplier', label: 'HỆ SỐ NHÂN', align: 'center' },
  { id: 'duration', label: 'SỐ KÌ', align: 'left' },
  { id: 'sharedRevenue', label: 'DOANH THU CHIA SẺ', align: 'left' },
  { id: 'remainAmount', label: 'VỐN CÒN LẠI', align: 'left' },
  { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function ProjectTable() {
  const { ProjectState } = useSelector((state: RootState) => state.project);
  const { projectList, isLoading } = ProjectState;
  const { listOfProject: list } = projectList;

  useEffect(() => {
    dispatch(getProjectList());
  }, [dispatch]);

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
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'investmentTargetCapital',
            value: _item.investmentTargetCapital,
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(102, 187, 106)'
          },
          {
            name: 'multiplier',
            value: _item.multiplier,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'duration',
            value: _item.duration,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'sharedRevenue',
            value: _item.sharedRevenue,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'remainAmount',
            value: _item.remainAmount,
            type: DATA_TYPE.NUMBER
          }
        ]
      };
    });
  };
  return (
    <KrowdTable
      headingTitle="Các dự án đang đầu tư"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      // viewPath={PATH_DASHBOARD.business.details}
    />
  );
}

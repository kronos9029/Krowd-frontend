import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getProjectListInvested } from '../../redux/slices/krowd_slices/project';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { PROJECT_STATUS } from '../../@types/krowd/project';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: 'HÌNH ẢNH', align: '' },
  { id: 'name', label: 'DỰ ÁN', align: 'left' },
  { id: 'investedAmount', label: 'BẠN ĐẦU TƯ', align: 'center' },
  { id: 'receivedAmount', label: 'SỐ TIỀN NHẬN ĐƯỢC', align: 'center' },
  { id: 'lastestInvestmentDate', label: 'NGÀY ĐẦU TƯ', align: 'center' },
  { id: 'multiplier', label: 'HỆ SỐ NHÂN', align: 'center' },
  { id: 'duration', label: 'SỐ KỲ', align: 'left' },
  { id: 'sharedRevenue', label: 'DOANH THU CHIA SẺ', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI DỰ ÁN', align: 'left' },
  { id: '', label: 'Chi tiết', align: 'center' }
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
          // {
          //   name: 'business',
          //   value: _item.business.name,
          //   type: DATA_TYPE.LIST_TEXT
          // },
          {
            name: 'investedAmount',
            value: _item.investedAmount,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: 'rgb(20, 183, 204)'
          },
          {
            name: 'receivedAmount',
            value: _item.receivedAmount,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: 'green'
          },
          {
            name: 'lastestInvestmentDate',
            value: _item.lastestInvestmentDate,
            type: DATA_TYPE.TEXT
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
            name: 'status',
            value:
              (_item.status === PROJECT_STATUS.CALLING_FOR_INVESTMENT && 'Đang kêu gọi đầu tư') ||
              (_item.status === PROJECT_STATUS.OVERDATE && 'Quá hạn đầu tư') ||
              (_item.status === PROJECT_STATUS.ACTIVE && 'Đang hoạt động'),
            type: DATA_TYPE.TEXT,
            textColor:
              _item.status === 'CALLING_FOR_INVESTMENT'
                ? '#14b7cc'
                : 'green' || _item.status === 'OVERDATE'
                ? 'red'
                : 'green'
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
      viewPath={PATH_PAGE.details}
    />
  );
}

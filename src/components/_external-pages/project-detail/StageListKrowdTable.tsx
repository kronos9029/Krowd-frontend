import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../../table/krowd-table/KrowdTable';
import stage, {
  getAllProjectStage,
  getProjectStageID,
  getProjectStageList
} from 'redux/slices/krowd_slices/stage';
import editTwotone from '@iconify/icons-ant-design/edit-twotone';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  TextField,
  Autocomplete,
  DialogActions,
  Stack,
  Button,
  Box,
  Tooltip,
  Container
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import { REACT_APP_API_URL } from 'config';
import { Project1 } from '../../../@types/krowd/project';
const TABLE_HEAD = [
  { id: 'name', label: 'GIAI ĐOẠN', align: 'left' },
  { id: 'Optimistic_Expected_Amount', label: 'LẠC QUAN', align: 'left' },
  { id: 'Normal_Expected_Amount', label: 'BÌNH THƯỜNG', align: 'left' },
  { id: 'Pessimistic_Expected_Amount', label: 'BI QUAN', align: 'left' },
  { id: 'Optimistic_Expected_Ratio', label: 'LẠC QUAN', align: 'left' },
  { id: 'Normal_Expected_Ratio', label: 'BÌNH THƯỜNG', align: 'left' },
  { id: 'Pessimistic_Expected_Ratio', label: 'BI QUAN', align: 'left' }
];

export default function StageListKrowdTable({ project }: { project: Project1 }) {
  const { isLoading, projectStageList } = useSelector((state: RootState) => state.stage);
  const { listOfStage: list } = projectStageList;
  const { stageDetail } = useSelector((state: RootState) => state.stage);

  const getData = (): RowData[] => {
    if (!list) return [];
    return list.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'name',
            value: `${_item.name}`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'Optimistic_Expected_Amount',
            value: `${_item.optimisticExpectedAmount} VND`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'Normal_Expected_Amount',
            value: `${_item.normalExpectedAmount} VND`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'Pessimistic_Expected_Amount',
            value: `${_item.pessimisticExpectedAmount} VND`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'Optimistic_Expected_Ratio',
            value: `${_item.optimisticExpectedRatio} %`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'Normal_Expected_Ratio',
            value: `${_item.normalExpectedRatio} %`,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'Pessimistic_Expected_Ratio',
            value: `${_item.pessimisticExpectedRatio} %`,
            type: DATA_TYPE.TEXT
          }
        ]
      };
    });
  };

  return (
    <Container maxWidth={'lg'}>
      <KrowdTable
        headingTitle="Danh sách thống kê các kỳ"
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
      />
      <Typography sx={{ my: 2 }} variant="body2">
        * Đơn vị doanh thu VND và tỉ lệ sẽ là phần trăm (%)
      </Typography>
      <Typography sx={{ my: 2 }} variant="body2">
        * Số liệu chỉ mang tính chất tham khảo
      </Typography>
    </Container>
  );
}

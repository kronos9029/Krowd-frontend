import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import codeFill from '@iconify/icons-eva/close-fill';

import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';

import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import { DATA_TYPE, KrowdReport, RowData } from './krowd-table/KrowdReport';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getBillDailyReport } from 'redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'invoiceId', label: 'MÃ ĐƠN HÀNG', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'createBy', label: 'NGƯỜI CẬP NHẬT', align: 'center' },
  { id: 'description', label: 'MÔ TẢ ĐƠN', align: 'left' },
  { id: '', label: '', align: 'left' }
];
const LabelStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function ProjectBillDailyReport() {
  const { dailyReportState } = useSelector((state: RootState) => state.transactionKrowd);

  const { biilDailyReportState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, listOfBill: list, numOfBill } = biilDailyReportState;

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize1, setPageSize1] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [dataExcel, setDataExcel] = useState<any>();

  const DailyID = localStorage.getItem('DailyId');

  useEffect(() => {
    dispatch(getBillDailyReport(localStorage?.getItem('DailyId') ?? '', pageIndex ?? 1));
  }, [pageIndex]);

  const { enqueueSnackbar } = useSnackbar();

  const handlePre = () => {
    setPageIndex(pageIndex - 1);
    setPageSize(pageSize - 8);
    setPageSize1(pageSize1 - 8);
  };
  const handleNext = () => {
    setPageIndex(pageIndex + 1);
    setPageSize1(pageSize1 + 8);
    setPageSize(pageSize + 8);
  };

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
            name: 'invoiceId',
            value: _item.invoiceId,
            type: DATA_TYPE.NUMBER
          },

          {
            name: 'amount',
            value: `${_item.amount} đ`,
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'createBy',
            value: _item.createBy,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'description',
            value: _item.description === '' ? 'Không có mô tả' : _item.description,
            type: DATA_TYPE.TEXT
          }
        ]
      };
    });
  };
  return (
    <>
      <KrowdReport
        headingTitle={`THỐNG KÊ ĐƠN HÀNG ${list[0]?.createDate.toString().substring(0, 11) ?? ''}`}
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
      />
      <Box sx={{ my: 5 }} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
        {pageSize1} {'-'}
        {pageSize} trên {numOfBill}
        {pageIndex > 1 ? (
          <Button onClick={handlePre}>Trước</Button>
        ) : (
          <Button disabled onClick={handlePre}>
            Trước
          </Button>
        )}
        {pageSize < numOfBill ? (
          <Button onClick={handleNext}>Sau</Button>
        ) : (
          <Button disabled onClick={handleNext}>
            Sau
          </Button>
        )}
      </Box>
    </>
  );
}

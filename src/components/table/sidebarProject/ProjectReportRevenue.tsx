import React, { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD_PROJECT, PATH_PAGE } from '../../../routes/paths';
import { ACTION_TYPE, DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import { useNavigate } from 'react-router';
import eyeFill from '@iconify/icons-eva/eye-fill';
import ProjectBillDailyReport from './ProjectBillDailyReport';
import { Box, Button, Card } from '@mui/material';
import { getDailyReportProjectID } from '../../../redux/slices/krowd_slices/transaction';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'amount', label: 'TÊN ', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'reportDate', label: 'NGÀY BÁO CÁO', align: 'center' },
  { id: 'updateBy', label: 'CẬP NHẬT', align: 'center' },
  { id: '', label: 'CHI TIẾT', align: 'center' }
];

export default function ProjectReportRevenue() {
  const { dailyReportState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, listOfDailyReport: list, numOfDailyReport } = dailyReportState;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [openBill, setOpenBill] = useState(false);
  const navigate = useNavigate();

  const handleClickView = () => {
    setOpenBill(true);
  };
  useEffect(() => {
    dispatch(getDailyReportProjectID(localStorage.getItem('projectId') ?? '', pageIndex ?? 1, 5));
  }, [dispatch, pageIndex]);

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
            name: 'stageName',
            value: _item.stageName,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'amount',
            value: `${_item.amount} đ`,
            type: DATA_TYPE.NUMBER_FORMAT
          },

          {
            name: 'reportDate',
            value: _item.reportDate.toString().substring(0, 11),
            type: DATA_TYPE.DATE
          },
          {
            name: 'updateBy',
            value:
              (_item.updateBy === 'Client' && 'Đã cập nhật') ||
              (_item.updateBy === null && 'Chưa cập nhật') ||
              (_item.updateBy === 'WAITING_TO_ACTIVATE' && 'Đang chờ hoạt động') ||
              (_item.updateBy === 'CALLING_TIME_IS_OVER' && 'Đã quá hạn đầu tư') ||
              (_item.updateBy === 'CALLING_FOR_INVESTMENT' && 'Đang kêu gọi đầu tư') ||
              (_item.updateBy === 'WAITING_TO_PUBLISH' && 'Đang chờ công khai') ||
              (_item.updateBy === 'DENIED' && 'Đã bị từ chối') ||
              (_item.updateBy === 'WAITING_FOR_APPROVAL' && 'Đang chờ duyệt') ||
              (_item.updateBy === 'DRAFT' && 'Bản nháp'),
            type: DATA_TYPE.TEXT_FORMAT,
            textColor:
              (_item.updateBy === 'Client' && 'green') ||
              (_item.updateBy === 'null' && 'red') ||
              (_item.updateBy === 'null' ? 'red' : 'red')
          }
        ]
      };
    });
  };
  return (
    <>
      <KrowdTable
        headingTitle="BÁO CÁO DOANH THU HẰNG NGÀY"
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        viewReportRevenue={() => handleClickView()}
        paging={{
          pageIndex,
          pageSize: pageSize,
          numberSize: numOfDailyReport,

          handleNext() {
            setPageIndex(pageIndex + 1);
          },
          handlePrevious() {
            setPageIndex(pageIndex - 1);
          }
        }}
      />
      {openBill && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color={'error'} onClick={() => setOpenBill(false)}>
              Đóng lại
            </Button>
          </Box>
          <ProjectBillDailyReport />
        </Card>
      )}
    </>
  );
}

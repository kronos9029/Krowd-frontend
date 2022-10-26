import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD, PATH_DASHBOARD_PROJECT, PATH_PAGE } from '../../routes/paths';
import { DATA_TYPE, KrowdReport, RowData } from './krowd-table/KrowdReport';
import { Box, Button, Container, Typography } from '@mui/material';
import { getDailyReportProjectID } from 'redux/slices/krowd_slices/transaction';
import { useNavigate } from 'react-router';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'reportDate', label: 'NGÀY BÁO CÁO', align: 'center' },
  { id: 'updateBy', label: 'CẬP NHẬT', align: 'center' },
  { id: '', label: '', align: 'center' }
];

export default function ProjectReportRevenue() {
  const { dailyReportState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, listOfDailyReport: list, numOfDailyReport } = dailyReportState;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize1, setPageSize1] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const navigate = useNavigate();

  const handleClickView = async () => {
    navigate(PATH_DASHBOARD_PROJECT.project.billDailyReport);
  };
  useEffect(() => {
    dispatch(getDailyReportProjectID(localStorage.getItem('projectId') ?? '', pageIndex ?? 1));
  }, [dispatch, pageIndex]);

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
              (_item.updateBy === 'Client' && 'Client') ||
              (_item.updateBy === null && 'Chưa cập nhật') ||
              (_item.updateBy === 'WAITING_TO_ACTIVATE' && 'Đang chờ hoạt động') ||
              (_item.updateBy === 'CALLING_TIME_IS_OVER' && 'Đã quá hạn đầu tư') ||
              (_item.updateBy === 'CALLING_FOR_INVESTMENT' && 'Đang kêu gọi đầu tư') ||
              (_item.updateBy === 'WAITING_TO_PUBLISH' && 'Đang chờ công khai') ||
              (_item.updateBy === 'DENIED' && 'Đã bị từ chối') ||
              (_item.updateBy === 'WAITING_FOR_APPROVAL' && 'Đang chờ duyệt') ||
              (_item.updateBy === 'DRAFT' && 'Bản nháp'),
            type: DATA_TYPE.TEXT_FORMAT
          }
        ]
      };
    });
  };
  return (
    <>
      <KrowdReport
        headingTitle="BÁO CÁO DOANH THU HẰNG NGÀY"
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        // viewPath={PATH_PAGE.details}
        viewPath={() => handleClickView()}
      />
      <Box sx={{ my: 5 }} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
        {pageSize1} {'-'}
        {pageSize} trên {numOfDailyReport}
        {pageIndex > 1 ? (
          <Button onClick={handlePre}>Trước</Button>
        ) : (
          <Button disabled onClick={handlePre}>
            Trước
          </Button>
        )}
        {pageSize < numOfDailyReport ? (
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

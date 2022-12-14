import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD_PROJECT, PATH_PAGE } from '../../routes/paths';
import { ACTION_TYPE, DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getProjectListInvested } from '../../redux/slices/krowd_slices/project';
import eyeFill from '@iconify/icons-eva/eye-fill';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'image', label: '', align: '' },
  { id: 'name', label: 'DỰ ÁN', align: 'left' },
  { id: 'investedAmount', label: 'ĐÃ ĐẦU TƯ', align: 'center' },
  { id: 'multiplier', label: 'HỆ SỐ NHÂN', align: 'center' },
  { id: 'duration', label: 'SỐ KỲ', align: 'left' },
  { id: 'sharedRevenue', label: 'DOANH THU CHIA SẺ', align: 'left' },
  { id: 'lastestInvestmentDate', label: 'NGÀY ĐẦU TƯ', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: '', label: 'Chi tiết', align: 'center' }
];
const action = [
  {
    nameAction: 'view',
    action: PATH_DASHBOARD_PROJECT.project.root,
    icon: eyeFill,
    color: '#14b7cc',
    type: ACTION_TYPE.LINK
  }
];
export default function ProjectTable() {
  const { projectListInvested } = useSelector((state: RootState) => state.project);
  const { isLoadingProjectListInvested, listOfProject: list, numOfProject } = projectListInvested;

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(getProjectListInvested(pageIndex, 5));
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
            name: 'image',
            value: _item.image,
            type: DATA_TYPE.IMAGE
          },
          {
            name: 'name',
            value: _item.name,
            type: DATA_TYPE.TEXT,
            textColor:
              (_item.status === 'CALLING_FOR_INVESTMENT' && '#14b7cc') ||
              (_item.status === 'DRAFT' && 'black') ||
              (_item.status === 'WAITING_FOR_APPROVAL' && '#eacb00') ||
              (_item.status === 'WAITING_TO_ACTIVATE' && '#4dc0b5') ||
              (_item.status === 'ACTIVE' && 'green') ||
              (_item.status === 'WAITING_TO_PUBLISH' && '#f66d9b') ||
              (_item.status === 'CLOSED' && '#6574cd') ||
              (_item.status === 'DENIED' && 'red') ||
              (_item.status === 'CALLING_TIME_IS_OVER' ? 'red' : 'black')
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
            name: 'multiplier',
            value: `${_item.multiplier} x`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'duration',
            value: `${_item.numOfStage} kỳ`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'sharedRevenue',
            value: `${_item.sharedRevenue} %`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'lastestInvestmentDate',
            value: _item.lastestInvestmentDate,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value:
              (_item.status === 'CLOSED' && 'Đã đóng') ||
              (_item.status === 'ACTIVE' && 'Đang hoạt động') ||
              (_item.status === 'WAITING_TO_ACTIVATE' && 'Đang chờ hoạt động') ||
              (_item.status === 'CALLING_TIME_IS_OVER' && 'Đã quá hạn đầu tư') ||
              (_item.status === 'CALLING_FOR_INVESTMENT' && 'Đang kêu gọi đầu tư') ||
              (_item.status === 'WAITING_TO_PUBLISH' && 'Đang chờ công khai') ||
              (_item.status === 'DENIED' && 'Đã bị từ chối') ||
              (_item.status === 'WAITING_FOR_APPROVAL' && 'Đang chờ duyệt') ||
              (_item.status === 'DRAFT' && 'Bản nháp'),
            type: DATA_TYPE.TEXT,
            textColor:
              (_item.status === 'CALLING_FOR_INVESTMENT' && '#14b7cc') ||
              (_item.status === 'DRAFT' && 'black') ||
              (_item.status === 'WAITING_FOR_APPROVAL' && '#eacb00') ||
              (_item.status === 'WAITING_TO_ACTIVATE' && '#4dc0b5') ||
              (_item.status === 'ACTIVE' && 'green') ||
              (_item.status === 'WAITING_TO_PUBLISH' && '#f66d9b') ||
              (_item.status === 'CLOSED' && '#6574cd') ||
              (_item.status === 'DENIED' && 'red') ||
              (_item.status === 'CALLING_TIME_IS_OVER' ? 'red' : 'black')
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
      // viewPath={PATH_PAGE.details}
      actionsButton={action}
      paging={{
        pageIndex,
        pageSize: pageSize,
        numberSize: numOfProject,

        handleNext() {
          setPageIndex(pageIndex + 1);
        },
        handlePrevious() {
          setPageIndex(pageIndex - 1);
        }
      }}
    />
  );
}

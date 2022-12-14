import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getInvestmentProjectID } from 'redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'projectId', label: 'DỰ ÁN', align: 'center' },
  { id: 'investor', label: 'NHÀ ĐẦU TƯ', align: 'center' },
  { id: 'totalPrice', label: 'SỐ TIỀN', align: 'center' },
  { id: 'packageId', label: 'GÓI ĐẦU TƯ', align: 'center' },
  { id: 'packageId', label: 'GIÁ GÓI', align: 'center' },
  { id: 'packageId', label: 'SỐ LƯỢNG', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'center' },
  { id: 'status', label: 'NGÀY ĐẦU TƯ', align: 'center' },
  { id: '', label: '', align: 'left' }
];
export default function InvestmentTable() {
  const { investmentState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, listOfInvestment: list, numOfInvestment, filterCount } = investmentState;
  const projectId = localStorage.getItem('projectId');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getInvestmentProjectID(projectId ?? '', pageIndex, 5));
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
            name: 'projectName',
            value: _item.projectName,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'investorName',
            value: _item.investorName,
            type: DATA_TYPE.TEXT_FORMAT
          },

          {
            name: 'totalPrice',
            value: `${_item.totalPrice} đ`,
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'packageName',
            value: _item.packageName,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'packagePrice',
            value: `${_item.packagePrice} đ`,
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'quantity',
            value: `${_item.quantity} gói`,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'status',
            value:
              (_item.status === 'SUCCESS' && 'Đầu tư thành công') ||
              (_item.status === 'FAILED' && 'Đầu tư thất bại') ||
              (_item.status === 'CANCELLED' && 'Hủy bỏ đầu tư') ||
              (_item.status === 'WAITING' && 'Chờ xử lý'),
            type: DATA_TYPE.NUMBER,
            textColor:
              (_item.status === 'SUCCESS' && 'green') ||
              (_item.status === 'CANCELLED' && 'red') ||
              (_item.status === 'WAITING' && '#eacb00') ||
              (_item.status === 'FAILED' ? 'red' : 'black')
          },
          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.TEXT_FORMAT
          }
        ]
      };
    });
  };
  return (
    <>
      <KrowdTable
        headingTitle={`GIAO DỊCH ĐẦU TƯ`}
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        paging={{
          pageIndex,
          pageSize: pageSize,
          numberSize: numOfInvestment,

          handleNext() {
            setPageIndex(pageIndex + 1);
          },
          handlePrevious() {
            setPageIndex(pageIndex - 1);
          }
        }}
        // viewPath={PATH_DASHBOARD.business.details}
      />
    </>
  );
}

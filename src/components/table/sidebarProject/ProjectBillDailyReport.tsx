import { useEffect, useState } from 'react';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getBillDailyReport } from 'redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'createBy', label: 'NGƯỜI CẬP NHẬT', align: 'center' },
  { id: 'createBy', label: 'THỜI GIAN BÁO CÁO', align: 'center' },
  { id: 'description', label: 'MÔ TẢ ĐƠN', align: 'left' },
  { id: '', label: '', align: 'left' }
];

export default function ProjectBillDailyReport() {
  const { biilDailyReportState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, listOfBill: list, numOfBill } = biilDailyReportState;

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    dispatch(getBillDailyReport(localStorage?.getItem('DailyId') ?? '', pageIndex ?? 1));
    window.scrollTo(0, 12500);
  }, [pageIndex]);

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
            name: 'createBy',
            value: _item.createBy,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'createDate',
            value: _item.createDate,
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
      <KrowdTable
        headingTitle={`THỐNG KÊ ĐƠN HÀNG ${list[0]?.createDate.toString().substring(0, 11) ?? ''}`}
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        paging={{
          pageIndex,
          pageSize: pageSize,
          numberSize: numOfBill,

          handleNext() {
            setPageIndex(pageIndex + 1);
            setPageSize(pageSize + 5);
          },
          handlePrevious() {
            setPageIndex(pageIndex - 1);
            setPageSize(pageSize - 5);
          }
        }}
      />
    </>
  );
}

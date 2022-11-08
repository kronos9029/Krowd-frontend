import React, { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';
import { fCurrency } from '../../../utils/formatNumber';
import { getPeriodRevenueReportList } from '../../../redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'periodRevenueId', label: 'MÃ DOANH THU', align: 'left' },
  { id: 'name', label: 'TÊN GIAI ĐOẠN', align: 'left' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'RIGHT' },
  { id: 'description', label: 'MÔ TẢ', align: 'RIGHT' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'center' }
];

export default function PeriodRevenueHistoryTable() {
  const { periodRevenueState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, PeriodRevenueList: list } = periodRevenueState;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getPeriodRevenueReportList(pageIndex, pageSize));
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
            name: 'idx',
            value: _item.periodRevenueId,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'name',
            value: _item.name,
            type: DATA_TYPE.TEXT
          },

          {
            name: 'amount',
            value: `${fCurrency(_item.amount)}`,
            type: DATA_TYPE.NUMBER_FORMAT
          },

          {
            name: 'description',
            value: _item.description,
            type: DATA_TYPE.TEXT
          },

          {
            name: 'createDate',
            value: _item.createDate,
            type: DATA_TYPE.DATE
          }
          // {
          //   name: 'status',
          //   value: _item.status === 'SUCCESS' ? 'Mua thành công' : 'Mua thất bại',
          //   type: DATA_TYPE.TEXT,
          //   textColor: _item.status === 'SUCCESS' ? 'rgb(102, 187, 106)' : 'red'
          // }
        ]
      };
    });
  };

  return (
    <KrowdTable
      headingTitle="Lịch sử doanh thu giai đoạn"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      paging={{
        pageIndex,
        pageSize: pageSize,
        numberSize: 10,

        handleNext() {
          setPageIndex(pageIndex + 1);
          setPageSize(pageSize + 5);
        },
        handlePrevious() {
          setPageIndex(pageIndex - 1);
          setPageSize(pageSize - 5);
        }
      }}
      // viewPath={PATH_DASHBOARD.business.details}
    />
  );
}

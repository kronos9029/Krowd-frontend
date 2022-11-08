import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import {
  getInvestmentProjectID,
  getWalletTransactionList
} from 'redux/slices/krowd_slices/transaction';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'id', label: 'MÃ GIAO DỊCH', align: 'left' },
  { id: 'quantity', label: 'SỐ LƯỢNG GÓI', align: 'left' },
  { id: 'totalPrice', label: 'TỔNG', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' }
];

export default function InvestmentTable() {
  const { investmentState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, investmentList: list } = investmentState;
  const projectId = localStorage.getItem('projectId');
  useEffect(() => {
    dispatch(getInvestmentProjectID(projectId ?? ''));
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
            name: 'id',
            value: _item.id,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'quantity',
            value: _item.quantity,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'totalPrice',
            value: _item.totalPrice,
            type: DATA_TYPE.NUMBER_FORMAT
          },

          {
            name: 'status',
            value: `${_item.status === 'SUCCESS' ? 'Giao dịch thành công' : 'Giao dịch thất bại'}`,
            type: DATA_TYPE.TEXT,
            textColor: `${_item.status === 'SUCCESS' ? 'green' : 'red'}`
          }
        ]
      };
    });
  };
  return (
    <>
      <KrowdTable
        headingTitle={`DANH SÁCH GIAO DỊCH ĐẦU TƯ`}
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        // viewPath={PATH_DASHBOARD.business.details}
      />
    </>
  );
}

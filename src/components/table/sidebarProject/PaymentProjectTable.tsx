import React, { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from '../krowd-table/KrowdTable';

import { useParams } from 'react-router';
import { Button, Grid } from '@mui/material';
import {
  getAllPaymentList,
  getAllPaymentListRevenue
} from '../../../redux/slices/krowd_slices/transaction';

const TABLE_HEAD_REVENUE = [
  { id: 'packageName', label: 'KỲ', align: 'center' },
  { id: 'fromWalletName', label: 'VÀO VÍ', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'description', label: 'MÔ TẢ GIAO DỊCH', align: 'center' },
  { id: 'description', label: 'TRẠNG THÁI', align: 'center' },
  { id: '', label: '', align: 'center' }
];
export default function PaymentProjectTable() {
  const { paymentListState, paymentListRevenueState } = useSelector(
    (state: RootState) => state.transactionKrowd
  );
  const {
    isLoadingPeriodRevenue,
    listOfPeriodRevenuePayment: listPeriodRevenue,
    numOfPayment: numberOfRevenue
  } = paymentListRevenueState;
  const [pageIndex2, setPageIndex2] = useState(1);
  const [pageSize2, setPageSize2] = useState(10);
  useEffect(() => {
    dispatch(getAllPaymentListRevenue(pageIndex2, 10, `${localStorage.getItem('projectId')}`));
  }, [dispatch, pageIndex2]);

  const getData = (): RowData[] => {
    if (!listPeriodRevenue) return [];
    return listPeriodRevenue.map<RowData>((_item, _idx) => {
      return {
        id: _item.id,
        items: [
          {
            name: 'stageName',
            value: _item.stageName,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'fromWalletName',
            value: _item.fromWalletName,
            type: DATA_TYPE.NUMBER
          },

          {
            name: 'amount',
            value: _item.amount,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: 'rgb(102, 187, 106)'
          },
          {
            name: 'description',
            value: _item.description,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'status',
            value: _item.status === 'SUCCESS' ? 'Thành công' : 'Thất bại',
            type: DATA_TYPE.NUMBER,
            textColor: _item.status === 'SUCCESS' ? 'rgb(102, 187, 106)' : 'red'
          }
        ]
      };
    });
  };
  return (
    <>
      <KrowdTable
        headingTitle="LỊCH SỬ NHẬN THANH TOÁN"
        header={TABLE_HEAD_REVENUE}
        getData={getData}
        isLoading={isLoadingPeriodRevenue}
        paging={{
          pageIndex: pageIndex2,
          pageSize: pageSize2,
          numberSize: numberOfRevenue,

          handleNext() {
            setPageIndex2(pageIndex2 + 1);
          },
          handlePrevious() {
            setPageIndex2(pageIndex2 - 1);
          }
        }}
      />
    </>
  );
}

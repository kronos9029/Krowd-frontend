import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { getTransactionList } from 'redux/slices/krowd_slices/transaction';
import useAuth from 'hooks/useAuth';
import { TRANSACTION_STATUS_ENUM } from '../../@types/krowd/transaction';
import { Icon } from '@iconify/react';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  //   { id: 'fromUserId', label: 'TỪ', align: '' },
  //   { id: 'payType', label: 'LOẠI HÌNH THANH TOÁN', align: 'center' },
  { id: 'orderType', label: 'PHƯƠNG THỨC', align: 'left' },
  //   { id: 'orderId', label: 'BẠN ĐẦU TƯ', align: 'center' },
  { id: 'transId', label: 'MÃ GIAO DỊCH', align: 'center' },
  { id: 'type', label: 'LOẠI GIAO DỊCH', align: 'left' },
  { id: 'message', label: 'TRẠNG THÁI', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'left' }
  // { id: '', label: 'THAO TÁC', align: 'center' }
];
const BUSINESS_STATUS = [{ status: TRANSACTION_STATUS_ENUM.SUCCESS, color: 'rgb(102, 187, 106)' }];

// const BUSINESS_STATUS = [
//   {
//     message: TRANSACTION_STATUS_ENUM.SUCCESS,
//     color: 'rgb(102, 187, 106)',
//     name: 'SUCCESS'
//   },
//   {
//     message: TRANSACTION_STATUS_ENUM.USER_DENIED,
//     color: 'red',
//     name: 'Giao dich bi tu choi boi nguoi dung.'
//   }
// ];

export default function AccounTransactionTable() {
  const { investorKrowdDetail } = useSelector((state: RootState) => state.user_InvestorStateKrowd);
  const { transactionState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, TransactionList: list } = transactionState;
  useEffect(() => {
    dispatch(getTransactionList());
  }, [dispatch]);

  console.log(list);
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
          //   {
          //     name: 'fromUserId',
          //     value: `${investorKrowdDetail?.lastName} ${investorKrowdDetail?.firstName}`,
          //     type: DATA_TYPE.TEXT
          //   },
          //   {
          //     name: 'fromUserId',
          //     value: _item.fromUserId,
          //     type: DATA_TYPE.TEXT
          //   },
          //   {
          //     name: 'payType',
          //     value: _item.payType,
          //     type: DATA_TYPE.TEXT
          //   },
          {
            name: 'orderType',
            value: '',
            type: DATA_TYPE.ICONS
          },

          // {
          //   name: 'orderType',
          //   value: _item.orderType === 'momo_wallet' ? 'Ví momo' : 'VN PAY',
          //   type: DATA_TYPE.TEXT
          // },
          {
            name: 'transId',
            value: _item.transId,
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(20, 183, 204)'
          },
          {
            name: 'type',
            value: _item.type === 'Top-up' ? 'Nạp tiền vào ví' : 'Chuyển tiền',
            type: DATA_TYPE.TEXT,
            textColor: _item.message === 'Giao dịch thành công.' ? 'rgb(102, 187, 106)' : 'red'
          },

          {
            name: 'message',
            value: _item.message,
            type: DATA_TYPE.LABLE
            // textColor: _item.message === 'Giao dịch thành công.' ? 'rgb(102, 187, 106)' : 'red'
            // textMapColor: BUSINESS_STATUS
          },
          {
            name: 'amount',
            value:
              _item.message === 'Giao dịch thành công.' ? `${_item.amount}` : `${_item.amount}`,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: _item.message === 'Giao dịch thành công.' ? 'rgb(102, 187, 106)' : 'red'
          },
          {
            name: 'createDate',
            value: _item.createDate.toString().substring(0, 11),
            type: DATA_TYPE.DATE,
            textColor: 'rgb(102, 187, 106)'
          }
        ]
      };
    });
  };
  return (
    <KrowdTable
      headingTitle="DANH SÁCH CÁC GIAO DỊCH"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      // viewPath={PATH_DASHBOARD.business.details}
    />
  );
}

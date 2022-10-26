import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import {
  getTransactionList,
  getWithdrawRequestTransactionList
} from 'redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'bankName', label: 'TÊN NGÂN HÀNG', align: 'center' },
  { id: 'bankAccount', label: 'TÀI KHOẢN', align: 'center' },
  { id: 'accountName', label: 'CHỦ TÀI KHOẢN', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'left' },
  { id: 'description', label: 'MÔ TẢ', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'center' }
];

export default function AccountTransactionWithDrawTable() {
  const { transactionWithdrawState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, TransactionWithdrawList: list } = transactionWithdrawState;
  useEffect(() => {
    dispatch(getWithdrawRequestTransactionList(localStorage.getItem('userId') ?? ''));
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
            name: 'bankName',
            value: _item.bankName,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'bankAccount',
            value: _item.bankAccount,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'accountName',
            value: _item.accountName,
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(20, 183, 204)'
          },

          {
            name: 'amount',
            value: _item.amount,
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'description',
            value: _item.description === 'Withdraw Money' ? 'Rút tiền' : 'Thất bại',
            type: DATA_TYPE.TEXT,
            textColor: 'rgb(102, 187, 106)'
          },
          {
            name: 'status',
            value:
              (_item.status === 'PENDING' && 'Gửi yêu cầu rút tiền') ||
              (_item.status === 'Transfer from I2 to I3' &&
                'Chuyển tiền từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              (_item.status === 'Receive from I2 to I3 ' &&
                'Nhận tiền từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              _item.status === 'Receive money from I1 to I2',
            type: DATA_TYPE.TEXT,
            textColor: 'rgb(102, 187, 106)'
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
      headingTitle="GIAO DỊCH RÚT TIỀN"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
    />
  );
}

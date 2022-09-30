import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getWalletTransactionList } from 'redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  //   { id: 'fromUserId', label: 'TỪ', align: '' },
  //   { id: 'payType', label: 'LOẠI HÌNH THANH TOÁN', align: 'center' },
  { id: 'paymentId', label: 'MÃ THANH TOÁN', align: 'left' },
  { id: 'projectWalletId', label: 'VÍ DỰ ÁN', align: 'left' },
  { id: 'investorWalletId', label: 'VÍ NHÀ ĐẦU TƯ', align: 'left' },
  //   { id: 'orderId', label: 'BẠN ĐẦU TƯ', align: 'center' },
  { id: 'type', label: 'LOẠI GIAO DỊCH', align: 'left' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'message', label: 'TRẠNG THÁI', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'left' }
  // { id: '', label: 'THAO TÁC', align: 'center' }
];

export default function WalletTransactionTable() {
  const { investorKrowdDetail } = useSelector((state: RootState) => state.user_InvestorStateKrowd);
  const { walletTransactionState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, walletTransactionList: list } = walletTransactionState;
  useEffect(() => {
    dispatch(getWalletTransactionList());
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
          {
            name: 'paymentId',
            value: _item.paymentId,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'projectWalletId',
            value: _item.projectWalletId,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'investorWalletId',
            value: _item.investorWalletId,
            type: DATA_TYPE.TEXT
          },
          {
            name: 'type',
            value: _item.type,
            type: DATA_TYPE.TEXT,
            textColor: 'rgb(102, 187, 106)'
          },

          {
            name: 'amount',
            value: _item.amount,
            type: DATA_TYPE.NUMBER_FORMAT
          },
          {
            name: 'description',
            value: _item.description,
            type: DATA_TYPE.TEXT
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
      headingTitle="DANH SÁCH GIAO DỊCH VÍ"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      // viewPath={PATH_DASHBOARD.business.details}
    />
  );
}

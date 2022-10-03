import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getWalletTransactionList } from 'redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  //   { id: 'fromUserId', label: 'TỪ', align: '' },
  //   { id: 'payType', label: 'LOẠI HÌNH THANH TOÁN', align: 'center' },
  { id: 'id', label: 'MÃ GIAO DỊCH VÍ', align: 'left' },
  { id: 'type', label: 'LOẠI', align: 'left' },

  //   { id: 'orderId', label: 'BẠN ĐẦU TƯ', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'fee', label: 'PHÍ GIAO DỊCH', align: 'left' },

  { id: 'description', label: 'NỘI DUNG', align: 'center' },
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
            name: 'id',
            value: _item.id,
            type: DATA_TYPE.TEXT
          },

          {
            name: 'type',
            value: _item.type === 'CASH_IN' ? 'Tiền vào' : 'Tiền ra',
            type: DATA_TYPE.TEXT,
            textColor: _item.type === 'CASH_IN' ? 'green' : 'red'
          },

          {
            name: 'amount',
            value: _item.type === 'CASH_IN' ? `+ ${_item.amount}` : `- ${_item.amount}`,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: _item.type === 'CASH_IN' ? 'green' : 'red'
          },
          {
            name: 'fee',
            value: `${_item.fee} %`,
            type: DATA_TYPE.TEXT_FORMAT
          },
          {
            name: 'description',
            value:
              (_item.description === 'Transfer from I2 to I3 to invest' &&
                'Chuyển tiền từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              (_item.description === 'Investor deposit monney into I1 Wallet' &&
                'Nạp tiền vào VÍ TẠM THỜI') ||
              (_item.description === 'Investor transfer money from I1 wallet to I2 wallet' &&
                'Chuyển tiền từ VÍ ĐẦU TƯ CHUNG'),
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

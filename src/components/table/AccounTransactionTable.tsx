import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getTransactionList } from 'redux/slices/krowd_slices/transaction';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'orderType', label: 'NGUỒN TIỀN', align: 'center' },
  { id: 'transId', label: 'MÃ GIAO DỊCH', align: 'center' },
  { id: 'type', label: 'LOẠI GIAO DỊCH', align: 'center' },
  { id: 'type', label: 'PHƯƠNG THỨC THANH TOÁN', align: 'center' },
  { id: 'message', label: 'TRẠNG THÁI', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'center' }
];
const note = [
  {
    name: 'Lưu ý:'
  },
  {
    name: 'Khi giao dịch thành công số tiền của bạn sẽ được chuyển vào VÍ ĐẦU TƯ CHUNG'
  },
  {
    name: 'Nếu có bất kỳ thắc mắc xin vui lòng liên lạc với bộ phận hỗ trợ của KROWD tại 19007777'
  }
];
export default function AccounTransactionTable() {
  const { transactionState } = useSelector((state: RootState) => state.transactionKrowd);
  const { isLoading, listOfAccountTransaction: list, numOfAccountTransaction } = transactionState;

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getTransactionList(pageIndex, pageSize));
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
            name: 'orderType',
            value: '',
            type: _item.orderType === 'momo_wallet' ? DATA_TYPE.ICONS : DATA_TYPE.ICONSKROWD
          },
          {
            name: 'transId',
            value: _item.transId === '0' ? 'Hệ thống' : _item.transId,
            type: DATA_TYPE.NUMBER
          },
          {
            name: 'type',
            value:
              (_item.type === 'Top-up' && 'Nạp tiền vào ví') ||
              (_item.type === 'WITHDRAW' && 'Rút tiền') ||
              (_item.type === 'TOP-UP' && 'Nạp tiền vào ví') ||
              (_item.type === 'WAITING' && 'Chờ xử lý'),
            type: DATA_TYPE.NUMBER
          },

          {
            name: 'payType',
            value:
              (_item.payType === 'app' && 'Hệ thống') ||
              (_item.payType === '' && 'Quét mã Momo') ||
              (_item.payType === 'qr' && 'Quét mã Momo'),
            type: DATA_TYPE.NUMBER
          },

          {
            name: 'message',
            value: _item.message,
            type: DATA_TYPE.NUMBER,
            textColor:
              (_item.message === 'Giao dịch thành công.' && 'rgb(102, 187, 106)') ||
              (_item.message === 'Giao dịch thành công.' ? 'rgb(102, 187, 106)' : 'red')
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
            type: DATA_TYPE.NUMBER
          }
        ]
      };
    });
  };
  return (
    <KrowdTable
      headingTitle="GIAO DỊCH"
      header={TABLE_HEAD}
      getData={getData}
      isLoading={isLoading}
      noteTable={note}
      paging={{
        pageIndex,
        pageSize: pageSize,
        numberSize: numOfAccountTransaction,

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

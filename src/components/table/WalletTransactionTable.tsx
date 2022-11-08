import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getWalletTransactionList } from 'redux/slices/krowd_slices/transaction';
import { BlogPostsSearch } from 'components/_dashboard/project';
import { Box, Button, Grid, List, ListItemButton, ListItemText } from '@mui/material';
import { getWalletList } from 'redux/slices/krowd_slices/wallet';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'id', label: 'MÃ GIAO DỊCH VÍ', align: 'left' },
  { id: 'type', label: 'LOẠI', align: 'left' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'fee', label: 'PHÍ GIAO DỊCH', align: 'left' },
  { id: 'description', label: 'NỘI DUNG', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'left' }
];

export default function WalletTransactionTable() {
  const { investorKrowdDetail } = useSelector((state: RootState) => state.user_InvestorStateKrowd);
  const { walletTransactionState } = useSelector((state: RootState) => state.transactionKrowd);
  const {
    isLoading,
    listOfWalletTransaction: list,
    numOfWalletTransaction
  } = walletTransactionState;
  const [selectedFilter, setSelectFilter] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;
  useEffect(() => {
    dispatch(getWalletTransactionList('', pageIndex ?? '1', pageSize));
    dispatch(getWalletList());
  }, [dispatch, pageIndex]);
  const addToSelectedFilterList = async (newValue: string) => {
    setSelectFilter(newValue);
    await dispatch(getWalletTransactionList(newValue, pageIndex ?? '1', pageSize));
  };

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
            value:
              (_item.type === 'CASH_IN' && 'Tiền vào') ||
              (_item.type === 'CASH_OUT' && 'Tiền ra') ||
              (_item.type === 'DEPOSIT' && 'Nạp tiền') ||
              (_item.type === 'WITHDRAW' && 'Rút tiền'),
            type: DATA_TYPE.TEXT,
            textColor:
              (_item.type === 'CASH_IN' && 'green') ||
              (_item.type === 'CASH_OUT' && 'red') ||
              (_item.type === 'DEPOSIT' && 'green') ||
              (_item.type === 'WITHDRAW' ? 'red' : 'green')
          },
          {
            name: 'amount',
            value:
              _item.type === 'CASH_IN' || _item.type === 'DEPOSIT'
                ? `+ ${_item.amount}`
                : `- ${_item.amount}`,
            type: DATA_TYPE.NUMBER_FORMAT,
            textColor: _item.type === 'CASH_IN' || _item.type === 'DEPOSIT' ? 'green' : 'red'
          },
          {
            name: 'fee',
            value: `${_item.fee} %`,
            type: DATA_TYPE.TEXT_FORMAT
          },
          {
            name: 'description',
            value:
              (_item.description === 'Deposit money into I1 wallet' &&
                'Nạp tiền vào VÍ TẠM THỜI của bạn') ||
              (_item.description === 'Transfer money from I1 wallet to I2 wallet' &&
                'Chuyển tiền từ VÍ TẠM THỜI sang VÍ ĐẦU TƯ CHUNG của bạn') ||
              (_item.description === 'Receive money from I1 wallet to I2 wallet' &&
                'Nhận tiền từ VÍ TẠM THỜI sang VÍ ĐẦU TƯ CHUNG của bạn') ||
              (_item.description === 'Transfer money from I4 wallet to I5 wallet' &&
                'Chuyển tiền từ VÍ DỰ ÁN THANH TOÁN sang VÍ THU TIỀN của bạn') ||
              (_item.description === 'Transfer money from I5 wallet to I2 wallet' &&
                'Chuyển tiền từ VÍ THU TIỀN sang VÍ ĐẦU TƯ CHUNG của bạn') ||
              (_item.description === 'Withdraw money out of I1 wallet' &&
                'Rút tiền từ VÍ TẠM THỜI') ||
              (_item.description ===
                'Transfer money from I3 wallet to P3 wallet to prepare for activation' &&
                'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN') ||
              (_item.description === 'Receive money from I2 wallet to I3 wallet to invest' &&
                'Nhận tiền đầu tư từ VÍ ĐẦU TƯ CHUNG của bạn sang VÍ TẠM ỨNG của bạn') ||
              (_item.description === 'Transfer money from I2 wallet to I3 wallet to invest' &&
                'Chuyển tiền đầu tư từ VÍ ĐẦU TƯ CHUNG của bạn sang VÍ TẠM ỨNG') ||
              (_item.description ===
                'Recieve money from I3 wallet to P3 wallet to prepare for activation' &&
                'Nhận tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN') ||
              (_item.description ===
                'Receive money from I3 wallet to P3 wallet for stage payment' &&
                'Nhận tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN cho giai đoạn') ||
              (_item.description ===
                'Transfer money from I3 wallet to P3 wallet to for stage payment' &&
                'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN'),
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
    <>
      <Grid container sx={{ backgroundColor: '#f7f7f7' }} mb={5}>
        <Grid container sx={{ py: 3, ml: 3, justifyContent: 'space-around' }}>
          {listOfInvestorWallet &&
            listOfInvestorWallet.map((f) => {
              const isSelected = selectedFilter.indexOf(f.id);
              return (
                <List key={f.id} component="div" disablePadding>
                  <ListItemButton onClick={() => addToSelectedFilterList(f.id)}>
                    <ListItemText
                      primary={f.walletType.name}
                      sx={{
                        color: isSelected !== -1 ? 'primary.main' : 'text.secondary'
                      }}
                    />
                  </ListItemButton>
                </List>
              );
            })}
        </Grid>
      </Grid>
      <KrowdTable
        headingTitle={`DANH SÁCH GIAO DỊCH Ví`}
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        // viewPath={PATH_DASHBOARD.business.details}
        paging={{
          pageIndex,
          pageSize: pageSize,
          numberSize: numOfWalletTransaction,

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

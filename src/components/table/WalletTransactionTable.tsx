import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getWalletTransactionList } from 'redux/slices/krowd_slices/transaction';
import { BlogPostsSearch } from 'components/_dashboard/project';
import { Grid, List, ListItemButton, ListItemText } from '@mui/material';
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
  const { isLoading, walletTransactionList: list } = walletTransactionState;
  const [selectedFilter, setSelectFilter] = useState('');
  const [walletID, setWalletID] = useState('');

  const { walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;
  useEffect(() => {
    dispatch(getWalletTransactionList(''));
    dispatch(getWalletList());
  }, [dispatch]);
  const addToSelectedFilterList = async (newValue: string) => {
    setSelectFilter(newValue);
    await dispatch(getWalletTransactionList(newValue));
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
              (_item.description === 'Transfer money from I3 to P3 to prepare for activation' &&
                'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN của chủ dự án') ||
              (_item.description === 'Transfer money from I2 to I3 to invest' &&
                'Chuyển tiền từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              (_item.description === 'Receive money from I2 to I3 to invest' &&
                'Nhận tiền từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              (_item.description === 'Receive money from I1 wallet to I2 wallet' &&
                'Nhận tiền từ VÍ TẠM THỜI sang VÍ ĐẦU TƯ CHUNG') ||
              (_item.description === 'Transfer money from I1 wallet to I2 wallet' &&
                'Chuyển tiền từ VÍ TẠM THỜI sang VÍ ĐẦU TƯ CHUNG') ||
              (_item.description === 'Deposit money into I1 wallet' && 'Nạp tiền vào VÍ TẠM THỜI'),
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
      />
    </>
  );
}

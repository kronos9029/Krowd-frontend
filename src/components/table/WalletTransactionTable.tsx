import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import { getWalletTransactionList } from 'redux/slices/krowd_slices/transaction';
import {
  Box,
  Button,
  Typography,
  Card,
  Grid,
  Divider,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { getWalletList } from 'redux/slices/krowd_slices/wallet';
import total from '@iconify/icons-eva/text-outline';
import time from '@iconify/icons-bi/wallet-fill';
import done from '@iconify/icons-bi/wallet-fill';
import paytime from '@iconify/icons-bi/wallet-fill';
import warning from '@iconify/icons-bi/wallet-fill';
import Scrollbar from 'components/Scrollbar';
import { Icon } from '@iconify/react';
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
    filterCount,
    numOfWalletTransaction
  } = walletTransactionState;
  const [selectedFilter, setSelectFilter] = useState('');
  const [filter, setValueFilter] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const { walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;

  useEffect(() => {
    dispatch(getWalletTransactionList(filter, pageIndex ?? 1, 8));
    dispatch(getWalletList());
  }, [dispatch, pageIndex, filter]);
  const addToSelectedFilterList = async (newValue: string) => {
    setSelectFilter(newValue);
    setValueFilter(newValue);
    await dispatch(getWalletTransactionList(newValue, pageIndex ?? 1, 8));
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
              (_item.description === 'Receive money from I2 wallet to I1 wallet' &&
                'VÍ TẠM THỜI nhận tiền từ VÍ ĐẦU TƯ CHUNG') ||
              (_item.description === 'Transfer money from I2 wallet to I1 wallet' &&
                'Chuyển tiền từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM THỜI') ||
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
                'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN') ||
              (_item.description ===
                'Receive money from I3 wallet to I2 wallet due to investment cancellation' &&
                'VÍ ĐẦU TƯ CHUNG nhận tiền từ VÍ ĐẦU TƯ DỰ ÁN') ||
              (_item.description === 'Receive money from I5 wallet to I1 wallet' &&
                'VÍ TẠM THỜI nhận tiền từ VÍ THU TIỀN') ||
              (_item.description === 'Receive money from I4 wallet to I5 wallet' &&
                'VÍ THU TIỀN nhận tiền từ VÍ DỰ ÁN THANH TOÁN') ||
              (_item.description === 'Transfer money from I4 wallet to I5 wallet' &&
                'Chuyển tiền từ VÍ DỰ ÁN THANH TOÁN sang VÍ THU TIỀN') ||
              (_item.description === 'Transfer money from I5 wallet to I1 wallet' &&
                'VÍ THU TIỀN chuyển tiền sang VÍ TẠM THỜI') ||
              (_item.description ===
                'Transfer money from I3 wallet to I2 wallet due to investment cancellation' &&
                'Bạn hủy đầu tư VÍ ĐẦU TƯ DỰ ÁN chuyển tiền sang VÍ ĐẦU TƯ CHUNG') ||
              (_item.description ===
                'Transfer money from I3 wallet to I2 wallet due to unsuccessful project calling for investment' &&
                'Dự án kêu gọi đầu tư không thành công chuyển tiền từ VÍ ĐẦU TƯ DỰ ÁN sang VÍ ĐẦU TƯ CHUNG') ||
              (_item.description ===
                'Receive money from I3 wallet to I2 wallet due to unsuccessful project calling for investment' &&
                'Dự án kêu gọi đầu tư không thành công VÍ ĐẦU TƯ CHUNG nhận tiền từ VÍ ĐẦU TƯ DỰ ÁN') ||
              (_item.description ===
                'Receive money from P4 wallet to I4 wallet for stage payment' &&
                'VÍ DỰ ÁN THANH TOÁN nhận tiền từ dự án') ||
              (_item.description ===
                'Tranfer money from P4 wallet to I4 wallet for stage payment' &&
                'Chuyển tiền từ VÍ THANH TOÁN DỰ ÁN sang VÍ DỰ ÁN THANH TOÁN cho nhà đầu tư') ||
              (_item.description ===
              'Transfer money from I3 wallet to P3 wallet to for stage payment'
                ? 'Chuyển tiền từ VÍ TẠM ỨNG của bạn sang VÍ ĐẦU TƯ DỰ ÁN'
                : 'Đang cập nhật nội dung'),
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
      <Scrollbar sx={{ mb: 4 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 5,
            width: '1540px',
            minWidth: 1000
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '220px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={total} height={40} width={40} color={'#14b7cc'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#14b7cc' }}>TẤT CẢ</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.all} giao dịch{' '}
              </Typography>
            </Box>
          </Box>
          <Divider
            variant="fullWidth"
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />{' '}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '280px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={time} height={40} width={40} color={'#fc980b'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#fc980b' }}>
                VÍ TẠM THỜI
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.i1} giao dịch
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '280px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={warning} height={40} width={40} color={'#14b7cc'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#14b7cc' }}>
                VÍ ĐẦU TƯ CHUNG
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.i2} giao dịch
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '280px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={paytime} height={40} width={40} color={'#14b7cc'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: '#14b7cc' }}>
                VÍ ĐẦU TƯ DỰ ÁN
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.i3} giao dịch
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '320px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={done} height={40} width={40} color={'green'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'green' }}>
                VÍ DỰ ÁN THANH TOÁN
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.i4} giao dịch{' '}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              borderWidth: '120px medium 1px 0px',
              borderColor: '#14b7cc',
              height: 'auto',
              alignSelf: 'stretch',
              borderStyle: 'dashed'
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '280px'
            }}
            gap={2}
          >
            <Box>
              <Icon icon={done} height={40} width={40} color={'green'} />
            </Box>
            <Box>
              <Typography sx={{ py: 0.5, fontSize: '700', color: 'green' }}>VÍ THU TIỀN</Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {filterCount?.i5} giao dịch{' '}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Scrollbar>
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
      <Box sx={{ mb: 7 }}>
        <KrowdTable
          headingTitle={`GIAO DỊCH Ví`}
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
            },
            handlePrevious() {
              setPageIndex(pageIndex - 1);
            }
          }}
        />
      </Box>
    </>
  );
}

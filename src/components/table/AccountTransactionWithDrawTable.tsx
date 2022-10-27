import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../redux/store';
import { DATA_TYPE, KrowdTable, RowData } from './krowd-table/KrowdTable';
import {
  getTransactionList,
  getWithdrawRequestTransactionList
} from 'redux/slices/krowd_slices/transaction';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  TextField,
  Autocomplete,
  DialogActions,
  Stack,
  Button,
  Box,
  Tooltip,
  Divider
} from '@mui/material';
import { Container } from '@mui/system';
import { fCurrency } from 'utils/formatNumber';
const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'bankName', label: 'TÊN NGÂN HÀNG', align: 'center' },
  { id: 'bankAccount', label: 'TÀI KHOẢN', align: 'center' },
  { id: 'accountName', label: 'CHỦ TÀI KHOẢN', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'left' },
  { id: 'description', label: 'MÔ TẢ', align: 'left' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'left' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'center' },
  { id: '', label: 'CHI TIẾT', align: 'center' }
];

export default function AccountTransactionWithDrawTable() {
  const { transactionWithdrawState, transactionWithdrawDetail } = useSelector(
    (state: RootState) => state.transactionKrowd
  );
  const { isLoading, TransactionWithdrawList: list } = transactionWithdrawState;
  const { TransactionWithdrawDetail } = transactionWithdrawDetail;
  useEffect(() => {
    dispatch(getWithdrawRequestTransactionList(localStorage.getItem('userId') ?? ''));
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            value: _item.description === 'Withdraw Money' ? 'Rút tiền' : 'Bằng chứng',
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
    <>
      <KrowdTable
        headingTitle="GIAO DỊCH RÚT TIỀN"
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        viewPeriodHistory={() => handleClickOpen()}
      />
      <Box>
        <Dialog
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DialogContent>
            <Box mt={1}>
              <DialogContentText
                sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'black' }}
              >
                Thông tin người nhận
              </DialogContentText>
            </Box>
            <Stack spacing={{ xs: 2, md: 1 }}>
              <Container sx={{ p: 2 }}>
                <Box>
                  <Typography sx={{ textAlign: 'center' }}>Yêu cầu đã hoàn thành</Typography>
                </Box>
                {/* <Box>
                <Typography sx={{ textAlign: 'center', color: '#14b7cc', fontSize: 35 }}>
                  {fCurrency(`${dataInvestedSuccess}`)}
                </Typography>
              </Box> */}
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '0.5rem',
                    p: 1
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Tổng số tiền</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong> {fCurrency(TransactionWithdrawDetail?.amount ?? '')}</strong>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '0.5rem',
                    p: 1
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Số tiền thanh toán</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong> {fCurrency(TransactionWithdrawDetail?.amount ?? '')}</strong>
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    p: 1,

                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',

                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Giao dịch</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18'
                    }}
                  >
                    {/* {resDate} */}
                    Rút tiền khỏi ví
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Tên người nhận</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18'
                    }}
                  >
                    {TransactionWithdrawDetail?.accountName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Ngân hàng thụ hưởng</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18'
                    }}
                  >
                    {TransactionWithdrawDetail?.bankName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18',
                      marginBottom: '0.2rem'
                    }}
                  >
                    <strong>Tài khoản người nhận</strong>
                  </Typography>
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18'
                    }}
                  >
                    {TransactionWithdrawDetail?.bankAccount}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      color: '#251E18'
                    }}
                  >
                    {TransactionWithdrawDetail && (
                      <img src={TransactionWithdrawDetail?.description} />
                    )}
                  </Typography>
                </Box>
              </Container>
            </Stack>
            <Box>
              <Button fullWidth color="error" variant="contained" onClick={() => handleClose()}>
                Đóng
              </Button>
            </Box>
            <Box p={3}>
              <Typography variant="body2">
                Nếu có bất kỳ thắc mắc nào liên quan đến yêu cầu này, xin vui lòng liên lạc với bộ
                phận hỗ trợ của Krowd tại <span style={{ color: '#14b7cc' }}>19007777</span>
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}

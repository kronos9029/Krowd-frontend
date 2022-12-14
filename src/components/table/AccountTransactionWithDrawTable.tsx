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
  Divider,
  CircularProgress,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { Container } from '@mui/system';
import { fCurrency } from 'utils/formatNumber';
import { TransactionAPI } from '_apis_/krowd_apis/transaction';
import { ListOfWithdrawRequest } from '../../@types/krowd/transaction';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

const TABLE_HEAD = [
  { id: 'idx', label: 'STT', align: 'center' },
  { id: 'bankName', label: 'TÊN NGÂN HÀNG', align: 'center' },
  { id: 'bankAccount', label: 'TÀI KHOẢN', align: 'center' },
  { id: 'accountName', label: 'CHỦ TÀI KHOẢN', align: 'center' },
  { id: 'amount', label: 'SỐ TIỀN', align: 'center' },
  { id: 'description', label: 'MÔ TẢ', align: 'center' },
  { id: 'status', label: 'TRẠNG THÁI', align: 'center' },
  { id: 'createDate', label: 'NGÀY THỰC HIỆN', align: 'center' },
  { id: '', label: 'CHI TIẾT', align: 'center' }
];
const note = [
  {
    name: 'Lưu ý:'
  },
  {
    name: 'Yêu cầu của bạn sẽ được bên KROWD xử lý sớm nhất trong vòng 24 tiếng'
  },
  {
    name: 'Bảng biểu thị thông tin lệnh rút tiền của bạn (Nếu có bất kỳ thắc mắc xin vui lòng liên lạc với bộ phận hỗ trợ của KROWD tại 19007777)'
  }
];
export default function AccountTransactionWithDrawTable() {
  const { transactionWithdrawState, transactionWithdrawDetail } = useSelector(
    (state: RootState) => state.transactionKrowd
  );
  const { isLoading, listOfWithdrawRequest: list, numOfWithdrawRequest } = transactionWithdrawState;
  const { TransactionWithdrawDetail } = transactionWithdrawDetail;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageIndexPaging, setPageIndexPaging] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [currentWithdrawRequest, setCurrentWithdrawRequest] = useState<ListOfWithdrawRequest>();
  const [refusalReason, setRefusalReason] = useState<string | null>('Không nhận được tiền');
  const [transferStatus, setTransferStatus] = useState<string>('success');

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(getWithdrawRequestTransactionList(localStorage.getItem('userId') ?? '', pageIndex, 5));
  }, [dispatch, pageIndex]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeTranferStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransferStatus((event.target as HTMLInputElement).value);
    setFile(null);
    setRefusalReason('Không nhận được tiền');
  };
  const handleChangeRefusalReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRefusalReason((event.target as HTMLInputElement).value);
  };
  const handleSubmitOK = async () => {
    setIsLoadingButton(true);
    await TransactionAPI.approveWithdrawRequest({
      requestId: TransactionWithdrawDetail?.id!,
      receipt: file!
    })
      .then(async () => {
        enqueueSnackbar('Xác nhận thành công', {
          variant: 'success'
        });
        setIsLoadingButton(false);
        handleClose();
        dispatch(
          getWithdrawRequestTransactionList(localStorage.getItem('userId') ?? '', pageIndex, 5)
        );
      })
      .catch(() => {
        enqueueSnackbar('Xác nhận thất bại vui lòng kiểm tra lại', {
          variant: 'error'
        });
      });
  };
  //Reported
  const handleSubmitRefuse = async () => {
    setIsLoadingButton(true);
    await TransactionAPI.reportedWithdrawRequest({
      requestId: TransactionWithdrawDetail?.id!,
      reportMessage: refusalReason!
    })
      .then(async () => {
        enqueueSnackbar('Báo cáo lỗi thành công', {
          variant: 'success'
        });
        setIsLoadingButton(false);
        handleClose();
        getWithdrawRequestTransactionList(localStorage.getItem('userId') ?? '', pageIndex, 5);
      })
      .catch(() => {
        enqueueSnackbar('Báo cáo lỗi thất bại vui lòng kiểm tra lại', {
          variant: 'error'
        });
      });
  };

  //render action
  const renderSubmitButton = () => {
    if (transferStatus === 'success')
      return (
        <LoadingButton
          variant="contained"
          onClick={handleSubmitOK}
          loading={isLoadingButton}
          loadingIndicator={<CircularProgress color="primary" size={24} />}
          autoFocus
        >
          Xác nhận giao dịch
        </LoadingButton>
      );
    else {
      return (
        <LoadingButton
          variant="contained"
          onClick={handleSubmitRefuse}
          loading={isLoadingButton}
          loadingIndicator={<CircularProgress color="primary" size={24} />}
          autoFocus
        >
          Báo cáo lỗi giao dịch
        </LoadingButton>
      );
    }
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
            value: _item.description === 'Withdraw Money' ? 'Rút tiền' : 'Rút tiền',
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(102, 187, 106)'
          },
          {
            name: 'status',
            value:
              (_item.status === 'PENDING' && 'Đang chờ Krowd duyệt yêu cầu rút tiền') ||
              (_item.status === 'REJECTED' && 'Yêu cầu bị Krowd Admin từ chối') ||
              (_item.status === 'APPROVED' && 'Xác nhận thành công') ||
              (_item.status === 'PARTIAL' && 'Krowd Admin đã chấp nhận') ||
              (_item.status === 'PARTIAL_ADMIN' && 'Báo cáo lỗi về Admin') ||
              (_item.status === 'Transfer from I2 to I3' &&
                'Chuyển tiền từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              (_item.status === 'Receive from I2 to I3 ' &&
                'Nhận tiền từ VÍ ĐẦU TƯ CHUNG sang VÍ TẠM ỨNG') ||
              _item.status === 'Receive money from I1 to I2',
            type: DATA_TYPE.NUMBER,
            textColor:
              (_item.status === 'PENDING' && 'black') ||
              (_item.status === 'APPROVED' && 'green') ||
              (_item.status === 'REJECTED' && 'red') ||
              (_item.status === 'PARTIAL_ADMIN' && 'red') ||
              (_item.status === 'PARTIAL' && 'green') ||
              (_item.status === 'WAITING' && '#eacb00') ||
              (_item.status === 'FAILED' ? 'red' : 'black')
          },
          {
            name: 'createDate',
            value: _item.createDate.toString().substring(0, 11),
            type: DATA_TYPE.NUMBER,
            textColor: 'rgb(102, 187, 106)'
          }
        ]
      };
    });
  };
  return (
    <>
      <KrowdTable
        headingTitle="lệnh rút tiền"
        header={TABLE_HEAD}
        getData={getData}
        isLoading={isLoading}
        viewPeriodHistory={() => handleClickOpen()}
        paging={{
          pageIndex: pageIndex,
          pageSize: pageSize,
          numberSize: numOfWithdrawRequest,

          handleNext() {
            setPageIndex(pageIndex + 1);
          },
          handlePrevious() {
            setPageIndex(pageIndex - 1);
          }
        }}
        noteTable={note}
      />
      <Box>
        {TransactionWithdrawDetail &&
        TransactionWithdrawDetail.status !== 'REJECTED' &&
        TransactionWithdrawDetail.status !== 'REPORTED' &&
        TransactionWithdrawDetail.status !== 'PARTIAL' &&
        TransactionWithdrawDetail.status !== 'PENDING' &&
        TransactionWithdrawDetail.status !== 'PARTIAL_ADMIN' ? (
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
                  THÔNG TIN
                </DialogContentText>
              </Box>
              <Stack spacing={{ xs: 2, md: 1 }}>
                <Container sx={{ p: 2 }}>
                  <Box>
                    <Typography sx={{ textAlign: 'center' }} variant={'h5'} color={'green'}>
                      Yêu cầu đã hoàn thành
                    </Typography>
                  </Box>

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
        ) : (
          <Dialog
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {TransactionWithdrawDetail && TransactionWithdrawDetail.status === 'PARTIAL' && (
              <DialogContent>
                <Box mt={1}>
                  <DialogContentText
                    sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'black' }}
                  >
                    THÔNG TIN
                  </DialogContentText>
                </Box>
                <Stack spacing={{ xs: 2, md: 1 }}>
                  <Container sx={{ p: 2 }}>
                    <Box>
                      <Typography variant="h5" color={'#ff6a00'} sx={{ textAlign: 'center' }}>
                        Yêu cầu đang chờ bạn xác nhận
                      </Typography>
                    </Box>

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
                          color: '#251E18'
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
                    <Divider sx={{ my: 2 }} />
                  </Container>
                </Stack>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '0.5rem',
                    px: 4
                  }}
                >
                  <Stack spacing={{ xs: 2, md: 1 }}>
                    {TransactionWithdrawDetail?.status === 'PARTIAL' && (
                      <Box my={2}>
                        <FormControl>
                          <DialogContentText id="alert-dialog-description">
                            <Typography sx={{ fontWeight: 900 }}>Trạng thái</Typography>
                          </DialogContentText>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={transferStatus}
                            onChange={handleChangeTranferStatus}
                          >
                            <FormControlLabel
                              value="success"
                              control={<Radio />}
                              label="Xác nhận thành công"
                            />
                            <FormControlLabel
                              value="reported"
                              control={<Radio />}
                              label="Báo cáo lỗi"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}
                    {TransactionWithdrawDetail?.status === 'PARTIAL' &&
                      transferStatus === 'reported' && (
                        <Box my={1}>
                          <DialogContentText id="alert-dialog-description">
                            <Typography sx={{ fontWeight: 900 }}>Báo cáo lỗi giao dịch</Typography>
                          </DialogContentText>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={refusalReason}
                            onChange={handleChangeRefusalReason}
                          >
                            <FormControlLabel
                              value="Không nhận được tiền"
                              control={<Radio />}
                              label="Không nhận được tiền"
                            />
                            <FormControlLabel
                              value="Số tiền chuyển khoản không đúng"
                              control={<Radio />}
                              label="Số tiền chuyển khoản không đúng"
                            />
                            <FormControlLabel
                              value="Hình ảnh báo cáo không đúng"
                              control={<Radio />}
                              label="Hình ảnh báo cáo không đúng"
                            />
                          </RadioGroup>
                        </Box>
                      )}
                  </Stack>
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <Button
                    sx={{ mx: 1 }}
                    color="error"
                    variant="contained"
                    onClick={() => handleClose()}
                  >
                    Đóng
                  </Button>

                  {renderSubmitButton()}
                </Box>
                <Box p={3}>
                  <Typography variant="body2">
                    Nếu có bất kỳ thắc mắc nào liên quan đến yêu cầu này, xin vui lòng liên lạc với
                    bộ phận hỗ trợ của Krowd tại <span style={{ color: '#14b7cc' }}>19007777</span>
                  </Typography>
                </Box>
              </DialogContent>
            )}
            {TransactionWithdrawDetail && TransactionWithdrawDetail.status === 'PENDING' && (
              <DialogContent>
                <Box mt={1}>
                  <DialogContentText
                    sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'black' }}
                  >
                    THÔNG TIN
                  </DialogContentText>
                </Box>
                <Stack spacing={{ xs: 2, md: 1 }}>
                  <Container sx={{ p: 2 }}>
                    <Box>
                      <Typography variant="h5" color={'#ff6a00'} sx={{ textAlign: 'center' }}>
                        Yêu cầu đang chờ xử lý
                      </Typography>
                    </Box>

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
                  </Container>
                </Stack>
                <Box>
                  <Button fullWidth color="error" variant="contained" onClick={() => handleClose()}>
                    Đóng
                  </Button>
                </Box>
                <Box p={3}>
                  <Typography variant="body2">
                    Nếu có bất kỳ thắc mắc nào liên quan đến yêu cầu này, xin vui lòng liên lạc với
                    bộ phận hỗ trợ của Krowd tại <span style={{ color: '#14b7cc' }}>19007777</span>
                  </Typography>
                </Box>
              </DialogContent>
            )}
            {TransactionWithdrawDetail && TransactionWithdrawDetail.status === 'REJECTED' && (
              <DialogContent>
                <Box mt={1}>
                  <DialogContentText
                    sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'black' }}
                  >
                    THÔNG TIN
                  </DialogContentText>
                </Box>
                <Stack spacing={{ xs: 2, md: 1 }}>
                  <Container sx={{ p: 2 }}>
                    <Box>
                      <Typography variant="h5" color={'red'} sx={{ textAlign: 'center' }}>
                        Yêu cầu đã bị từ chối
                      </Typography>
                    </Box>

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
                        <strong>Lý do</strong>
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          color: 'red',
                          marginBottom: '0.2rem'
                        }}
                      >
                        <strong> {TransactionWithdrawDetail?.refusalReason}</strong>
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
                  </Container>
                </Stack>
                <Box>
                  <Button fullWidth color="error" variant="contained" onClick={() => handleClose()}>
                    Đóng
                  </Button>
                </Box>
                <Box p={3}>
                  <Typography variant="body2">
                    Nếu có bất kỳ thắc mắc nào liên quan đến yêu cầu này, xin vui lòng liên lạc với
                    bộ phận hỗ trợ của Krowd tại <span style={{ color: '#14b7cc' }}>19007777</span>
                  </Typography>
                </Box>
              </DialogContent>
            )}
            {TransactionWithdrawDetail && TransactionWithdrawDetail.status === 'PARTIAL_ADMIN' && (
              <DialogContent>
                <Box mt={1}>
                  <DialogContentText
                    sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'black' }}
                  >
                    THÔNG TIN
                  </DialogContentText>
                </Box>
                <Stack spacing={{ xs: 2, md: 1 }}>
                  <Container sx={{ p: 2 }}>
                    <Box>
                      <Typography variant="h5" color={'red'} sx={{ textAlign: 'center' }}>
                        Yêu cầu báo cáo lỗi
                      </Typography>
                    </Box>

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
                        <strong>Lý do</strong>
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          color: 'red',
                          marginBottom: '0.2rem'
                        }}
                      >
                        <strong> {TransactionWithdrawDetail?.reportMessage}</strong>
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
                  </Container>
                </Stack>
                <Box>
                  <Button fullWidth color="error" variant="contained" onClick={() => handleClose()}>
                    Đóng
                  </Button>
                </Box>
                <Box p={3}>
                  <Typography variant="body2">
                    Nếu có bất kỳ thắc mắc nào liên quan đến yêu cầu này, xin vui lòng liên lạc với
                    bộ phận hỗ trợ của Krowd tại <span style={{ color: '#14b7cc' }}>19007777</span>
                  </Typography>
                </Box>
              </DialogContent>
            )}
          </Dialog>
        )}
      </Box>
    </>
  );
}

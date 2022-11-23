import { Icon } from '@iconify/react';

// material
import { styled, useTheme } from '@mui/material/styles';
import {
  Card,
  Typography,
  Stack,
  Button,
  Box,
  Grid,
  Divider,
  DialogContentText,
  DialogTitle,
  Dialog,
  DialogContent,
  Tooltip,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormHelperText
} from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
//
import { useEffect, useState } from 'react';
import { getWalletByID, getWalletList } from 'redux/slices/krowd_slices/wallet';
import { dispatch, RootState, useSelector } from 'redux/store';
import { Wallet } from '../../../@types/krowd/wallet';
import { PATH_PAGE } from 'routes/paths';
import walletDetails from '@iconify/icons-ant-design/wallet-outlined';
import { TextAnimate, varBounceInUp, varFadeInRight, varWrapEnter } from 'components/animate';
import { motion } from 'framer-motion';
import { Container } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import { getUserKrowdDetail } from 'redux/slices/krowd_slices/investor';
import useAuth from 'hooks/useAuth';
import { REACT_APP_API_URL } from 'config';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import shieldCheck from '@iconify/icons-bi/shield-check';
import question from '@iconify/icons-bi/question-circle';
import { useSnackbar } from 'notistack';
import calendar from '@iconify/icons-bi/calendar-date';
import dolarMoney from '@iconify/icons-ant-design/dollar-circle-outlined';
import InfoRecieve from '@iconify/icons-ant-design/solution-outline';
import secureInfo from '@iconify/icons-ant-design/security-scan-outlined';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// ----------------------------------------------------------------------
import check2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import { MIconButton } from 'components/@material-extend';
import * as Yup from 'yup';

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  backgroundSize: 'cover',
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  color: 'white',
  marginBottom: theme.spacing(3),
  flexDirection: 'column',
  justifyContent: 'space-between'
}));
const RootStyleContainer = styled(motion.div)(({ theme }) => ({
  backgroundPosition: 'center',
  width: '100%',
  backgroundSize: 'cover',
  position: 'relative',
  backgroundRepeat: 'no-repeat',
  backgroundColor: theme.palette.primary.main,
  flexDirection: 'column',
  justifyContent: 'space-between'
}));
// ----------------------------------------------------------------------

type Package = {
  id: string;
};
export default function SharedInvestmentWallet({ wallet }: { wallet: Wallet }) {
  const { isLoading, walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { investorKrowdDetail: mainInvestor } = useSelector(
    (state: RootState) => state.user_InvestorStateKrowd
  );
  const [walletIDWithDraw, setWalletIDWithDraw] = useState('');
  const [accountNameResponse, setAccountNameResponse] = useState('');
  const [bankNameResponse, setBankNameResponse] = useState('');
  const [bankAccountResponse, setBankAccountResponse] = useState('');
  const [IDResponse, setIDResponse] = useState('');
  const [amountResponse, setAmoutResponse] = useState(0);
  const [openModalWithdrawRequestSuccess, setOpenModalWithdrawRequestSuccess] = useState(false);
  const [showIDPayment, setShowIDPayment] = useState(true);

  const { user } = useAuth();
  const { listOfInvestorWallet } = walletList;
  const [openModalShareInvest, setOpenModalShareInvest] = useState(false);

  const [openModalWithDraw, setOpenModalWithDraw] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [check, setCheck] = useState(false);
  const handleClickWithDraw = async (v: Package) => {
    setOpenModalWithDraw(true);
    setWalletIDWithDraw(v.id);

    dispatch(getUserKrowdDetail(user?.id));
  };
  const onToggleShowIDPayment = () => {
    setShowIDPayment((prev) => !prev);
  };
  const handleCheckBox = async () => {
    dispatch(getUserKrowdDetail(user?.id));

    if (check === false) {
      setCheck(true);
      setFieldValueWithDraw('bankName', mainInvestor?.bankName);
      setFieldValueWithDraw('bankAccount', mainInvestor?.bankAccount);
      setFieldValueWithDraw('accountName', `${mainInvestor?.lastName} ${mainInvestor?.firstName}`);
    } else {
      setCheck(false);
      setFieldValueWithDraw('bankName', '');
      setFieldValueWithDraw('bankAccount', '');
      setFieldValueWithDraw('accountName', '');
    }
  };

  function getToken() {
    return window.localStorage.getItem('accessToken');
  }
  function getHeaderFormData() {
    const token = getToken();
    return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };
  }
  function getHeaderFormData2() {
    const token = getToken();
    return { Authorization: `Bearer ${token}` };
  }

  const formik = useFormik({
    initialValues: {
      bankName: '',
      bankAccount: '',
      userName: '',
      amount: 0
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        const header = getHeaderFormData();
        formData.append('amount', `${values.amount}`);
        await axios({
          method: 'post',
          url: REACT_APP_API_URL + '/momo/request',
          data: formData,
          headers: header
        })
          .then((res) => {
            window.location.replace(res.data.result.payUrl);
          })
          .catch(() => {
            enqueueSnackbar('Cập nhật số dư thất bại', {
              variant: 'error'
            });
          })
          .finally(() => {});
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;
  //Rút tiền
  const WithDrawSchema = Yup.object().shape({
    bankName: Yup.string().required('Yêu cầu nhập tên ngân hàng'),
    bankAccount: Yup.string().required('Yêu cầu nhập tài khoản ngân hàng'),
    accountName: Yup.string().required('Yêu cầu nhập tên chủ khoản'),
    amount: Yup.number()
      .required('Vui lòng nhập số tiền bạn cần rút')
      .min(100000, 'Yêu cầu tối thiểu mỗi lần rút là 100,000đ')
      .max(500000000, 'Yêu cầu tối đa mỗi lần rút là 500,000,000đ')
  });
  const formikWithDraw = useFormik({
    initialValues: {
      fromWalletId: walletIDWithDraw,
      bankName: '',
      accountName: '',
      bankAccount: '',
      amount: 0
    },
    enableReinitialize: true,
    validationSchema: WithDrawSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const headers = getHeaderFormData2();
        await axios
          .post(REACT_APP_API_URL + `/withdraw_requests`, values, {
            headers: headers
          })
          .then((res) => {
            enqueueSnackbar('Gửi yêu cầu rút tiền thành công', {
              variant: 'success'
            });
            setAccountNameResponse(res.data.accountName);
            setBankAccountResponse(res.data.bankAccount);
            setBankNameResponse(res.data.bankName);
            setAmoutResponse(res.data.amount);
            setIDResponse(res.data.id);
            resetForm();
            setOpenModalWithDraw(false);
            setOpenModalWithdrawRequestSuccess(true);
          })
          .catch(() => {
            enqueueSnackbar('Gửi yêu cầu rút tiền thất bại vui lòng kiểm tra thông tin bạn nhập', {
              variant: 'error'
            });
          })
          .finally(() => {
            setSubmitting(true);
          });
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const {
    errors: errorsWithDraw,
    values: valuesWithDraw,
    touched: touchedWithDraw,
    isSubmitting: isSubmittingWithDraw,
    handleSubmit: handleSubmitWithDraw,
    getFieldProps: getFieldPropsWithDraw,
    setFieldValue: setFieldValueWithDraw
  } = formikWithDraw;
  const handleClickRefeshBalance = async (v: Package) => {
    dispatch(getWalletByID(v.id));
    setOpenModalShareInvest(true);
  };

  return (
    <RootStyleContainer initial="initial" animate="animate" variants={varWrapEnter}>
      {listOfInvestorWallet &&
        listOfInvestorWallet.length > 0 &&
        listOfInvestorWallet.slice(1, 2).map((e, i) => (
          <RootStyle key={i}>
            <Stack spacing={1} sx={{ p: 3 }}>
              <Grid container display={'flex'}>
                <Grid lg={8}>
                  <Typography sx={{ typography: 'h6' }}>{e.walletType.name}</Typography>
                </Grid>
                <Grid>
                  <Button
                    sx={{
                      display: 'flex',
                      border: '1px solid white'
                    }}
                    variant="contained"
                    onClick={() => handleClickRefeshBalance(e)}
                  >
                    {/* <Icon icon={refresh} /> */}
                    <Typography sx={{ typography: 'subtitle2', gap: 1, pl: 1 }}>
                      Chi tiết tài khoản ví
                    </Typography>
                  </Button>
                  <Dialog fullWidth maxWidth="sm" open={openModalShareInvest}>
                    <DialogTitle sx={{ alignItems: 'center', textAlign: 'center' }}>
                      <Icon color="#14b7cc" height={60} width={60} icon={walletDetails} />
                    </DialogTitle>
                    <DialogContent>
                      <Box mt={1}>
                        <DialogContentText
                          sx={{
                            textAlign: 'center',
                            fontWeight: 900,
                            fontSize: 20,
                            color: 'black'
                          }}
                        >
                          Chi tiết tài khoản ví
                        </DialogContentText>
                      </Box>
                      <Stack spacing={{ xs: 2, md: 1 }}>
                        <Container sx={{ p: 2 }}>
                          <Divider sx={{ my: 2 }} />
                          <Card sx={{ p: 2, mb: 2 }}>
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
                                Số dư khả dụng: <br />
                                <strong style={{ color: 'green' }}>{fCurrency(e.balance)}</strong>
                              </Typography>
                              <Typography
                                paragraph
                                sx={{
                                  color: '#251E18',
                                  marginBottom: '0.2rem'
                                }}
                              >
                                Tổng số dư <br />
                                <strong>{fCurrency(e.balance)}</strong>
                              </Typography>
                            </Box>
                          </Card>

                          <Card sx={{ p: 2 }}>
                            <Typography sx={{ mb: 2 }}>THÔNG TIN CHI TIẾT</Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                p: 1,
                                mb: 1,
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
                                Loại tài khoản <br />
                                <strong>{e.walletType.name}</strong>
                              </Typography>
                            </Box>
                            <Divider />

                            <Box
                              sx={{
                                display: 'flex',
                                p: 1,
                                mb: 1,

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
                                Tài khoản số điện thoại
                                <br />
                                <strong>{mainInvestor?.phoneNum}</strong>
                              </Typography>
                            </Box>
                            <Divider />

                            <Box
                              sx={{
                                display: 'flex',
                                p: 1,
                                mb: 1,

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
                                Ngày mở tài khoản <br />
                                <strong>{e.createDate}</strong>
                              </Typography>
                            </Box>
                          </Card>
                          <Box my={2} p={2}>
                            <Typography>Ví dùng để đầu tư vào các dự án của KROWD</Typography>
                          </Box>
                        </Container>
                      </Stack>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Box>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpenModalShareInvest(false)}
                          >
                            Đóng
                          </Button>
                        </Box>
                        <Button
                          href={PATH_PAGE.pageTopUp}
                          target="_blank"
                          sx={{
                            display: 'flex',
                            border: '1px solid white'
                          }}
                          variant="contained"
                        >
                          + Nạp tiền
                        </Button>
                      </Box>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
              <Grid container alignItems={'center'}>
                <Grid lg={8}>
                  <Typography>
                    <TextAnimate
                      text={fCurrency(e.balance)}
                      sx={{ typography: 'h3' }}
                      variants={varBounceInUp}
                    />
                  </Typography>
                </Grid>
                <Grid sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    href={PATH_PAGE.pageTopUp}
                    target="_blank"
                    sx={{
                      display: 'flex',
                      border: '1px solid white'
                    }}
                    variant="contained"
                  >
                    + Nạp tiền
                  </Button>
                  <Button
                    onClick={() => handleClickWithDraw(e)}
                    sx={{ display: 'flex', border: '1px solid white' }}
                    variant="contained"
                  >
                    - Rút tiền
                  </Button>
                  <Dialog fullWidth maxWidth="sm" open={openModalWithDraw}>
                    <DialogTitle sx={{ alignItems: 'center', textAlign: 'center' }}>
                      <Box mt={1} display={'flex'} justifyContent={'flex-end'}>
                        <Box>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpenModalWithDraw(false)}
                          >
                            X
                          </Button>
                        </Box>
                      </Box>
                      <Icon color="#14b7cc" height={60} width={60} icon={walletDetails} />
                    </DialogTitle>
                    <DialogContent>
                      <Box mt={1}>
                        <DialogContentText
                          sx={{
                            textAlign: 'center',
                            fontWeight: 900,
                            fontSize: 20,
                            color: 'black'
                          }}
                        >
                          Tạo lệnh rút tiền
                        </DialogContentText>
                      </Box>
                      <Typography>
                        Số dư ví: <strong>{fCurrency(e.balance)}</strong>
                      </Typography>
                      <FormikProvider value={formikWithDraw}>
                        <Form noValidate autoComplete="off" onSubmit={handleSubmitWithDraw}>
                          <TextField
                            required
                            fullWidth
                            label="Tên ngân hàng"
                            {...getFieldPropsWithDraw('bankName')}
                            sx={{ mt: 2 }}
                          />
                          {touchedWithDraw.bankName && errorsWithDraw.bankName && (
                            <FormHelperText error sx={{ px: 2 }}>
                              {touchedWithDraw.bankName && errorsWithDraw.bankName}
                            </FormHelperText>
                          )}
                          <TextField
                            required
                            fullWidth
                            label="Tài khoản ngân hàng"
                            {...getFieldPropsWithDraw('bankAccount')}
                            sx={{ mt: 2 }}
                          />
                          {touchedWithDraw.bankAccount && errorsWithDraw.bankAccount && (
                            <FormHelperText error sx={{ px: 2 }}>
                              {touchedWithDraw.bankAccount && errorsWithDraw.bankAccount}
                            </FormHelperText>
                          )}
                          <TextField
                            required
                            fullWidth
                            label="Tên chủ tài khoản"
                            {...getFieldPropsWithDraw('accountName')}
                            sx={{ mt: 2 }}
                          />
                          {touchedWithDraw.accountName && errorsWithDraw.accountName && (
                            <FormHelperText error sx={{ px: 2 }}>
                              {touchedWithDraw.accountName && errorsWithDraw.accountName}
                            </FormHelperText>
                          )}
                          <Tooltip
                            title="Giao dịch từ 100,000đ - 500,000,000đ"
                            placement="bottom-end"
                          >
                            <TextField
                              fullWidth
                              required
                              label="Số tiền VND"
                              {...getFieldPropsWithDraw('amount')}
                              sx={{ mt: 2 }}
                              InputProps={{
                                endAdornment: <Icon color="#ff9b26e0" icon={question} />
                              }}
                            />
                          </Tooltip>
                          {touchedWithDraw.amount && errorsWithDraw.amount && (
                            <FormHelperText error sx={{ px: 2 }}>
                              {touchedWithDraw.amount && errorsWithDraw.amount}
                            </FormHelperText>
                          )}
                          <Box display={'flex'} alignItems={'center'}>
                            <Checkbox onClick={handleCheckBox} />
                            <Typography>Sử dụng thông tin hiện có</Typography>
                          </Box>
                          <RadioGroup row sx={{ my: 2 }} {...getFieldPropsWithDraw('amount')}>
                            <FormControlLabel
                              value="300000"
                              control={<Radio />}
                              label="300,000đ"
                              sx={{ px: 2 }}
                            />
                            <FormControlLabel
                              value="500000"
                              control={<Radio />}
                              label="500,000đ"
                              sx={{ px: 2.7 }}
                            />
                            <FormControlLabel
                              value="1000000"
                              control={<Radio />}
                              label="1,000,000đ"
                              sx={{ px: 2 }}
                            />
                            <FormControlLabel
                              value="3000000"
                              control={<Radio />}
                              label="3,000,000đ"
                              sx={{ px: 2 }}
                            />
                            <FormControlLabel
                              value="5000000"
                              control={<Radio />}
                              label="5,000,000đ"
                              sx={{ px: 1 }}
                            />
                            <FormControlLabel
                              value="10000000"
                              control={<Radio />}
                              label="10,000,000đ"
                              sx={{ px: 2.3 }}
                            />
                          </RadioGroup>
                          <Box sx={{ color: '#d58311' }}>
                            <Typography sx={{ my: 1, fontWeight: 500 }}>Lưu ý:</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Box>
                                <Icon color="#d58311" width={20} height={20} icon={calendar} />
                              </Box>
                              <Box>
                                <Typography sx={{ textAlign: 'left', ml: 1 }}>
                                  Số tiền bạn rút sẽ được chuyển vào tài khoản của bạn chậm nhất là
                                  24h sau khi tạo lệnh rút tiền.
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Box>
                                <Icon color="#d58311" width={20} height={20} icon={dolarMoney} />
                              </Box>
                              <Box>
                                <Typography sx={{ textAlign: 'left', ml: 1 }}>
                                  Số tiền bạn rút không vượt quá số dư trong ví hiện tại.
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Box>
                                <Icon color="#d58311" width={20} height={20} icon={InfoRecieve} />
                              </Box>
                              <Box>
                                <Typography sx={{ textAlign: 'left', ml: 1 }}>
                                  Thông tin rút tiền là thông tin tài khoản của bạn hoặc thông tin
                                  người mà bạn quen biết (Mọi thông tin đều phải trùng khớp với
                                  thông tin đã đăng ký bên ngân hàng đó).
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Box>
                                <Icon color="#d58311" width={20} height={20} icon={secureInfo} />
                              </Box>
                              <Box>
                                <Typography sx={{ textAlign: 'left', ml: 1 }}>
                                  Vui lòng kiểm tra thông tin trước khi gửi lệnh rút tiền.
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <Box>
                              <Icon color="green" width={20} height={20} icon={shieldCheck} />
                            </Box>
                            <Box>
                              <Typography sx={{ textAlign: 'left', ml: 1 }}>
                                Mọi thông tin khách hàng đều được mã hóa để bảo mật thông tin khách
                                hàng.
                              </Typography>
                            </Box>
                          </Box>
                          {e.balance > 0 ? (
                            <LoadingButton
                              fullWidth
                              type="submit"
                              variant="contained"
                              size="large"
                              loading={isSubmitting}
                            >
                              Rút tiền
                            </LoadingButton>
                          ) : (
                            <LoadingButton
                              disabled
                              fullWidth
                              type="submit"
                              variant="contained"
                              size="large"
                              loading={isSubmitting}
                            >
                              Rút tiền
                            </LoadingButton>
                          )}
                        </Form>
                      </FormikProvider>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                {/* <Icon
                  width={20}
                  height={20}
                  icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
                /> */}

                <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                  &nbsp;Ví dùng để đầu tư vào các dự án của KROWD
                </Typography>
              </Stack>
            </Stack>

            {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
          </RootStyle>
        ))}
      <Dialog fullWidth maxWidth="sm" open={openModalWithdrawRequestSuccess}>
        <DialogTitle sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Icon color="#14b7cc" height={60} width={60} icon={check2Fill} />
        </DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <DialogContentText
              sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'black' }}
            >
              Gửi yêu cầu thành công
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
                  <strong> {fCurrency(amountResponse)}</strong>
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
                  <strong> {fCurrency(amountResponse)}</strong>
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
                  {accountNameResponse}
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
                  {bankNameResponse}
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
                  {bankAccountResponse}
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
                  <strong>Mã yêu cầu</strong>
                </Typography>

                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    <MIconButton
                      color="inherit"
                      onClick={onToggleShowIDPayment}
                      sx={{ opacity: 0.48 }}
                    >
                      <Icon icon={showIDPayment ? eyeFill : eyeOffFill} />
                    </MIconButton>
                    <Typography sx={{ typography: 'body2' }}>
                      {showIDPayment ? '********' : IDResponse}
                    </Typography>
                  </Stack>
                </Typography>
              </Box>
            </Container>
          </Stack>
          <Box>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={() => setOpenModalWithdrawRequestSuccess(false)}
            >
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
    </RootStyleContainer>
  );
}

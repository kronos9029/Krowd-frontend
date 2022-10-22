import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import diagonalArrowLeftDownFill from '@iconify/icons-eva/diagonal-arrow-left-down-fill';
import shieldCheck from '@iconify/icons-bi/shield-check';
import question from '@iconify/icons-bi/question-circle';
// material
import { styled } from '@mui/material/styles';
import {
  Card,
  Typography,
  Stack,
  Grid,
  Button,
  Divider,
  DialogContentText,
  DialogTitle,
  Dialog,
  DialogContent,
  Container,
  Box,
  Tooltip,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox
} from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
//
import BaseOptionChart from '../../charts/BaseOptionChart';
import { dispatch, RootState, useSelector } from 'redux/store';
import { Wallet } from '../../../@types/krowd/wallet';
import { getWalletByID, getWalletList } from 'redux/slices/krowd_slices/wallet';
import { animate, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import walletDetails from '@iconify/icons-ant-design/wallet-outlined';

import {
  TextAnimate,
  varBounceInUp,
  varFadeInRight,
  varFadeInUp,
  varWrapEnter
} from 'components/animate';
import { getUserKrowdDetail } from 'redux/slices/krowd_slices/investor';
import useAuth from 'hooks/useAuth';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { REACT_APP_API_URL } from 'config';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  backgroundSize: 'cover',
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#d29f6370',
  display: 'flex',
  color: 'white',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));
const RootStyleContainer = styled(motion.div)(({ theme }) => ({
  backgroundPosition: 'center',
  width: '100%',
  backgroundColor: '#ff8900bf'
}));
// ----------------------------------------------------------------------

type Package = {
  id: string;
};
export default function CollectionWallet({ wallet }: { wallet: Wallet }) {
  const { isLoading, walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;
  const { investorKrowdDetail: mainInvestor } = useSelector(
    (state: RootState) => state.user_InvestorStateKrowd
  );
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [openModalShareInvest, setOpenModalShareInvest] = useState(false);

  const [openModalWithDraw, setOpenModalWithDraw] = useState(false);

  const [check, setCheck] = useState(false);
  const [bankName, setBankName] = useState('');

  const handleClickRefeshBalance = async (v: Package) => {
    dispatch(getWalletByID(v.id));
    dispatch(getUserKrowdDetail(user?.id));
    setOpenModalShareInvest(true);
  };
  const handleClickWithDraw = async (v: Package) => {
    setOpenModalWithDraw(true);
    dispatch(getUserKrowdDetail(user?.id));
  };
  const handleCheckBox = async () => {
    dispatch(getUserKrowdDetail(user?.id));
    if (check === false) {
      setCheck(true);
      setFieldValue('bankName', mainInvestor?.bankName);
      setFieldValue('bankAccount', mainInvestor?.bankAccount);
      setFieldValue('userName', `${mainInvestor?.lastName} ${mainInvestor?.firstName}`);
    } else {
      setCheck(false);
      setFieldValue('bankName', '');
      setFieldValue('bankAccount', '');
      setFieldValue('userName', '');
    }
  };

  function getToken() {
    return window.localStorage.getItem('accessToken');
  }
  function getHeaderFormData() {
    const token = getToken();
    return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };
  }

  const formik = useFormik({
    initialValues: {
      bankName: mainInvestor?.bankName ?? '',
      bankAccount: mainInvestor?.bankAccount ?? '',
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
  console.log(formik);
  return (
    <RootStyleContainer initial="initial" animate="animate" variants={varWrapEnter}>
      {listOfInvestorWallet &&
        listOfInvestorWallet.length > 0 &&
        listOfInvestorWallet.slice(4, 5).map((e, i) => (
          <RootStyle key={i}>
            <Stack spacing={1} sx={{ p: 3 }}>
              <Grid container>
                <Grid lg={5}>
                  <Typography sx={{ typography: 'h6' }}>{e.walletType.name}</Typography>
                  <Typography>
                    <TextAnimate
                      sx={{ typography: 'h3' }}
                      text={fCurrency(e.balance)}
                      variants={varBounceInUp}
                    />
                    {/* {fCurrency(e.balance)} */}
                  </Typography>
                </Grid>

                <Grid>
                  <Button
                    sx={{
                      display: 'flex',
                      border: '1px solid white',
                      color: 'white'
                    }}
                    onClick={() => handleClickRefeshBalance(e)}
                  >
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
                            <Typography>Chưa cập nhật</Typography>
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
                      </Box>
                    </DialogContent>
                  </Dialog>

                  <Grid sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      sx={{ mt: 1, display: 'flex', border: '1px solid white', color: 'white' }}
                    >
                      + Chuyển tiền
                    </Button>
                    <Button
                      sx={{ mt: 1, display: 'flex', border: '1px solid white', color: 'white' }}
                      onClick={() => handleClickWithDraw(e)}
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
                        <FormikProvider value={formik}>
                          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField
                              required
                              fullWidth
                              label="Tài khoản ngân hàng"
                              {...getFieldProps('bankName')}
                              sx={{ mt: 2 }}
                            />

                            <TextField
                              required
                              fullWidth
                              label="Tài khoản ngân hàng"
                              {...getFieldProps('bankAccount')}
                              sx={{ mt: 2 }}
                            />

                            <TextField
                              required
                              fullWidth
                              label="Tên chủ tài khoản"
                              {...getFieldProps('userName')}
                              sx={{ mt: 2 }}
                            />

                            <Tooltip title="Giao dịch tối thiểu là 10,000đ" placement="bottom-end">
                              <TextField
                                fullWidth
                                label="Số tiền VND"
                                {...getFieldProps('amount')}
                                sx={{ mt: 2 }}
                                InputProps={{
                                  endAdornment: <Icon color="#ff9b26e0" icon={question} />
                                }}
                              />
                            </Tooltip>
                            <Box display={'flex'} alignItems={'center'}>
                              <Checkbox onClick={handleCheckBox} />
                              <Typography>Sử dụng thông tin hiện có</Typography>
                            </Box>
                            <RadioGroup row sx={{ my: 2 }} {...getFieldProps('amount')}>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                              <Icon color="green" width={30} height={30} icon={shieldCheck} />
                              <Typography sx={{ mt: 3, textAlign: 'left', ml: 1 }}>
                                Mọi thông tin khách hàng đều được mã hóa để bảo mật thông tin khách
                                hàng.
                              </Typography>
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
              </Grid>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                  &nbsp;Chưa cập nhật
                </Typography>
              </Stack>
            </Stack>
          </RootStyle>
        ))}
    </RootStyleContainer>
  );
}

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// material
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
  Dialog,
  FormHelperText,
  Divider
} from '@mui/material';
// components
import Page from '../components/Page';
import { SeverErrorIllustration } from '../assets';
import MainNavbarTopUp from '../layouts/main/MainNavbarTopUp';
import { Icon } from '@iconify/react';
import backspace from '@iconify/icons-eva/backspace-fill';
import Logo from 'components/Logo';
import { getWalletList } from 'redux/slices/krowd_slices/wallet';
import shieldCheck from '@iconify/icons-bi/shield-check';

import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import { fCurrency } from 'utils/formatNumber';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { REACT_APP_API_URL } from 'config';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import MainFooter from 'layouts/main/MainFooter';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%'
}));

// ----------------------------------------------------------------------

export default function PageTopUp() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWalletList());
  }, [dispatch]);

  function getToken() {
    return window.localStorage.getItem('accessToken');
  }
  function getHeaderFormData() {
    const token = getToken();
    return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };
  }
  const TransferSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Vui lòng nhập số tiền')
      .min(100000, 'Yêu cầu tối thiểu mỗi lần nạp là 100,000đ')
  });
  const formik = useFormik({
    initialValues: {
      amount: 0
    },
    validationSchema: TransferSchema,

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
            // window.open(res.data.result.payUrl);
            // enqueueSnackbar('Cập nhật số dư thành công', {
            //   variant: 'success'
            // });
            window.location.replace(res.data.result.payUrl);

            // navigate(res.data.result.payUrl);
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

  const { isLoading, walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;
  return (
    <RootStyle title="Krowd - Trung tâm nạp tiền">
      <MainNavbarTopUp></MainNavbarTopUp>
      <Grid container>
        <Grid lg={3}></Grid>
        <Grid>
          <Container sx={{ marginTop: '120px' }}>
            <Button href="/">
              <Icon width={20} height={20} icon={backspace} />
            </Button>
            Quay lại trang chủ
          </Container>
          <Container>
            <Box sx={{ display: 'flex', my: 3, alignItems: 'center' }}>
              <Button href="/" disabled>
                <Logo sx={{ width: 20, height: 20 }} />
              </Button>
              Krowd - Nạp tiền
            </Box>
          </Container>
        </Grid>
      </Grid>
      <Container>
        <Box sx={{ margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Thanh toán tiện dụng với Momo
          </Typography>
        </Box>
        <Box sx={{ width: 280, margin: 'auto', textAlign: 'center', mb: 2 }}>
          <img style={{ width: '100%', height: '100%' }} src="/static/icons/navbar/momo.jpg" />
        </Box>
        {/* <Button sx={{ width: '40%', height: '50%' }}>
                    <img
                      style={{ width: '140px', height: '87px' }}
                      src="/static/icons/navbar/VNPay.svg"
                    />
                  </Button> */}
        {/* <Button sx={{ width: '40%', height: '50%' }}>
                    <img
                      style={{ width: '140px', height: '87px' }}
                      src="/static/icons/navbar/momo.jpg"
                    />
                  </Button> */}
        {/* <Button sx={{ width: '40%', height: '50%' }}>
                    <img
                      style={{ width: '140px', height: '87px' }}
                      src="/static/icons/navbar/VNPay.svg"
                    />
                  </Button> */}
        {/* <Button sx={{ width: '40%', height: '50%' }}>
                    <img
                      style={{ width: '140px', height: '87px' }}
                      src="/static/icons/navbar/momo.jpg"
                    />
                  </Button> */}
      </Container>
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }} pb={7}>
          <Card>
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  backgroundColor: '#80808021',
                  borderRadius: '5px'
                }}
              >
                <img
                  style={{ width: '40px', height: '40px' }}
                  src="/static/icons/navbar/momo.jpg"
                />{' '}
                <Typography>
                  Số dư ví: {listOfInvestorWallet.slice(1, 2).map((e) => fCurrency(e.balance))}
                </Typography>
              </Box>
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    required
                    fullWidth
                    type={'number'}
                    label="Số tiền cần nạp"
                    {...getFieldProps('amount')}
                    sx={{ mt: 5 }}
                  />
                  {touched.amount && errors.amount && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.amount && errors.amount}
                    </FormHelperText>
                  )}
                  <RadioGroup row sx={{ my: 2 }} {...getFieldProps('amount')}>
                    <FormControlLabel
                      value="500000"
                      control={<Radio />}
                      label="500,000đ"
                      sx={{ px: 2 }}
                    />
                    <FormControlLabel
                      value="1000000"
                      control={<Radio />}
                      label="1,000,000đ"
                      sx={{ px: 2 }}
                    />
                    <FormControlLabel
                      value="5000000"
                      control={<Radio />}
                      label="5,000,000đ"
                      sx={{ px: 2 }}
                    />
                  </RadioGroup>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Icon color="green" width={30} height={30} icon={shieldCheck} />
                    <Typography sx={{ mt: 3, textAlign: 'left', ml: 1 }}>
                      Mọi thông tin khách hàng đều được mã hóa để bảo mật thông tin khách hàng.
                    </Typography>
                  </Box>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                  >
                    Nạp tiền
                  </LoadingButton>
                </Form>
              </FormikProvider>
            </Box>
          </Card>
        </Box>
      </Container>
      <Divider />
      <MainFooter />
    </RootStyle>
  );
}

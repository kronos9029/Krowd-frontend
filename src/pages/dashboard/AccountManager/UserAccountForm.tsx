import * as Yup from 'yup';
import React, { useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Grid,
  Dialog,
  Button,
  Divider,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { dispatch, RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { getUserKrowdDetail } from 'redux/slices/krowd_slices/investor';
import { REACT_APP_API_URL } from 'config';
// @types

// ----------------------------------------------------------------------

type UserAccountFormProps = {
  open: boolean;
  onClose: VoidFunction;
};

export default function UserAccountForm({ open, onClose }: UserAccountFormProps) {
  const NewAddressSchema = Yup.object().shape({
    phoneNum: Yup.string().required('Yêu cầu nhập số điện thoại'),
    idCard: Yup.string().required('Yêu cầu nhập mã thẻ'),
    district: Yup.string().required('Yêu cầu nhập quận của bạn'),
    address: Yup.string().required('Yêu cầu nhập địa chỉ'),
    city: Yup.string().required('Yêu cầu nhập thành phố'),
    firstName: Yup.string().required('Yêu cầu nhập họ của bạn'),
    lastName: Yup.string().required('Yêu cầu nhập tên của bạn'),
    bankName: Yup.string().required('Yêu cầu nhập tên ngân hàng')
  });
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  function getToken() {
    return window.localStorage.getItem('accessToken');
  }
  function getHeaderFormData() {
    const token = getToken();
    return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` };
  }

  const formik = useFormik({
    initialValues: {
      id: user?.id,
      image: user?.image,
      phoneNum: user?.phoneNum,
      idCard: user?.idCard,
      city: user?.city,
      district: user?.district,
      address: user?.address,
      firstName: user?.firstName,
      lastName: user?.lastName,
      bankName: user?.bankName
    },
    validationSchema: NewAddressSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (user === null) {
          throw new Error('User null');
        }
        const formData = new FormData();
        const header = getHeaderFormData();
        formData.append('firstName', values.firstName ?? '');
        formData.append('email', user?.email);
        formData.append('lastName', values.lastName ?? '');
        formData.append('phoneNum', values.phoneNum ?? '');
        formData.append('city', values.city ?? '');
        formData.append('district', values.district ?? '');
        formData.append('address', values.address ?? '');
        formData.append('idCard', 'idCard');
        formData.append('bankName', values.bankName ?? '');
        formData.append('bankName', values.bankName ?? '');
        formData.append('roleId', 'ad5f37da-ca48-4dc5-9f4b-963d94b535e6');
        formData.append('dateOfBirth', '24/07/2000');
        formData.append('taxIdentificationNumber', '123');
        formData.append('bankAccount', '123');
        formData.append('gender', 'male');
        formData.append('description', '123');
        await axios({
          method: 'put',
          url: REACT_APP_API_URL + `/users/${user.id}`,
          data: formData,
          headers: header
        })
          .then(() => {
            enqueueSnackbar('Cập nhật thành công', {
              variant: 'success'
            });
            dispatch(getUserKrowdDetail(user?.id));
          })
          .catch(() => {
            enqueueSnackbar('Cập nhật thất bại', {
              variant: 'error'
            });
          })
          .finally(() => {
            onClose();
          });
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Cập nhật thông tin của bạn</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Họ"
                      {...getFieldProps('firstName')}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tên"
                      {...getFieldProps('lastName')}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      {...getFieldProps('phoneNum')}
                      error={Boolean(touched.phoneNum && errors.phoneNum)}
                      helperText={touched.phoneNum && errors.phoneNum}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tên ngân hàng"
                      {...getFieldProps('bankName')}
                      error={Boolean(touched.bankName && errors.bankName)}
                      helperText={touched.bankName && errors.bankName}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Thành phố"
                      {...getFieldProps('city')}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Quận"
                      {...getFieldProps('district')}
                      error={Boolean(touched.district && errors.district)}
                      helperText={touched.district && errors.district}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <Divider />

          <DialogActions>
            <LoadingButton type="submit" variant="contained" color="warning" loading={isSubmitting}>
              Cập nhật
            </LoadingButton>
            <Button type="button" color="error" variant="contained" onClick={onClose}>
              Hủy
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../upload';
// @types
import { User } from '../../../../@types/account';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from 'redux/store';
import { getUserKrowdDetail } from 'redux/slices/krowd_slices/investor';
import { InvestorAPI } from '_apis_/krowd_apis/investor';
//

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const { investorKrowdDetail: mainInvestor } = useSelector(
    (state: RootState) => state.user_InvestorStateKrowd
  );

  useEffect(() => {
    dispatch(getUserKrowdDetail(user?.id));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      image: user?.image,
      phoneNum: user?.phoneNum || '<Chưa cập nhật>',
      idCard: user?.idCard || '<Chưa cập nhật>',
      city: user?.city || '<Chưa cập nhật>',
      district: user?.district || '<Chưa cập nhật>',
      address: user?.address || '<Chưa cập nhật>',
      firstName: user?.firstName || '<Chưa cập nhật>',
      lastName: user?.lastName || '<Chưa cập nhật>',
      bankName: user?.bankName || '<Chưa cập nhật>'
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;
  console.log('image of user', user?.image);
  console.log('id of user', user?.id);
  const formikImage = useFormik({
    enableReinitialize: true,
    initialValues: {
      photoURL: user?.image
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await InvestorAPI.postImage({ investorId: user?.id, files: fileUpload });
        // .then(() => {
        //   enqueueSnackbar('Cập nhật ảnh thành công', {
        //     variant: 'success'
        //   });
        //   dispatch(getUserKrowdDetail(user?.id));
        // })
        // .catch(() => {
        //   enqueueSnackbar('Cập nhật ảnh thất bại', {
        //     variant: 'error'
        //   });
        //   setFileUpload(null);
        //   setFieldValueImage('photoURL', null);
        // });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });
  const {
    errors: errorsImage,
    values: valuesImage,
    touched: touchedImage,
    handleSubmit: handleSubmitImage,
    isSubmitting: isSubmittingImage,
    setFieldValue: setFieldValueImage
  } = formikImage;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('image', {
          ...file,
          preview: URL.createObjectURL(file)
        });
        setFileUpload(file);
        console.log('fileUpload', fileUpload);
        console.log('aaaaaa', file);
        console.log('valuesImage', valuesImage.photoURL);
      }
    },
    [setFieldValueImage]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box my={3}>
              <FormikProvider value={formikImage}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmitImage}>
                  <UploadAvatar
                    accept="image/*"
                    file={valuesImage.photoURL}
                    maxSize={3145728}
                    onDrop={handleDrop}
                    error={Boolean(touchedImage.photoURL && errorsImage.photoURL)}
                  />
                  {fileUpload && (
                    <Box display="flex" my={3} justifyContent="space-evenly">
                      <LoadingButton
                        color="warning"
                        type="submit"
                        variant="contained"
                        loading={isSubmittingImage}
                      >
                        Lưu
                      </LoadingButton>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          setFileUpload(null);
                          setFieldValueImage('photoURL', user?.image);
                        }}
                      >
                        Hủy
                      </Button>
                    </Box>
                  )}
                </Form>
              </FormikProvider>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth disabled label="Email" {...getFieldProps('email')} />
                  <TextField
                    disabled
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('phoneNum')}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth disabled label="Họ" {...getFieldProps('firstName')} />
                  <TextField fullWidth disabled label="Tên" {...getFieldProps('lastName')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField disabled fullWidth label="idCard" {...getFieldProps('idCard')} />
                  <TextField
                    disabled
                    fullWidth
                    label="Tên ngân hàng"
                    {...getFieldProps('bankName')}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField disabled fullWidth label="Thành phố" {...getFieldProps('city')} />
                  <TextField disabled fullWidth label="Quận" {...getFieldProps('district')} />
                  <TextField disabled fullWidth label="Địa chỉ" {...getFieldProps('address')} />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

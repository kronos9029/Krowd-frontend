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
import { User_Investor } from '../../../../@types/krowd/investor';
//

// ----------------------------------------------------------------------
type UserAccountProps = {
  investor: User_Investor;
};
export default function AccountGeneral({ investor }: UserAccountProps) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const formikImage = useFormik({
    enableReinitialize: true,
    initialValues: {
      photoURL: investor.image
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await InvestorAPI.postImage({ investorId: user?.id, files: fileUpload })
          .then(() => {
            enqueueSnackbar('Cập nhật ảnh thành công', {
              variant: 'success'
            });
            dispatch(getUserKrowdDetail(user?.id));
          })
          .catch(() => {
            enqueueSnackbar('Cập nhật ảnh thất bại', {
              variant: 'error'
            });
            setFileUpload(null);
            setFieldValueImage('photoURL', null);
          });
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
        setFieldValueImage('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
        setFileUpload(file);
      }
    },
    [setFieldValueImage]
  );
  return (
    <FormikProvider value={formikImage}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmitImage}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box my={3}>
              <UploadAvatar
                accept="image/*"
                file={valuesImage?.photoURL ?? ''}
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
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth disabled label="Email" value={investor.email} />
                  <TextField disabled fullWidth label="Số điện thoại" value={investor.phoneNum} />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    label="Họ"
                    value={investor?.firstName ?? '<Chưa cập nhật>'}
                  />
                  <TextField fullWidth disabled label="Tên" value={investor.lastName} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField disabled fullWidth label="idCard" value={investor.idCard} />
                  <TextField disabled fullWidth label="Tên ngân hàng" value={investor.bankName} />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField disabled fullWidth label="Thành phố" value={investor.city} />
                  <TextField disabled fullWidth label="Quận" value={investor.district} />
                  <TextField disabled fullWidth label="Địa chỉ" value={investor.address} />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

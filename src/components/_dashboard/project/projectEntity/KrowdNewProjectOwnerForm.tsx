import * as Yup from 'yup';
import React from 'react';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Stack, TextField, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
// @types
import { NewProjectEntityFormValues } from '../../../../@types/krowd/project';
import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { PATH_DASHBOARD } from 'routes/paths';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ProjectEntitytForm() {
  type InitialValues = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    afterSubmit?: string;
  };

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleOpenPreview = () => {
    navigate(PATH_DASHBOARD.userKrowd.list);
  };
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Quá ngắn!')
      .max(50, 'Quá dài!')
      .required('Yêu cầu nhập tên của bạn'),
    lastName: Yup.string()
      .min(2, 'Quá ngắn')
      .max(50, 'Quá dài!')
      .required('Yêu cầu nhập họ của bạn'),
    email: Yup.string().email('Email phải đúng định dạng').required('Yêu cầu nhập Phone'),
    password: Yup.string().required('Yêu cầu nhập mật khẩu')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        enqueueSnackbar('Đăng ký thành công', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        navigate(PATH_DASHBOARD.userKrowd.list);
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Tên của bạn"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Họ của bạn"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              type="button"
              color="error"
              variant="outlined"
              size="large"
              onClick={handleOpenPreview}
              sx={{ mr: 1.5 }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Đăng ký
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

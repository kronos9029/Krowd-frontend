import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
// material
import {
  Link,
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Box,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import facebookFill from '@iconify/icons-eva/facebook-fill';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import Login from 'pages/authentication/Login';
import firebase from 'firebase/app';

// ----------------------------------------------------------------------
type InitialValues = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};
export default function LoginForm() {
  // const { loginWithGoogle } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email phải đúng định dạng').required('Yêu cầu nhập Phone'),
    password: Yup.string().required('Yêu cầu nhập mật khẩu')
  });

  const { loginWithGoogle, loginWithFaceBook, login, loginWithPhone } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle?.();
    } catch (error) {
      console.log('loi ne');
      console.error(error);
    }
  };
  // const handleLoginEmail = async () => {
  //   try {
  //     await Login?.();
  //     // const res = await auth.signInWithPopup(googleProvider);
  //     // console.log("data", res)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook?.();
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    //   onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
    //     try {
    //       await login(values.email, values.password);
    //       enqueueSnackbar('Login success', {
    //         variant: 'success',
    //         action: (key) => (
    //           <MIconButton size="small" onClick={() => closeSnackbar(key)}>
    //             <Icon icon={closeFill} />
    //           </MIconButton>
    //         )
    //       });
    //       if (isMountedRef.current) {
    //         setSubmitting(false);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       resetForm();
    //       if (isMountedRef.current) {
    //         setSubmitting(false);
    //         setErrors({ afterSubmit: error.message });
    //       }
    //     }
    //   }
    // });
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login(values.email, values.password);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          // setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Stack direction="row" alignItems="center" sx={{ mt: 4, mb: 5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Đăng nhập với người đầu tư
          </Typography>
        </Box>
      </Stack>
      {/* <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="username"
            type="number"
            label="Phone"
            onChange={(e) => setPhoneNum(e.target.value)}
            // {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            {...getFieldProps('password')}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton onClick={handleShowPassword} edge="end">
            //         <Icon icon={showPassword ? eyeFill : eyeOffFill} />
            //       </IconButton>
            //     </InputAdornment>
            //   )
            // }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Ghi nhớ"
          />

          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
            Quên mật khẩu?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          // loading={isSubmitting}
          // onClick={handleLoginEmail}
        >
          Login
        </LoadingButton>
      </Form> */}

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <LoadingButton
          style={{
            backgroundColor: '#FFF',
            color: 'black',
            marginTop: '2rem',
            paddingRight: '2rem'
          }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={handleLoginGoogle}
        >
          <img
            src={`/static/icons/navbar/ic_google.svg`}
            style={{ paddingRight: '1rem' }}
            height={24}
          />
          Login with google
        </LoadingButton>
        <LoadingButton
          style={{
            backgroundColor: '#FFF',
            color: 'black',
            marginTop: '2rem',
            paddingRight: '2rem'
          }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={handleLoginFaceBook}
        >
          <Icon icon={facebookFill} style={{ color: '#0861a3' }} height={24} />
          Login with facebook
        </LoadingButton>
      </Stack>
    </FormikProvider>
  );
}

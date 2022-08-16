import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm, LoginFormBusiness } from '../../components/authentication/login';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// import { AuthContext } from '../contexts/FirebaseContext';
import { motion } from 'framer-motion';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));
const HeroImgStyle = styled(motion.iframe)(({ theme }) => ({
  top: 0,
  right: 10,
  bottom: 0,
  zIndex: 9,
  width: '100%',
  height: '100%',
  margin: 'auto',
  position: 'absolute',
  objectFit: 'cover',
  opacity: 0.8,
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    height: '48vh'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));
const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  // const { } = useAuth();
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <RootStyle title="Login | Krowd">
      <AuthLayout>
        Bạn chưa có tại khoản? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
          Đăng ký ngay
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ p: 5, mt: 10, mb: 5 }}>
            FPT Capstone <br />
            KROWD System
          </Typography>
          <Typography variant="h3" sx={{ p: 25 }}>
            <HeroImgStyle src="https://embed.lottiefiles.com/animation/38435" />
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="column" justifyContent="space-between" sx={{ mb: 3 }}>
            <LoginForm />
          </Stack>
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Bạn chưa có tài khoản?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Đăng ký ngay
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

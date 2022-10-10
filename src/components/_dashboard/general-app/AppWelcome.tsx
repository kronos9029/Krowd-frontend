import { Link as RouterLink } from 'react-router-dom';
// material
import { motion, useAnimation, MotionProps } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, CardProps } from '@mui/material';
import { SeoIllustration } from '../../../assets';
import { User_Investor } from '../../../@types/krowd/investor';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: '#14b7cc',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  investor?: User_Investor | null;
  user?: any;
}

export default function AppWelcome({ user, investor }: AppWelcomeProps) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: '#FFFFFf' }}>
          Bảng tổng quan hệ thống
        </Typography>
        <Typography gutterBottom variant="h4" sx={{ color: '#FFFFFf' }}>
          Chào mừng bạn trở lại,
          <br /> {user.fullName}
        </Typography>
      </CardContent>

      <img
        style={{
          padding: 3,
          width: 460
          // margin: { xs: 'auto', md: 'inherit' }
        }}
        src={'/static/illustrations/AppIllustation.png'}
      />
    </RootStyle>
  );
}

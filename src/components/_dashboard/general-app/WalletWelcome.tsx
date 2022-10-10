// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, CardProps, Container } from '@mui/material';
import { CheckOutIllustration, OrderCompleteIllustration, SeoIllustration } from '../../../assets';
import { User_Investor } from '../../../@types/krowd/investor';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: '#14b7cc',
  [theme.breakpoints.up('md')]: {
    height: '70%',
    display: 'center',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  [theme.breakpoints.up('sm')]: {
    height: '70%',
    textAlign: 'center',
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
      <img
        style={{
          padding: 3,
          width: 460
        }}
        src={'/static/icons/navbar/bankingIllustration.jpg'}
      />
    </RootStyle>
  );
}

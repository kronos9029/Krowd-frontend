// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, CardProps, Container } from '@mui/material';
import {
  bankingIllustration,
  CheckOutIllustration,
  OrderCompleteIllustration,
  SeoIllustration
} from '../../../assets';
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
const BankingContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0, 4, 0),
  backgroundImage: `url(${bankingIllustration})`,
  backgroundSize: 'cover'
}));
export default function AppWelcome({ user, investor }: AppWelcomeProps) {
  return (
    <RootStyle>
      {/* <OrderCompleteIllustration
        sx={{
          p: 3,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      /> */}
      <BankingContainer sx={{ width: '50%', height: '100%' }}></BankingContainer>
      <CardContent
        sx={{
          color: 'grey.800'
        }}
      >
        <Typography variant="h4">
          Thống kê ví của bạn,
          <br /> {user.fullName}
        </Typography>
      </CardContent>
    </RootStyle>
  );
}

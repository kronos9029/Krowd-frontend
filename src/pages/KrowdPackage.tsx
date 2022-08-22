// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Switch, Container, Typography, Stack, Divider } from '@mui/material';
// components
import Page from '../components/Page';
import { PricingPlanCard } from '../components/_external-pages/pricing';
//
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

// ----------------------------------------------------------------------

const PLANS = [
  {
    subscription: 'Cơ bản',
    icon: <PlanFreeIcon />,
    price: 500000,
    caption: '500.000',
    lists: [
      { text: 'Phần thưởng 1', isAvailable: true },
      { text: 'Phần thưởng 2', isAvailable: true },
      { text: 'Phần thưởng 3', isAvailable: false },
      { text: 'Ưu đãi đặc biệt', isAvailable: false },
      { text: 'Ưu đãi đặc biệt', isAvailable: false }
    ],
    labelAction: 'Chọn gói cơ bản'
  },
  {
    subscription: 'starter',
    icon: <PlanStarterIcon />,
    price: 2000000,
    caption: '2000000',
    lists: [
      { text: 'Phần thưởng 1', isAvailable: true },
      { text: 'Phần thưởng 2', isAvailable: true },
      { text: 'Phần thưởng 3', isAvailable: true },
      { text: 'Ưu đãi đặc biệt', isAvailable: false },
      { text: 'Ưu đãi đặc biệt', isAvailable: false }
    ],
    labelAction: 'Chọn gói 1'
  },
  {
    subscription: 'Premium',
    icon: <PlanPremiumIcon />,
    price: 5000000,
    caption: '5000000',
    lists: [
      { text: 'Phần thưởng 1', isAvailable: true },
      { text: 'Phần thưởng 2', isAvailable: true },
      { text: 'Phần thưởng 3', isAvailable: true },
      { text: 'Ưu đãi đặc biệt', isAvailable: true },
      { text: 'Ưu đãi đặc biệt', isAvailable: true }
    ],
    labelAction: 'Chọn gói 2'
  }
];

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(7),
  paddingBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function KrowdPackage() {
  return (
    <RootStyle title="Gói ưu đãi | Krowd">
      <Container maxWidth="lg" sx={{ paddingBottom: '5rem' }}>
        <Box>
          <Typography textAlign="center" py={5} color={'#666'} variant="h3">
            Các loại gói đầu tư
          </Typography>
          <Box mx="auto" width={'10%'} pb={3}>
            <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
          </Box>
        </Box>
        <Grid container spacing={3}>
          {PLANS.map((card, index) => (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PricingPlanCard card={card} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}

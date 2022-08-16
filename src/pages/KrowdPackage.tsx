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
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function KrowdPackage() {
  return (
    <RootStyle title="Gói ưu đãi | Krowd">
      <Container maxWidth="lg">
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

// material
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingMinimal,
  LandingDarkMode,
  // LandingLegal,
  LandingStartup,
  LandingPricingFAQs,
  LandingAdvertisement,
  // LandingSteps,
  LandingThreeSteps,
  LandingHugePackElements
} from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  height: '100%'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="Nền tảng gọi vốn cộng đồng cho doanh nghiệp nhỏ | Krowd" id="move_top">
      <ContentStyle>
        <LandingHero />
        <LandingMinimal />
        <LandingStartup />
        <LandingHugePackElements />
        <LandingThreeSteps />
        <LandingPricingFAQs />
        <LandingAdvertisement />
        <LandingDarkMode />
      </ContentStyle>
    </RootStyle>
  );
}

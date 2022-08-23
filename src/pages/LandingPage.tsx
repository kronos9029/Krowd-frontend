// material
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import { MessengerChat } from 'react-messenger-chat-plugin';

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
        <LandingAdvertisement />
        <LandingThreeSteps />
        <LandingPricingFAQs />
        <LandingDarkMode />
        <MessengerChat
          pageId="100084621412328"
          language="sv_SE"
          themeColor={'#000000'}
          bottomSpacing={300}
          loggedInGreeting="loggedInGreeting"
          loggedOutGreeting="loggedOutGreeting"
          greetingDialogDisplay={'show'}
          onMessengerShow={() => {
            console.log('onMessengerShow');
          }}
          onMessengerHide={() => {
            console.log('onMessengerHide');
          }}
          onMessengerDialogShow={() => {
            console.log('onMessengerDialogShow');
          }}
          onMessengerDialogHide={() => {
            console.log('onMessengerDialogHide');
          }}
          onMessengerMounted={() => {
            console.log('onMessengerMounted');
          }}
          onMessengerLoad={() => {
            console.log('onMessengerLoad');
          }}
        />
        ,{/* <MessengerCustomerChat pageId="" appId="596613965341821" />, */}
      </ContentStyle>
    </RootStyle>
  );
}

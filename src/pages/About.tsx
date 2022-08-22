// material
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AboutHero,
  AboutWhat,
  AboutTeam,
  AboutVision
} from '../components/_external-pages/about-krowd';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(11)
}));

// ----------------------------------------------------------------------

export default function About() {
  return (
    <RootStyle title="Về chúng tôi | Krowd">
      <AboutHero />
      <AboutWhat />
      <AboutVision />
      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />
      <AboutTeam />
      {/* <AboutTestimonials /> */}
    </RootStyle>
  );
}

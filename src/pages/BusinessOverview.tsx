// material
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import {
  BusinessHero,
  BusinessMaterialUI,
  BusinessContent
} from '../components/_external-pages/business-components';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function ComponentsOverview() {
  return (
    <RootStyle title="Chi tiết dự án | Krowd">
      <BusinessHero />
      <Container maxWidth="lg">
        <BusinessMaterialUI />
        <BusinessContent />
      </Container>
    </RootStyle>
  );
}

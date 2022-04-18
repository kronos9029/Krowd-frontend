// material
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import {
  // ComponentHero,
  ComponentMaterialUI,
  ComponentContent
} from '../components/_external-pages/components-overview';
import MainNavbar from 'layouts/main/MainNavbar';
import MainFooter from 'layouts/main/MainFooter';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function ComponentsDetails() {
  return (
    <RootStyle title="Chi tiết dự án | Krowd">
      {/* <MainNavbar /> */}
      <Container maxWidth="lg">
        <ComponentMaterialUI />
        <ComponentContent />
      </Container>
      {/* <MainFooter /> */}
    </RootStyle>
  );
}

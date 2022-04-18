// material
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import {
  BusinessContent,
  BusinessHero,
  BusinessMaterialUI
} from 'components/_external-pages/business-components';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));
const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#E5F3E9'
}));

// ----------------------------------------------------------------------

export default function ComponentsOverview() {
  return (
    <RootStyle title="Nhà đầu tư | Krowd">
      <BusinessHero />
      <ContentStyle>
        <Container maxWidth="lg">
          <BusinessMaterialUI />
          <BusinessContent />
        </Container>
      </ContentStyle>
    </RootStyle>
  );
}

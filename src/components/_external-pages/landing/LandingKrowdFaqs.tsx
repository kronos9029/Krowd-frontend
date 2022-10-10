// material
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { FaqsList } from '../faqs';
import Page from 'components/Page';
import useLocales from 'hooks/useLocales';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  // paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(9)
  }
}));

// ----------------------------------------------------------------------

export default function LandingKrowdFaqs() {
  const { translate: t } = useLocales();

  return (
    <RootStyle>
      <Container sx={{ mt: 3, mb: 10 }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          {t('question_appear')}
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <img src="/static/home/hero.svg" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FaqsList />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

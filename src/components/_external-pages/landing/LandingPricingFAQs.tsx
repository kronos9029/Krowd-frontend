// material
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { FaqsList } from '../faqs';
import Page from 'components/Page';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  // paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------
const Language = [
  {
    code: 'vi',
    name: 'English',
    countryCode: 'vi'
  },
  {
    code: 'en',
    name: 'Vietnamese',
    countryCode: 'en'
  }
];
export default function Faqs() {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
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

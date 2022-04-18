// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
//
import { MotionInView, varFadeInUp } from '../../animate';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: '#14B7CC'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  // marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));
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
// ----------------------------------------------------------------------

export default function LandingDarkMode() {
  const currentLanguageCode = cookies.get('i18next') || 'vi';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          component="img"
          alt="image shape"
          src="/static/home/shape.svg"
          sx={{
            top: 0,
            right: 0,
            bottom: 0,
            my: 'auto',
            position: 'absolute',
            filter: 'grayscale(1) opacity(48%)',
            display: { xs: 'none', md: 'block' }
          }}
        />

        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h3" sx={{ mb: 3, color: 'common.white' }}>
                  {t('app_title_description')}
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: 'common.white', display: 'block' }}
                >
                  {t('app_title_description_1')}
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography sx={{ color: '', mb: 5 }}>
                  <img alt="light mode" src="/static/home/GooglePlay.png" />
                </Typography>
                <Typography sx={{ color: '', mb: 5 }}>
                  <img alt="light mode" src="/static/home/AppStore.png" />
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={4} md={6} sx={{ position: 'relative' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, paddingTop: '10rem', position: 'absolute' }}
            >
              <img alt="dark mode" src="/static/home/AppDownload.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

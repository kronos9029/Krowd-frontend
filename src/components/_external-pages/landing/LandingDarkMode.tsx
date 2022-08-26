// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
//
import { MotionInView, varFadeInUp } from '../../animate';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { OverlayBackground } from 'assets';
import { motion } from 'framer-motion';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0, 4, 0),
  backgroundColor: '#14B7CC',
  backgroundImage: `url(${OverlayBackground})`,
  backgroundSize: 'cover'
}));

const HeroImgStyle = styled(motion.iframe)(({ theme }) => ({
  top: 0,
  right: 10,
  bottom: 0,
  zIndex: 9,
  width: '100%',
  height: '100%',
  margin: 'auto',
  position: 'absolute',
  objectFit: 'cover',
  opacity: 0.8,
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    height: '48vh'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));
//
const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
  const currentLanguageCode = cookies.get('i18next') || 'en';
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

        <Grid container spacing={5} direction="row-reverse" justifyContent="space-evenly">
          <Grid item xs={6} sm={3} md={4} sx={{ position: 'relative' }}>
            {/* <HeroImgStyle src="https://embed.lottiefiles.com/animation/45041" /> */}
            <img alt="dark mode" src="/static/home/AppDownload.svg" />
          </Grid>

          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography component="p" variant="h4" sx={{ mb: 3, color: 'common.white' }}>
                  {t('app_title_description')}
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  sx={{ mb: 3, color: 'common.white', display: 'block', fontSize: '18px' }}
                >
                  {t('app_title_description_1')}
                </Typography>
              </MotionInView>

              <Grid container spacing={3} justifyContent={'space-between'}>
                <Grid xs={6} sm={7} md={5} spacing={3}>
                  <iframe
                    src="https://embed.lottiefiles.com/animation/27173"
                    style={{
                      width: '200px',
                      height: '239px'
                    }}
                  />
                </Grid>

                <Grid xs={5} sm={5} md={7}>
                  <iframe
                    src="https://embed.lottiefiles.com/animation/27169"
                    style={{
                      width: '167px',
                      height: '240px'
                    }}
                  />
                </Grid>
              </Grid>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

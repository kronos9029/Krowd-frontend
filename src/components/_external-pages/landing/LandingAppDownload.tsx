// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
//
import { MotionInView, varFadeInUp } from '../../animate';
import { OverlayBackground } from 'assets';
import { motion } from 'framer-motion';
import useLocales from 'hooks/useLocales';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0, 4, 0),
  backgroundColor: '#14B7CC',
  backgroundImage: `url(${OverlayBackground})`,
  backgroundSize: 'cover'
}));

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

// ----------------------------------------------------------------------

export default function LandingAppDownload() {
  const { translate: t } = useLocales();

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
            <img alt="dark mode" src="/static/home/AppDownload.svg" />
          </Grid>

          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography component="p" variant="h4" sx={{ mb: 3, color: 'common.white' }}>
                  {t('app_title_description')}
                </Typography>
              </MotionInView>

              {/* <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  sx={{ mb: 3, color: 'common.white', display: 'block', fontSize: '18px' }}
                >
                  {t('app_title_description_1')}
                </Typography>
              </MotionInView> */}
              <MotionInView variants={varFadeInUp}>
                <Typography
                  component="p"
                  sx={{ mb: 3, color: 'common.white', display: 'block', fontSize: '18px' }}
                >
                  {t('app_title_description_2')}
                </Typography>
              </MotionInView>

              <Grid container spacing={3} sx={{ my: 1 }} justifyContent={'space-between'}>
                <Grid></Grid>

                <Grid xs={11} sm={12} md={6} spacing={3}>
                  <iframe
                    src="/static/icons/navbar/QRcode.png"
                    style={{
                      width: '200px',
                      height: '239px'
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

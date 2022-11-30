// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
//
import { MotionInView, varFadeInUp } from '../../animate';
import { OverlayBackground } from 'assets';
import { motion } from 'framer-motion';
import useLocales from 'hooks/useLocales';
import { margin } from '@mui/system';
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
        <MotionInView variants={varFadeInUp}>
          <Typography
            component="p"
            variant="h4"
            sx={{ color: 'common.white', textAlign: 'center' }}
          >
            {t('app_title_description')}
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <img style={{ objectFit: 'cover' }} alt="dark mode" src="/static/home/KrowdApp.png" />{' '}
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <Typography
            component="p"
            sx={{
              mb: 3,
              color: 'common.white',
              display: 'block',
              fontSize: '18px',
              textAlign: 'center'
            }}
          >
            {t('app_title_description_2')}
          </Typography>
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <Typography
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <iframe
              src="/static/icons/navbar/QRcode.png"
              style={{
                width: '200px',
                height: '239px',
                margin: 'auto'
              }}
            />
          </Typography>{' '}
        </MotionInView>
      </Container>
    </RootStyle>
  );
}

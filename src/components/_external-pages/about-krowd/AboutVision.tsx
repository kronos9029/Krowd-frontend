// material
import { Box, Container, Typography, Grid } from '@mui/material';
//
import { varFadeInUp, varFadeIn, MotionInView } from '../../animate';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
//
const Language = [
  {
    code: 'en',
    name: 'Tiếng việt',
    countryCode: 'vn'
  },
  {
    code: 'vi',
    name: 'English',
    countryCode: 'en'
  }
];
export default function AboutVision() {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box
        sx={{
          mb: 10,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <img src="/static/about/vision.jpg" alt="about-vision" />

        <Box
          sx={{
            bottom: { xs: 24, md: 80 },
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center'
          }}
        >
          {['logo_amazon', 'logo_hbo', 'logo_ibm', 'logo_lya', 'logo_spotify', 'logo_netflix'].map(
            (logo) => (
              <MotionInView key={logo} variants={varFadeIn}>
                <Box
                  component="img"
                  src={`/static/about/${logo}.svg`}
                  sx={{
                    m: { xs: 1.5, md: 3 },
                    height: { xs: 24, md: 32 }
                  }}
                />
              </MotionInView>
            )
          )}
        </Box>
      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3" sx={{ textAlign: 'center', color: 'rgb(20, 183, 204)' }}>
              {t('aboutus_krowd_vision_title_1')}
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', paddingBottom: '2rem' }}>
              {t('aboutus_krowd_vision_title')}
            </Typography>
            <img src="/static/about/halo.jpg" />
            <Typography sx={{ textAlign: 'left', paddingTop: '2rem' }}>
              {t('aboutus_krowd_vision_description')}
            </Typography>
            <Typography sx={{ textAlign: 'left', paddingTop: '2rem' }}>
              {t('aboutus_krowd_vision_description_2')}
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}

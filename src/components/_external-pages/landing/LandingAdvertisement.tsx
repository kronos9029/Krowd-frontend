// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography, useMediaQuery } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
import CardMedia from '@mui/material/CardMedia';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(12),
    backgroundColor: '#14B7CC'
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
    minHeight: 400,
    margin: 'auto',
    textAlign: 'left',
    padding: theme.spacing(0, 3, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#ffffff',
      borderRadius: theme.shape.borderRadiusMd,
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.35)}`
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});
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

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const bgLight = theme.palette.mode === 'light';
  const currentLanguageCode = cookies.get('i18next') || 'vi';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle
      sx={{
        color: isLight ? 'white' : 'text.primary',
        backgroundColor: bgLight ? '#14B7CC' : '#14B7CC',
        paddingBottom: '5rem'
      }}
    >
      <Box sx={{ textAlign: 'center', paddingTop: '3rem' }}>
        <Typography variant="h2" sx={{ mb: 3, color: isLight ? '#FAF4EF' : '#FAF4EF' }}>
          {t('advertise_title')}
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={isDesktop ? 10 : 5}>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem' }}
                  component="img"
                  height="194"
                  image="/static/components/step1.png"
                />
                <Typography
                  variant="h5"
                  style={{
                    color: '#14B7CC',
                    textAlign: 'center'
                  }}
                  paragraph
                >
                  {t('advertise_description1')}
                </Typography>
                <Typography
                  style={{ paddingBottom: '2rem', textAlign: 'center' }}
                  sx={{ color: isLight ? 'text.secondary' : 'common.black' }}
                >
                  {t('advertise_description_cover_1')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem' }}
                  component="img"
                  height="194"
                  image="/static/components/Kết nối nhà đầu tư.png"
                />
                <Typography
                  variant="h5"
                  style={{
                    color: '#14B7CC',
                    textAlign: 'center'
                  }}
                  paragraph
                >
                  {t('advertise_description2')}
                </Typography>
                <Typography
                  style={{ paddingBottom: '2rem', textAlign: 'center' }}
                  sx={{ color: isLight ? 'text.secondary' : 'common.black' }}
                >
                  {t('advertise_description_cover_2')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem' }}
                  component="img"
                  height="194"
                  image="/static/components/step3.png"
                />
                <Typography
                  variant="h5"
                  style={{
                    color: '#14B7CC',
                    textAlign: 'center'
                  }}
                  paragraph
                >
                  {t('advertise_description3')}
                </Typography>
                <Typography
                  style={{ paddingBottom: '2rem', textAlign: 'center' }}
                  sx={{ color: isLight ? 'text.secondary' : 'common.black' }}
                >
                  {t('advertise_description_cover_3')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

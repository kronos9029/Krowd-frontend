// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography, useMediaQuery } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(9),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(12),
    // backgroundColor: '#212b35'
    backgroundColor: '#14B7CC'
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 350,
    minHeight: 300,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(5, 2, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#FFFFFF',
      borderRadius: theme.shape.borderRadiusMd,
      boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: '#FFFFFF',
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
          backgroundColor: '#FFFFFF',
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
  const bgLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const currentLanguageCode = cookies.get('i18next') || 'vi';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle
      sx={{
        paddingBottom: '4rem',
        color: isLight ? '#FAF4EF' : '#FAF4EF',
        backgroundColor: bgLight ? '#14B7CC' : '#14B7CC'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 10, textAlign: 'center' } }}>
          <Typography variant="h2" sx={{ color: isLight ? '#FAF4EF' : '#FAF4EF' }}>
            {t('invest_step')}
          </Typography>
          <Typography sx={{ color: isLight ? '#FAF4EF' : '#FAF4EF' }}>
            {t('invest_step_cover')}
          </Typography>
        </Box>
        <Grid container spacing={isDesktop ? 15 : 5}>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle
                sx={{
                  mb: 3,
                  color: isLight ? '#251E18' : '#251E18',
                  backgroundColor: bgLight ? '#FFFFFF' : '#FFFFFF'
                }}
              >
                <Typography>
                  <img
                    style={{
                      width: '50px',
                      display: 'inline',
                      paddingBottom: '10px'
                    }}
                    src="/static/faqs/register.png"
                  />
                </Typography>
                {/* <Typography variant="h3" paragraph style={{ color: '#14B7CC' }}>
                  1
                </Typography> */}
                <Typography variant="h5" paragraph style={{ color: '#14B7CC' }}>
                  {t('invest_step_title_1')}
                </Typography>
                <Typography sx={{ color: isLight ? '#251E18' : 'common.white', textAlign: 'left' }}>
                  {t('invest_step_1')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle
                sx={{
                  mb: 3,
                  color: isLight ? '#251E18' : '#251E18',
                  backgroundColor: bgLight ? '#FFFFFF' : '#FFFFFF'
                }}
              >
                {/* <Typography variant="h3" paragraph style={{ color: '#14B7CC' }}>
                  2
                </Typography> */}
                <Typography>
                  <img
                    style={{
                      width: '50px',
                      display: 'inline',
                      paddingBottom: '10px'
                    }}
                    src="/static/faqs/topup1.png"
                  />
                </Typography>
                <Typography variant="h5" paragraph style={{ color: '#14B7CC' }}>
                  {t('invest_step_title_2')}
                </Typography>
                <Typography sx={{ color: isLight ? '#251E18' : 'common.white', textAlign: 'left' }}>
                  {t('invest_step_2')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle
                sx={{
                  mb: 3,
                  color: isLight ? '#251E18' : '#251E18',
                  backgroundColor: bgLight ? '#FFFFFF' : '#FFFFFF'
                }}
              >
                {/* <Typography variant="h3" paragraph style={{ color: '#14B7CC' }}>
                  3
                </Typography> */}
                <Typography>
                  <img
                    style={{
                      width: '50px',
                      display: 'inline',
                      paddingBottom: '10px'
                    }}
                    src="/static/faqs/invest.png"
                  />
                </Typography>
                <Typography variant="h5" paragraph style={{ color: '#14B7CC' }}>
                  {t('invest_step_title_3')}
                </Typography>
                <Typography sx={{ color: isLight ? '#251E18' : 'common.white', textAlign: 'left' }}>
                  {t('invest_step_3')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

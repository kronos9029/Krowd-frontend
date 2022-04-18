// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Grid, Card, Container, Typography, useMediaQuery } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
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

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(1)
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 420,
    minHeight: 240,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundImage: 'linear-gradient(to right bottom, #14b7cc 2%, #f3b6a0)',
    padding: theme.spacing(7, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: '#14b7cc'
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 }
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
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

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const currentLanguageCode = cookies.get('i18next') || 'vi';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={isDesktop ? 15 : 5}>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle>
                <Typography>
                  <img
                    style={{
                      width: '70px',
                      display: 'inline',
                      paddingBottom: '10px'
                    }}
                    src="/static/faqs/topup.png"
                  />
                </Typography>
                <Typography
                  style={{
                    fontSize: '17px'
                  }}
                  variant="h6"
                  paragraph
                >
                  {t('card_title_1')}
                </Typography>
                <Typography sx={{ color: isLight ? '#FFFFFF' : 'common.white' }}>
                  {t('card_description_1')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle>
                <Typography>
                  <img
                    style={{
                      width: '70px',
                      display: 'inline',
                      paddingBottom: '10px'
                    }}
                    src="/static/faqs/topup.png"
                  />
                </Typography>
                <Typography
                  style={{
                    fontSize: '17px'
                    // width: '229px'
                  }}
                  variant="h6"
                  paragraph
                >
                  {t('card_title_2')}
                </Typography>
                <Typography sx={{ color: isLight ? '#FFFFFF' : 'common.white' }}>
                  {t('card_description_2')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle>
                <Typography>
                  <img
                    style={{
                      width: '70px',
                      display: 'inline',
                      paddingBottom: '10px'
                    }}
                    src="/static/faqs/topup.png"
                  />
                </Typography>
                <Typography
                  style={{
                    fontSize: '17px'
                  }}
                  variant="h6"
                  paragraph
                >
                  {t('card_title_3')}
                </Typography>
                <Typography sx={{ color: isLight ? '#FFFFFF' : 'common.white' }}>
                  {t('card_description_3')}
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

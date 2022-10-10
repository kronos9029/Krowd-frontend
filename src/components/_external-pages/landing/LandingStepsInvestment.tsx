// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography, useMediaQuery } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';

import { OverlayBackground } from 'assets';
import useLocales from 'hooks/useLocales';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(9),
  backgroundImage: `url(${OverlayBackground})`,
  backgroundSize: 'cover',
  backgroundColor: '#14B7CC',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(12)
    // backgroundColor: '#212b35'
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
    // boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#FFFFFF',
      borderRadius: theme.shape.borderRadiusMd
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
          backgroundColor: '#FFFFFF'
        }
      }
    }
  };
});

// ----------------------------------------------------------------------
const ThreeSteps = [
  {
    icon: '/static/faqs/register.png',
    step_title: 'invest_step_title_1',
    step_content: 'invest_step_1'
  },
  {
    icon: '/static/faqs/topup1.png',
    step_title: 'invest_step_title_2',
    step_content: 'invest_step_2'
  },
  {
    icon: '/static/faqs/invest.png',
    step_title: 'invest_step_title_3',
    step_content: 'invest_step_3'
  }
];
export default function LandingStepsInvestment() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const bgLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const { translate: t } = useLocales();

  return (
    <RootStyle
      sx={{
        paddingBottom: '4rem',
        color: isLight ? '#FAF4EF' : '#FAF4EF'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 10, textAlign: 'center' } }}>
          <Typography
            variant="h2"
            sx={{ color: isLight ? '#FAF4EF' : '#FAF4EF', marginTop: '29px' }}
          >
            {t('invest_step')}
          </Typography>
          <Typography sx={{ color: isLight ? '#FAF4EF' : '#FAF4EF' }}>
            {t('invest_step_cover')}
          </Typography>
        </Box>
        <Grid container spacing={isDesktop ? 15 : 5}>
          {ThreeSteps.map((value, index) => (
            <Grid key={index} item xs={12} md={4}>
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
                      src={value.icon}
                    />
                  </Typography>
                  {/* <Typography variant="h3" paragraph style={{ color: '#14B7CC' }}>
                  1
                </Typography> */}
                  <Typography variant="h5" paragraph style={{ color: '#14B7CC' }}>
                    {t(value.step_title)}
                  </Typography>
                  <Typography
                    sx={{
                      color: isLight ? 'rgb(99, 115, 129)' : 'common.white',
                      textAlign: 'center',
                      fontWeight: '400'
                    }}
                  >
                    {t(value.step_content)}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}

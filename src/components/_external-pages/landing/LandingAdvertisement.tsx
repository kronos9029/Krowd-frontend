// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography, useMediaQuery } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
import CardMedia from '@mui/material/CardMedia';

import useLocales from 'hooks/useLocales';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(12),
    backgroundImage:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
            theme.palette.grey[300]
          } 100%)`
        : 'none'
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
    minHeight: 460,
    margin: 'auto',
    textAlign: 'left',
    padding: theme.spacing(0, 3, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#ffffff',
      borderRadius: theme.shape.borderRadiusMd,
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.35)}`
    },
    '&.card_0': {
      marginBottom: '2rem'
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

// ----------------------------------------------------------------------
const Advertisements = [
  {
    icon: '/static/components/step1.svg',
    step_title: 'advertise_description1',
    step_content: 'advertise_description_cover_1'
  },
  {
    icon: '/static/components/Kết nối nhà đầu tư.svg',
    step_title: 'advertise_description2',
    step_content: 'advertise_description_cover_2'
  },
  {
    icon: '/static/components/step3.svg',
    step_title: 'advertise_description3',
    step_content: 'advertise_description_cover_3'
  }
];
export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { translate } = useLocales();

  return (
    <RootStyle
      sx={{
        color: 'text.primary',
        paddingBottom: '5rem'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', padding: '1rem 0' }}>
          <Typography variant="h2" sx={{ mb: 3, my: '3rem' }}>
            {translate('advertise_title')}
          </Typography>
        </Box>
        <Grid container spacing={isDesktop ? 10 : 5}>
          {Advertisements.map((value, index) => {
            const isLeftCard = index === 0 ? '1.75rem' : 0;
            const isRightCard = index === 2 ? '0.75rem' : 0;
            return (
              <Grid key={`card_${index}`} item xs={12} md={4}>
                <MotionInView variants={varFadeInUp}>
                  <CardStyle sx={{ maxWidth: 345 }}>
                    <CardMedia
                      className={`card_${index}`}
                      style={{
                        paddingTop: '2rem',
                        marginBottom: isLeftCard || isRightCard
                      }}
                      component="img"
                      width="150"
                      sizes="cover"
                      image={value.icon}
                    />
                    <Typography
                      variant="h5"
                      style={{
                        color: '#14B7CC',
                        textAlign: 'center'
                      }}
                      paragraph
                    >
                      {translate(value.step_title)}
                      {/* {t(value.step_title)} */}
                    </Typography>
                    <Typography
                      style={{ paddingBottom: '2rem', textAlign: 'center' }}
                      sx={{ color: isLight ? 'text.secondary' : 'common.black' }}
                    >
                      {translate(value.step_content)}
                    </Typography>
                  </CardStyle>
                </MotionInView>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </RootStyle>
  );
}

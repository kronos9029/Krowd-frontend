// components//
import { Box, Grid, Card, Container, Typography, useMediaQuery } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
import CardMedia from '@mui/material/CardMedia';
import { alpha, useTheme, styled } from '@mui/material/styles';
import mockData from 'utils/mock-data';
// ----------------------------------------------------------------------
const MOCK_NUMBER = [...Array(1)].map((_, index) => ({
  id: mockData.id(index),
  hook1: mockData.contentDB.hook1(index),
  data0: mockData.contentDB.data0(index),
  data1: mockData.contentDB.data1(index),
  data2: mockData.contentDB.data2(index)
}));
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  backgroundColor: '#E5F3E9'
}));
const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
    minHeight: 420,
    margin: 'auto',
    textAlign: 'left',
    padding: theme.spacing(0, 3, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#FFFFFF',
      borderRadius: theme.shape.borderRadiusMd,
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.35)}`
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
export default function ComponentMaterialUI() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const bgLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <RootStyle>
      <h1 style={{ textAlign: 'center' }}>
        Our Franchise
        <br /> Selection Processo
      </h1>
      <p style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        At FranShares, we will never charge fees. We invest alongside our investors in every fund,
        generally 20%. This means we only make money
        <br /> when you make money, so we take franchise selection seriously
      </p>
      <Container maxWidth="lg">
        <Grid container spacing={isDesktop ? 10 : 5}>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle
                sx={{
                  mb: { xs: 10, md: 10, textAlign: 'center' },
                  color: isLight ? 'white' : 'text.primary',
                  backgroundColor: bgLight ? '#ffffff' : '#9acdff'
                }}
              >
                <Typography>
                  <img
                    style={{ width: '80px', display: 'inline', paddingTop: '3rem' }}
                    src="/static/faqs/bussiness1.png"
                  />
                </Typography>
                <Typography variant="h5" style={{ color: 'purple' }} paragraph>
                  Source the best
                  <br /> franchise opportunities
                </Typography>
                <Typography
                  style={{ paddingBottom: '2rem' }}
                  sx={{ color: isLight ? 'text.secondary' : 'common.black' }}
                >
                  We review hundreds of franchise opportunities, but less than 1% meet our
                  investment criteria. We look for franchise opportunities in recession resistant
                  industries with a strong track record of success
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle
                sx={{
                  mb: { xs: 10, md: 10, textAlign: 'center' },
                  color: isLight ? 'white' : 'text.primary',
                  backgroundColor: bgLight ? '#ffffff' : '#9acdff'
                }}
              >
                <Typography>
                  <img
                    style={{ width: '80px', display: 'inline', paddingTop: '3rem' }}
                    src="/static/faqs/bussiness2.png"
                  />
                </Typography>
                <Typography variant="h5" style={{ color: 'purple' }} paragraph>
                  Lock-in the
                  <br /> best deals
                </Typography>
                <Typography
                  style={{ paddingBottom: '2rem' }}
                  sx={{ color: isLight ? 'text.secondary' : 'common.black' }}
                >
                  At FranShares, we buy our franchises in bulk. This buying power ensures that we’re
                  also getting the best franchise valuations while enjoying franchise fee savings of
                  32% on average.
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle
                sx={{
                  mb: { xs: 10, md: 10, textAlign: 'center' },
                  color: isLight ? 'white' : 'text.primary',
                  backgroundColor: bgLight ? '#ffffff' : '#9acdff'
                }}
              >
                <Typography>
                  <img
                    style={{ width: '80px', display: 'inline', paddingTop: '3rem' }}
                    src="/static/faqs/bussiness2.png"
                  />
                </Typography>
                <Typography variant="h5" style={{ color: 'purple' }} paragraph>
                  Conduct rigorous
                  <br /> due diligence
                </Typography>
                <Typography
                  style={{ paddingBottom: '2rem' }}
                  sx={{ color: isLight ? 'text.secondary' : 'common.black' }}
                >
                  When we find a deal worth pursuing, we dive into the details and look at
                  everything from industry growth, competitive activity, macroeconomic trends,
                  franchise leadership, risks, and potential return on investment
                </Typography>
              </CardStyle>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

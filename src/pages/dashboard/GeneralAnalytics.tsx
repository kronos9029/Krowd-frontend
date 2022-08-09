// material
import { Grid, Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AnalyticsTasks,
  MembersParticipation,
  TermOfProject,
  MultiplierProject,
  AnalyticsNewsUpdate,
  SharedRevenue,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates
} from '../../components/_dashboard/general-analytics';

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tổng quan ngày | Krowd">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Chào mừng trở lại
        </Typography>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <SharedRevenue />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MembersParticipation />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MultiplierProject />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TermOfProject />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid> */}
          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

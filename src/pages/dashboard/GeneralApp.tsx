// material
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AppWelcome,
  AppWidgets1,
  AppWidgets2,
  AppFeatured,
  AppNewInvoice,
  AppTopRelated,
  AppAreaInstalled,
  AppTotalDownloads,
  AppTotalInstalled,
  AppCurrentDownload,
  AppTotalActiveUsers
} from '../../components/_dashboard/general-app';
import { RootState, useSelector } from 'redux/store';

// ----------------------------------------------------------------------
// const { themeStretch } = useSettings();
// const { user } = useAuth();
// const { businessDetailState } = useSelector((state: RootState) => state.business);
// const { businessDetail, isLoading } = businessDetailState;

// return (
//   <Page title="Trang chủ doanh nghiệp | Krowd dành cho doanh nghiệp">
//     <Container maxWidth={themeStretch ? false : 'xl'}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={5}>
//           <AppWelcome user={user} business={businessDetail} />
//         </Grid>
export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { UserDetailState } = useSelector((state: RootState) => state.userKrowd);
  const { UserDetail, isLoading } = UserDetailState;

  return (
    <Page title="Bảng điều khiển | Krowd">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome user={user} investor={UserDetail} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalActiveUsers />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalInstalled />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalDownloads />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          <Grid item xs={12} lg={12}>
            <AppNewInvoice />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidgets1 />
              <AppWidgets2 />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

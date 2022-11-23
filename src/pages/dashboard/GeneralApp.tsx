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
import { dispatch, RootState, useSelector } from 'redux/store';
import { useEffect } from 'react';
import { getProjectListInvestedById } from 'redux/slices/krowd_slices/project';

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { UserDetailState } = useSelector((state: RootState) => state.userKrowd);
  const { UserDetail, isLoading } = UserDetailState;
  useEffect(() => {
    dispatch(getProjectListInvestedById(localStorage.getItem('projectId') ?? ''));
  }, [dispatch]);
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

          <Grid item xs={12} md={12}>
            <AppTotalActiveUsers />
          </Grid>

          <Grid item xs={12} lg={12}>
            <AppNewInvoice />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

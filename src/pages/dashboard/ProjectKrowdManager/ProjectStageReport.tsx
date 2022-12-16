// material
import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import {
  getAllPaymentListRevenue,
  getBillDailyReport
} from 'redux/slices/krowd_slices/transaction';
import { TextAnimate, varBounceInUp, varWrapEnter } from 'components/animate';

import { Box, Card, Typography, Stack, Grid, Container } from '@mui/material';
import { KrowdProjectStage, StageListKrowdTable } from 'components/_external-pages/project-detail';
import { getProjectListById } from 'redux/slices/krowd_slices/project';

// ----------------------------------------------------------------------
import Page from 'components/Page';
import { getAllProjectStage, getProjectStageList } from 'redux/slices/krowd_slices/stage';
import ProjectReportRevenue from 'components/table/sidebarProject/ProjectReportRevenue';
import { DATA_TYPE, KrowdTable, RowData } from 'components/table/krowd-table/KrowdTable';
import { fCurrency } from 'utils/formatNumber';

export default function ProjectStageReport() {
  const { InvestedProjectDetails } = useSelector((state: RootState) => state.project);
  const { listOfProject } = InvestedProjectDetails;
  const [pageIndex2, setPageIndex2] = useState(1);
  const { paymentListState, paymentListRevenueState } = useSelector(
    (state: RootState) => state.transactionKrowd
  );
  const [pageSize2, setPageSize2] = useState(10);
  const { detailOfProject, packageLists } = useSelector((state: RootState) => state.project);
  const { detailOfProjectID: projectID } = detailOfProject;
  const {
    isLoadingPeriodRevenue,
    listOfPeriodRevenuePayment: listPeriodRevenue,
    numOfPayment: numberOfRevenue
  } = paymentListRevenueState;
  useEffect(() => {
    dispatch(getProjectListById(`${localStorage.getItem('projectId')}`));
    dispatch(getProjectStageList(`${localStorage.getItem('projectId')}`));
    dispatch(getAllProjectStage(`${localStorage.getItem('projectId')}`));
  }, [dispatch, pageIndex2]);

  return (
    <Page title="Lịch sử nhận thanh toán | Krowd dành cho doanh nghiệp">
      <Container maxWidth={false}>
        <Box sx={{ mb: 5 }}>
          {detailOfProject.detailOfProjectID?.status === 'ACTIVE' && (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    <Box sx={{ flexGrow: 1, color: 'green' }}>
                      <Typography sx={{ fontWeight: 700 }} variant="body1">
                        Tiền nhận được dự kiến
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mt: 2, mb: 1 }}
                      ></Stack>
                      <TextAnimate
                        text={fCurrency(listOfProject?.expectedReturn ?? 0)}
                        sx={{ typography: 'h3' }}
                        variants={varBounceInUp}
                      />
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    <Box sx={{ flexGrow: 1, color: 'green' }}>
                      <Typography sx={{ fontWeight: 700 }} variant="body1">
                        Đã thanh toán
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mt: 2, mb: 1 }}
                      ></Stack>
                      <TextAnimate
                        text={fCurrency(listOfProject?.returnedAmount ?? 0)}
                        sx={{ typography: 'h3' }}
                        variants={varBounceInUp}
                      />
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    <Box sx={{ flexGrow: 1, color: 'red' }}>
                      <Typography sx={{ fontWeight: 700 }} variant="body1">
                        Nợ tối thiểu
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mt: 2, mb: 1 }}
                      ></Stack>{' '}
                      <TextAnimate
                        text={fCurrency(listOfProject?.deptRemain ?? 0)}
                        sx={{ typography: 'h3' }}
                        variants={varBounceInUp}
                      />
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 700 }} variant="body1">
                        Nợ cộng lãi
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mt: 2, mb: 1 }}
                      ></Stack>
                      <TextAnimate
                        text={fCurrency(listOfProject?.profitableDebt ?? 0)}
                        sx={{ typography: 'h3' }}
                        variants={varBounceInUp}
                      />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
        <StageListKrowdTable project={projectID! ?? ''} />
      </Container>
    </Page>
  );
}

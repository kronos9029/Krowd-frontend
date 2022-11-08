// material
import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getBillDailyReport } from 'redux/slices/krowd_slices/transaction';
import { Button, Container, Grid, Typography } from '@mui/material';
import starFilled from '@iconify/icons-ant-design/star-filled';

import { Icon } from '@iconify/react';
import { KrowdProjectStage, StageListKrowdTable } from 'components/_external-pages/project-detail';
import { getProjectListById } from 'redux/slices/krowd_slices/project';
import React from 'react';
import ProjectBillDailyReport from '../../../components/table/sidebarProject/ProjectBillDailyReport';
// ----------------------------------------------------------------------
import Page from 'components/Page';
import { getAllProjectStage, getProjectStageList } from 'redux/slices/krowd_slices/stage';

export default function ProjectStageReport() {
  const [openStage, setOpenStage] = useState('chart');
  const { detailOfProject, packageLists } = useSelector((state: RootState) => state.project);
  const { listOfChartStage } = useSelector((state: RootState) => state.stage);
  const { detailOfProjectID: projectID, isLoadingDetailOfProjectID } = detailOfProject;
  useEffect(() => {
    dispatch(getProjectListById(`${localStorage.getItem('projectId')}`));
    dispatch(getProjectStageList(`${localStorage.getItem('projectId')}`));
    dispatch(getAllProjectStage(`${localStorage.getItem('projectId')}`));
  }, [dispatch]);
  const handleClickOpenStage = () => {
    setOpenStage('table');
  };
  const handleCloseOpenStage = () => {
    setOpenStage('chart');
  };
  return (
    <Page title="Báo cáo dự án hằng ngày | Krowd dành cho doanh nghiệp">
      <Container maxWidth={false}>
        <Grid
          container
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={5}
        >
          <Grid lg={8}>
            <Typography variant="h5" sx={{ mr: 3 }} color={'#666'}>
              <Icon
                icon={starFilled}
                style={{
                  marginRight: 10,
                  marginBottom: 5,
                  color: '#14B7CC'
                }}
              />
              Giai đoạn ước tính
            </Typography>
          </Grid>
          <Grid lg={4}>
            <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
              <Grid>
                <Button variant="outlined" onClick={handleClickOpenStage}>
                  <Typography variant="h4" color={'#666'} height={30}>
                    <Icon
                      icon={starFilled}
                      style={{
                        marginRight: 10,
                        marginBottom: 5,
                        color: '#14B7CC'
                      }}
                    />
                  </Typography>
                  Biểu thị dạng bảng
                </Button>
              </Grid>
              <Grid>
                <Button variant="outlined" onClick={handleCloseOpenStage}>
                  <Typography variant="h4" color={'#666'} height={30}>
                    <Icon
                      icon={starFilled}
                      style={{
                        marginRight: 10,
                        marginBottom: 5,
                        color: '#14B7CC'
                      }}
                    />
                  </Typography>
                  Biểu thị dạng biểu đồ
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {openStage === 'chart' && listOfChartStage && listOfChartStage.length > 0 && (
          <KrowdProjectStage project={projectID! ?? ''} nav={'Biểu đồ của dự án'} />
        )}

        {openStage === 'table' && listOfChartStage && listOfChartStage.length > 0 && (
          <StageListKrowdTable project={projectID! ?? ''} />
        )}
      </Container>
    </Page>
  );
}

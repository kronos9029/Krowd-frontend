// material
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import React from 'react';
import ProjectBillDailyReport from '../../../components/table/sidebarProject/ProjectBillDailyReport';
// ----------------------------------------------------------------------
import Page from 'components/Page';

export default function BillReportDailyProject() {
  return (
    <Page title="Báo cáo dự án hằng ngày | Krowd dành cho doanh nghiệp">
      <Container maxWidth={false}>
        <ProjectBillDailyReport />
      </Container>
    </Page>
  );
}

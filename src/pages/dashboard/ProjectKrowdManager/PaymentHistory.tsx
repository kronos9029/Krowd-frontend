// material
import { Box, CircularProgress, Container, Typography } from '@mui/material';

import Page from 'components/Page';
import PaymentProjectTable from 'components/table/sidebarProject/PaymentProjectTable';

// ----------------------------------------------------------------------

export default function PaymentHistory() {
  return (
    <Page title="Lịch sử nhận doanh thu | Krowd dành cho doanh nghiệp">
      <Container maxWidth={false}>
        <PaymentProjectTable />
      </Container>
    </Page>
  );
}

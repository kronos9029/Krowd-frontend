// material
import { Container } from '@mui/material';

import PeriodRevenueHistoryTable from 'components/table/sidebarProject/PeriodRevenueHistoryTable';
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function UserPeriodRevenueHistory() {
  return (
    <Page title="Đầu tư | Krowd">
      <Container maxWidth={false}>
        <PeriodRevenueHistoryTable />
      </Container>
    </Page>
  );
}

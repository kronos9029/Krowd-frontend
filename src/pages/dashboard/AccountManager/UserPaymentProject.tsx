// material
import { Container } from '@mui/material';

import PaymentProjectTable from 'components/table/PaymentProjectTable';
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function UserPaymentProject() {
  return (
    <Page title="Dự án: Danh sách | Krowd">
      <Container maxWidth={false}>
        <PaymentProjectTable />
      </Container>
    </Page>
  );
}

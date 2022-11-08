// material
import { Container } from '@mui/material';

import PaymentProjectTable from 'components/table/sidebarProject/PaymentProjectTable';
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function UserPaymentProject() {
  return (
    <Page title="Đầu tư | Krowd">
      <Container maxWidth={false}>
        <PaymentProjectTable />
      </Container>
    </Page>
  );
}

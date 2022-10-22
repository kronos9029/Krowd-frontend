// material
import { Container } from '@mui/material';

import AccounTransactionTable from 'components/table/AccounTransactionTable';
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function AccountTransactionList() {
  return (
    <Page title="Giao dịch | Krowd">
      <Container maxWidth={false}>
        <AccounTransactionTable />
      </Container>
    </Page>
  );
}

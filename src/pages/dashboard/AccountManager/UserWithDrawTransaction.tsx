// material
import { Container } from '@mui/material';

import AccountTransactionWithDrawTable from 'components/table/AccountTransactionWithDrawTable';
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function UserWithDrawTransaction() {
  return (
    <Page title="Lệnh rút tiền | Krowd">
      <Container maxWidth={false}>
        <AccountTransactionWithDrawTable />
      </Container>
    </Page>
  );
}

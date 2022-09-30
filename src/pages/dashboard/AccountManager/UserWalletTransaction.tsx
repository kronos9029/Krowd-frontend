// material
import { Container } from '@mui/material';

import WalletTransactionTable from 'components/table/WalletTransactionTable';
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function UserWalletTransaction() {
  return (
    <Page title="Dự án: Danh sách | Krowd">
      <Container maxWidth={false}>
        <WalletTransactionTable />
      </Container>
    </Page>
  );
}

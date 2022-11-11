// material
import { Container } from '@mui/material';

import InvestmentTableAll from 'components/table/InvestmentTableAll';
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function UserInvestmentAll() {
  return (
    <Page title="Giao dịch đầu tư | Krowd">
      <Container maxWidth={false}>
        <InvestmentTableAll />
      </Container>
    </Page>
  );
}

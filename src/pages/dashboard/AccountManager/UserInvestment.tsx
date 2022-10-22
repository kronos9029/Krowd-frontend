// material
import { Container } from '@mui/material';

import InvestmentTable from 'components/table/InvestmentTable';
import Page from 'components/Page';
import { BlogPostsSearch, BlogPostsSort } from 'components/_dashboard/project';
import { useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getWalletList } from 'redux/slices/krowd_slices/wallet';

// ----------------------------------------------------------------------

export default function UserInvestment() {
  return (
    <Page title="Giao dịch đầu tư | Krowd">
      <Container maxWidth={false}>
        <InvestmentTable />
      </Container>
    </Page>
  );
}

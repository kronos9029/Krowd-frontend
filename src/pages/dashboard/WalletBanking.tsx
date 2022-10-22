// material
import { Grid, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  TempWallet,
  SharedInvestmentWallet,
  AdvanceWallet,
  ProjectPaymentWallet,
  CollectionWallet,
  BankingContacts,
  BankingInviteFriends,
  BankingQuickTransfer,
  BankingCurrentBalance,
  BankingBalanceStatistics,
  BankingRecentTransitions,
  BankingExpensesCategories
} from '../../components/_dashboard/general-banking';
import { Wallet } from '../../@types/krowd/wallet';
import { AppWelcome, WalletWelcome } from 'components/_dashboard/general-app';
import { RootState, useSelector } from 'redux/store';
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

export default function WalletBanking({ wallet }: { wallet: Wallet }) {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { UserDetailState } = useSelector((state: RootState) => state.userKrowd);
  const { UserDetail, isLoading } = UserDetailState;

  return (
    <Page title="Ví của bạn | Krowd">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack direction={{ xs: 'row', sm: 'row' }} sx={{ mb: 3 }} spacing={3}>
              <TempWallet wallet={wallet} />
              <SharedInvestmentWallet wallet={wallet} />
            </Stack>
            <Stack direction={{ xs: 'row', sm: 'row' }} spacing={3}>
              {/* <WalletWelcome user={user} investor={UserDetail} /> */}
              <CollectionWallet wallet={wallet} />
              <AdvanceWallet wallet={wallet} />
              <ProjectPaymentWallet wallet={wallet} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <BankingRecentTransitions />
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <BankingQuickTransfer />
              <BankingContacts />
              <BankingInviteFriends />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

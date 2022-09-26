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
    <Page title="General: Banking | Krowd">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Grid lg={6}>
                <WalletWelcome user={user} investor={UserDetail} />
              </Grid>
              <Grid lg={6}>
                <TempWallet wallet={wallet} />
                <SharedInvestmentWallet wallet={wallet} />
              </Grid>
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={5}>
            <BankingCurrentBalance />
          </Grid> */}
          <Grid item xs={12} md={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <AdvanceWallet wallet={wallet} />
              <ProjectPaymentWallet wallet={wallet} />
              <CollectionWallet wallet={wallet} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <BankingBalanceStatistics />
              {/* <BankingExpensesCategories /> */}
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

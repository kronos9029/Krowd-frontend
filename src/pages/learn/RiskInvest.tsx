// material
import { Box, Container, Grid, styled, Typography } from '@mui/material';
// hooks
import Page from '../../components/Page';
import useLocales from 'hooks/useLocales';
const ContentStyle = styled(Typography)(() => ({
  fontSize: '18px'
}));
export default function RiskInvest() {
  const { translate: t } = useLocales();

  return (
    <Page title="Rủi ro khi đâu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Heading')}
          </Typography>
          <ContentStyle>{t('Learn_Investor_Risk_Invest.Definition')}</ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Project_Failure')}
          </Typography>
          <ContentStyle>{t('Learn_Investor_Risk_Invest.Project_Failure_Definition')}</ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Project_Liquidity')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_Risk_Invest.Project_Liquidity_Definition')}
            {/* Khả năng thanh toán lại khoản đầu tư của bạn trong những kỳ đầu tiên sẽ bị hạn chế với
            các lý do khác nhau. Bạn có thể phải neo khoản đầu tư của mình trong một khoảng thời
            gian dài. Không giống như đầu tư vào các dự án được niêm yết trên sàn giao dịch chứng
            khoán, tại Krowd không hỗ trợ hình thức bán lại khoản đầu tư của mình cho người khác để
            thu hồi vốn đầu tư ban đầu. Song, nếu bạn thực hiện giao dịch đó ngoài nền tảng của
            Krowd, mọi rủi ro và rắc rối về sau không nằm trong sự quản lý của Krowd. */}
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Project_Ownership_Voting')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_Risk_Invest.Project_Ownership_Voting_Definition')}
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Cancellation_Restrictions')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_Risk_Invest.Cancellation_Restrictions_Definition')}
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Limited_Disclosures')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_Risk_Invest.Limited_Disclosures_Definition')}
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Investment_Personnel')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_Risk_Invest.Investment_Personnel_Definition')}
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Possibility_Fraud')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_Risk_Invest.Possibility_Fraud_Definition')}
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_Risk_Invest.Lack_Professional_Guidance')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_Risk_Invest.Lack_Professional_Guidance_Definition')}
          </ContentStyle>
        </Grid>
      </Container>
    </Page>
  );
}

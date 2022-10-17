// material
import { Box, Container, Grid, styled, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import useLocales from 'hooks/useLocales';
const ContentStyle = styled(Typography)(() => ({
  fontSize: '18px'
}));
const BorderBoxStyle = styled(Box)(() => ({
  width: 100,
  height: 100,
  backgroundColor: '#14B7CC',
  borderRadius: 25,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
const ImageStyle = styled('img')(() => ({
  width: 80,
  height: 80
}));
export default function Communication() {
  const { translate: t } = useLocales();

  return (
    <Page title="Những gì bạn nhận được khi bạn đầu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            {t('Learn_Investor_What_I_Get_Invest.Heading')}
          </Typography>
          <ContentStyle>{t('Learn_Investor_What_I_Get_Invest.Definition')}</ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_What_I_Get_Invest.Valuable_Package')}
          </Typography>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <ImageStyle src="/static/icons/navbar/revenue.png" />
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>
                  {t('Learn_Investor_What_I_Get_Invest.Sharing_Revenue')}
                </Typography>
                <ContentStyle>
                  {t('Learn_Investor_What_I_Get_Invest.Sharing_Revenue_Description')}
                </ContentStyle>
                <ContentStyle>
                  {t('Learn_Investor_What_I_Get_Invest.Sharing_Revenue_Description_Text_2')}
                </ContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <ImageStyle src="/static/icons/navbar/voucher.png" />
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>
                  {' '}
                  {t('Learn_Investor_What_I_Get_Invest.Voucher')}
                </Typography>
                <ContentStyle>
                  {t('Learn_Investor_What_I_Get_Invest.Voucher_Description')}
                </ContentStyle>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

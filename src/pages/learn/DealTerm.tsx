// material
import { Box, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
// hooks
import Page from '../../components/Page';
import useLocales from 'hooks/useLocales';
const ContentStyle = styled(Typography)(() => ({
  fontSize: '18px'
}));

export default function DealTerm() {
  const { translate: t } = useLocales();

  return (
    <Page title="Hiểu về các điều khoản giao dịch | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ pt: 5 }}>
            {t('Learn_Investor_Deal_Term.Heading')}
          </Typography>
          <Typography
            sx={{ fontSize: '25px', lineHeight: 1.3, color: '#777', fontWeight: 400, py: 3 }}
          >
            {t('Learn_Investor_Deal_Term.Definition')}
          </Typography>
          <Box>
            <Typography variant="h3">{t('Learn_Investor_Deal_Term.Sponsorship_Goals')}</Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ lineHeight: 2 }}>
              <Box sx={{ mb: 2 }}>
                <ContentStyle>
                  {t('Learn_Investor_Deal_Term.Sponsorship_Goals_Definition')}
                </ContentStyle>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="h3">{t('Learn_Investor_Deal_Term.Stages_Campaign')}</Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ lineHeight: 2 }}>
              <Box>{t('Learn_Investor_Deal_Term.Stages_Campaign_Definition')}</Box>
              <Box sx={{ pb: 5 }}>
                {t('Learn_Investor_Deal_Term.Stages_Campaign_Definition_Text_2')}
              </Box>
              <Box display={'flex'}>
                <Box>
                  <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>1</Typography>
                </Box>
                <Box sx={{ pb: 5 }}>
                  <Box sx={{ px: 4.5 }}>
                    <Typography sx={{ fontSize: '22px', lineHeight: 1.3 }}>
                      {t('Learn_Investor_Deal_Term.Stages_1')}
                    </Typography>
                    <br /> {t('Learn_Investor_Deal_Term.Stages_1_Description')}
                  </Box>
                </Box>
              </Box>

              <Box display={'flex'}>
                <Box>
                  <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}> 2</Typography>
                </Box>
                <Box sx={{ pb: 5 }}>
                  <Box sx={{ px: 3 }}>
                    <Typography sx={{ fontSize: '22px', lineHeight: 1.3 }}>
                      {t('Learn_Investor_Deal_Term.Stages_2')}
                    </Typography>
                    <br /> {t('Learn_Investor_Deal_Term.Stages_2_Description')}
                  </Box>
                </Box>
              </Box>
              <Box display={'flex'}>
                <Box>
                  <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}> 3</Typography>
                </Box>
                <Box sx={{ pb: 5 }}>
                  <Box sx={{ px: 3 }}>
                    <Typography sx={{ fontSize: '22px', lineHeight: 1.3 }}>
                      {t('Learn_Investor_Deal_Term.Stages_3')}
                    </Typography>
                    <br /> {t('Learn_Investor_Deal_Term.Stages_3_Description')}
                    <br /> {t('Learn_Investor_Deal_Term.Stages_3_Description_Text_2')}
                    <br /> {t('Learn_Investor_Deal_Term.Stages_3_Description_Text_3')}
                  </Box>
                </Box>
              </Box>
              <Box display={'flex'}>
                <Box>
                  <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}> 4</Typography>
                </Box>
                <Box sx={{ pb: 5 }}>
                  <Box sx={{ px: 3 }}>
                    <Typography sx={{ fontSize: '22px', lineHeight: 1.3 }}>
                      {t('Learn_Investor_Deal_Term.Stages_4')}
                    </Typography>
                    <br /> {t('Learn_Investor_Deal_Term.Stages_4_Description')}
                  </Box>
                </Box>
              </Box>
              <Box display={'flex'}>
                <Box>
                  <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}> 5</Typography>
                </Box>
                <Box sx={{ pb: 5 }}>
                  <Box sx={{ px: 3 }}>
                    <Typography sx={{ fontSize: '22px', lineHeight: 1.3 }}>
                      {t('Learn_Investor_Deal_Term.Stages_5')}
                    </Typography>
                    <br /> {t('Learn_Investor_Deal_Term.Stages_5_Description')}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="h3">
              {t('Learn_Investor_Deal_Term.Change_Trading_Terms')}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box>
              <Typography sx={{ mb: 2 }}>
                {t('Learn_Investor_Deal_Term.Change_Trading_Terms_Description_1')}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mb: 2 }}>
                {t('Learn_Investor_Deal_Term.Change_Trading_Terms_Description_2')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Page>
  );
}

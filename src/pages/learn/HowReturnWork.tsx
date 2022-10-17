// material
import { Box, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import React from 'react';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';
import useLocales from 'hooks/useLocales';
const ContentStyle = styled(Typography)(() => ({
  fontSize: '18px'
}));
const SubContentStyle = styled(Typography)(() => ({
  fontSize: '18px',
  paddingLeft: 20
}));

const BoldStyle = styled('span')(() => ({
  fontWeight: 'bold'
}));
const ItalicStyle = styled('span')(() => ({
  fontStyle: 'italic'
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
export default function HowReturnWork() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { translate: t } = useLocales();

  return (
    <Page title="Quy trình thanh khoản | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            {t('Learn_Investor_How_Return_Work.Heading')}
          </Typography>
          <ContentStyle my={2}>{t('Learn_Investor_How_Return_Work.Definition')}</ContentStyle>
          <ContentStyle my={2}>
            {t('Learn_Investor_How_Return_Work.Definition_Text_2')}
          </ContentStyle>
          <ContentStyle my={2}>
            {t('Learn_Investor_How_Return_Work.Definition_Text_3')}
          </ContentStyle>
        </Grid>
      </Container>
    </Page>
  );
}

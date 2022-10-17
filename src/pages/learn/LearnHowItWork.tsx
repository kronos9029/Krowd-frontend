// material
import { Box, Container, Grid, List, ListItemText, styled, Typography } from '@mui/material';
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
export default function HowItWork() {
  const { translate: t } = useLocales();

  return (
    <Page title="Cách thức đâu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.Heading')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_How_It_Works.Introduction_Text_1')}
            <Link to={'#'}>{t('Learn_Investor_How_It_Works.KrowdEco')}</Link>
            {t('Learn_Investor_How_It_Works.Introduction_Text_2')}{' '}
            <BoldStyle>"{t('Learn_Investor_How_It_Works.Introduction_Text_2_1')}"</BoldStyle>.
          </ContentStyle>
        </Grid>

        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.KrowdEco_Meaning')}
          </Typography>
          <ContentStyle>{t('Learn_Investor_How_It_Works.KrowdEco_Definition')}</ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.Sharing_Revenue')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_How_It_Works.Sharing_Revenue_Defination')}
            <BoldStyle>
              "{t('Learn_Investor_How_It_Works.Sharing_Revenue_Defination_Keyword')}"
            </BoldStyle>
            {t('Learn_Investor_How_It_Works.Sharing_Revenue_Defination_Text_2')}
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Heading')}
          </Typography>
          <ContentStyle lineHeight={3}>
            <ItalicStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Advantages_1')}
            </ItalicStyle>
            <SubContentStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Description_Advantages_1')}
            </SubContentStyle>
          </ContentStyle>
          <ContentStyle lineHeight={3}>
            <ItalicStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Advantages_2')}
            </ItalicStyle>
            <SubContentStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Description_Advantages_2')}
            </SubContentStyle>
          </ContentStyle>
          <ContentStyle lineHeight={3}>
            <ItalicStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Advantages_3')}
            </ItalicStyle>
            <SubContentStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Description_Advantages_3')}
            </SubContentStyle>
          </ContentStyle>
          <ContentStyle lineHeight={3}>
            <ItalicStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Advantages_4')}
            </ItalicStyle>
            <SubContentStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Model.Description_Advantages_4')}
            </SubContentStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.Sharing_Revenue_Note')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_How_It_Works.Sharing_Revenue_Note_Definition_Text_1')}
            <BoldStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Note_Definition_Keyword_1')}
            </BoldStyle>
            {t('Learn_Investor_How_It_Works.Sharing_Revenue_Note_Definition_Text_2')}
            <ItalicStyle>
              {t('Learn_Investor_How_It_Works.Sharing_Revenue_Note_Definition_Keyword_2')}
            </ItalicStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.Key_Term.Heading')}
          </Typography>
          <ContentStyle>
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                <BoldStyle>
                  {t('Learn_Investor_How_It_Works.Key_Term.Sharing_percentages')}
                </BoldStyle>
                {t('Learn_Investor_How_It_Works.Key_Term.Sharing_percentages_Definition')}
              </ListItemText>
              <ListItemText disableTypography>
                <BoldStyle> {t('Learn_Investor_How_It_Works.Key_Term.Multiplier')}</BoldStyle>
                {t('Learn_Investor_How_It_Works.Key_Term.Multiplier_Definition')}
              </ListItemText>
              <ListItemText disableTypography>
                <BoldStyle> {t('Learn_Investor_How_It_Works.Key_Term.Duration')}</BoldStyle>
                {t('Learn_Investor_How_It_Works.Key_Term.Duration_Definition')}
              </ListItemText>
              <ListItemText disableTypography>
                <BoldStyle>{t('Learn_Investor_How_It_Works.Key_Term.numOfTerm')}</BoldStyle>
                {t('Learn_Investor_How_It_Works.Key_Term.numOfTerm_Definition')}
              </ListItemText>
            </List>
            {t('Learn_Investor_How_It_Works.Key_Term.Example_text_1')}
            <BoldStyle>{t('Learn_Investor_How_It_Works.Key_Term.Example_Keyword_1')}</BoldStyle>
            {t('Learn_Investor_How_It_Works.Key_Term.Example_text_2')}
            <BoldStyle> {t('Learn_Investor_How_It_Works.Key_Term.Example_Keyword_2')}</BoldStyle>
            {t('Learn_Investor_How_It_Works.Key_Term.Example_text_3')}
            <BoldStyle>{t('Learn_Investor_How_It_Works.Key_Term.Example_Keyword_3')}</BoldStyle>
            {t('Learn_Investor_How_It_Works.Key_Term.Example_text_4')}
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                {t('Learn_Investor_How_It_Works.Key_Term.Example_Sharing_Percentages')}
                <ItalicStyle>
                  {t('Learn_Investor_How_It_Works.Key_Term.Example_Sharing_Percentages_Number')}
                </ItalicStyle>
              </ListItemText>
              <ListItemText disableTypography>
                {t('Learn_Investor_How_It_Works.Key_Term.Example_Multiplier')}
                <ItalicStyle>
                  {t('Learn_Investor_How_It_Works.Key_Term.Example_Multiplier_Number')}
                </ItalicStyle>
              </ListItemText>
              <ListItemText disableTypography>
                {t('Learn_Investor_How_It_Works.Key_Term.Example_Duration')}
                <ItalicStyle>
                  {t('Learn_Investor_How_It_Works.Key_Term.Example_Duration_Number')}
                </ItalicStyle>
              </ListItemText>
              <ListItemText disableTypography>
                {t('Learn_Investor_How_It_Works.Key_Term.Example_numOfTerm')}
                <ItalicStyle>
                  {t('Learn_Investor_How_It_Works.Key_Term.Example_numOfTerm_Number')}
                </ItalicStyle>
              </ListItemText>
            </List>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.Key_Term.Conclude_Text')}
              <BoldStyle>{t('Learn_Investor_How_It_Works.Key_Term.Conclude_Text_2')}</BoldStyle>
              {t('Learn_Investor_How_It_Works.Key_Term.Conclude_Text_3')}
              <BoldStyle>{t('Learn_Investor_How_It_Works.Key_Term.Conclude_Text_4')}</BoldStyle>
              {t('Learn_Investor_How_It_Works.Key_Term.Conclude_Text_5')}
              <BoldStyle>{t('Learn_Investor_How_It_Works.Key_Term.Conclude_Text_6')}</BoldStyle>
            </ContentStyle>
            <ContentStyle color={'orange'} mt={1}>
              {t('Learn_Investor_How_It_Works.Key_Term.Warning')}
            </ContentStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.Investor_Payment_Start')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_How_It_Works.Investor_Payment_Start_Definition')}
            <ContentStyle color={'orange'} mt={1}>
              {t('Learn_Investor_How_It_Works.Investor_Payment_Start_Warning')}
            </ContentStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.Investor_Payment_Finish')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_How_It_Works.Investor_Payment_Finish_Definition')}
            <ContentStyle lineHeight={2} sx={{ py: 1 }}>
              <BoldStyle>
                {t('Learn_Investor_How_It_Works.Investor_Payment_Finish_Definition_Well_Case')}
              </BoldStyle>
              {t('Learn_Investor_How_It_Works.Investor_Payment_Finish_Definition_Well_Case_Text')}
            </ContentStyle>
            <ContentStyle sx={{ py: 1 }} lineHeight={2}>
              <BoldStyle>
                {t('Learn_Investor_How_It_Works.Investor_Payment_Finish_Definition_Normal')}
              </BoldStyle>
              {t('Learn_Investor_How_It_Works.Investor_Payment_Finish_Definition_Normal_Text')}
            </ContentStyle>
            <ContentStyle sx={{ py: 1 }} lineHeight={2}>
              <BoldStyle>
                {t('Learn_Investor_How_It_Works.Investor_Payment_Finish_Definition_Worst_Case')}
              </BoldStyle>
              {t('Learn_Investor_How_It_Works.Investor_Payment_Finish_Definition_Worst_Case_Text')}
            </ContentStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            {t('Learn_Investor_How_It_Works.What_Fields_Invested.Heading')}
          </Typography>
          <ContentStyle>
            {t('Learn_Investor_How_It_Works.What_Fields_Invested.Definition')}
          </ContentStyle>
        </Grid>
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/healthy-eating.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Food')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Food_Description')}
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/drink.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Drink')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Drink_Description')}
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/education.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Education')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Education_Description')}
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/cosmetics.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Beauty')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Beauty_Description')}
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/shop.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Convinient')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Convinient_Description')}
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/muscle.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Health')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Health_Description')}
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/treadmill.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Sport')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Sport_Description')}
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/fashion-merchandising.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Fashion')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Fashion_Description')}
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/pills.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Health_Doctor')}
            </Typography>
            <ContentStyle>
              {t('Learn_Investor_How_It_Works.What_Fields_Invested.Health_Doctor_Description')}
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

// material
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, Container, Typography } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
import useLocales from 'hooks/useLocales';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(12)
}));

const CenterItemContainerMd = styled(Container)(({ theme }) => ({
  [theme.breakpoints.between('sm', 'md')]: {
    paddingLeft: '25%',
    paddingRight: '25%'
  }
}));
const CardStyle = styled(Card)(({ theme }) => {
  return {
    maxWidth: 420,
    minHeight: 200,
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#ffffff',
    padding: theme.spacing(3.2, 5, 2, 3),
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#ffffff'
    },
    '&.card_title_2': {
      [theme.breakpoints.up('md')]: {
        backgroundColor: '#ffffff'
      }
    }
  };
});

const MinimalContents = [
  {
    icon: '/static/faqs/topup.png',
    card_title: 'card_title_1',
    card_description: 'card_description_1'
  },
  {
    icon: '/static/faqs/clock.png',
    card_title: 'card_title_2',
    card_description: 'card_description_2'
  },
  {
    icon: '/static/faqs/fund.png',
    card_title: 'card_title_3',
    card_description: 'card_description_3'
  }
];
// ----------------------------------------------------------------------

export default function LandingKrowdSteps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { translate: t } = useLocales();

  return (
    <RootStyle>
      <CenterItemContainerMd maxWidth="lg">
        <Grid container spacing={4}>
          {Array.from(MinimalContents).map((value) => (
            <Grid key={value.card_title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle className={value.card_title}>
                  <Typography>
                    <img
                      style={{
                        width: '50px',
                        display: 'inline',
                        paddingBottom: '1rem'
                      }}
                      src={value.icon}
                    />
                  </Typography>
                  <Typography
                    sx={{ fontSize: '16px', textTransform: 'uppercase' }}
                    variant="h6"
                    paragraph
                  >
                    {t(value.card_title)}
                  </Typography>
                  <Typography
                    sx={{
                      color: isLight ? 'rgb(99, 115, 129)' : 'common.white',
                      fontWeight: '600'
                    }}
                  >
                    {t(value.card_description)}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </CenterItemContainerMd>
    </RootStyle>
  );
}

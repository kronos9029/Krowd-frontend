// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Grid, Card, Container, Typography, useMediaQuery } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { fontSize } from '@mui/system';
// ----------------------------------------------------------------------
const Language = [
  {
    code: 'vi',
    name: 'English',
    countryCode: 'vi'
  },
  {
    code: 'en',
    name: 'Vietnamese',
    countryCode: 'en'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(12),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(1)
  }
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
    padding: theme.spacing(3.2, 5, 2),
    // boxShadow: '-20px 20px 40px 0 rgb(0 0 0 / 35%)',
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#ffffff'
    },
    '&.card_title_2': {
      [theme.breakpoints.up('md')]: {
        // backgroundColor: theme.palette.background.paper
        backgroundColor: '#ffffff'
        // boxShadow: '-20px 20px 40px 0 rgb(0 0 0 / 35%)',
        // '&:before': {
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        //   zIndex: -1,
        //   content: "''",
        //   margin: 'auto',
        //   position: 'absolute',
        //   width: 'calc(100% - 20px)',
        //   height: 'calc(100% - 40px)',
        //   borderRadius: theme.shape.borderRadiusMd,
        // backgroundColor: theme.palette.background.paper
        //   backgroundColor: '#14b7cc0a'
        // boxShadow: '-20px 20px 40px 0 rgb(0 0 0 / 15%)'
        // }
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

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle>
      <CenterItemContainerMd maxWidth="lg">
        <Grid container spacing={isDesktop ? 15 : 5}>
          {Array.from(MinimalContents).map((value) => (
            <Grid key={value.card_title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle className={value.card_title}>
                  <Typography>
                    <img
                      style={{
                        width: '50px',
                        display: 'inline',
                        paddingBottom: '1.5rem'
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

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@mui/material/styles';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Box,
  Container,
  Typography,
  Stack,
  StackProps,
  InputAdornment,
  Input,
  Grid
} from '@mui/material';
// routes
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import { PATH_SEARCHPAGE } from 'routes/paths';
import { OverlayBackground } from 'assets';

// ----------------------------------------------------------------------
const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  // position: 'absolute',
  alignItems: 'center',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  borderRadius: '7px'
}));
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0, 0, 0),
  backgroundImage: `url(${OverlayBackground})`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(13),
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props: StackProps) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    Width: '100%',
    margin: 'auto',
    textAlign: 'center',
    borderRadius: '2rem',
    paddingLeft: 0,
    paddingRight: 0,
    position: 'relative',
    backgroundImage: 'none',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left',
      height: '100%',
      marginBottom: 0,
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: 50,
      paddingBottom: 60
    }
  })
);

// const ContentStyle = styled('div')(({ theme }) => ({
//   textAlign: 'center',
//   position: 'relative',
//   // marginBottom: theme.spacing(10),
//   [theme.breakpoints.up('md')]: {
//     height: '100%',
//     marginBottom: 0,
//     textAlign: 'left',
//     display: 'inline-flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'flex-start'
//   }
// }));

const HeroOverlayStyle = styled(motion.img)(() => ({
  zIndex: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 9,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  opacity: 0.6,
  [theme.breakpoints.up('md')]: {
    right: '5%',
    width: 'auto',
    height: '48vh'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));
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
// ----------------------------------------------------------------------

export default function LandingHero() {
  const currentLanguageCode = cookies.get('i18next') || 'vi';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <HeroImgStyle alt="hero" src="/static/home/hero2.png" />
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item xs={12} md={7}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h1" sx={{ color: 'common.white' }}>
                  {t('Thumbnail_landing_hero_title')} <br />
                  {t('Thumbnail_landing_hero_title_1')} <br /> {t('Thumbnail_landing_hero_title_2')}
                  <Typography component="span" variant="h1" sx={{ color: '#14B7CC' }}>
                    &nbsp;KROWD
                  </Typography>
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography sx={{ color: 'common.white', paddingBottom: '1rem' }}>
                  {t('Thumbnail_landing_hero_description')} <br />
                  {t('Thumbnail_landing_hero_description_1')}
                </Typography>
                <Typography sx={{ color: 'common.white' }}>
                  {t('Thumbnail_landing_hero_description2')}
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography>
                  <SearchbarStyle>
                    <Input
                      style={{
                        backgroundColor: '#FAF4EF',
                        height: '50px',
                        borderRadius: '15px',
                        marginLeft: '5px'
                      }}
                      fullWidth
                      // disableUnderline
                      placeholder={t('Search_hover')}
                      startAdornment={
                        <InputAdornment position="start">
                          <Box
                            component={Icon}
                            icon={searchFill}
                            sx={{
                              marginLeft: '10px',
                              color: '#251E18',
                              width: 20,
                              height: 20
                            }}
                          />
                        </InputAdornment>
                      }
                      sx={{ fontWeight: 'fontWeightBold', color: '#251E18' }}
                    />

                    <Button
                      href={PATH_SEARCHPAGE}
                      style={{
                        backgroundColor: '#14B7CC',
                        color: '#FAF4EF',
                        width: '150px',
                        margin: '7px',
                        fontSize: '15px',
                        height: '50px'
                      }}
                      variant="contained"
                    >
                      {t('Search')}
                    </Button>
                  </SearchbarStyle>
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import Particles from 'react-particles-js';

import { styled } from '@mui/material/styles';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import particlesConfig from 'assets/particlesConfig.json';

import {
  Button,
  Box,
  Container,
  Typography,
  Stack,
  StackProps,
  InputAdornment,
  Input
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
  backgroundColor: '#14B7CC',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(13),
    top: 0,
    left: 0,
    width: '100%',
    // display: 'flex',
    alignItems: 'center'
  }
  // [theme.breakpoints.up('sm')]: {
  //   paddingBottom: theme.spacing(8),
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   // display: 'flex',
  //   alignItems: 'center'
  // },
  // [theme.breakpoints.up('xs')]: {
  //   paddingTop: theme.spacing(11),
  //   paddingBottom: theme.spacing(4),
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   // display: 'flex',
  //   alignItems: 'center'
  // }
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
    // position: 'relative',
    backgroundImage: 'none',
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left',
      height: '100%',
      marginBottom: 0,
      display: 'inline-flex',
      flexDirection: 'collum',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },

    [theme.breakpoints.down('md')]: {
      paddingTop: 50,
      paddingBottom: 60
    }
  })
);

const HeroImgStyle = styled(motion.iframe)(({ theme }) => ({
  top: 0,
  right: 10,
  bottom: 0,
  zIndex: 9,
  width: '100%',
  height: '100%',
  margin: 'auto',
  position: 'absolute',
  objectFit: 'cover',
  opacity: 0.8,
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    height: '48vh'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));
const SearchInput = styled(Input)(() => ({
  backgroundColor: '#FAF4EF',
  height: '50px',
  borderRadius: '5px',
  fontWeight: 'bold',
  color: '#251E18'
}));
//
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
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle>
      {/* <Particles
        className="myParticles"
        params={{
          particles: {
            line_linked: {
              color: '#528fcc'
            },
            number: {
              value: 100
            },
            size: {
              value: 8
            },
            color: {
              value: '#336699'
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: false,
                mode: 'repulse'
              }
            }
          }
        }}
      /> */}
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* <Container maxWidth={false}> */}
        <HeroImgStyle src="https://embed.lottiefiles.com/animation/71841" />
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h1" sx={{ color: 'common.white' }}>
              {t('Thumbnail_landing_hero_title')} {t('Thumbnail_landing_hero_title_1')}{' '}
              {t('Thumbnail_landing_hero_title_2')}
              <Typography component="span" variant="h1" sx={{ color: '#14B7CC' }}>
                &nbsp;KROWD
              </Typography>
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography sx={{ color: 'common.white', paddingBottom: '1rem' }}>
              {t('Thumbnail_landing_hero_description')} {t('Thumbnail_landing_hero_description_1')}{' '}
            </Typography>
            <Typography sx={{ color: 'common.white', paddingBottom: '1rem' }}>
              {t('Thumbnail_landing_hero_description2')}
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography>
              <SearchbarStyle>
                <SearchInput
                  disableUnderline={true}
                  fullWidth
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
      </Container>
    </RootStyle>
  );
}

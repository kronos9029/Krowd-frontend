import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

import { styled } from '@mui/material/styles';

import { Container, Typography, Stack, StackProps } from '@mui/material';
// routes
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import { OverlayBackground } from 'assets';
import { BlogPostsSearch } from 'components/_dashboard/project';
import useLocales from 'hooks/useLocales';

// ----------------------------------------------------------------------
const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  // position: 'absolute',
  backgroundColor: 'white',
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

//

// ----------------------------------------------------------------------

export default function LandingHero() {
  const { translate } = useLocales();
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* <Container maxWidth={false}> */}
        <HeroImgStyle src="https://embed.lottiefiles.com/animation/71841" />
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h1" sx={{ color: 'common.white' }}>
              {translate('Thumbnail_landing_hero_title')}{' '}
              {translate('Thumbnail_landing_hero_title_1')}{' '}
              {translate('Thumbnail_landing_hero_title_2')}
              <Typography component="span" variant="h1" sx={{ color: '#14B7CC' }}>
                &nbsp;KROWD
              </Typography>
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography sx={{ color: 'common.white', paddingBottom: '1rem' }}>
              {translate('Thumbnail_landing_hero_description')}{' '}
              {translate('Thumbnail_landing_hero_description_1')}{' '}
            </Typography>
            <Typography sx={{ color: 'common.white', paddingBottom: '1rem' }}>
              {translate('Thumbnail_landing_hero_description2')}
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography>
              <SearchbarStyle></SearchbarStyle>
              <BlogPostsSearch />
            </Typography>
          </MotionInView>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

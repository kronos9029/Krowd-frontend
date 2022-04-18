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
import { varFadeInUp, MotionInView } from '../../animate';
import { PATH_SEARCHPAGE } from 'routes/paths';

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
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(13),
    backgroundColor: '#14B7CC',
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
    backgroundColor: '#14B7CC',
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

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '48vh'
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
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item xs={12} md={7}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h1" sx={{ color: 'common.white' }}>
                  {t('Thumbnail_landing_hero_title')} <br />
                  {t('Thumbnail_landing_hero_title_1')} <br /> {t('Thumbnail_landing_hero_title_2')}
                  <Typography component="span" variant="h1" sx={{ color: '#251E18' }}>
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
                        backgroundColor: '#FF7F50',
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
          <Box
            component="img"
            alt="hero"
            src="/static/home/hero2.png"
            sx={{
              top: 0,
              right: 0,
              bottom: 0,
              my: 'auto',
              position: 'absolute',
              // filter: 'grayscale(1) opacity(48%)',
              display: { xs: 'none', md: 'block' }
            }}
          />
        </Grid>
      </Container>
    </RootStyle>
    // <RootStyle>
    //   <HeroOverlayStyle alt="overlay" src="" variants={varFadeIn} />
    //   <HeroImgStyle alt="hero" src="/static/home/hero2.png" variants={varFadeInUp} />
    //   <Container maxWidth="lg">
    //     <ContentStyle>
    //       <motion.div variants={varFadeInRight}>
    //         <Typography variant="h1" sx={{ color: 'common.white' }}>
    //           {t('Thumbnail_landing_hero_title')} <br />
    //           {t('Thumbnail_landing_hero_title_1')} <br /> {t('Thumbnail_landing_hero_title_2')}
    //           <Typography component="span" variant="h1" sx={{ color: '#251E18' }}>
    //             &nbsp;KROWD
    //           </Typography>
    //         </Typography>
    //       </motion.div>

    //       <motion.div variants={varFadeInRight}>
    //         <Typography sx={{ color: 'common.white', paddingBottom: '1rem' }}>
    //           {t('Thumbnail_landing_hero_description')} <br />
    //           {t('Thumbnail_landing_hero_description_1')}
    //         </Typography>
    //         <Typography sx={{ color: 'common.white' }}>
    //           {t('Thumbnail_landing_hero_description2')}
    //         </Typography>
    //       </motion.div>

    //       <motion.div variants={varFadeInRight}>
    //         <SearchbarStyle>
    //           <Input
    //             style={{
    //               backgroundColor: '#FAF4EF',
    //               height: '50px',
    //               borderRadius: '15px'
    //             }}
    //             autoFocus
    //             fullWidth
    //             // disableUnderline
    //             placeholder={t('Search_hover')}
    //             startAdornment={
    //               <InputAdornment position="start">
    //                 <Box
    //                   component={Icon}
    //                   icon={searchFill}
    //                   sx={{
    //                     marginLeft: '10px',
    //                     color: '#251E18',
    //                     width: 20,
    //                     height: 20
    //                   }}
    //                 />
    //               </InputAdornment>
    //             }
    //             sx={{ mr: 1, fontWeight: 'fontWeightBold', color: '#251E18' }}
    //           />
    //           <Button
    //             style={{
    //               backgroundColor: '#FF7F50',
    //               color: '#FAF4EF',
    //               width: '150px',
    //               // margin: '20px',
    //               fontSize: '15px',
    //               height: '50px'
    //             }}
    //             variant="contained"
    //           >
    //             {t('Search')}
    //           </Button>
    //         </SearchbarStyle>
    //         {/* <Button
    //           sx={{ backgroundColor: 'purple' }}
    //           size="large"
    //           variant="contained"
    //           component={RouterLink}
    //           to={PATH_DASHBOARD.root}
    //           startIcon={<Icon icon={flashFill} width={20} height={20} />}
    //         >
    //           Đầu tư ngay
    //         </Button> */}
    //       </motion.div>
    //     </ContentStyle>
    //   </Container>
    // </RootStyle>
    // {/* <Box sx={{ height: { md: '100vh' } }} /> */}
  );
}

import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
//
import { varWrapEnter, varFadeInRight, TextAnimate } from '../../animate';
// import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  // backgroundImage: 'url(/static/overlay.svg), url(/static/about/hero.jpg)',
  backgroundImage: 'url(/static/overlay.svg), url(/static/media/overlay.cb8ff19f.svg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10)
  }
}));
const Language = [
  {
    code: 'en',
    name: 'Tiếng việt',
    countryCode: 'vn'
  },
  {
    code: 'vi',
    name: 'English',
    countryCode: 'en'
  }
];
// ----------------------------------------------------------------------

export default function AboutHero() {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle sx={{ mb: 7 }}>
          <TextAnimate
            text={t('Who')}
            sx={{ color: 'primary.main', mr: 2, gap: 1 }}
            variants={varFadeInRight}
          />
          <TextAnimate
            sx={{ display: 'inline-flex', color: 'common.white', mr: 2 }}
            text={t('Are')}
          />
          <TextAnimate
            text={t('we')}
            sx={{ display: 'inline-flex', color: 'common.white', mr: 2 }}
          />
          <motion.div variants={varFadeInRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium'
              }}
            >
              {t('aboutus_hero')}
              <br /> {t('aboutus_hero_1')}
            </Typography>
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

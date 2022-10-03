import { motion } from 'framer-motion';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
//
import { varFadeIn, varWrapEnter, varFadeInRight, TextAnimate } from '../../animate';
import DashboardLayoutLearn from 'layouts/learnInvest';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Bali',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(239) 555-0108'
  },
  {
    country: 'London',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(319) 555-0115'
  },
  {
    country: 'Prague',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(252) 555-0126'
  },
  {
    country: 'Moscow',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(307) 555-0133'
  }
];

const RootStyle = styled(motion.div)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  // backgroundImage: 'url(/static/overlay.svg), url(/static/contact/hero.jpg)',
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

// ----------------------------------------------------------------------

export default function ContactHero() {
  return (
    <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Where" sx={{ color: 'primary.main' }} variants={varFadeInRight} />
          <Box>
            <Typography sx={{ mr: 2 }}> How it works</Typography>
          </Box>
          <Box>
            <Typography sx={{ mr: 2 }}> How it works</Typography>
          </Box>
          <Box>
            <Typography sx={{ mr: 2 }}> How it works</Typography>
          </Box>
          <Box>
            <Typography sx={{ mr: 2 }}> How it works</Typography>
          </Box>
          <Box>
            <Typography sx={{ mr: 2 }}> How it works</Typography>
          </Box>
          <Box>
            <Typography sx={{ mr: 2 }}> How it works</Typography>
          </Box>
        </ContentStyle>
        <DashboardLayoutLearn />
      </Container>
    </RootStyle>
  );
}

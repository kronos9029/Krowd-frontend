import { useRef } from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Card, Button, Container, Typography, IconButton } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import { CarouselControlsArrowsBasic2 } from '../../carousel';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import classNames from 'classnames';
import cookies from 'js-cookie';
// ----------------------------------------------------------------------

const MOCK_MEMBERS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  role: mockData.role(index),
  avatar: mockData.image.avatar(index)
}));

//
const Language = [
  {
    code: 'en',
    countryCode: 'vn',
    name: 'Tiếng Việt'
  },
  {
    code: 'am',
    countryCode: 'en',
    name: 'English'
  }
];
//----------------------------------------------------------------

type MemberCardProps = {
  member: {
    id: string;
    name: string;
    role: string | undefined;
    avatar: string;
  };
};

function MemberCard({ member }: MemberCardProps) {
  const { name, role, avatar } = member;
  return (
    <Card key={name} sx={{ p: 1, mx: 1.5 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Box component="img" src={avatar} sx={{ borderRadius: 1.5 }} />
      <Box sx={{ mt: 2, mb: 1 }}>
        {[facebookFill, instagramFilled, linkedinFill, twitterFill].map((social, index) => (
          <IconButton key={index}>
            <Icon icon={social} width={20} height={20} />
          </IconButton>
        ))}
      </Box>
    </Card>
  );
}
export default function AboutTeam() {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const carouselRef = useRef<Slider>(null);
  const theme = useTheme();

  const settings = {
    slidesToShow: 5,
    centerMode: true,
    centerPadding: '0 80px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 4 },
        transForm: 'translateY(-30px)'
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
        transForm: 'translateY(-20px)'
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
        transForm: 'translateY(-40px)'
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container maxWidth="lg" sx={{ pb: 10, textAlign: 'center' }}>
      <MotionInView variants={varFadeInDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          KROWD TEAM
        </Typography>
      </MotionInView>

      {/* <MotionInView variants={varFadeInUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Great team is the key
        </Typography>
      </MotionInView> */}

      <MotionInView variants={varFadeInUp}>
        <Typography
          sx={{
            mb: 10,
            mx: 'auto',
            maxWidth: 630,
            color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white')
          }}
        >
          {t('aboutus_krowd_sologan_1')}
        </Typography>
      </MotionInView>

      <Box sx={{ position: 'relative' }}>
        <Slider ref={carouselRef} {...settings}>
          {MOCK_MEMBERS.map((member) => (
            <MotionInView key={member.id} variants={varFadeIn}>
              <MemberCard member={member} />
            </MotionInView>
          ))}
        </Slider>
        <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
      </Box>
      {/* <Button
        variant="outlined"
        color="inherit"
        size="large"
        endIcon={<Icon icon={roundArrowRightAlt} width={24} height={24} />}
        sx={{ mx: 'auto' }}
      >
        View all team members
      </Button> */}
    </Container>
  );
}

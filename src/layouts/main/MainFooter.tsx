import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, IconButton, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
//
import Logo from '../../components/Logo';
//i18n
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import classNames from 'classnames';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill },
  { name: 'Google', icon: googleFill },
  { name: 'Linkedin', icon: linkedinFill },
  { name: 'Twitter', icon: twitterFill }
];

const LINKS = [
  {
    headline: '1',
    x: 0,
    children: [
      { name: 'Về chúng tôi', href: PATH_PAGE.about },
      { name: 'Liên hệ với chúng tôi', href: PATH_PAGE.contact },
      { name: 'Hướng dẫn đầu tư', href: PATH_PAGE.contact },
      { name: 'Hướng dẫn gọi đầu tư', href: PATH_PAGE.contact },
      { name: 'Các câu hỏi thường gặp', href: PATH_PAGE.faqs }
    ]
  },
  {
    // headline: 'Thông tin pháp lý',
    headline: '2',
    children: [
      { name: '  Điều khoản sử dụng dịch vụ', href: '#' },
      { name: 'Chính sách bảo mật', href: '#' },
      { name: 'Cảnh báo rủi ro đầu tư', href: '#' },
      { name: 'Hợp đồng pháp lý liên quan', href: '#' }
    ]
  },
  {
    headline: '3',
    // headline: 'Về KROWD',
    children: [
      { name: 'Tuyển dụng', href: '#' },
      { name: 'Truyền thông', href: '#' }
    ]
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default
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

export default function MainFooter() {
  const currentLanguageCode = cookies.get('i18next') || 'vi';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  // useEffect(() => {
  //   document.title = t('app_title');
  // }, [currentLanguage, t]);
  return (
    <RootStyle>
      {/* <Divider /> */}
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
            </ScrollLink>
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              {t('footer_title_left')}
            </Typography>
            <Stack
              spacing={1.5}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              {SOCIALS.map((social) => (
                <IconButton key={social.name} color="primary" sx={{ p: 1 }}>
                  <Icon icon={social.icon} width={16} height={16} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                var x = 1;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline">
                      {t(`footer_title_${headline}.headline_name`)}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'block' }}
                      >
                        {t(`footer_title_${headline}.headline_link_description_${x++}`)}
                        {/* {link.name} */}
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 5 }} />

        <Typography
          sx={{
            pt: 2,
            mt: 5,
            fontSize: 11,
            textAlign: { xs: 'left', md: 'left' }
          }}
        >
          {t('policy_description_legal_1')}
        </Typography>
        <Typography
          sx={{
            pt: 2,
            fontSize: 11,
            textAlign: { xs: 'left', md: 'left' }
          }}
        >
          {t('policy_description_legal_2')}
        </Typography>
        <Typography
          sx={{
            pt: 2,
            pb: 5,
            fontSize: 11,
            textAlign: { xs: 'left', md: 'left' }
          }}
        >
          {t('policy_description_legal_3')}
        </Typography>
        {/* <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 3,
            pb: 5,
            fontSize: 11,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          © 2022. All rights reserved
        </Typography> */}
      </Container>
    </RootStyle>
  );
}

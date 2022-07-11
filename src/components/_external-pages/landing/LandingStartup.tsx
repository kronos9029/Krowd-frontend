// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Container, Typography, useMediaQuery, Grid } from '@mui/material';
//
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getAllProject } from 'redux/slices/krowd_slices/project';
import ProjectCard from 'components/_external-pages/project/ProjectCard';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(11),
    backgroundColor:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
            theme.palette.grey[300]
          } 100%)`
        : 'none'
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

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const { projectList } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    dispatch(getAllProject('INVESTOR'));
  }, [dispatch]);

  return (
    <RootStyle
      sx={{
        paddingBottom: '1rem'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{ mb: { xs: 5, md: 5 }, textAlign: { sm: 'left', xs: 'center' }, paddingTop: '3rem' }}
        >
          <Typography variant="h2" sx={{ mb: 3, color: 'text.primary' }}>
            {t('highlight_project')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'left', xs: 'center' },
              alignItems: 'middle',
              gap: '10'
            }}
          >
            <Typography>
              <img
                style={{
                  width: '30px',
                  display: 'inline',
                  paddingBottom: '1.5rem'
                }}
                src={'/static/home/profits.png'}
              />
            </Typography>
            <Typography
              fontWeight={400}
              variant="h4"
              sx={{ mb: 1, color: 'text.disabled', marginLeft: '1rem' }}
            >
              {t('highlight_project_description')}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={3}>
          {projectList &&
            projectList.listOfProject
              .filter((value) => value.status === 2)
              .map((p) => <ProjectCard key={p.id} row={p} />)}
        </Grid>
      </Container>
    </RootStyle>
  );
}

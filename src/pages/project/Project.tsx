// material
import { styled } from '@mui/material/styles';
import { Grid, Card, Container, Typography, useMediaQuery, Tab, Tabs, Box } from '@mui/material';

// components
import Page from '../../components/Page';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { ShopProductSort } from 'components/_dashboard/e-commerce/shop';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
// routes
// utils
import fakeRequest from 'utils/fakeRequest';
import useSettings from 'hooks/useSettings';
import { Product, ProductFilter, ProductState } from '../../@types/products';
import { filterProducts, getProducts } from 'redux/slices/product';
import { BlogPostsSearch } from 'components/_dashboard/project';
// icon
import { filterProjects, getProjectList } from 'redux/slices/krowd_slices/project';
import { ProjectFilter, ProjectState, PROJECT_STATUS } from '../../@types/krowd/project';
import { getFieldList } from 'redux/slices/krowd_slices/field';
import { Link } from 'react-router-dom';
import { ProjectCard } from 'components/_external-pages/project';
import LandingStartUp from 'components/_external-pages/landing/LandingStartup';
import { LandingInvest } from 'components/_external-pages/landing';
// import ProjectCard from '../../../components/ProjectCard';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  marginBottom: '3rem',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10)
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

export default function Projects() {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  // Redux
  const { projectListLanding } = useSelector((state: RootState) => state.project);

  // useEffect(() => {
  //   dispatch(getProjectList());
  //   dispatch(getFieldList());
  // }, [dispatch]);

  return (
    <RootStyle title="Danh sách | Krowd">
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 5, md: 5, paddingTop: '7rem' } }}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {t(`landing_project_invest.landing_project_invest_now`)}
          </Typography>

          <Typography color={'text.disabled'} fontWeight={400} variant="subtitle2">
            {t(`landing_project_invest.landing_project_invest_approeve`)}
          </Typography>
          <Typography color={'text.disabled'} fontWeight={400} variant="subtitle2" sx={{ mb: 3 }}>
            {t(`landing_project_invest.landing_project_invest_business`)}{' '}
            <Link to="#" style={{ textDecoration: 'none' }}>
              {t(`landing_project_invest.landing_project_invest_appraisal`)}
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'end', my: 1 }}>
          <Typography variant="h3">
            {t(`landing_project_invest.landing_project_invest_chance`)}
          </Typography>
          <Typography color={'text.disabled'} fontWeight={1000} variant="h3" sx={{ ml: 1 }}>
            {projectListLanding && projectListLanding.numOfProject}
          </Typography>
        </Box>
      </Container>
      <LandingInvest />
    </RootStyle>
  );
}

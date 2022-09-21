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
// import ProjectCard from '../../../components/ProjectCard';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  marginBottom: '3rem',
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10),
    backgroundColor: '#f4f6f8'
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
  const dispatch = useDispatch();
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  // Redux
  const { projectList } = useSelector((state: RootState) => state.project);
  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const { projects, sortBy, filters } = useSelector(
    (state: { project: ProjectState }) => state.project
  );
  // State
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  // Formik
  const formik = useFormik<ProjectFilter>({
    initialValues: {
      status: filters.status,
      areaId: filters.areaId
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await fakeRequest(500);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, resetForm, handleSubmit } = formik;
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProjectList());
    dispatch(getFieldList());
    dispatch(filterProjects(values));
    setSelectedField(fieldList.listOfField[0]?.id);
  }, [dispatch, fieldList.listOfField[0]?.id]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== 'more') {
      setSelectedField(newValue);
    } else {
    }
  };

  return (
    <RootStyle title="Danh sách | Krowd">
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 5, md: 5, paddingTop: '7rem' } }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
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
          <Box
            sx={{
              my: { lg: 2, sm: 2 },
              display: { sm: 'flex' },
              justifyContent: { sm: 'space-between' },
              alignItems: 'center'
            }}
          >
            <BlogPostsSearch sx={{ display: 'flex' }} border="none" />
            <Box
              component="div"
              sx={{
                ml: { lg: 5, sm: 2 },
                mt: { sm: 0, xs: 3 },
                display: { sm: 'flex' },
                flexDirection: 'row-reverse'
              }}
            >
              <ShopProductSort />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'end', my: 3 }}>
          <Typography variant="h3">
            {' '}
            {t(`landing_project_invest.landing_project_invest_chance`)}
          </Typography>
          <Typography color={'text.disabled'} fontWeight={1000} variant="h3" sx={{ ml: 1 }}>
            {projectList && projectList.numOfProject}
          </Typography>
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {projectList.listOfProject &&
            projectList.listOfProject
              .filter((p) => p.status === PROJECT_STATUS.CALLING_FOR_INVESTMENT)
              .map((p) => <ProjectCard key={p.id} row={p} />)}
        </Grid>
      </Container>
    </RootStyle>
  );
}

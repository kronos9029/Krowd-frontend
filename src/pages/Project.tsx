// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Grid, Card, Container, Typography, useMediaQuery, Tab, Tabs, Box } from '@mui/material';
import { MHidden } from '../components/@material-extend';
import { varFadeInUp, MotionInView } from '../components/animate';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CardMedia from '@mui/material/CardMedia';
// components
import Page from '../components/Page';
import { fCurrency } from 'utils/formatNumber';
import { PATH_DETAILS, PATH_FIELDPAGE } from 'routes/paths';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import {
  ShopFilterSidebar,
  ShopProductSort,
  ShopTagFiltered
} from 'components/_dashboard/e-commerce/shop';
import { Formik, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { filter, includes, orderBy } from 'lodash';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
// routes
// utils
import fakeRequest from 'utils/fakeRequest';
import useSettings from 'hooks/useSettings';
import { Product, ProductFilter, ProductState } from '../@types/products';
import { filterProducts, getProducts } from 'redux/slices/product';
import { BlogPostsSearch } from 'components/_dashboard/blog';
// icon
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { getAllProject, filterProjects, getProjectId } from 'redux/slices/krowd_slices/project';
import { Project, ProjectFilter, ProjectState } from '../@types/krowd/project';
import { getFieldList } from 'redux/slices/krowd_slices/field';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
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
  const isDefault = !values.status && values.areaId === 'HCM';
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllProject('INVESTOR'));
    dispatch(getFieldList());
    dispatch(filterProjects(values));
    setSelectedField(fieldList[0]?.id);
  }, [dispatch, fieldList[0]?.id]);

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

  // function applyFilter(projects: Project[], sortBy: string | null, filters: ProjectFilter) {
  //   // SORT BY
  //   if (sortBy === 'featured') {
  //     projects = orderBy(projects, ['sold'], ['desc']);
  //   }
  //   if (sortBy === 'newest') {
  //     projects = orderBy(projects, ['createdAt'], ['desc']);
  //   }
  //   if (sortBy === 'priceDesc') {
  //     projects = orderBy(projects, ['price'], ['desc']);
  //   }
  //   if (sortBy === 'priceAsc') {
  //     projects = orderBy(projects, ['price'], ['asc']);
  //   }
  //   if (filters.status.length > 0) {
  //     projects = filter(projects, (_product) => includes(filters.status, _product.status));
  //   }
  //   if (filters.areaId !== 'All') {
  //     projects = filter(projects, (_product) => _product.areaId === filters.areaId);
  //   }
  //   return projects;
  // }
  return (
    <RootStyle title="Danh sách | Krowd">
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 5, md: 5, paddingTop: '7rem' } }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Đầu tư ngay
          </Typography>
          <Typography color={'text.disabled'} fontWeight={400} variant="subtitle2">
            Duyệt qua các cơ hội đầu tư hiện tại trên Krowd.
          </Typography>
          <Typography color={'text.disabled'} fontWeight={400} variant="subtitle2" sx={{ mb: 3 }}>
            Tất cả các công ty đều được kiểm tra và vượt qua thẩm định.
          </Typography>
          <Box
            sx={{
              my: { lg: 2, sm: 2 },
              display: { sm: 'flex', xs: 'grid' },
              justifyContent: { md: 'space-between', sm: 'space-evenly', xs: 'center' }
            }}
          >
            <BlogPostsSearch sx={{ display: 'flex' }} border="none" />
            <Box
              component="div"
              sx={{
                ml: { lg: 5, sm: 2 },
                display: { sm: 'flex', xs: 'grid' },
                flexDirection: 'row-reverse'
              }}
            >
              <ShopProductSort />
              {/* <ShopFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'end', my: 3 }}>
          <Typography variant="h3">Các cơ hội cho bạn</Typography>
          <Typography color={'text.disabled'} fontWeight={1000} variant="h3" sx={{ ml: 1 }}>
            {projectList && projectList.numOfProject}
          </Typography>
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {projectList && projectList.listOfProject.map((p) => <ProjectCard key={p.id} row={p} />)}
        </Grid>
      </Container>
    </RootStyle>
  );
}

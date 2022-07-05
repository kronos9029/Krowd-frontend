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

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
    minHeight: 300,
    margin: 'auto',
    textAlign: 'left',

    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.2)}`,
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8',
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.15)}`
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.1)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.05)}`
        }
      }
    }
  };
});
export default function Projects() {
  const dispatch = useDispatch();
  // Redux
  const { projectLists } = useSelector((state: RootState) => state.project);
  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const { projects, sortBy, filters } = useSelector(
    (state: { project: ProjectState }) => state.project
  );
  // State
  const [openFilter, setOpenFilter] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState('');
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
    setCurrentFieldIndex(fieldList[0]?.id);
  }, [dispatch, fieldList[0]?.id]);

  const handleGetProjectById = (activeProjectId: string) => {
    dispatch(getProjectId(activeProjectId));
  };
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

  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== 'more') {
      setCurrentFieldIndex(newValue);
    } else {
    }
  };
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#14B7CC'
    }
  }));
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
        <Box sx={{ mb: { xs: 5, md: 10, paddingTop: '7rem' } }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Danh sách các dự án
          </Typography>
          <Box
            sx={{
              my: { lg: 4, sm: 2 },
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
          <MHidden width="smDown">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={currentFieldIndex}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="auto"
                aria-label="basic tabs example"
              >
                {fieldList.slice(0, 5).map((value, index) => (
                  <Tab
                    key={index}
                    value={value.id}
                    sx={{
                      minWidth: { lg: '14% !important', sm: '12% !important' }
                    }}
                    label={
                      <Typography
                        sx={{
                          color: currentFieldIndex === value.id ? '#14B7CC' : '',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textAlign: 'center',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }}
                        variant="h6"
                      >
                        {value.name}
                      </Typography>
                    }
                  />
                ))}
                <Tab
                  value={'more'}
                  sx={{ minWidth: '14% !important' }}
                  href={PATH_FIELDPAGE}
                  label={
                    <Typography
                      sx={{
                        color: currentFieldIndex === 'more' ? '#14B7CC' : '',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textAlign: 'center',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                      variant="h6"
                    >
                      <Icon icon={menu2Fill} width={30} /> Tất cả danh mục
                    </Typography>
                  }
                />
              </Tabs>
            </Box>
          </MHidden>
          <Grid xs={12} sm={2} md={4}>
            {!isDefault && (
              <Typography gutterBottom>
                <Typography component="span" variant="subtitle1">
                  {/* {filteredProducts.length} */}
                </Typography>
              </Typography>
            )}
          </Grid>
        </Box>

        <Grid container alignItems="center" justifyContent="center" spacing={5}>
          {projectLists.listOfProject?.map((row, index) => (
            <Grid key={`${currentFieldIndex} ${index}`} item xs={12} sm={6} md={6} lg={4}>
              <MotionInView variants={varFadeInUp}>
                <Link
                  onClick={() => handleGetProjectById(row.id)}
                  to={PATH_DETAILS}
                  style={{ textDecoration: 'none' }}
                >
                  <CardStyle
                    sx={{
                      width: 360,
                      maxHeight: 500,
                      height: 480,
                      '&:hover': { opacity: 0.9 }
                    }}
                  >
                    <CardMedia
                      style={{
                        display: 'center'
                      }}
                      component="img"
                      height={240}
                      src={row.image}
                    />
                    <Box px={3}>
                      <Box minHeight={'9em'}>
                        <Typography
                          sx={{
                            // color: isLight ? '#14B7CC' : 'white',
                            overflow: 'hidden',
                            paddingTop: '1rem'
                          }}
                          variant="subtitle1"
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          style={{ textAlign: 'left' }}
                          sx={{
                            color: '#251E18',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3
                          }}
                          variant="body2"
                        >
                          {row.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingTop: '0.5rem'
                        }}
                      >
                        <Typography
                          paragraph
                          sx={{
                            color: '#251E18',
                            marginBottom: '0.2rem'
                          }}
                        >
                          <strong>Đã đầu tư</strong>
                        </Typography>
                        <Typography
                          paragraph
                          sx={{
                            color: '#251E18',
                            marginBottom: '0.2rem'
                          }}
                        >
                          <strong>Mục tiêu</strong>
                        </Typography>
                      </Box>
                      <BorderLinearProgress
                        variant="determinate"
                        value={(row.investedCapital / row.investmentTargetCapital) * 100}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingTop: '0.2rem'
                        }}
                      >
                        <Typography
                          paragraph
                          sx={{
                            color: '#14B7CC'
                          }}
                        >
                          <strong>{fCurrency(row.investedCapital)}</strong>
                        </Typography>
                        <Typography
                          paragraph
                          sx={{
                            color: '#FF7F56'
                          }}
                        >
                          <strong>{fCurrency(row.investmentTargetCapital)}</strong>
                        </Typography>
                      </Box>
                    </Box>
                  </CardStyle>
                </Link>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}

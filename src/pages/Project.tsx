// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
  Button,
  Tab,
  Tabs,
  Stack
} from '@mui/material';
import { varFadeInUp, MotionInView } from '../components/animate';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CardMedia from '@mui/material/CardMedia';
// components
import Page from '../components/Page';
import { fCurrency } from 'utils/formatNumber';
import { PATH_DETAILS } from 'routes/paths';
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
import { useDispatch, useSelector } from 'redux/store';
// routes
// utils
import fakeRequest from 'utils/fakeRequest';
import useSettings from 'hooks/useSettings';
import { Product, ProductFilter, ProductState } from '../@types/products';
import { filterProducts, getProducts } from 'redux/slices/product';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  justifyContent: 'center'
}));
const ContentStyle = styled(Page)(({ theme }) => ({
  maxWidth: '1500px',
  paddingTop: theme.spacing(10),
  justifyContent: 'center'
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
    padding: theme.spacing(0, 3, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8',
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.35)}`
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -10,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});
// ----------------------------------------------------------------------
function applyFilter(products: Product[], sortBy: string | null, filters: ProductFilter) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = filter(products, (_product) => includes(filters.gender, _product.gender));
  }
  if (filters.category !== 'All') {
    products = filter(products, (_product) => _product.category === filters.category);
  }
  if (filters.colors.length > 0) {
    products = filter(products, (_product) =>
      _product.colors.some((color) => filters.colors.includes(color))
    );
  }
  if (filters.priceRange) {
    products = filter(products, (_product) => {
      if (filters.priceRange === 'below') {
        return _product.price < 25;
      }
      if (filters.priceRange === 'between') {
        return _product.price >= 25 && _product.price <= 75;
      }
      return _product.price > 75;
    });
  }
  if (filters.rating) {
    products = filter(products, (_product) => {
      const convertRating = (value: string) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return _product.totalRating > convertRating(filters.rating);
    });
  }
  return products;
}

export default function Projects() {
  const { themeStretch } = useSettings();
  const index = Math.floor(Math.random() * 28);
  const avataaaa = `/static/mock-images/covers/cover_${index + 1}.jpg`;

  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const { products, sortBy, filters } = useSelector(
    (state: { product: ProductState }) => state.product
  );

  const filteredProducts = applyFilter(products, sortBy, filters);

  const formik = useFormik<ProductFilter>({
    initialValues: {
      gender: filters.gender,
      category: filters.category,
      colors: filters.colors,
      priceRange: filters.priceRange,
      rating: filters.rating
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

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } = formik;

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch]);

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

  const [value, setValue] = useState('one');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  //xanh
  // const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  //   height: 13,
  //   borderRadius: 5,
  //   [`&.${linearProgressClasses.colorPrimary}`]: {
  //     backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
  //   },
  //   [`& .${linearProgressClasses.bar}`]: {
  //     borderRadius: 5,
  //     backgroundColor: theme.palette.mode === 'light' ? '#63C1E3' : '#FF7F50'
  //   }
  // }));
  //cam
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 13,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#FF7F50' : '#63C1E3'
    }
  }));
  return (
    <RootStyle title="Project | Krowd">
      <ContentStyle>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={4}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              orientation="vertical"
            >
              <Tab
                value="one"
                label={
                  <Typography
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}
                    variant="h6"
                  >
                    Quán cà phê
                  </Typography>
                }
              />
              <Tab
                value="two"
                label={
                  <Typography
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}
                    variant="h6"
                  >
                    Quán trà sữa
                  </Typography>
                }
              />
              <Tab
                value="three"
                label={
                  <Typography
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}
                    variant="h6"
                  >
                    Cửa hàng ăn nhanh
                  </Typography>
                }
              />
            </Tabs>
            <Typography
              sx={{
                paddingTop: '5rem',
                textAlign: 'center'
              }}
              variant="h6"
            >
              -----------------
            </Typography>

            <Stack sx={{ mb: 5 }}>
              <Stack sx={{ my: 1 }}>
                <ShopTagFiltered
                  filters={filters}
                  formik={formik}
                  isShowReset={openFilter}
                  onResetFilter={handleResetFilter}
                  isDefault={isDefault}
                />

                <ShopFilterSidebar
                  formik={formik}
                  isOpenFilter={openFilter}
                  onResetFilter={handleResetFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                />
                <ShopProductSort />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} style={{ zIndex: 0 }}>
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 5, sm: 8, md: 12 }}>
              {Array.from(new Array(6)).map((_, index) => {
                let totalBudget = Math.floor(Math.random() * 100000000);
                let currentBudget = Math.floor(Math.random() * totalBudget);
                let ratio = Math.floor((currentBudget / totalBudget) * 100);
                return (
                  <Grid key={`${value} ${index}`} item xs={12} sm={8} md={5}>
                    <MotionInView variants={varFadeInUp}>
                      <CardStyle sx={{ maxWidth: 390 }}>
                        <CardMedia
                          style={{ paddingTop: '2rem', borderRadius: '40px 42px 1rem 1rem' }}
                          component="img"
                          height="194"
                          src={`/static/mock-images/covers/cover_${index + 1}.jpg`}
                        />
                        <Typography
                          sx={{
                            color: isLight ? '#14B7CC' : 'white',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            paddingTop: '1rem',
                            textAlign: 'center'
                          }}
                          variant="h5"
                          paragraph
                        >
                          Dự án KFC quận {index + 1}
                        </Typography>
                        <Typography
                          style={{ textAlign: 'left' }}
                          sx={{
                            color: isLight ? '#251E18' : 'black',
                            textOverflow: 'ellipsis',
                            // whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 6
                          }}
                        >
                          Với vị trí dự án nằm ở trung tâm quận {index + 1} thu hút một số lượng
                          khách ưa chuộng đồ ăn nhanh. Đây hứa hẹn sẽ là dự án nóng cho các nhà đầu
                          tư có niềm đam mê về ăn uống.
                        </Typography>
                        <BorderLinearProgress variant="determinate" value={ratio} />
                        <Typography
                          paragraph
                          sx={{
                            color: isLight ? '#251E18' : 'black',
                            paddingTop: '1rem',
                            textAlign: 'center'
                          }}
                        >
                          <strong> {fCurrency(currentBudget)} </strong> trên{' '}
                          <strong> {fCurrency(totalBudget)} </strong>
                        </Typography>
                        <Button
                          style={{
                            color: '#14B7CC',
                            display: 'flex',
                            float: 'right'
                          }}
                          href={PATH_DETAILS}
                        >
                          {t('button_click')}
                        </Button>
                      </CardStyle>
                    </MotionInView>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </ContentStyle>
    </RootStyle>
  );
}

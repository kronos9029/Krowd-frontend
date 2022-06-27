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
  Stack,
  Box,
  Divider
} from '@mui/material';
import { MHidden } from '../components/@material-extend';
import { varFadeInUp, MotionInView } from '../components/animate';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CardMedia from '@mui/material/CardMedia';
// components
import Page from '../components/Page';
import { fCurrency } from 'utils/formatNumber';
import { PATH_DETAILS, PATH_FIELDPAGE, PATH_SEARCHPAGE } from 'routes/paths';
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
import { BlogPostsSearch } from 'components/_dashboard/blog';
// icon
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import FieldCard from './FieldCard';
import { paramCase } from 'change-case';
// ----------------------------------------------------------------------
export const FOUNDATION_LIST = [
  'Ăn Uống',
  'Giáo dục',
  'Nghỉ dưỡng',
  'Du lịch',
  'Bách hóa online',
  'Bất động sản',
  'Điện tử',
  'Sức khỏe',
  'thời trang',
  'Ăn',
  'Uống',
  'Giáo dục',
  'Nghỉ dưỡng',
  'Du lịch',
  'Bách hóa online',
  'Bất động sản',
  'Điện tử',
  'Sức khỏe',
  'thời trang',
  'Ăn uống',
  'Uống',
  'Giáo dục',
  'Nghỉ dưỡng',
  'Du lịch',
  'Bách hóa online',
  'Bất động sản',
  'Điện tử',
  'Sức khỏe',
  'thời trang'
].map((item) => ({
  name: item,
  href: `/project/${paramCase(item)}`,
  icon: `static/mock-images/covers/cover_${1 + 1}.jpg`
}));
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

export default function Fields() {
  const dispatch = useDispatch();

  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle title="Danh sách | Krowd">
      <Box sx={{ mb: { xs: 5, md: 10, textAlign: 'center', paddingTop: '7rem' } }}>
        <Typography variant="h2" sx={{ mb: 3, color: isLight ? '#14B7CC' : '#FF7F50' }}>
          Danh sách tất cả lĩnh vực
          <HeaderBreadcrumbs
            sx={{ ml: 10 }}
            heading=""
            links={[{ name: 'Dạo', href: PATH_SEARCHPAGE }, { name: 'Tất cả danh mục' }]}
          />
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} sm={12} md={12} lg={8}>
          <Grid container spacing={0.5}>
            {FOUNDATION_LIST.map((item) => (
              <FieldCard key={item.name} item={item} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>
    </RootStyle>
  );
}

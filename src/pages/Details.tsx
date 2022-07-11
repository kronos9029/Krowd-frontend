import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Tab,
  Card,
  Grid,
  Divider,
  Skeleton,
  Container,
  Typography,
  LinearProgress,
  linearProgressClasses,
  Tooltip,
  Chip,
  Button
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getProduct } from 'redux/slices/product';
// routes
// @types
import { ProductState } from '../@types/products';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import Markdown from 'components/Markdown';
import {
  ProjectDetailsReview,
  ProductDetailsCarousel,
  ProjectDetailsHero
} from '../components/_dashboard/e-commerce/product-details';
import ProjectPackage from 'components/_dashboard/general-analytics/ProjectPackage';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { MHidden, MIconButton } from 'components/@material-extend';
import { fCurrency } from 'utils/formatNumber';
import { Project, ProjectStatus } from '../@types/krowd/project';
import ProjectDetailCard from 'components/_external-pages/project-detail/ProjectDetailCard';
import ProjectDetailHeading from 'components/_external-pages/project-detail/ProjectDetailHeading';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);
const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];
const PackageAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-100px',
  visibility: 'hidden'
}));

export default function ComponentsDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const [valuePackage, setValuePackage] = useState('Basic');
  const { name = 'nike-air-force-1-ndestrukt' } = useParams();
  const { product, error, checkout } = useSelector(
    (state: { product: ProductState }) => state.product
  );
  const { activeProjectId: projectID } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);

  const projectPackage = {
    id: null,
    name: null,
    description: null,
    investValue: null,
    voucherDescription: ['Ưu đãi khi mua gói 1', 'Ưu đãi khi mua gói 2', 'Ưu đãi khi mua gói 3']
  };

  return (
    <Page title="Chi tiết dự án | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ paddingBottom: '4rem' }}>
        {product && projectID && (
          <>
            <ProjectDetailHeading p={projectID} />
            <ProjectDetailCard p={projectID} />
            {/* Nổi bật */}
            <Card>
              <Box sx={{ py: 1, my: 2, mx: '25%', borderBottom: 2, borderColor: 'divider' }}>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: 'center',
                    fontSize: '20px'
                  }}
                >
                  Nổi bật
                </Typography>
              </Box>
              <Grid container px={2}>
                <Grid item xs={12} md={5} lg={5}>
                  <ProductDetailsCarousel product={product} />
                </Grid>
                <Grid item xs={12} md={7} lg={7}>
                  <Typography
                    variant="subtitle1"
                    sx={{ ml: 1, fontSize: '20px', mb: { lg: 3, xs: 1 }, mt: { lg: 1, xs: 2 } }}
                  >
                    Nội dung chi tiết
                  </Typography>
                  <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
                    6/8 The Emerald Golf View có vị trí mặt tiền đại lộ Bình Dương (TP. Thuận An,
                    Bình Dương) ngay sân golf Sông Bé và siêu thị Nhật Bản Aeon Mall, trực diện cổng
                    chính VSIP1.
                  </Typography>
                  <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
                    Dự án bán đất nền khu dân cư Lê Phong Thuận Giao trực thuộc tỉnh Bình Dương là
                    một dự án lớn có tầm tại công ty chúng tôi. Đất nền Thuận Giao Bình Dương là sự
                    lựa chọn hàng đầu về an cư lạc nghiệp.
                  </Typography>
                  <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
                    Dự án bán đất nền khu dân cư Lê Phong Thuận Giao trực thuộc tỉnh Bình Dương là
                    một dự án lớn có tầm tại công ty chúng tôi. Đất nền Thuận Giao Bình Dương là sự
                    lựa chọn hàng đầu về an cư lạc nghiệp.
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            {/*Change tab view at here */}
            <Card sx={{ my: 3 }}>
              <TabContext value={value}>
                <Box sx={{ bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)} variant="fullWidth">
                    <Tab disableRipple value="1" label="Mô tả chi tiết" />
                    <Tab
                      disableRipple
                      value="2"
                      label="Thành viên"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                    <Tab
                      disableRipple
                      value="3"
                      label="Bình luận"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                    <Tab
                      disableRipple
                      value="4"
                      label="Cập nhật"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                    <Tab
                      disableRipple
                      value="5"
                      label="Giai đoạn"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <ProjectDetailsReview product={product} />
                </TabPanel>
                <TabPanel value="3">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="5">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>

            <Typography
              variant="h6"
              sx={{
                ml: 1,
                fontSize: '15px',
                textAlign: 'center',
                my: 3
              }}
            >
              <PackageAnchor id="__investmentPackage" />
              Các loại gói đầu tư
            </Typography>
            <Card>
              <TabContext value={valuePackage}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, valuePackage) => setValuePackage(valuePackage)}>
                    <Tab
                      sx={{ paddingRight: '1rem' }}
                      disableRipple
                      value="Basic"
                      label="Gói cơ bản"
                    />
                    <Tab
                      disableRipple
                      value="Higher"
                      label="Gói nâng cao"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' }, paddingRight: '1rem' }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="Basic">
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3} sx={{ mb: 5, pb: 5, mt: 3, pt: 3 }}>
                      <Grid item xs={12} sm={6} md={4}>
                        <ProjectPackage projectPackage={projectPackage} />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <ProjectPackage projectPackage={projectPackage} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        <ProjectPackage projectPackage={projectPackage} />
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
                <TabPanel value="Higher">
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3} sx={{ mb: 5, pb: 5, mt: 3, pt: 3 }}>
                      <Grid item xs={12} sm={6} md={4}>
                        <ProjectPackage projectPackage={projectPackage} />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <ProjectPackage projectPackage={projectPackage} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        <ProjectPackage projectPackage={projectPackage} />
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!product && SkeletonLoad}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
      <hr />
    </Page>
  );
}

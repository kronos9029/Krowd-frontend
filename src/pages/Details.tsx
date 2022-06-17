import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Skeleton, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from 'redux/store';
import { getProduct, addCart, onGotoStep } from 'redux/slices/product';
// routes
// @types
import { CartItem, ProductState } from '../@types/products';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import Markdown from 'components/Markdown';
import {
  ProductDetailsSummary,
  ProjectDetailsReview,
  ProductDetailsCarousel,
  ProjectDetailsHero
} from '../components/_dashboard/e-commerce/product-details';
import {
  TermOfProject,
  MultiplierProject,
  MembersParticipation,
  SharedRevenue
} from 'components/_dashboard/general-analytics';
import ProjectPackage from 'components/_dashboard/general-analytics/ProjectPackage';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
}));

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

export default function ComponentsDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const [valuePackage, setValuePackage] = useState('Basic');
  const { name = 'nike-air-force-1-ndestrukt' } = useParams();
  const { product, error, checkout } = useSelector(
    (state: { product: ProductState }) => state.product
  );

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);

  const handleAddCart = (product: CartItem) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step: number) => {
    dispatch(onGotoStep(step));
  };
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
        <Typography
          sx={{
            paddingTop: '7rem',
            paddingBottom: '2rem',
            textAlign: 'center',
            color: 'rgb(20, 183, 204)'
          }}
          variant="h4"
        >
          Chi tiết dự án
        </Typography>
        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <ProjectDetailsHero product={product} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary
                    product={product}
                    cart={checkout.cart}
                    onAddCart={handleAddCart}
                    onGotoStep={handleGotoStep}
                  />
                </Grid>
              </Grid>
            </Card>

            {/* Nổi bật */}
            <Card>
              <Typography variant="subtitle1" sx={{ ml: 1, fontSize: '20px', mb: 5 }}>
                Nổi bật
              </Typography>
              <Grid container>
                <Grid item xs={12} md={5} lg={5}>
                  <ProductDetailsCarousel product={product} />
                </Grid>
                <Grid item xs={12} md={7} lg={7}>
                  <Typography variant="subtitle1" sx={{ ml: 1, fontSize: '20px', mb: 5, mt: 2 }}>
                    Nội dung chi tiết
                  </Typography>
                  <Typography sx={{ ml: 1, fontSize: '15px', mt: 5 }}>
                    6/8 The Emerald Golf View có vị trí mặt tiền đại lộ Bình Dương (TP. Thuận An,
                    Bình Dương) ngay sân golf Sông Bé và siêu thị Nhật Bản Aeon Mall, trực diện cổng
                    chính VSIP1.
                  </Typography>
                  <Typography sx={{ ml: 1, fontSize: '15px', mt: 3 }}>
                    Dự án bán đất nền khu dân cư Lê Phong Thuận Giao trực thuộc tỉnh Bình Dương là
                    một dự án lớn có tầm tại công ty chúng tôi. Đất nền Thuận Giao Bình Dương là sự
                    lựa chọn hàng đầu về an cư lạc nghiệp.
                  </Typography>
                  <Typography sx={{ ml: 1, fontSize: '15px', mt: 3 }}>
                    Dự án bán đất nền khu dân cư Lê Phong Thuận Giao trực thuộc tỉnh Bình Dương là
                    một dự án lớn có tầm tại công ty chúng tôi. Đất nền Thuận Giao Bình Dương là sự
                    lựa chọn hàng đầu về an cư lạc nghiệp.
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            {/*Change tab view at here */}
            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab
                      sx={{ paddingRight: '1rem' }}
                      disableRipple
                      value="1"
                      label="Mô tả chi tiết"
                    />
                    <Tab
                      disableRipple
                      value="2"
                      label="Thành viên"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' }, paddingRight: '1rem' }}
                    />
                    <Tab
                      disableRipple
                      value="3"
                      label="BÌnh luận"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' }, paddingRight: '1rem' }}
                    />
                    <Tab
                      disableRipple
                      value="4"
                      label="Cập nhật"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' }, paddingRight: '1rem' }}
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
            <hr />

            <Typography variant="h6" sx={{ ml: 1, fontSize: '15px', textAlign: 'center', mt: 3 }}>
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
                    <Grid container spacing={3} sx={{ mb: 5, pb: 5, mt: 3 }}>
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
                    <Grid container spacing={3} sx={{ mb: 5, pb: 5, mt: 3 }}>
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

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
  Tooltip
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
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
import ProjectPackage from 'components/_dashboard/general-analytics/ProjectPackage';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { MIconButton } from 'components/@material-extend';
import { fCurrency } from 'utils/formatNumber';
import { getProjectId } from 'redux/slices/krowd_slices/project';

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
const LargeImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

export default function ComponentsDetails() {
  const { themeStretch } = useSettings();
  // const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const [valuePackage, setValuePackage] = useState('Basic');
  // const { name = 'nike-air-force-1-ndestrukt' } = useParams();
  // const { product, error, checkout } = useSelector(
  //   (state: { product: ProductState }) => state.product
  // );
  const { activeProjectId: projectID } = useSelector((state: RootState) => state.project);

  const projectPackage = {
    id: null,
    name: null,
    description: null,
    investValue: null,
    voucherDescription: ['Ưu đãi khi mua gói 1', 'Ưu đãi khi mua gói 2', 'Ưu đãi khi mua gói 3']
  };
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
  return (
    <Page title="Chi tiết dự án | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ paddingBottom: '4rem' }}>
        {/* {product && ( */}
        <>
          <Typography
            sx={{
              paddingTop: '7rem',
              textAlign: 'center',
              color: 'rgb(20, 183, 204)'
            }}
            variant="h2"
          >
            {projectID?.name}
          </Typography>
          <Card sx={{ my: 3 }}>
            <Grid container>
              <Grid p={{ xs: 1, sm: 5 }} item xs={12} md={6} lg={6}>
                {/* <ProjectDetailsHero product={product} /> */}
                <Box sx={{ cursor: 'zoom-in', paddingTop: '100%', position: 'relative' }}>
                  <LargeImgStyle alt="large image" src={projectID?.image} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={6} sx={{ pr: 3, pl: 3, pt: 5, pb: 3 }}>
                {/* <Typography
                    variant="overline"
                    sx={{
                      mb: 1,
                      display: 'block',
                      color: projectID?.status === 'Đang hoạt động' ? 'error.main' : 'info.main'
                    }}
                  >
                    {projectID?.status}
                  </Typography> */}
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Box
                  sx={{
                    my: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                    Thuộc doanh nghiệp
                  </Typography>
                  <Typography sx={{ mt: 0.2 }}>{projectID?.business?.name}</Typography>
                </Box>

                <Box
                  sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                    Thuộc Khu vực:
                  </Typography>
                  <Typography sx={{ mt: 0.2 }}>{projectID?.name}</Typography>
                </Box>

                <Box
                  sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                    Địa chỉ:
                  </Typography>
                  <Typography sx={{ mt: 0.2 }}>{projectID?.address}</Typography>
                </Box>
                <Box
                  sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                    Doanh thu chia sẻ
                  </Typography>
                  <Typography sx={{ mt: 0.2 }}>
                    {projectID?.multiplier}
                    <span> (%)</span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                    Hệ số nhân
                  </Typography>
                  <Typography sx={{ mt: 0.2 }}>
                    <span>x </span>
                    {projectID?.multiplier}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                    Thời hạn
                  </Typography>
                  <Typography sx={{ mt: 0.2 }}>
                    {projectID?.duration} <span> tháng</span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                    Số kì thanh toán
                  </Typography>
                  <Typography sx={{ mt: 0.2 }}>
                    {projectID?.numOfStage} <span> kì</span>
                  </Typography>
                </Box>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Box mt={'1rem'}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      my: '0.5rem'
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
                    value={
                      (projectID &&
                        (projectID.investedCapital / projectID.investmentTargetCapital) * 100) ??
                      0
                    }
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      my: '0.5rem'
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#14B7CC'
                      }}
                    >
                      <strong>{projectID?.investedCapital}</strong>
                    </Typography>
                    <Typography
                      paragraph
                      sx={{
                        color: '#FF7F56'
                      }}
                    >
                      <strong>{projectID?.investmentTargetCapital}</strong>
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ mt: 1, textAlign: 'center' }}>
                  {SOCIALS.map((social) => (
                    <Tooltip key={social.name} title={social.name}>
                      <MIconButton>{social.icon}</MIconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Card>

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
                {/* <ProductDetailsCarousel product={product} /> */}
              </Grid>
              <Grid item xs={12} md={7} lg={7}>
                <Typography
                  variant="subtitle1"
                  sx={{ ml: 1, fontSize: '20px', mb: { lg: 3, xs: 1 }, mt: { lg: 1, xs: 2 } }}
                >
                  Nội dung chi tiết
                </Typography>
                <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
                  6/8 The Emerald Golf View có vị trí mặt tiền đại lộ Bình Dương (TP. Thuận An, Bình
                  Dương) ngay sân golf Sông Bé và siêu thị Nhật Bản Aeon Mall, trực diện cổng chính
                  VSIP1.
                </Typography>
                <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
                  Dự án bán đất nền khu dân cư Lê Phong Thuận Giao trực thuộc tỉnh Bình Dương là một
                  dự án lớn có tầm tại công ty chúng tôi. Đất nền Thuận Giao Bình Dương là sự lựa
                  chọn hàng đầu về an cư lạc nghiệp.
                </Typography>
                <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
                  Dự án bán đất nền khu dân cư Lê Phong Thuận Giao trực thuộc tỉnh Bình Dương là một
                  dự án lớn có tầm tại công ty chúng tôi. Đất nền Thuận Giao Bình Dương là sự lựa
                  chọn hàng đầu về an cư lạc nghiệp.
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
              {/* 
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
                </TabPanel> */}
            </TabContext>
          </Card>

          <Typography variant="h6" sx={{ ml: 1, fontSize: '15px', textAlign: 'center', my: 3 }}>
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
        {/* )} */}

        {/* {!product && SkeletonLoad} */}

        {/* {error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
      <hr />
    </Page>
  );
}

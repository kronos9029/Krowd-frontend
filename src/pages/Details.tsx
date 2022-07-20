import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Tab,
  Divider,
  Container,
  Typography,
  Tabs,
  Skeleton,
  Grid,
  Box,
  AppBar,
  Link as MuiLink,
  Card
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getProduct } from 'redux/slices/product';
// routes
// icons
import filePdfOutlined from '@iconify/icons-ant-design/file-pdf-outlined';

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
import { Project1, ProjectStatus } from '../@types/krowd/project';
import {
  ProjectDetailCard,
  ProjectDetailExtension,
  ProjectDetailHeading,
  ProjectDetailPitch,
  ProjectDetailNavbar
} from 'components/_external-pages/project-detail/index';
import { description } from 'utils/mock-data/text';
import PickersArrowSwitcher from '@mui/lab/internal/pickers/PickersArrowSwitcher';

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
const PROJECT_ENTITY = [
  {
    type: 'pitch',
    listEntity: [
      {
        title: 'Giải pháp',
        content: `<p class="ql-align-center">
    <span style="font-family: Consolas;">Kêu gọi người dân sống tại đây tham gia đầu tư, họ vừa được thưởng thức KFC</span>
    <span style="font-family: Consolas; color: rgb(166, 127, 89);";</span>
    <span style="font-family: Consolas;">vừa tiện cho việc quản lý dự án của mình</span>
    </p>
    `,
        link: null,
        description: null
      },
      {
        title: 'Sản phẩm',
        content: `<ol>
    <li>Combo Gà Rán (2 Miếng Gà Giòn Cay / 2 Miếng Gà Giòn Không Cay / 2 Miếng Gà Truyền thống/ 1 Pepsi Lon)</li>
    <li>Combo Gà Quay (1 Miếng Đùi Gà Quay Giấy Bạc / 1 Miếng Đùi Gà Quay Tiêu/&nbsp;1Cơm Trắng/ 1 Pepsi Lon)</li>
    <li>&nbsp;Combo Mì Ý (1 Mì Ý Xốt Cà Gà Viên/ 1 Miếng Gà Giòn Cay / 1 Miếng Gà Giòn Không Cay / 1 Miếng Gà Truyền Thống / 2 Xiên Gà Tenderods/ 1 Pepsi Lon)</li>
    </ol>
      `,
        link: null,
        description: null
      },
      {
        title: 'Mô hình kinh doanh',
        content: '<p class="ql-align-center">Nhượng quyền thương mại</p>',
        link: null,
        description: null
      },
      {
        title: 'Thị trường',
        content: `<ul>
    <li>&nbsp;500 đơn hàng mỗi ngày, phục vụ mọi đối tượng thực khách</li>
    <li>&nbsp;200 đơn hàng phục vụ tại chỗ, có 140 thực khách là đối tượng trẻ em</li>
    <li>&nbsp;300 đơn hàng dành cho đối tượng học sinh, sinh viên và nhân viên văn phòng</li>
    </ul>
    `,
        link: null,
        description: null
      },
      {
        title: 'Cạnh tranh',
        content: `<p class="ql-align-center">Việc cạnh tranh xảy ra không đáng kể nhờ vào việc xây dựng thành công thương hiệu tài</p>
        <p class="ql-align-center">thị trường quốc tế nói chung và Việt Nam nói riêng</p>
        `,
        link: null,
        description: null
      },
      {
        title: 'Tầm nhìn và chiến lược',
        content: `<p class="ql-align-center">Mục tiêu trước mắt và xây dựng một cửa hàng tại một khu vực ở tại chung cư,</p>
        <p class="ql-align-center">sau đó là có mặt tại tất cả các khu riêng biệt tại Vinhomes Grand Park</p>
        `,
        link: null,
        description: null
      },
      {
        title: 'Khách hàng',
        content: `<p class="ql-align-center">Tất cả mọi người</p>`,
        link: null,
        description: null
      },
      {
        title: 'Nhà đầu tư',
        content: `<p class="ql-align-center">Tất cả mọi người</p>`,
        link: null,
        description: null
      },
      {
        title: 'Người kêu gọi',
        content: `<p class="ql-align-center">Lâm Hữu Khánh Phương</p>`,
        link: null,
        description: null
      }
    ]
  },
  {
    type: 'extension',
    listEntity: [
      {
        title: 'Khu vực',
        content: 'Quận 12, Thành phố HCM',
        link: null,
        description:
          'The maximum valuation at which your investment converts into equity shares or cash.'
      },
      {
        title: 'Doanh nghiệp',
        content: 'GS25',
        link: null,
        description:
          'The maximum valuation at which your investment converts into equity shares or cash.'
      },
      {
        title: 'Định giá giới hạn',
        content: '3.300.000.000 VND',
        link: null,
        description: null
      },
      {
        title: 'Đầu tư tối thiểu',
        content: '500.000 VND',
        link: null,
        description: null
      },
      {
        title: 'Đầu tư tối đa',
        content: '500.000.000 VND',
        link: null,
        description: null
      },
      {
        title: 'Mục tiêu tài trợ',
        content: '500.000 - 500.000.000 VND',
        link: null,
        description: null
      },
      {
        title: 'Deadline',
        content: 'August 8, 2022',
        link: null,

        description: null
      },
      {
        title: 'Type of security',
        content: 'Crowd SAFE',
        link: null,

        description: null
      },
      {
        title: 'Nominee Lead',
        content: 'Chief Executive Officer of Steeped, Inc. (currently Josh Wilbur)',
        link: null,
        description: null
      }
    ]
  },
  {
    type: 'documents',
    listEntity: [
      {
        title: 'Company_document_1.pdf',
        content: null,
        link: 'https://edu.anarcho-copy.org/Algorithm/grokking-algorithms-illustrated-programmers-curious.pdf',
        description: null
      },
      {
        title: 'Company_document_2.pdf',
        content: null,
        link: 'https://www.introprogramming.info/wp-content/uploads/2013/07/Books/CSharpEn/Fundamentals-of-Computer-Programming-with-CSharp-Nakov-eBook-v2013.pdf',
        description: null
      }
    ]
  },
  {
    type: 'album',
    listEntity: [
      {
        title: '1',
        content: null,
        link: 'https://firebasestorage.googleapis.com/v0/b/revenuesharinginvest-44354.appspot.com/o/Project%2FKFC3.jpg?alt=media&token=de2ece65-04e6-452c-bde9-2198ad057b26',
        description: null
      },
      {
        title: '2',
        content: null,
        link: 'https://firebasestorage.googleapis.com/v0/b/revenuesharinginvest-44354.appspot.com/o/Project%2FKFC2.jpg?alt=media&token=bb2420cc-f667-4811-be91-cdc99b096902',
        description: null
      }
    ]
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

  const { activeProjectId: projectID } = useSelector((state: RootState) => state.project);

  const getEntityList = (type: 'PITCH' | 'EXTENSION' | 'DOCUMENT' | 'ALBUM') => {
    return projectID?.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };
  const pitchs = getEntityList('PITCH');
  const extension = getEntityList('EXTENSION');
  const documents = getEntityList('DOCUMENT');
  const album: string[] = getEntityList('ALBUM')!
    .map((_image) => _image.link)
    .filter(notEmpty);

  album.unshift(projectID!.image);

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }
  console.log(documents);
  return (
    <Page title="Chi tiết dự án | Krowd">
      {projectID && (
        <>
          <Container maxWidth={'lg'} sx={{ paddingBottom: '4rem' }}>
            <ProjectDetailHeading p={projectID} />
            <ProjectDetailCard project={projectID} album={album} />
            <Box sx={{ mb: 10 }}>
              <Divider variant="fullWidth" />
            </Box>
            <Box>
              <ProjectDetailNavbar pitchs={pitchs} />
              <Grid container gap={1} justifyContent="space-between">
                <Grid lg={8}>
                  {/* {projectID.projectEntity.map((pe, i) => (
                    <Typography key={i} variant="h3" color={'text.secondary'} height={50}>
                      {pe.type}
                    </Typography>
                  ))} */}

                  {pitchs && <ProjectDetailPitch pitchs={pitchs} />}
                </Grid>
                <Grid lg={3}>
                  {extension && extension.length > 0 && (
                    <ProjectDetailExtension extensionList={extension} />
                  )}
                  {documents && documents.length > 0 && (
                    <>
                      <Box py={1.4}>
                        <Typography variant="h3" color={'text.secondary'}>
                          Tài liệu
                        </Typography>
                        <Box width={'25%'}>
                          <Divider variant="fullWidth" sx={{ my: 1 }} />
                        </Box>
                      </Box>
                      <Box border={'thin double'} borderRadius={1} borderColor="#eee" py={2} px={2}>
                        <Typography variant="body2" color={'text.secondary'}>
                          Tài liệu doanh nghiệp
                        </Typography>
                        {documents.map((v, i) => (
                          <Box
                            display={'flex'}
                            sx={{ '&:hover': { backgroundColor: '#eee' } }}
                            key={i}
                            my={2}
                            height={50}
                            alignItems="center"
                          >
                            <MuiLink
                              color={'text.primary'}
                              fontWeight="bold"
                              underline="none"
                              href={v.link || '#'}
                            >
                              <Icon icon={filePdfOutlined} width={40} style={{ margin: '2px' }} />
                              {v.title}
                            </MuiLink>
                          </Box>
                        ))}
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Container>
        </>
      )}
      <hr />
    </Page>
  );
}
// <Card>
//   <Box sx={{ py: 1, my: 2, mx: '25%', borderBottom: 2, borderColor: 'divider' }}>
//     <Typography
//       variant="h3"
//       sx={{
//         textAlign: 'center',
//         fontSize: '20px'
//       }}
//     >
//       Nổi bật
//     </Typography>
//   </Box>
//   <Grid container px={2}>
//     <Grid item xs={12} md={5} lg={5}>
//       <ProductDetailsCarousel product={product} />
//     </Grid>
//     <Grid item xs={12} md={7} lg={7}>
//       <Typography
//         variant="subtitle1"
//         sx={{ ml: 1, fontSize: '20px', mb: { lg: 3, xs: 1 }, mt: { lg: 1, xs: 2 } }}
//       >
//         Nội dung chi tiết
//       </Typography>
//       <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
//         6/8 The Emerald Golf View có vị trí mặt tiền đại lộ Bình Dương (TP. Thuận An,
//         Bình Dương) ngay sân golf Sông Bé và siêu thị Nhật Bản Aeon Mall, trực diện cổng
//         chính VSIP1.
//       </Typography>
//       <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
//         Dự án bán đất nền khu dân cư Lê Phong Thuận Giao trực thuộc tỉnh Bình Dương là
//         một dự án lớn có tầm tại công ty chúng tôi. Đất nền Thuận Giao Bình Dương là sự
//         lựa chọn hàng đầu về an cư lạc nghiệp.
//       </Typography>
//       <Typography sx={{ ml: 1, fontSize: '15px', my: 3 }}>
//         Dự án bán đất nền khu dân cư Lê Phong Thuận Giao trực thuộc tỉnh Bình Dương là
//         một dự án lớn có tầm tại công ty chúng tôi. Đất nền Thuận Giao Bình Dương là sự
//         lựa chọn hàng đầu về an cư lạc nghiệp.
//       </Typography>
//     </Grid>
//   </Grid>
// </Card>

// {/*Change tab view at here */}
// <Card sx={{ my: 3 }}>
//   <TabContext value={value}>
//     <Box sx={{ bgcolor: 'background.neutral' }}>
//       <TabList onChange={(e, value) => setValue(value)} variant="fullWidth">
//         <Tab disableRipple value="1" label="Mô tả chi tiết" />
//         <Tab
//           disableRipple
//           value="2"
//           label="Thành viên"
//           sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
//         />
//         <Tab
//           disableRipple
//           value="3"
//           label="Bình luận"
//           sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
//         />
//         <Tab
//           disableRipple
//           value="4"
//           label="Cập nhật"
//           sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
//         />
//         <Tab
//           disableRipple
//           value="5"
//           label="Giai đoạn"
//           sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
//         />
//       </TabList>
//     </Box>

//     <Divider />

//     <TabPanel value="1">
//       <Box sx={{ p: 3 }}>
//         <Markdown children={product.description} />
//       </Box>
//     </TabPanel>
//     <TabPanel value="2">
//       <ProjectDetailsReview product={product} />
//     </TabPanel>
//     <TabPanel value="3">
//       <Box sx={{ p: 3 }}>
//         <Markdown children={product.description} />
//       </Box>
//     </TabPanel>
//     <TabPanel value="4">
//       <Box sx={{ p: 3 }}>
//         <Markdown children={product.description} />
//       </Box>
//     </TabPanel>
//     <TabPanel value="5">
//       <Box sx={{ p: 3 }}>
//         <Markdown children={product.description} />
//       </Box>
//     </TabPanel>
//   </TabContext>
// </Card>

// <Typography
//   variant="h6"
//   sx={{
//     ml: 1,
//     fontSize: '15px',
//     textAlign: 'center',
//     my: 3
//   }}
// >
//   <PackageAnchor id="__investmentPackage" />
//   Các loại gói đầu tư
// </Typography>
// <Card>
//   <TabContext value={valuePackage}>
//     <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
//       <TabList onChange={(e, valuePackage) => setValuePackage(valuePackage)}>
//         <Tab
//           sx={{ paddingRight: '1rem' }}
//           disableRipple
//           value="Basic"
//           label="Gói cơ bản"
//         />
//         <Tab
//           disableRipple
//           value="Higher"
//           label="Gói nâng cao"
//           sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' }, paddingRight: '1rem' }}
//         />
//       </TabList>
//     </Box>
//     <TabPanel value="Basic">
//       <Box sx={{ p: 3 }}>
//         <Grid container spacing={3} sx={{ mb: 5, pb: 5, mt: 3, pt: 3 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <ProjectPackage projectPackage={projectPackage} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <ProjectPackage projectPackage={projectPackage} />
//           </Grid>

//           <Grid item xs={12} sm={12} md={4}>
//             <ProjectPackage projectPackage={projectPackage} />
//           </Grid>
//         </Grid>
//       </Box>
//     </TabPanel>
//     <TabPanel value="Higher">
//       <Box sx={{ p: 3 }}>
//         <Grid container spacing={3} sx={{ mb: 5, pb: 5, mt: 3, pt: 3 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <ProjectPackage projectPackage={projectPackage} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <ProjectPackage projectPackage={projectPackage} />
//           </Grid>

//           <Grid item xs={12} sm={12} md={4}>
//             <ProjectPackage projectPackage={projectPackage} />
//           </Grid>
//         </Grid>
//       </Box>
//     </TabPanel>
//   </TabContext>
// </Card>
//  const projectPackage = {
//     id: null,
//     name: null,
//     description: null,
//     investValue: null,
//     voucherDescription: ['Ưu đãi khi mua gói 1', 'Ưu đãi khi mua gói 2', 'Ưu đãi khi mua gói 3']
//   };

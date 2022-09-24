// material
import { Divider, Container, Grid, Box, Typography, styled, Link, Tab, Input } from '@mui/material';
// redux
import { dispatch, RootState, useSelector } from 'redux/store';
// routes
// icons
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { Button, AppBar, Toolbar, Select, FormControl, MenuItem, Menu } from '@mui/material';
// @types
// hooks
// components
import Page from 'components/Page';
import {
  ProjectDetailCard,
  ProjectDetailExtension,
  ProjectDetailHeading,
  ProjectDetailPitch,
  ProjectDetailNavbar,
  ProjectDetailDocument,
  ProjectDetailAfterPitch,
  ProjectDetailHighLight,
  ProjectPackage,
  ProjectDetailsPress,
  KrowdProjectStage,
  StageListKrowdTable,
  ProjectDetailFAQsBusiness
} from 'components/_external-pages/project-detail/index';
import MHidden from 'components/@material-extend/MHidden';
import KrowdPackage from './KrowdPackage';
import MainNavbar from 'layouts/main/MainNavbar';
import Logo from 'components/Logo';
import Label from 'components/Label';
import { PATH_PAGE } from 'routes/paths';
import { useEffect, useState } from 'react';
//Language
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { getProjectPackage } from 'redux/slices/krowd_slices/project';
import { getAllProjectStage, getProjectStageList } from 'redux/slices/krowd_slices/stage';
import { Icon } from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';
// import chartMedian from '@iconify/icons-carbon/chart-median';
// import tableIcon from '@iconify/icons-codicon/table';
// ----------------------------------------------------------------------
const projectPackage = {
  id: null,
  name: null,
  description: null,
  investValue: null,
  voucherDescription: ['Ưu đãi khi mua gói 1', 'Ưu đãi khi mua gói 2', 'Ưu đãi khi mua gói 3']
};
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
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
export default function ComponentsDetails() {
  const { detailOfProject, packageLists } = useSelector((state: RootState) => state.project);
  const { detailOfProjectID: projectID } = detailOfProject;
  //Language
  const [openStage, setOpenStage] = useState('chart');

  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const getEntityList = (
    type: 'PITCH' | 'EXTENSION' | 'DOCUMENT' | 'ALBUM' | 'ABOUT' | 'HIGHLIGHT' | 'PRESS' | 'FAQ'
  ) => {
    return projectID?.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };
  const [isShowNav, setisShowNav] = useState(false);
  const listenScrollEvent = () => {
    window.scrollY > 1000 ? setisShowNav(true) : setisShowNav(false);
  };
  useEffect(() => {
    dispatch(getProjectPackage(projectID?.id ?? ''));

    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProjectStageList(projectID?.id ?? ''));
    dispatch(getAllProjectStage(projectID?.id ?? ''));
    // dispatch(getProjectId(project.id));
  }, [dispatch]);

  const handleClickOpenStage = () => {
    setOpenStage('table');
  };
  const handleCloseOpenStage = () => {
    setOpenStage('chart');
  };
  const { listOfChartStage } = useSelector((state: RootState) => state.stage);
  const { pitchs, extensions, documents, album, abouts, highlights, bottomNav, press, faqs } = {
    pitchs: getEntityList('PITCH'),
    extensions: getEntityList('EXTENSION'),
    documents: getEntityList('DOCUMENT'),
    abouts: getEntityList('ABOUT'),
    press: getEntityList('PRESS'),
    faqs: getEntityList('FAQ'),
    album: [
      projectID!.image,
      ...getEntityList('ALBUM')!
        .map((_image) => _image.link)
        .filter(notEmpty)
    ],
    highlights: getEntityList('HIGHLIGHT'),
    bottomNav: [
      listOfChartStage.length > 0 ? 'Biểu đồ của dự án' : null,
      getEntityList('ABOUT')!.length > 0 ? 'Về chúng tôi' : null,
      getEntityList('PRESS')!.length > 0 ? 'Bài viết liên quan' : null,
      getEntityList('FAQ')!.length > 0 ? 'Câu hỏi thắc mắc' : null
    ]
  };

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }
  return (
    <Page title="Chi tiết dự án | Krowd">
      {projectID && (
        <>
          <Container maxWidth={'lg'} sx={{ paddingBottom: '4rem' }}>
            <ProjectDetailHeading p={projectID} />
            <ProjectDetailCard project={projectID} album={album} />
          </Container>
          <Box sx={{ mb: 10 }}>
            <Divider variant="fullWidth" sx={{ opacity: 0.1 }} />
          </Box>
          <Container maxWidth={'lg'}>
            <Box>
              <MHidden width="xlDown">
                <ProjectDetailNavbar pitchs={pitchs} bottomNav={bottomNav} />
              </MHidden>
              <MHidden width="mdDown">
                {isShowNav && (
                  <AppBar
                    sx={{
                      boxShadow: 0,
                      bgcolor: '#FFFFFF'
                    }}
                  >
                    <ToolbarStyle disableGutters>
                      <Container
                        maxWidth="lg"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Button
                          sx={{
                            ml: 1,
                            color: '#14b7cc',
                            backgroundColor: '#fff',
                            textTransform: 'uppercase',
                            fontSize: '1.25rem'
                            // textDecoration: 'underLine'
                          }}
                        >
                          {t(`Project_detail_card.Pitch`)}
                        </Button>
                        <Box
                          sx={{
                            my: 1.5,
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Link
                            href={PATH_PAGE.checkout}
                            style={{ width: '100%', textDecoration: 'none' }}
                          >
                            <Button
                              sx={{
                                backgroundColor: '#FF7F50',
                                '&:hover': { backgroundColor: '#FF7F50' }
                              }}
                              disableElevation
                              disableRipple
                              fullWidth={true}
                              variant="contained"
                              size="large"
                            >
                              {t(`Project_detail_card.investNow`)} {projectID.name}
                            </Button>
                          </Link>
                        </Box>
                      </Container>
                    </ToolbarStyle>
                  </AppBar>
                )}
              </MHidden>

              {!isShowNav && <MainNavbar />}

              <Grid container justifyContent="space-between">
                <Grid xs={12} sm={7} md={6} lg={8}>
                  {highlights && highlights.length > 0 && (
                    <ProjectDetailHighLight highlights={highlights} />
                  )}

                  {pitchs && pitchs.length > 0 && <ProjectDetailPitch pitchs={pitchs} />}
                </Grid>
                <Grid xs={12} sm={4} md={5} lg={3}>
                  {extensions && extensions.length > 0 && (
                    <ProjectDetailExtension extensions={extensions} />
                  )}
                  {documents && documents.length > 0 && (
                    <ProjectDetailDocument documents={documents} />
                  )}
                  {packageLists.listOfPackage && packageLists.listOfPackage.length > 0 && (
                    <Grid container sx={{ mt: 4 }}>
                      <Grid container sx={{ mt: 4 }}>
                        <Grid xs={12} sm={5} md={4} lg={5}>
                          <ProjectPackage project={projectID} />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Box sx={{ mb: 7 }}>
            <Divider variant="fullWidth" />
          </Box>
          <Container maxWidth={'lg'} sx={{ mb: 6 }}>
            <Grid container>
              <Grid xs={12} sm={4} md={5} lg={3}>
                <Box>
                  <Button
                    disabled
                    disableElevation
                    size="large"
                    sx={{
                      border: 'solid',
                      borderRadius: '5%'
                    }}
                  >
                    {t(`Project_detail_card.hoverSologun`)}
                  </Button>
                </Box>
              </Grid>
              <Grid xs={12} sm={4} md={5} lg={7}>
                <Box>
                  <Link href={PATH_PAGE.checkout} style={{ width: '100%', textDecoration: 'none' }}>
                    <Button
                      sx={{
                        backgroundColor: '#FF7F50',
                        '&:hover': { backgroundColor: '#FF7F50' }
                      }}
                      disableElevation
                      disableRipple
                      variant="contained"
                      size="large"
                    >
                      {t(`Project_detail_card.investNow`)}
                      {projectID.name}
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ mb: 7 }}>
            <Divider variant="fullWidth" />
          </Box>
          <Container maxWidth={'lg'}>
            <Grid
              container
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              mb={5}
            >
              <Grid lg={8}>
                <Typography variant="h5" sx={{ mr: 3 }} color={'#666'}>
                  <Icon
                    icon={starFilled}
                    style={{
                      marginRight: 10,
                      marginBottom: 5,
                      color: '#14B7CC'
                    }}
                  />
                  Giai đoạn ước tính
                </Typography>
              </Grid>
              <Grid lg={4}>
                <Grid
                  container
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-evenly'}
                >
                  <Grid>
                    <Button variant="outlined" onClick={handleClickOpenStage}>
                      <Typography variant="h4" color={'#666'} height={30}>
                        <Icon
                          icon={starFilled}
                          style={{
                            marginRight: 10,
                            marginBottom: 5,
                            color: '#14B7CC'
                          }}
                        />
                      </Typography>
                      Bảng
                    </Button>
                  </Grid>
                  <Grid>
                    <Button variant="outlined" onClick={handleCloseOpenStage}>
                      <Typography variant="h4" color={'#666'} height={30}>
                        <Icon
                          icon={starFilled}
                          style={{
                            marginRight: 10,
                            marginBottom: 5,
                            color: '#14B7CC'
                          }}
                        />
                      </Typography>
                      Biểu đồ
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>

          {openStage === 'chart' && listOfChartStage && listOfChartStage.length > 0 && (
            <KrowdProjectStage project={projectID} nav={bottomNav} />
          )}

          {openStage === 'table' && listOfChartStage && listOfChartStage.length > 0 && (
            <StageListKrowdTable project={projectID} />
          )}
          <Box sx={{ mb: 7 }}>
            <Divider variant="fullWidth" />
          </Box>
          <ProjectDetailAfterPitch abouts={abouts} nav={bottomNav} />
          <ProjectDetailsPress press={press} nav={bottomNav} />
          <ProjectDetailFAQsBusiness faqs={faqs} nav={bottomNav} />
        </>
      )}
      <hr />
    </Page>
  );
}

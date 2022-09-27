// material
import {
  Divider,
  Container,
  Grid,
  Box,
  Typography,
  styled,
  Link,
  Tab,
  Input,
  CircularProgress
} from '@mui/material';
// redux
import { dispatch, RootState, useSelector } from 'redux/store';
// routes
// icons
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { getProjectListById, getProjectPackage } from 'redux/slices/krowd_slices/project';
import { getAllProjectStage, getProjectStageList } from 'redux/slices/krowd_slices/stage';
import { Icon } from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';
// import chartMedian from '@iconify/icons-carbon/chart-median';
// import tableIcon from '@iconify/icons-codicon/table';
// ----------------------------------------------------------------------

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
  //Language
  const { id = '' } = useParams();
  useEffect(() => {
    dispatch(getProjectListById(id));
    dispatch(getProjectPackage(id));
    dispatch(getProjectStageList(id));
    dispatch(getAllProjectStage(id));
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, [dispatch]);
  const { detailOfProject, packageLists } = useSelector((state: RootState) => state.project);
  const { detailOfProjectID: projectID, isLoadingDetailOfProjectID } = detailOfProject;
  const [openStage, setOpenStage] = useState('chart');
  const { listOfChartStage } = useSelector((state: RootState) => state.stage);

  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  const [isShowNav, setisShowNav] = useState(false);
  const listenScrollEvent = () => {
    window.scrollY > 1000 ? setisShowNav(true) : setisShowNav(false);
  };
  const handleClickOpenStage = () => {
    setOpenStage('table');
  };
  const handleCloseOpenStage = () => {
    setOpenStage('chart');
  };
  const getEntityList = (
    type: 'PITCH' | 'EXTENSION' | 'DOCUMENT' | 'ALBUM' | 'ABOUT' | 'HIGHLIGHT' | 'PRESS' | 'FAQ'
  ) => {
    return projectID?.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };
  const { pitchs, extensions, documents, abouts, highlights, press, faqs } = {
    pitchs: getEntityList('PITCH'),
    extensions: getEntityList('EXTENSION'),
    documents: getEntityList('DOCUMENT'),
    abouts: getEntityList('ABOUT'),
    press: getEntityList('PRESS'),
    faqs: getEntityList('FAQ'),
    highlights: getEntityList('HIGHLIGHT')
  };

  return (
    <Page title="Chi tiết dự án | Krowd">
      {isLoadingDetailOfProjectID && (
        <Box sx={{ height: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box>
            <CircularProgress
              size={100}
              sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
              Đang tải dữ liệu, vui lòng đợi giây lát...
            </Typography>
          </Box>
        </Box>
      )}
      {!isLoadingDetailOfProjectID && projectID && (
        <>
          <Container maxWidth={'lg'} sx={{ paddingBottom: '4rem' }}>
            <ProjectDetailHeading p={projectID} />
            <ProjectDetailCard project={projectID} />
          </Container>
          <Box sx={{ mb: 10 }}>
            <Divider variant="fullWidth" sx={{ opacity: 0.1 }} />
          </Box>
          <Container maxWidth={'lg'}>
            <Box>
              <MHidden width="xlDown">
                <ProjectDetailNavbar pitchs={pitchs} />
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
            <KrowdProjectStage project={projectID} nav={'Biểu đồ của dự án'} />
          )}

          {openStage === 'table' && listOfChartStage && listOfChartStage.length > 0 && (
            <StageListKrowdTable project={projectID} />
          )}
          <Box sx={{ mb: 7 }}>
            <Divider variant="fullWidth" />
          </Box>
          <ProjectDetailAfterPitch abouts={abouts} nav={'Về chúng tôi'} />
          <ProjectDetailsPress press={press} nav={'Bài viết liên quan'} />
          <ProjectDetailFAQsBusiness faqs={faqs} nav={'Câu hỏi thắc mắc'} />
        </>
      )}
      <hr />
    </Page>
  );
}

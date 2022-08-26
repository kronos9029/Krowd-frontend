// material
import { Divider, Container, Grid, Box, Typography, styled, Link, Tab, Input } from '@mui/material';
// redux
import { RootState, useSelector } from 'redux/store';
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
  ProjectDetailHighLight
} from 'components/_external-pages/project-detail/index';
import MHidden from 'components/@material-extend/MHidden';
import KrowdPackage from './KrowdPackage';
import MainNavbar from 'layouts/main/MainNavbar';
import Logo from 'components/Logo';
import Label from 'components/Label';
import { PATH_PAGE } from 'routes/paths';
import { useEffect, useState } from 'react';
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

export default function ComponentsDetails() {
  const { activeProjectId: projectID } = useSelector((state: RootState) => state.project);

  const getEntityList = (
    type: 'PITCH' | 'EXTENSION' | 'DOCUMENT' | 'ALBUM' | 'ABOUT' | 'HIGHLIGHT'
  ) => {
    return projectID?.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };

  const [isShowNav, setisShowNav] = useState(false);
  const listenScrollEvent = () => {
    window.scrollY > 1000 ? setisShowNav(true) : setisShowNav(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  const { pitchs, extensions, documents, album, abouts, highlights, bottomNav } = {
    pitchs: getEntityList('PITCH'),
    extensions: getEntityList('EXTENSION'),
    documents: getEntityList('DOCUMENT'),
    abouts: getEntityList('ABOUT'),
    album: [
      projectID!.image,
      ...getEntityList('ALBUM')!
        .map((_image) => _image.link)
        .filter(notEmpty)
    ],
    highlights: getEntityList('HIGHLIGHT'),
    bottomNav: [getEntityList('ABOUT')!.length > 0 ? 'Về dự án' : null]
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
                        <Label
                          sx={{
                            ml: 1,
                            color: '#14b7cc',
                            backgroundColor: '#fff',
                            textTransform: 'uppercase',
                            fontSize: '1.25rem'
                            // textDecoration: 'underLine'
                          }}
                        >
                          Tiêu điểm
                        </Label>
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
                              Đầu tư ngay {projectID.name}
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
                    Bạn muốn kiếm thêm chi tiêu
                  </Button>
                </Box>
              </Grid>
              <Grid xs={12} sm={4} md={5} lg={7}>
                <Box>
                  <Link href={PATH_PAGE.checkout} style={{ width: '100%', textDecoration: 'none' }}>
                    <Button
                      sx={{
                        backgroundColor: '#FF7F50',
                        minWidth: '450px',
                        '&:hover': { backgroundColor: '#FF7F50' }
                      }}
                      disableElevation
                      disableRipple
                      variant="contained"
                      size="large"
                    >
                      Đầu tư ngay {projectID.name}
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>

          <Box sx={{ mb: 7 }}>
            <Divider variant="fullWidth" />
          </Box>
          <ProjectDetailAfterPitch abouts={abouts} nav={bottomNav} />
        </>
      )}
      <hr />
    </Page>
  );
}

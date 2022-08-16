// material
import { Divider, Container, Grid, Box, Typography, styled, Link, Tab } from '@mui/material';
// redux
import { RootState, useSelector } from 'redux/store';
// routes
// icons

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
// ----------------------------------------------------------------------
const projectPackage = {
  id: null,
  name: null,
  description: null,
  investValue: null,
  voucherDescription: ['Ưu đãi khi mua gói 1', 'Ưu đãi khi mua gói 2', 'Ưu đãi khi mua gói 3']
};
export default function ComponentsDetails() {
  const { activeProjectId: projectID } = useSelector((state: RootState) => state.project);

  const getEntityList = (
    type: 'PITCH' | 'EXTENSION' | 'DOCUMENT' | 'ALBUM' | 'ABOUT' | 'HIGHLIGHT'
  ) => {
    return projectID?.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };

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
          <Container maxWidth={'lg'} sx={{ paddingBottom: '4rem' }}>
            <Box>
              <MHidden width="xlDown">
                <ProjectDetailNavbar pitchs={pitchs} bottomNav={bottomNav} />
              </MHidden>
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
          <Box sx={{ mb: 5 }}>
            <Divider variant="fullWidth" />
          </Box>
          <Container maxWidth={'lg'} sx={{ paddingBottom: '4rem' }}>
            <Box>
              <Typography textAlign="center" py={1} color={'#666'} variant="h3">
                Các loại gói đầu tư
              </Typography>
              <Box mx="auto" width={'10%'}>
                <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
              </Box>
            </Box>
            <KrowdPackage />
          </Container>
          <Box sx={{ mb: 5 }}>
            <Divider variant="fullWidth" />
          </Box>
          <ProjectDetailAfterPitch abouts={abouts} nav={bottomNav} />
        </>
      )}
      <hr />
    </Page>
  );
}

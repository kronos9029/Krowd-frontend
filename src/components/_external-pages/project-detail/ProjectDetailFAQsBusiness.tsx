import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Container,
  Box,
  Grid,
  Button,
  Dialog
} from '@mui/material';
import { height } from '@mui/system';
import { dispatch, RootState, useSelector } from 'redux/store';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import editTwotone from '@iconify/icons-ant-design/edit-twotone';
import { ProjectAPI } from '_apis_/krowd_apis/project';
import { useSnackbar } from 'notistack';
import { MotionInView, varFadeIn } from 'components/animate';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import styled from '@emotion/styled';
const NavbarTopAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-100px',
  visibility: 'hidden'
}));
const NavbarBottomAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '10px',
  visibility: 'hidden'
}));
const NavbarTopClickAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-140px',
  visibility: 'hidden'
}));
type FAQSProps = {
  id: string;
  title: string;
  content: string | null;
  link: string | null;
  description: string | null;
};
type FAQSListProps = {
  faqs: FAQSProps[] | undefined;
  nav: string;
};
function ProjectDetailFAQsBusiness({ faqs, nav }: FAQSListProps) {
  return (
    <>
      {/* Press */}
      <Container maxWidth={false} sx={{ paddingBottom: '5rem' }}>
        {faqs && faqs?.length > 0 && (
          <>
            <Box sx={{ mb: 7 }}>
              <Divider variant="fullWidth" />
            </Box>
            <Box mb={7}>
              <NavbarTopAnchor id={`__navbarTop_${nav}`}></NavbarTopAnchor>

              <Typography textAlign="center" py={1} color={'#666'} variant="h4">
                Câu hỏi thắc mắc
              </Typography>
              <Box mx="auto" width={'10%'}>
                <NavbarTopClickAnchor id={`__navbarTopClick_${nav}`}></NavbarTopClickAnchor>

                <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
              </Box>
            </Box>
          </>
        )}
        {faqs &&
          faqs.map((fqs, i) => (
            <Grid key={i} container>
              <Grid lg={3}></Grid>
              <Grid lg={6}>
                <MotionInView variants={varFadeIn}>
                  <Accordion>
                    <AccordionSummary
                      style={{ paddingTop: '1rem', marginTop: 5, color: '#251E18' }}
                      expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
                    >
                      <Typography variant="subtitle1">+ {fqs.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{fqs.content}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </MotionInView>
              </Grid>
            </Grid>
          ))}
      </Container>
    </>
  );
}
export default ProjectDetailFAQsBusiness;

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
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import { MotionInView, varFadeIn } from 'components/animate';
type HOWSPROPS = {
  id: string;
  title: string;
  content: string | null;
  link: string | null;
  description: string | null;
};
type HOWSListProps = {
  hows: HOWSPROPS[] | undefined;
};
function ProjectDetailHowItWorks({ hows }: HOWSListProps) {
  return (
    <>
      {/* Press */}

      <Box>
        <Typography sx={{ mt: 8 }} variant="h4" color={'#666'}>
          Cách thức hoạt động
        </Typography>
        <Box width={'18%'}>
          <Divider variant="fullWidth" sx={{ my: 1, mb: 3 }} />
        </Box>
      </Box>
      {hows &&
        hows.map((hiw, i) => (
          <>
            <Grid key={i} container>
              <Grid xs={11} sm={11} md={11} lg={11}>
                <MotionInView variants={varFadeIn}>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        color: '#251E18',
                        display: 'inline-flex',
                        flexDirection: 'row-reverse'
                      }}
                      expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
                    >
                      <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>
                        {hiw.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ fontSize: '13px', pl: 1 }}>{hiw.content}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </MotionInView>
              </Grid>
            </Grid>
          </>
        ))}
    </>
  );
}
export default ProjectDetailHowItWorks;

// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
//
import { MotionInView, varFadeInUp } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(9, 0),
  backgroundColor: '#E5F3E9'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

// ----------------------------------------------------------------------

export default function BusinessContent() {
  return (
    <RootStyle>
      <h1 style={{ paddingBottom: '5rem' }}>
        Criteria that we believe is important when selecting a franchise to invest in
      </h1>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  Return On Investment (ROI)
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  All franchises are subject to FTC regulation which requires franchises to disclose
                  their itemized startup costs. Additionally, many franchises disclose a Financial
                  Performance Representation (FPR) of their locations. FranShares only works with
                  franchises that show net profits in their FPR so our investors can have a better
                  understanding of potential returns. We avoid franchises that have high buildout
                  costs, employee headcounts, and inventory to maximize ROI.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest1.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: '7rem' }}>
        <Grid container spacing={5} direction="row" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  Growth
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  FranShares looks at each franchise’s growth per location, store sales and number
                  of franchisees to ensure the brand is growing quickly, efficiently, and
                  sustainably.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest2.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: '7rem' }}>
        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  Availability
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  While most people think of major fast-food franchise brands when thinking about
                  franchising, the availability for new locations is limited-to-nonexistent in good
                  markets. FranShares looks for growing franchise brands that have availability for
                  multiple locations in good markets.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest3.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: '7rem' }}>
        <Grid container spacing={5} direction="row" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  Leadership
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  As part of FTC regulation, each franchisor’s leadership must be disclosed. We look
                  for experienced teams based on their involvement in their franchise’s industry and
                  in franchising as a whole.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest4.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: '7rem' }}>
        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  Sustainability
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  While they may not always invest in the “sexiest” businesses, FranShares looks for
                  those that are more essential services that have great long-term outlooks. We
                  avoid quick fads and stick with staples like haircare, automotive, fitness, etc.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest5.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: '7rem' }}>
        <Grid container spacing={5} direction="row" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  Competition and Competitive Advantages
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  Franchising does not make new industries but instead consolidates existing ones.
                  We look at who the other competitors in their respective industries are, whether
                  they are growing, and what our franchises’ competitive advantages are to capture
                  market share in the space.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest6.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: '7rem' }}>
        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  Manageability
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  Many franchises require a full-time owner and operator. We focus on semi-absentee
                  franchise models that can be manager-run, which typically have lower employee
                  headcounts and simpler operations. We also add an extra layer of management, which
                  is typically not found in these franchise models to have top-of-the-line
                  efficiency in operations.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest7.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: '7rem' }}>
        <Grid container spacing={5} direction="row" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  Recession and Pandemic Resistance
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  No one has a crystal ball that can reveal what’s going to happen in the future and
                  what to invest in. Instead, we make educated investment decisions to prepare as
                  much as possible. We look at essential and need-based industries that tend to
                  perform well in all economic conditions and have a history of performing well in
                  the previous recession or COVID lockdowns.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest8.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: '7rem' }}>
        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                  How we select
                  <br /> our operators
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  For decades, Private Equity firms have been acquiring profitable franchises and
                  turning them into cash cows by leveraging outsourced franchise management
                  companies, or building in-house franchise management teams.
                </Typography>
                <br />
                <br />
                <Typography variant="h6" sx={{ mb: 3, color: '#637381' }}>
                  At FranShares, we’ll be taking a page from the private equity book of franchise
                  management to ensure our franchises maximize ROI. Depending on the fund, we’ll
                  either work with a reputable and experienced outsourced management company like
                  Restaurant Sherpas, or leverage our internal expertise to hire a in-house
                  management team. There is no shortage of franchise management talent in our team’s
                  network
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
          <Grid item xs={4} md={6} sx={{ position: 'static' }}>
            <MotionInView
              threshold={0.5}
              variants={varFadeInUp}
              sx={{ top: 0, left: 0, position: 'static' }}
            >
              <img src="/static/home/Invest10.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

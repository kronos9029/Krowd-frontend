// material
import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import React from 'react';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';

export default function GeneralAppLearn() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Hiểu về các điều khoản giao dịch | Krowd">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid container>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" sx={{ pt: 5 }}>
                Understanding deal terms
              </Typography>
              <Typography
                sx={{ fontSize: '25px', lineHeight: 1.3, color: '#777', fontWeight: 400, py: 3 }}
              >
                Startups that raise on Republic set the deal terms at which they sell their
                securities. Here are some definitions and explanations to help with your next
                investment.{' '}
              </Typography>
              <Box>
                <Typography variant="h3">Funding goal</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ lineHeight: 2 }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontSize: '22px', lineHeight: 1.3 }}>
                      Minimum funding goal
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    The minimum amount the startup needs to raise. If the startup doesn’t reach the
                    minimum funding goal before the campaign ends, their campaign is considered
                    unsuccessful, and all investments are refunded to investors.
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontSize: '22px', lineHeight: 1.3 }}>
                      Maximum funding goal
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    The maximum amount the startup is willing to raise. When this amount is reached,
                    the startup will stop accepting investments.
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="h3">Campaign timeline </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ lineHeight: 2 }}>
                  <Box>
                    Each startup campaign will run for a set amount of time, regardless of whether
                    or not the startup reaches its minimum or maximum funding goal.
                  </Box>

                  <Box sx={{ pb: 5 }}>Each campaign has:</Box>

                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        1
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 4.5 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          A start and an end date.{' '}
                        </Typography>
                        <br /> These dates are set in advance and do not change, and investors can
                        continue to invest until the listed end date, even if that startup has
                        reached its funding goal.
                      </Box>
                    </Box>
                  </Box>

                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        {' '}
                        2
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 3 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          An option to close early or extend.
                        </Typography>
                        <br />A startup has this option if they reach their minimum funding goal
                        before the end date. Startups have the ability to extend or shorten their
                        campaigns under certain conditions.
                      </Box>
                    </Box>
                  </Box>
                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        {' '}
                        3
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 3 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          An option to do a rolling close.
                        </Typography>
                        <br />
                        If a startup reaches its minimum funding goal before the end date it may
                        elect to keep the campaign going and receive the funds closed to date. This
                        must be properly disclosed to investors.
                      </Box>
                    </Box>
                  </Box>
                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        {' '}
                        4
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 3 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          A cancellation deadline.
                        </Typography>
                        <br />
                        This starts 48 hours before a campaign end date (or in the event of a
                        rolling close, a date announced by the company after the deal is met. Read
                        more about rolling closes). Any investments made after this deadline are
                        past final and will not be eligible for a refund.
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="h3">Min and max investment amounts</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ lineHeight: 2 }}>
                  <Box>
                    Each company sets the minimum investment size they will accept during a
                    campaign. Republic allows companies to start as low as $10, but the typical
                    minimum investment amount ranges between $25–$250. Companies can also choose to
                    limit the maximum investment amount to allow more investors to participate.
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="h3">Specific securities terms </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ lineHeight: 2 }}>
                  <Box>
                    The two main securities terms are the Crowd SAFE and Token DPA. There may be
                    more securities, so it’s important to check each campaign page to learn more.
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ mb: 2 }} variant="h5">
                    Terms of the Crowd SAFE
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography>
                    When you invest on Republic, you typically receive a Crowd SAFE security.
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  The Crowd SAFE is not the same as equity, rather it is an agreement that may
                  provide investors with equity upon certain future events. Every company’s Crowd
                  SAFE's terms are different, but they typically include two main parameters—the
                  valuation cap and discount—which determine how the specific Crowd SAFE terms
                  convert to equity.
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Link to="">Learn how the Crowd SAFE works.</Link>
                </Box>
              </Box>
              <Box>
                <Typography variant="h3">Changing the terms during the campaign</Typography>
                <Divider sx={{ mb: 3 }} />

                <Box>
                  <Typography sx={{ mb: 2 }}>
                    If a company makes a change to the deal terms or other material offering
                    information while the campaign is running, they are required to notify investors
                    reconfirm their investment. Investors will have 5 business days after the
                    confirmation request is sent to respond.
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ mb: 2 }}>
                    If they do not reconfirm within 5 business days, their investment will be
                    cancelled and refunded. Any future funding towards the campaign will be
                    considered a new investment.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

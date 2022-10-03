// material
import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import React from 'react';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';

export default function WhatIGetInvest() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Cách thức đâu tư | Krowd">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid container>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" sx={{ pt: 5 }}>
                Cách thức hoạt động
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

import { TextAnimate, varBounceInUp, varWrapEnter } from 'components/animate';

import { Box, Card, Typography, Stack, Grid } from '@mui/material';
// utils
import { fCurrency, fNumber, fPercent } from '../../../utils/formatNumber';
import { RootState, useSelector } from 'redux/store';

// ----------------------------------------------------------------------

export default function AppTotalActiveUsers() {
  const { InvestedProjectDetails } = useSelector((state: RootState) => state.project);
  const { listOfProject } = InvestedProjectDetails;
  const { detailOfProject, packageLists } = useSelector((state: RootState) => state.project);

  return (
    <Grid container spacing={3}>
      {detailOfProject.detailOfProjectID?.status === 'ACTIVE' && (
        <>
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1, color: 'green' }}>
                <Typography sx={{ fontWeight: 700 }} variant="body1">
                  Tiền nhận được dự kiến
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 2, mb: 1 }}
                ></Stack>
                <TextAnimate
                  text={fCurrency(listOfProject?.expectedReturn ?? 0)}
                  sx={{ typography: 'h3' }}
                  variants={varBounceInUp}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1, color: 'green' }}>
                <Typography sx={{ fontWeight: 700 }} variant="body1">
                  Đã thanh toán
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 2, mb: 1 }}
                ></Stack>
                <TextAnimate
                  text={fCurrency(listOfProject?.returnedAmount ?? 0)}
                  sx={{ typography: 'h3' }}
                  variants={varBounceInUp}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1, color: 'red' }}>
                <Typography sx={{ fontWeight: 700 }} variant="body1">
                  Nợ tối thiểu
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 2, mb: 1 }}
                ></Stack>{' '}
                <TextAnimate
                  text={fCurrency(listOfProject?.deptRemain ?? 0)}
                  sx={{ typography: 'h3' }}
                  variants={varBounceInUp}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700 }} variant="body1">
                  Nợ cộng lãi
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 2, mb: 1 }}
                ></Stack>
                <TextAnimate
                  text={fCurrency(listOfProject?.profitableDebt ?? 0)}
                  sx={{ typography: 'h3' }}
                  variants={varBounceInUp}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700 }} variant="body1">
                  Số kỳ thanh toán
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 2, mb: 1 }}
                ></Stack>
                <TextAnimate
                  text={`${listOfProject?.numOfStage}   Kỳ` ?? 0}
                  sx={{ typography: 'h3' }}
                  variants={varBounceInUp}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700 }} variant="body1">
                  Số kỳ đã thanh toán
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 2, mb: 1 }}
                ></Stack>
                <TextAnimate
                  text={`${listOfProject?.numOfPayedStage} Kỳ` ?? 0}
                  sx={{ typography: 'h3' }}
                  variants={varBounceInUp}
                />
              </Box>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
}

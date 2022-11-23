// material

import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Button,
  Stack,
  Card,
  Divider,
  Dialog,
  Link
} from '@mui/material';
// components

import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { Package, Project1 } from '../../../@types/krowd/project';
import { dispatch, RootState } from 'redux/store';
import Label from 'components/Label';
import { getPackageBYID, getProjectPackage } from 'redux/slices/krowd_slices/project';
import { PATH_DASHBOARD, PATH_PAGE } from 'routes/paths';
import { fCurrencyPackage } from 'utils/formatNumber';
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  width: 300,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(2)
  }
}));

export default function ProjectPackage({ project }: { project: Project1 }) {
  const { packageLists } = useSelector((state: RootState) => state.project);
  const { isPackageLoading } = packageLists;
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetPackageInvestByID = async (v: Package) => {
    await dispatch(getPackageBYID(v.id));
    navigate(`${PATH_PAGE.checkout}/${project.id}`);
  };

  return (
    <>
      <Box>
        <Typography variant="h4" color={'#666'}>
          Gói đầu tư
        </Typography>
        <Box width={'45%'}>
          <Divider variant="fullWidth" sx={{ my: 1 }} />
        </Box>
      </Box>
      <RootStyle>
        {(isPackageLoading && (
          <Box>
            <CircularProgress
              size={100}
              sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
              Đang tải dữ liệu, vui lòng đợi giây lát...
            </Typography>
          </Box>
        )) || (
          <Grid sx={{ mt: 1, my: 1 }}>
            {packageLists.listOfPackage &&
              packageLists.listOfPackage.length > 0 &&
              packageLists.listOfPackage.map((e, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant="overline"
                    sx={{ display: 'flex', color: 'text.secondary', justifyContent: 'center' }}
                  >
                    {e.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    {index === 1 || index === 2 ? (
                      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}></Typography>
                    ) : (
                      ''
                    )}
                    <Typography variant="h3" sx={{ mx: 1 }}>
                      {e.price === 0 ? 'Free' : fCurrencyPackage(e.price)}
                    </Typography>
                  </Box>

                  {e.remainingQuantity > 0 && e.status === 'IN_STOCK' ? (
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'primary.main',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                    >
                      Số lượng giới hạn {e.remainingQuantity} / {e.quantity}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'red',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                    >
                      Gói đã được đầu tư hết
                    </Typography>
                  )}
                  <Typography sx={{ my: 2, fontWeight: 600 }}>Bạn sẽ nhận được:</Typography>
                  <Stack
                    paddingLeft={0}
                    textAlign={'left'}
                    component="ul"
                    spacing={2}
                    sx={{ my: 2, width: 1 }}
                  >
                    {e.descriptionList.map((item, i) => (
                      <Stack
                        key={i}
                        component="li"
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{
                          typography: 'body2'
                        }}
                      >
                        <Box component={Icon} icon={checkmarkFill} sx={{ width: 20, height: 20 }} />
                        <Typography variant="body2">{item}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Link
                    style={{ textDecoration: 'none' }}
                    onClick={() => handleGetPackageInvestByID(e)}
                  >
                    <Typography sx={{ textAlign: 'end' }}>
                      {e.remainingQuantity > 0 && e?.status === 'IN_STOCK' && (
                        <Button
                          sx={{
                            backgroundColor: '#FF7F50',
                            textDecoration: 'none',
                            '&:hover': { backgroundColor: '#FF7F50' }
                          }}
                          fullWidth
                          disableElevation
                          disableRipple
                          variant="contained"
                          size="large"
                        >
                          Chọn gói
                        </Button>
                      )}
                    </Typography>
                  </Link>
                  <Divider sx={{ my: 3 }} variant="fullWidth" />
                </Grid>
              ))}
          </Grid>
        )}
      </RootStyle>
    </>
  );
}

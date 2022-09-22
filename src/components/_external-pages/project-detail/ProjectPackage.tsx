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
  Dialog
} from '@mui/material';
// components

import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { Project1 } from '../../../@types/krowd/project';
import { dispatch, RootState } from 'redux/store';
import Label from 'components/Label';
import { getProjectPackage } from 'redux/slices/krowd_slices/project';
import { PATH_PAGE } from 'routes/paths';
import { fCurrencyPackage } from 'utils/formatNumber';

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

  useEffect(() => {
    dispatch(getProjectPackage(project.id));
  }, [dispatch]);
  return (
    <>
      <Box py={1.4}>
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
                <Grid sx={{ p: 2 }} item key={index} xs={12} sm={12} md={12} lg={12}>
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
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: 'capitalize',
                      justifyContent: 'center',
                      display: 'flex',
                      mb: 2
                    }}
                  >
                    (VND)
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'primary.main',
                      textTransform: 'capitalize',
                      justifyContent: 'center',
                      display: 'flex'
                    }}
                  >
                    Số lượng {e.quantity}
                  </Typography>
                  <Stack
                    paddingLeft={0}
                    textAlign={'left'}
                    component="ul"
                    spacing={2}
                    sx={{ my: 5, width: 1 }}
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
                  <Button
                    to={PATH_PAGE.checkout}
                    fullWidth
                    size="large"
                    variant="contained"
                    component={RouterLink}
                  >
                    Chọn gói
                  </Button>
                  <Divider sx={{ my: 3 }} variant="fullWidth" />
                </Grid>
              ))}
          </Grid>
        )}
      </RootStyle>
    </>
  );
}

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
    const fetchData = async () => {
      await dispatch(getProjectPackage(project.id));
    };
    fetchData().catch(console.error);
  }, [dispatch]);
  return (
    <>
      <Box width={'fit-content'} py={1.4}>
        <Typography variant="h5" color={'text.secondary'}>
          Gói đầu tư
        </Typography>
        <Box width={'25%'}>
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
                <Grid sx={{ p: 2 }} item key={index} xs={12} sm={12} md={6} lg={12}>
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
                    <Typography variant="h2" sx={{ mx: 1 }}>
                      {e.price === 0 ? 'Free' : e.price}
                    </Typography>
                    {index === 1 || index === 2 ? (
                      <Typography
                        gutterBottom
                        component="span"
                        variant="subtitle2"
                        sx={{
                          alignSelf: 'flex-end',
                          color: 'text.secondary'
                        }}
                      ></Typography>
                    ) : (
                      ''
                    )}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      textTransform: 'capitalize',
                      justifyContent: 'center',
                      display: 'flex'
                    }}
                  >
                    Số lượng {e.quantity}
                  </Typography>

                  <Stack spacing={2} sx={{ my: 5 }}>
                    {e.descriptionList.map((item, i) => (
                      <Typography
                        key={i}
                        sx={{ textAlign: 'left', alignItems: 'left' }}
                        variant="body2"
                      >
                        {item}
                      </Typography>
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

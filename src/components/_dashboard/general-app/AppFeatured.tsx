import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeInRight, MotionContainer } from '../../animate';
import { RootState, useSelector } from 'redux/store';

// ----------------------------------------------------------------------
const CarouselImgStyle = styled('img')(({ theme }) => ({
  height: 280,
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));
export default function AppFeatured() {
  const { InvestedProjectDetails } = useSelector((state: RootState) => state.project);
  const { listOfProject } = InvestedProjectDetails;
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <CarouselImgStyle alt={'aaa'} src={listOfProject?.projectImage ?? ''} />
        <Box my={2}>
          <Typography sx={{ textAlign: 'center', color: 'green' }} variant="h5" gutterBottom noWrap>
            {listOfProject?.projectName}
          </Typography>
          {/* <Typography sx={{ textAlign: 'end' }} variant="body2" noWrap>
            {listOfProject?.projectStatus}
          </Typography> */}
        </Box>
      </Box>
    </Card>
  );
}

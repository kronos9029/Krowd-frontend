import { useState } from 'react';
// material
import { Divider, Collapse } from '@mui/material';
//
import ProjectDetailsReviewForm from './ProjectDetailsReviewForm';
import ProjectDetailsReviewList from './ProjectDetailsReviewList';
import ProjectDetailsReviewOverview from './ProjectDetailsReviewOverview';
import { Product } from '../../../../@types/products';
import {
  Box,
  List,
  Button,
  Rating,
  Avatar,
  ListItem,
  Pagination,
  Typography,
  Grid
} from '@mui/material';

// ----------------------------------------------------------------------

type ProjectDetailsReviewProps = {
  product: Product;
};

export default function ProjectDetailsReview({ product }: ProjectDetailsReviewProps) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <Grid
        container
        width={'100%'}
        mt={0}
        mx={0}
        spacing={3}
        sx={{ justifyContent: 'space-around' }}
      >
        <Box sx={{ my: 3, fontWeight: '900' }}>
          <Typography variant="subtitle1" sx={{ ml: 1, fontSize: '20px' }}>
            Danh sách các thành viên trong dự án
          </Typography>
        </Box>
        <ProjectDetailsReviewList product={product} />
      </Grid>
    </>
  );
}

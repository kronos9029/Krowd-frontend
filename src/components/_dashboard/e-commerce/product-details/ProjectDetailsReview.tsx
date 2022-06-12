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
      <Grid container spacing={3}>
        <ProjectDetailsReviewList product={product} />
      </Grid>
    </>
  );
}

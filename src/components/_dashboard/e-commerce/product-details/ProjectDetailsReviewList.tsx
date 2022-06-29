import { Icon } from '@iconify/react';
import { useState } from 'react';
import roundThumbUp from '@iconify/icons-ic/round-thumb-up';
import roundVerified from '@iconify/icons-ic/round-verified';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { styled } from '@mui/material/styles';

// material
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
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
import { Product, ProductReview } from '../../../../@types/products';

// ----------------------------------------------------------------------
function ReviewItem({ review }: { review: ProductReview }) {
  const [isHelpful, setHelpfuls] = useState(false);
  const { name, rating, comment, helpful, postedAt, avatarUrl, isPurchased } = review;

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <ListItem
        sx={{
          mb: 5,
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-around',
          textAlign: 'center'
        }}
      >
        <Box>
          <Avatar
            src={avatarUrl}
            sx={{
              m: '10px auto',
              width: { md: 64 },
              height: { md: 64 }
            }}
          />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {fDate(postedAt)}
          </Typography>
        </Box>
      </ListItem>
    </>
  );
}

type ProjectDetailsReviewListProps = {
  product: Product;
};

export default function ProjectDetailsReviewList({ product }: ProjectDetailsReviewListProps) {
  const { reviews } = product;

  return (
    <Box>
      <Grid container width="100%" spacing={3} mt={0} mx={0}>
        {reviews.map((review, index) => (
          <Grid key={index} xs={12} sm={6} md={6} lg={3}>
            <ReviewItem key={review.id} review={review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

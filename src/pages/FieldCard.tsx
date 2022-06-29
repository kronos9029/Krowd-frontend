import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Link,
  Grid,
  Paper,
  Typography,
  CardActionArea,
  CardMedia,
  Avatar
} from '@mui/material';
import { MotionInView, varFadeInUp } from 'components/animate';
//

// ----------------------------------------------------------------------

type ComponentCardProps = {
  item: {
    name: string;
    icon: string;
    href: string;
  };
};

export default function FieldCard({ item }: ComponentCardProps) {
  const { name, icon, href } = item;

  return (
    <Grid item xs={12} sm={6} md={2}>
      <MotionInView variants={varFadeInUp}>
        <Link component={RouterLink} to={href} underline="none">
          <Paper
            sx={{
              p: 1,
              boxShadow: (theme) => theme.customShadows.z8
            }}
          >
            <CardActionArea
              sx={{
                p: 2,
                borderRadius: 1,
                color: 'primary.main',
                bgcolor: 'background.neutral'
              }}
            >
              <Avatar src={icon} alt={name} sx={{ width: '100%', height: '100%' }} />
            </CardActionArea>

            <Typography variant="subtitle2" sx={{ mt: 1, p: 1, textAlign: 'center' }}>
              {name}
            </Typography>
          </Paper>
        </Link>
      </MotionInView>
    </Grid>
  );
}

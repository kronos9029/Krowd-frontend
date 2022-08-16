import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// material
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { SeverErrorIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <RootStyle title="Không có quyền truy cập | Krowd">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Bạn không có quyền truy cập
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Hiện tại phần mềm đang bảo trì vui lòng quay lại sau
          </Typography>

          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Trở về
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}

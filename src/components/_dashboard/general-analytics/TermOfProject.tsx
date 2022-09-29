import { Icon } from '@iconify/react';
// import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
// utils
import { fNumber, fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'left',
  padding: theme.spacing(3, 3, 0),
  height: '600px',
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

// const IconWrapperStyle = styled('div')(({ theme }) => ({
//   margin: 'auto',
//   display: 'flex',
//   borderRadius: '50%',
//   alignItems: 'center',
//   width: theme.spacing(8),
//   height: theme.spacing(8),
//   justifyContent: 'center',
//   marginBottom: theme.spacing(3),
//   color: theme.palette.info.dark,
//   backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
//     theme.palette.info.dark,
//     0.24
//   )} 100%)`
// }));

// ----------------------------------------------------------------------

const TOTAL = 1500000;

export default function TermOfProject() {
  return (
    <RootStyle>
      <Typography variant="h6">Nâng cao</Typography>
      <Typography sx={{ fontSize: '13px', paddingTop: '1rem' }}>
        Khả năng hợp tác và bảo mật nâng cao cho các nhóm và công ty
      </Typography>
      <Typography variant="h2" sx={{ paddingTop: '2rem' }}>
        {fNumber(TOTAL)}đ
      </Typography>

      <Typography variant="h6" sx={{ opacity: 0.72, pt: 3, pb: 3 }}>
        Mô tả thêm voucher
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: 0.5,
            bgcolor: 'success.main'
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Unlimited guests Miro Smart Diagramming
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: 0.5,
            bgcolor: 'success.main'
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Unlimited guests Miro Smart Diagramming
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: 0.5,
            bgcolor: 'success.main'
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Unlimited guests Miro Smart Diagramming
        </Typography>
      </Stack>
    </RootStyle>
  );
}

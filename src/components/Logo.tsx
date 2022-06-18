// material
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  const theme = useTheme();

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src="/static/home/logo.png" />
    </Box>
  );
}

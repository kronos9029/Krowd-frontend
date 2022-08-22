import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import filePdfFilled from '@iconify/icons-ant-design/file-pdf-filled';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Divider, Typography, Stack, DialogProps } from '@mui/material';
// redux
import { useDispatch } from '../../../../redux/store';
import { onBackStep, resetCart } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
//
import { DialogAnimate } from '../../../animate';
import { OrderCompleteIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)'
    }
  }
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ open }: DialogProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetStep = () => {
    dispatch(resetCart());
    navigate('/');
  };
  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  return (
    <DialogStyle fullScreen open={open}>
      <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" paragraph>
            Quét mã để tải ứng dụng hoặc thanh toán ngay
          </Typography>
          <img src="https://static.mservice.io/img/momo-upload-api-220622150620-637915071801318808.png" />
          <Typography align="left" sx={{ color: 'text.secondary' }}>
            <br /> <br /> Sử dụng App MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            color="inherit"
            onClick={handleBackStep}
            startIcon={<Icon icon={arrowIosBackFill} />}
          >
            Trở về
          </Button>
          <Button
            variant="contained"
            startIcon={<Icon icon={filePdfFilled} />}
            onClick={handleBackStep}
          >
            Tải định dạng PDF
          </Button>
        </Stack>
      </Box>
    </DialogStyle>
  );
}

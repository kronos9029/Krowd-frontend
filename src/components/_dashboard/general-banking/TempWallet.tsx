// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack, Grid, Button } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
import { dispatch, RootState, useSelector } from 'redux/store';
import { Wallet } from '../../../@types/krowd/wallet';

import { TextAnimate, varBounceInUp, varWrapEnter } from 'components/animate';
import { motion } from 'framer-motion';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  backgroundSize: 'cover',
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  color: 'white',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

// ----------------------------------------------------------------------

const RootStyleContainer = styled(motion.div)(({ theme }) => ({
  backgroundPosition: 'center',
  width: '100%',
  backgroundSize: 'cover',
  position: 'relative',
  backgroundRepeat: 'no-repeat',
  backgroundColor: theme.palette.primary.main,
  flexDirection: 'column',
  justifyContent: 'space-between'
}));
export default function TempWallet({ wallet }: { wallet: Wallet }) {
  const { isLoading, walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;

  return (
    <RootStyleContainer initial="initial" animate="animate" variants={varWrapEnter}>
      {listOfInvestorWallet &&
        listOfInvestorWallet.length > 0 &&
        listOfInvestorWallet.slice(0, 1).map((e, i) => (
          <RootStyle key={i}>
            <Stack spacing={1} sx={{ p: 3 }}>
              <Typography sx={{ typography: 'h6' }}>{e.walletType.name}</Typography>
              <Typography>
                <TextAnimate
                  text={fCurrency(e.balance)}
                  sx={{ typography: 'h3' }}
                  variants={varBounceInUp}
                />
              </Typography>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                  {/* &nbsp;Chưa cập nhật */}
                </Typography>
                <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                  &nbsp; Ví dùng để lưu số dư nạp và rút tiền của bạn trong Krowd
                </Typography>
              </Stack>
            </Stack>
          </RootStyle>
        ))}
    </RootStyleContainer>
  );
}

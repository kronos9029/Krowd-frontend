import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import diagonalArrowLeftDownFill from '@iconify/icons-eva/diagonal-arrow-left-down-fill';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
//
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import { Wallet } from '../../../@types/krowd/wallet';
import { getWalletList } from 'redux/slices/krowd_slices/wallet';
import { TextAnimate, varBounceInUp, varWrapEnter } from 'components/animate';
import { motion } from 'framer-motion';

// ----------------------------------------------------------------------

// const RootStyle = styled(Card)(({ theme }) => ({
//   width: '100%',
//   boxShadow: 'none',
//   position: 'relative',
//   backgroundColor: '#ff9b26e0',
//   color: 'white',
//   padding: theme.spacing(3),
//   marginTop: theme.spacing(2)
// }));
const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  backgroundSize: 'cover',
  padding: theme.spacing(3),
  backgroundColor: '#d29f6370',
  display: 'flex',
  color: 'white',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));
// ----------------------------------------------------------------------

const RootStyleContainer = styled(motion.div)(({ theme }) => ({
  backgroundPosition: 'center',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#ff8900bf'
}));

export default function AdvanceWallet({ wallet }: { wallet: Wallet }) {
  const { isLoading, walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;

  const chartOptions = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    stroke: { width: 4 },
    legend: { show: false },
    grid: { show: false },
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: string) => fCurrency(seriesName),
        title: {
          formatter: () => ''
        }
      }
    },
    fill: { gradient: { opacityFrom: 0.56, opacityTo: 0.56 } }
  });

  return (
    <RootStyleContainer initial="initial" animate="animate" variants={varWrapEnter}>
      {/* {walletList.listOfInvestorWallet
        .filter((IS) => IS.type === 'I1')
        .map((e, i) => { */}
      {listOfInvestorWallet &&
        listOfInvestorWallet.length > 0 &&
        listOfInvestorWallet.slice(2, 3).map((e, i) => (
          <RootStyle key={i}>
            {/* <IconWrapperStyle>
              <Icon icon={diagonalArrowLeftDownFill} width={24} height={24} />
            </IconWrapperStyle> */}

            <Stack spacing={1} sx={{ p: 3 }}>
              <Typography sx={{ typography: 'h6' }}>{e.walletType.name}</Typography>
              <TextAnimate
                sx={{ typography: 'h4' }}
                text={fCurrency(e.balance)}
                variants={varBounceInUp}
              />{' '}
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Typography variant="body2" component="span" sx={{ opacity: 0.72, pt: 4 }}>
                  Ví dùng để chứa số dư bạn đã đầu tư vào các dự án
                </Typography>
              </Stack>
            </Stack>
          </RootStyle>
        ))}
    </RootStyleContainer>
  );
}

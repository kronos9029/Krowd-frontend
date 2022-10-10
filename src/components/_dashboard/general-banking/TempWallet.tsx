import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import diagonalArrowLeftDownFill from '@iconify/icons-eva/diagonal-arrow-left-down-fill';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Stack, Grid, Button } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
//
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useEffect } from 'react';
import { dispatch, RootState, useSelector } from 'redux/store';
import { Wallet } from '../../../@types/krowd/wallet';
import { getWalletList } from 'redux/slices/krowd_slices/wallet';
import { PATH_PAGE } from 'routes/paths';
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
  // useEffect(() => {
  //   dispatch(getWalletList());
  // }, [dispatch]);

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
        listOfInvestorWallet.slice(0, 1).map((e, i) => (
          <RootStyle key={i}>
            {/* <IconWrapperStyle>
              <Icon icon={diagonalArrowLeftDownFill} width={24} height={24} />
            </IconWrapperStyle> */}

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
                {/* <Icon
                  width={20}
                  height={20}
                  icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
                />
                <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
                  {PERCENT > 0 && '+'}
                  {fPercent(PERCENT)}
                </Typography> */}
                <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                  &nbsp;Chưa cập nhật
                </Typography>
                <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                  &nbsp; Ví dùng để đầu tư vào các dự án của KROWD
                </Typography>
              </Stack>
            </Stack>
          </RootStyle>
        ))}
    </RootStyleContainer>
  );
}

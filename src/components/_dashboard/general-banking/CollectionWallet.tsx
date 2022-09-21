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

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none',
  position: 'relative',
  color: theme.palette.primary.darker,
  backgroundColor: '#97eef9'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(3),
  right: theme.spacing(3),
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main
}));

// ----------------------------------------------------------------------

const TOTAL = 1876500000;
const PERCENT = 2.6;
const CHART_DATA = [{ data: [0] }];

export default function CollectionWallet({ wallet }: { wallet: Wallet }) {
  useEffect(() => {
    dispatch(getWalletList());
  }, [dispatch]);

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
    <>
      {/* {walletList.listOfInvestorWallet
        .filter((IS) => IS.type === 'I1')
        .map((e, i) => { */}
      {listOfInvestorWallet &&
        listOfInvestorWallet.length > 0 &&
        listOfInvestorWallet.slice(4, 5).map((e, i) => (
          <RootStyle key={i}>
            {/* <IconWrapperStyle>
              <Icon icon={diagonalArrowLeftDownFill} width={24} height={24} />
            </IconWrapperStyle> */}

            <Stack spacing={1} sx={{ p: 3 }}>
              <Typography sx={{ typography: 'subtitle2' }}>{e.walletType.name}</Typography>
              <Typography sx={{ typography: 'h3' }}>{fCurrency(e.balance)}</Typography>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Icon
                  width={20}
                  height={20}
                  icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
                />
                <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
                  {PERCENT > 0 && '+'}
                  {fPercent(PERCENT)}
                </Typography>
                <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                  &nbsp;Chưa cập nhật
                </Typography>
              </Stack>
            </Stack>
          </RootStyle>
        ))}
    </>
  );
}

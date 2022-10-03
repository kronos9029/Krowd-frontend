import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import diagonalArrowRightUpFill from '@iconify/icons-eva/diagonal-arrow-right-up-fill';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Button, Box, Grid } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
//
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useEffect } from 'react';
import { getWalletByID, getWalletList } from 'redux/slices/krowd_slices/wallet';
import { dispatch, RootState, useSelector } from 'redux/store';
import { Wallet } from '../../../@types/krowd/wallet';
import { PATH_PAGE } from 'routes/paths';
import refresh from '@iconify/icons-eva/refresh-fill';

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
  marginBottom: theme.spacing(2),
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

// ----------------------------------------------------------------------

type Package = {
  id: string;
};
export default function SharedInvestmentWallet({ wallet }: { wallet: Wallet }) {
  const theme = useTheme();
  const { isLoading, walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;
  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.warning.main],
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
  const handleClickRefeshBalance = async (v: Package) => {
    dispatch(getWalletByID(v.id));
  };
  return (
    <>
      {listOfInvestorWallet &&
        listOfInvestorWallet.length > 0 &&
        listOfInvestorWallet.slice(1, 2).map((e, i) => (
          <RootStyle key={i}>
            {/* <IconWrapperStyle>
              <Icon icon={diagonalArrowRightUpFill} width={24} height={24} />
            </IconWrapperStyle> */}

            <Stack spacing={1} sx={{ p: 3 }}>
              <Grid container display={'flex'}>
                <Grid lg={8}>
                  <Typography sx={{ typography: 'h6' }}>{e.walletType.name}</Typography>
                </Grid>
                <Grid>
                  <Button
                    sx={{
                      display: 'flex',
                      border: '1px solid white'
                    }}
                    variant="contained"
                    onClick={() => handleClickRefeshBalance(e)}
                  >
                    <Icon icon={refresh} />
                    <Typography sx={{ typography: 'subtitle2', gap: 1, pl: 1 }}>
                      Cập nhật số dư
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid lg={8}>
                  <Typography sx={{ typography: 'h3' }}>{fCurrency(e.balance)}</Typography>
                </Grid>
                <Grid sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    href={PATH_PAGE.pageTopUp}
                    target="_blank"
                    sx={{
                      display: 'flex',
                      border: '1px solid white'
                    }}
                    variant="contained"
                  >
                    + Nạp tiền
                  </Button>
                  <Button sx={{ display: 'flex', border: '1px solid white' }} variant="contained">
                    - Rút tiền
                  </Button>
                </Grid>
              </Grid>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                {/* <Icon
                  width={20}
                  height={20}
                  icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
                /> */}

                <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
                  &nbsp;Ví dùng để đầu tư vào các dự án của KROWD
                </Typography>
              </Stack>
            </Stack>

            {/* <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={120} /> */}
          </RootStyle>
        ))}
    </>
  );
}

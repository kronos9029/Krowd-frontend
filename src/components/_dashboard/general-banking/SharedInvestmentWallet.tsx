import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import diagonalArrowRightUpFill from '@iconify/icons-eva/diagonal-arrow-right-up-fill';
// material
import { styled, useTheme } from '@mui/material/styles';
import {
  Card,
  Typography,
  Stack,
  Button,
  Box,
  Grid,
  Divider,
  DialogContentText,
  DialogTitle,
  Dialog,
  DialogContent
} from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
//
import BaseOptionChart from '../../charts/BaseOptionChart';
import { useEffect, useState } from 'react';
import { getWalletByID, getWalletList } from 'redux/slices/krowd_slices/wallet';
import { dispatch, RootState, useSelector } from 'redux/store';
import { Wallet } from '../../../@types/krowd/wallet';
import { PATH_PAGE } from 'routes/paths';
import refresh from '@iconify/icons-eva/refresh-fill';
import walletDetails from '@iconify/icons-ant-design/wallet-outlined';
import { TextAnimate, varBounceInUp, varFadeInRight, varWrapEnter } from 'components/animate';
import { motion } from 'framer-motion';
import { Container } from '@mui/system';
import user from 'redux/slices/krowd_slices/user';

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
  marginBottom: theme.spacing(3),
  flexDirection: 'column',
  justifyContent: 'space-between'
}));
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
// ----------------------------------------------------------------------

type Package = {
  id: string;
};
export default function SharedInvestmentWallet({ wallet }: { wallet: Wallet }) {
  const theme = useTheme();
  const { isLoading, walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { investorKrowdDetail: mainInvestor } = useSelector(
    (state: RootState) => state.user_InvestorStateKrowd
  );
  const { listOfInvestorWallet } = walletList;
  const [openModalShareInvest, setOpenModalShareInvest] = useState(false);

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
    setOpenModalShareInvest(true);
  };
  return (
    <RootStyleContainer initial="initial" animate="animate" variants={varWrapEnter}>
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
                    {/* <Icon icon={refresh} /> */}
                    <Typography sx={{ typography: 'subtitle2', gap: 1, pl: 1 }}>
                      Chi tiết tài khoản ví
                    </Typography>
                  </Button>
                  <Dialog fullWidth maxWidth="sm" open={openModalShareInvest}>
                    <DialogTitle sx={{ alignItems: 'center', textAlign: 'center' }}>
                      <Icon color="#14b7cc" height={60} width={60} icon={walletDetails} />
                    </DialogTitle>
                    <DialogContent>
                      <Box mt={1}>
                        <DialogContentText
                          sx={{
                            textAlign: 'center',
                            fontWeight: 900,
                            fontSize: 20,
                            color: 'black'
                          }}
                        >
                          Chi tiết tài khoản ví
                        </DialogContentText>
                      </Box>
                      <Stack spacing={{ xs: 2, md: 1 }}>
                        <Container sx={{ p: 2 }}>
                          <Divider sx={{ my: 2 }} />
                          <Card sx={{ p: 2, mb: 2 }}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: '0.5rem',
                                p: 1
                              }}
                            >
                              <Typography
                                paragraph
                                sx={{
                                  color: '#251E18',
                                  marginBottom: '0.2rem'
                                }}
                              >
                                Số dư khả dụng: <br />
                                <strong style={{ color: 'green' }}>{fCurrency(e.balance)}</strong>
                              </Typography>
                              <Typography
                                paragraph
                                sx={{
                                  color: '#251E18',
                                  marginBottom: '0.2rem'
                                }}
                              >
                                Tổng số dư <br />
                                <strong>{fCurrency(e.balance)}</strong>
                              </Typography>
                            </Box>
                          </Card>

                          <Card sx={{ p: 2 }}>
                            <Typography sx={{ mb: 2 }}>THÔNG TIN CHI TIẾT</Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                p: 1,
                                mb: 1,
                                justifyContent: 'space-between'
                              }}
                            >
                              <Typography
                                paragraph
                                sx={{
                                  color: '#251E18',

                                  marginBottom: '0.2rem'
                                }}
                              >
                                Loại tài khoản <br />
                                <strong>{e.walletType.name}</strong>
                              </Typography>
                            </Box>
                            <Divider />

                            <Box
                              sx={{
                                display: 'flex',
                                p: 1,
                                mb: 1,

                                justifyContent: 'space-between'
                              }}
                            >
                              <Typography
                                paragraph
                                sx={{
                                  color: '#251E18',
                                  marginBottom: '0.2rem'
                                }}
                              >
                                Tài khoản số điện thoại
                                <br />
                                <strong>{mainInvestor?.phoneNum}</strong>
                              </Typography>
                            </Box>
                            <Divider />

                            <Box
                              sx={{
                                display: 'flex',
                                p: 1,
                                mb: 1,

                                justifyContent: 'space-between'
                              }}
                            >
                              <Typography
                                paragraph
                                sx={{
                                  color: '#251E18',
                                  marginBottom: '0.2rem'
                                }}
                              >
                                Ngày mở tài khoản <br />
                                <strong>{e.createDate}</strong>
                              </Typography>
                            </Box>
                          </Card>
                          <Box my={2} p={2}>
                            <Typography>Ví dùng để đầu tư vào các dự án của KROWD</Typography>
                          </Box>
                        </Container>
                      </Stack>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Box>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpenModalShareInvest(false)}
                          >
                            Đóng
                          </Button>
                        </Box>
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
                      </Box>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
              <Grid container>
                <Grid lg={8}>
                  <Typography>
                    <TextAnimate
                      text={fCurrency(e.balance)}
                      sx={{ typography: 'h3' }}
                      variants={varBounceInUp}
                    />
                  </Typography>
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
    </RootStyleContainer>
  );
}

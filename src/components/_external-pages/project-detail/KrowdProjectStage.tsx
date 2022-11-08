import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField, Typography, Divider, Grid } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { Project1 } from '../../../@types/krowd/project';

import { styled } from '@mui/system';
import { fCurrencyChart } from 'utils/formatNumber';

// ----------------------------------------------------------------------
const NavbarTopAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-100px',
  visibility: 'hidden'
}));
const NavbarBottomAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '10px',
  visibility: 'hidden'
}));
const NavbarTopClickAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-140px',
  visibility: 'hidden'
}));
type AboutListProps = {
  project: Project1;
  nav: string;
};
export default function KrowdProjectStage({ project, nav }: AboutListProps) {
  const [seriesData, setSeriesData] = useState('Biểu đồ số tiền doanh thu từng kỳ');

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(String(event.target.value));
  };
  const { listOfChartStage } = useSelector((state: RootState) => state.stage);
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: []
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${fCurrencyChart(y.toFixed(0))}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <>
      <NavbarTopAnchor id={`__navbarTop_${nav}`}></NavbarTopAnchor>

      <Typography textAlign="center" py={1} color={'#666'} variant="h4">
        Biểu đồ của dự án
      </Typography>
      <Box mx="auto" width={'10%'}>
        <NavbarTopClickAnchor id={`__navbarTopClick_${nav}`}></NavbarTopClickAnchor>
        <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
      </Box>
      <Grid container>
        <Grid lg={2}></Grid>
        <Grid lg={8}>
          <Card style={{ marginTop: 20, marginBottom: 40, maxWidth: 'md' }}>
            <CardHeader
              title="Thống kê tăng trưởng"
              action={
                <TextField
                  select
                  fullWidth
                  value={seriesData}
                  SelectProps={{ native: true }}
                  onChange={handleChangeSeriesData}
                  sx={{
                    '& fieldset': { border: '0 !important' },
                    '& select': {
                      pl: 1,
                      py: 0.5,
                      pr: '24px !important',
                      typography: 'subtitle2'
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0.75,
                      bgcolor: 'background.neutral'
                    },
                    '& .MuiNativeSelect-icon': {
                      top: 4,
                      right: 0,
                      width: 20,
                      height: 20
                    }
                  }}
                >
                  {listOfChartStage &&
                    listOfChartStage.length > 0 &&
                    listOfChartStage.map((option) => (
                      <option key={option.chartName} value={option.chartName}>
                        {option.chartName}
                      </option>
                    ))}
                </TextField>
              }
            />
            {listOfChartStage &&
              listOfChartStage.length > 0 &&
              listOfChartStage.map((item) => (
                <Box key={item.chartName} sx={{ mt: 3, mx: 3 }} dir="ltr">
                  {item.chartName === seriesData && (
                    <ReactApexChart
                      type="bar"
                      series={item.lineList}
                      options={chartOptions}
                      height={364}
                    />
                  )}
                </Box>
              ))}
          </Card>
          <Typography variant="body2">
            * Số hiển thị ngang tương ứng với các kỳ của dụ án
          </Typography>
          <Typography sx={{ my: 2 }} variant="body2">
            * Đơn vị doanh thu VND và tỉ lệ sẽ là phần trăm (%)
          </Typography>
          <Typography sx={{ my: 2 }} variant="body2">
            * Số liệu chỉ mang tính chất tham khảo
          </Typography>
        </Grid>
        <Grid lg={2}></Grid>
      </Grid>
    </>
  );
}

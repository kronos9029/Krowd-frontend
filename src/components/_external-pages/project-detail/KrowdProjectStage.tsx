import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField, Typography, Divider, Grid } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { dispatch, RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { Project1 } from '../../../@types/krowd/project';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'routes/paths';
import { styled } from '@mui/system';

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
  nav: (string | null)[];
};
export default function KrowdProjectStage({ project, nav }: AboutListProps) {
  const [seriesData, setSeriesData] = useState('Biểu đồ số tiền doanh thu từng kỳ');

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(String(event.target.value));
  };
  const { listOfChartStage } = useSelector((state: RootState) => state.stage);
  const aboutNav = nav.find((value) => value === 'Biểu đồ của dự án');
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [
        'Kỳ 1',
        'Kỳ 2',
        'Kỳ 3',
        'Kỳ 4',
        'Kỳ 5',
        'Kỳ 6',
        'Kỳ 7',
        'Kỳ 8',
        'Kỳ 9',
        'Kỳ 10',
        'Kỳ 11',
        'Kỳ 12',
        'Kỳ 13',
        'Kỳ 14',
        'Kỳ 15',
        'Kỳ 16',
        'Kỳ 17',
        'Kỳ 18',
        'Kỳ 19',
        'Kỳ 20',
        'Kỳ 21',
        'Kỳ 22',
        'Kỳ 23',
        'Kỳ 24',
        'Kỳ 25'
      ]
    }
  });

  return (
    <>
      <NavbarTopAnchor id={`__navbarTop_${aboutNav}`}></NavbarTopAnchor>

      <Typography textAlign="center" py={1} color={'#666'} variant="h4">
        Biểu đồ của dự án
      </Typography>
      <Box mx="auto" width={'10%'}>
        <NavbarTopClickAnchor id={`__navbarTopClick_${aboutNav}`}></NavbarTopClickAnchor>
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
                      type="line"
                      series={item.lineList}
                      options={chartOptions}
                      height={364}
                    />
                  )}
                </Box>
              ))}
          </Card>
          <Typography variant="body2">* Số liệu chỉ mang tính chất tham khảo</Typography>
        </Grid>
        <Grid lg={2}></Grid>
      </Grid>
    </>
  );
}

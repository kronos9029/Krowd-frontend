import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { fCurrency } from 'utils/formatNumber';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Dự án A',
    type: 'line',
    data: [23000000000, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  },
  {
    name: 'Dự án B',
    type: 'line',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  {
    name: 'Dự án C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

export default function AnalyticsWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 3, 3] },
    plotOptions: { bar: { columnWidth: '14%' } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: [
      '01/01/2022',
      '02/01/2022',
      '03/01/2022',
      '04/01/2022',
      '05/01/2022',
      '06/01/2022',
      '07/01/2022',
      '08/01/2022',
      '09/01/2022',
      '10/01/2022',
      '11/01/2022'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${fCurrency(y.toFixed(0))} đầu tư`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Số người tham gia dự án" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

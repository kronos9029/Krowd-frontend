// material
import { Typography, Grid, Button } from '@mui/material';
//
import { Link as RouterLink } from 'react-router-dom';
import mockData from 'utils/mock-data';
// ----------------------------------------------------------------------
const MOCK_NUMBER = [...Array(1)].map((_, index) => ({
  id: mockData.id(index),
  hook1: mockData.contentDB.hook1(index),
  data0: mockData.contentDB.data0(index),
  data1: mockData.contentDB.data1(index),
  data2: mockData.contentDB.data2(index)
}));
export default function ComponentMaterialUI() {
  return (
    <Grid container spacing={3} sx={{ mb: 10 }}>
      <Grid item xs={12} sm={7}>
        <Typography variant="body1" sx={{ color: 'text.black' }}>
          <h1>True Made Foods</h1>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          by Aakash Sundar | Dec 1, 2021 | Investing 101, Research | 0 comments
        </Typography>
        <Typography style={{ paddingTop: '2rem' }} variant="h5" paragraph>
          <img src="static/components/Hot-Bussiness2.png" />
        </Typography>
      </Grid>
      <Grid item xs={12} sm={5}>
        {MOCK_NUMBER.map((contentDB) => (
          <Grid key="1" container spacing={1}>
            <Typography style={{ paddingTop: '7rem' }} variant="body1" sx={{ color: 'black' }}>
              {contentDB.hook1}
            </Typography>
            <Typography style={{ paddingTop: '2rem' }} variant="body1" sx={{ color: 'black' }}>
              {contentDB.data0} người đầu tư <br />
            </Typography>
            <Typography style={{ paddingTop: '2rem' }} variant="body1" sx={{ color: 'black' }}>
              {contentDB.data1}
            </Typography>
            <br />
            <Typography style={{ paddingTop: '2rem' }} variant="body1" sx={{ color: 'black' }}>
              {contentDB.data2}
            </Typography>
            <br />
          </Grid>
        ))}
        <Button
          style={{ marginTop: '2rem' }}
          to="/"
          size="large"
          variant="contained"
          component={RouterLink}
        >
          Go to Home
        </Button>
      </Grid>
    </Grid>
  );
}

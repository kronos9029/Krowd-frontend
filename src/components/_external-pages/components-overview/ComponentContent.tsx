// material
import { Typography, Grid } from '@mui/material';
import mockData from '../../../utils/mock-data';
//
// ----------------------------------------------------------------------

const MOCK_TOPIC = [...Array(1)].map((_, index) => ({
  id: mockData.id(index),
  hook: mockData.content.hook(index),
  sentence0: mockData.content.sentence1(index),
  sentence1: mockData.content.sentence1(index),
  sentence2: mockData.content.sentence2(index)
}));
export default function ComponentContent() {
  return (
    <Grid container spacing={3} sx={{ mb: 10 }}>
      {MOCK_TOPIC.map((content) => (
        <Grid key="1" item xs={12} sm={12}>
          <Typography style={{ paddingTop: '2rem' }}> {content.hook} </Typography>
          <Typography style={{ paddingTop: '2rem' }}> {content.sentence0} </Typography>
          <Typography style={{ paddingTop: '2rem' }}> {content.sentence1} </Typography>
          <Typography style={{ paddingTop: '2rem' }}> {content.sentence2} </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

import { Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getProjectListById } from 'redux/slices/krowd_slices/project';
import { dispatch } from 'redux/store';
import { PATH_DETAILS } from 'routes/paths';
import { Field } from '../@types/krowd/fields';
const handleGetProjectById = (activeProjectId: string) => {
  dispatch(getProjectListById(activeProjectId));
};
function FieldCard({ row }: { row: Field }) {
  return (
    <Grid sx={{ p: 1 }} item key={row.id} xs={2} sm={2} md={2} lg={2} container>
      <Link
        onClick={() => handleGetProjectById(row.id)}
        to={PATH_DETAILS}
        style={{ textDecoration: 'none', color: '#595f66' }}
      >
        <Typography sx={{ '&:hover': { color: 'blue' } }} variant="subtitle2">
          {row.name}
        </Typography>
      </Link>
    </Grid>
  );
}
export default FieldCard;

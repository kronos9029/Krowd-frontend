import { Box, Chip, Typography } from '@mui/material';
import { MHidden } from 'components/@material-extend';
import { Project1 } from '../../../@types/krowd/project';

function ProjectDetailHeading({ p }: { p: Project1 }) {
  return (
    <>
      <Box my={2} pt={'6rem'} sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Typography>
          <img style={{ width: '80px' }} src={p.business.image} />
        </Typography>
        <Typography variant="h2">{p.name}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body2" color={'#9E9E9E'}>
          {p.description}
        </Typography>
      </Box>
      <Box my={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Chip
            label={<Typography variant="overline">{p.field.name}</Typography>}
            variant="filled"
            sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
          />
          <MHidden width="smDown">
            <Chip
              label={<Typography variant="overline">{p.field.description}</Typography>}
              variant="filled"
              sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
            />
          </MHidden>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Chip
            label={<Typography variant="overline">{p.status}</Typography>}
            variant="filled"
            sx={{
              borderRadius: '3px',
              color: '#ffffff'
            }}
          />
        </Box>
      </Box>
    </>
  );
}
export default ProjectDetailHeading;

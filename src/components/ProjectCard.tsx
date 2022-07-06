import { Grid, CardMedia, Box, Typography, Card, alpha } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { MotionInView, varFadeInUp } from 'components/animate';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjectId } from 'redux/slices/krowd_slices/project';
import { dispatch } from 'redux/store';
import { PATH_DETAILS } from 'routes/paths';
import { fCurrency } from 'utils/formatNumber';
import { Project } from '../@types/krowd/project';

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
    minHeight: 300,
    margin: 'auto',
    textAlign: 'left',

    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.2)}`,
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8',
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.15)}`
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.1)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.05)}`
        }
      }
    }
  };
});
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#14B7CC'
  }
}));

function ProjectCard({ row }: { row: Project }) {
  console.log('gggg');
  const handleGetProjectById = (activeProjectId: string) => {
    dispatch(getProjectId(activeProjectId));
  };
  return (
    <Grid item key={row.id} xs={12} sm={6} md={6} lg={4}>
      <MotionInView variants={varFadeInUp}>
        <Link
          onClick={() => handleGetProjectById(row.id)}
          to={PATH_DETAILS}
          style={{ textDecoration: 'none' }}
        >
          <CardStyle
            sx={{
              width: 360,
              maxHeight: 500,
              height: 480,
              '&:hover': { opacity: 0.9 }
            }}
          >
            <Card
              sx={{
                minWidth: 50,
                minHeight: 50,
                boxShadow: '40px 40px 80px 0 20%',
                position: 'absolute',
                top: '42%',
                left: '5%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img style={{ width: '4em' }} src={row.business.image} />
            </Card>
            <CardMedia
              style={{
                display: 'center'
              }}
              component="img"
              height={240}
              src={row.image}
            />

            <Box px={3}>
              <Box minHeight={'9em'}>
                <Typography
                  sx={{
                    // color: isLight ? '#14B7CC' : 'white',
                    overflow: 'hidden',
                    paddingTop: '1.8rem'
                  }}
                  variant="subtitle1"
                >
                  {row.name}
                </Typography>
                <Typography
                  style={{ textAlign: 'left' }}
                  sx={{
                    color: '#251E18',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3
                  }}
                  variant="body2"
                >
                  {row.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.5rem'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Đã đầu tư</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Mục tiêu</strong>
                </Typography>
              </Box>
              <BorderLinearProgress
                variant="determinate"
                value={(row.investedCapital / row.investmentTargetCapital) * 100}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.2rem'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#14B7CC'
                  }}
                >
                  <strong>{fCurrency(row.investedCapital)}</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#FF7F56'
                  }}
                >
                  <strong>{fCurrency(row.investmentTargetCapital)}</strong>
                </Typography>
              </Box>
            </Box>
          </CardStyle>
        </Link>
      </MotionInView>
    </Grid>
  );
}
export default ProjectCard;

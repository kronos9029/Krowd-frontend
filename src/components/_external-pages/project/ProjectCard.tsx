import {
  Grid,
  CardMedia,
  Box,
  Container,
  Typography,
  CardActionArea,
  Card,
  alpha,
  Chip
} from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { MotionInView, varFadeInUp } from 'components/animate';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjectId } from 'redux/slices/krowd_slices/project';
import { dispatch } from 'redux/store';
import { PATH_DETAILS } from 'routes/paths';
import { fCurrency } from 'utils/formatNumber';
import { Project1 } from '../../../@types/krowd/project';
import CheckIcon from '@mui/icons-material/Check';
const ACTIVE_STATUS = 4;
const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
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

function ProjectCard({ row }: { row: Project1 }) {
  const [isHover, setIsHover] = useState(false);
  const handleGetProjectById = (activeProjectId: string) => {
    dispatch(getProjectId(activeProjectId, 'ADMIN'));
  };
  return (
    <Grid sx={{ p: 2 }} item key={row.id} xs={12} sm={12} md={6} lg={4}>
      <MotionInView variants={varFadeInUp}>
        <Link
          onClick={() => handleGetProjectById(row.id)}
          to={PATH_DETAILS}
          style={{ textDecoration: 'none' }}
        >
          <CardStyle
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            sx={{
              width: 360,
              maxHeight: 500,
              height: 500
              // '&:hover': { opacity: 0.9 }
            }}
          >
            <CardActionArea>
              <Card
                sx={{
                  minWidth: 50,
                  minHeight: 50,
                  boxShadow: '40px 40px 80px 0 20%',
                  position: 'absolute',
                  top: isHover ? '39%' : '42%',
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
              {/* <Box sx={{ position: 'absolute', top: '1%', right: '1%' }}>
                <Chip
                  label={
                    <>
                      {row.status === 4 ? (
                        <CheckIcon sx={{ fontSize: '16px', color: '#ffffff' }} />
                      ) : undefined}
                      <Typography variant="overline" fontSize={11} ml={row.status === 4 ? 1 : 0}>
                        {ProjectStatus[row.status].statusString}
                      </Typography>
                    </>
                  }
                  variant="filled"
                  sx={{
                    borderRadius: '3px',
                    backgroundColor: `${ProjectStatus[row.status].color}`,
                    color: '#ffffff'
                  }}
                />
              </Box> */}
              <Box px={3}>
                <Box minHeight={'10em'}>
                  <Typography
                    sx={{
                      color: 'text.primary',
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
                      WebkitLineClamp: 5
                    }}
                    variant="body2"
                  >
                    {row.description}
                  </Typography>
                </Box>
                <Box mt={isHover ? 3 : 2}>
                  <Box sx={{ display: !isHover ? 'block' : 'none' }}>
                    <Box>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{
                          color: 'text.disabled',
                          marginBottom: '0.3rem'
                        }}
                      >
                        {row.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Chip
                        label={<Typography variant="caption">{row.field.name}</Typography>}
                        variant="filled"
                        sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
                      />
                      <Chip
                        label={<Typography variant="caption">{row.field.description}</Typography>}
                        variant="filled"
                        sx={{ ml: 1, borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: isHover ? 'block' : 'none' }}>
                    <Box
                      sx={{
                        display: 'flex',
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
                </Box>
              </Box>
            </CardActionArea>
          </CardStyle>
        </Link>
      </MotionInView>
    </Grid>
  );
}
export default ProjectCard;
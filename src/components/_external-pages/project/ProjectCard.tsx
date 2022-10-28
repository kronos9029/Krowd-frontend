import {
  Grid,
  CardMedia,
  Box,
  Typography,
  CardActionArea,
  Card,
  alpha,
  Chip,
  Link
} from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { MotionInView, varFadeInUp } from 'components/animate';
import { useState } from 'react';
import { getProjectListById } from 'redux/slices/krowd_slices/project';
import { dispatch } from 'redux/store';
import { PATH_PAGE } from 'routes/paths';
import { fCurrency } from 'utils/formatNumber';
import { ALL_Project } from '../../../@types/krowd/project';
//language
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 390,
    margin: 'auto',
    textAlign: 'left',
    marginBottom: theme.spacing(5),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.2)}`,
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8',
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.15)}`
    },
    [theme.breakpoints.up('xs')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8'
    }
    // '&.cardCenter': {
    //   [theme.breakpoints.up('md')]: {
    //     marginTop: -80,
    //     backgroundColor: theme.palette.background.paper,
    //     boxShadow: `-40px 40px 80px 0 ${shadowCard(0.1)}`,
    //     '&:before': {
    //       top: 0,
    //       left: 0,
    //       right: 0,
    //       bottom: 0,
    //       zIndex: -1,
    //       content: "''",
    //       margin: 'auto',
    //       position: 'absolute',
    //       width: 'calc(100% - 40px)',
    //       height: 'calc(100% - 40px)',
    //       borderRadius: theme.shape.borderRadiusMd,
    //       backgroundColor: theme.palette.background.paper,
    //       boxShadow: `-20px 20px 40px 0 ${shadowCard(0.05)}`
    //     }
    //   }
    // }
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
const Language = [
  {
    code: 'vi',
    name: 'English',
    countryCode: 'vi'
  },
  {
    code: 'en',
    name: 'Vietnamese',
    countryCode: 'en'
  }
];
function ProjectCard({ row }: { row: ALL_Project }) {
  const [isHover, setIsHover] = useState(false);
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  return (
    <Grid sx={{ p: 2 }} item key={row.id} xs={12} sm={12} md={6} lg={4}>
      <MotionInView variants={varFadeInUp}>
        <Link href={`${PATH_PAGE.details}/${row.id}`} style={{ textDecoration: 'none' }}>
          <CardStyle
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            sx={{
              width: 360,
              maxHeight: 500,
              height: 500
            }}
          >
            <CardActionArea>
              <Card
                sx={{
                  minWidth: 50,
                  minHeight: 50,
                  boxShadow: '20px 40px 80px 0 20%',
                  position: 'absolute',
                  top: isHover ? '39%' : '42%',
                  left: '5%',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img style={{ width: '4em' }} src={row.businessImage} />
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
                <Box minHeight={'10em'}>
                  <Typography
                    sx={{
                      color: 'text.primary',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
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
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 1,
                          marginBottom: '0.3rem'
                        }}
                      >
                        {row.address.length > 40
                          ? `${row.address.substring(0, 40)}...`
                          : row.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Chip
                        label={<Typography variant="caption">{row.fieldName}</Typography>}
                        variant="filled"
                        sx={{ borderRadius: '3px', color: 'rgba(0,0,0,0.6)' }}
                      />
                      <Chip
                        label={<Typography variant="caption">{row.fieldDescription}</Typography>}
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
                        <strong>{t(`Invested`)}</strong>
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          color: '#251E18',
                          marginBottom: '0.2rem'
                        }}
                      >
                        <strong>{t(`InvestCapital`)}</strong>
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

// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
  Button,
  TabScrollButton
} from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { PATH_DETAILS } from 'routes/paths';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { fCurrency } from 'utils/formatNumber';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(11),
    backgroundColor: '#f4f6f8'
  }
}));

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
    padding: theme.spacing(0, 3, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: '#f4f6f8',
      boxShadow: `-20px 20px 40px 0 ${shadowCard(0.35)}`
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
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
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#FF7F50' : '#af4cab'
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
const HotProject = [
  {
    image: '/static/components/Hot-Bussiness-KFC.png',
    businessName: 'KFC – Gà rán Kentuckey',
    description: `Với vị trí dự án nằm ở trung tâm quận 1 thu hút một 
                  số lượng khách ưa chuộng đồ ăn nhanh. 
                  Đây hứa hẹn sẽ là dự án nóng cho các nhà đầu tư có niềm đam mê về ăn uống.`,
    investedBudget: 83000000,
    totalBudget: 100000000
  },
  {
    image: '/static/components/Hot-Bussiness-Burger.png',
    businessName: 'Burger King',
    description: `Với hơn 11.000 nhà hàng trên khắp thế giới và tại hơn 60 quốc gia, sự tăng trưởng
                  ấn tượng của Burger King phụ thuộc nhiều hơn vào các đối tác nhượng quyền của nó.
                  Và đó là lý do chính khiến họ tiếp tục tìm kiếm và sáng tạo thêm. Cơ hội nhượng
                  quyền trên toàn thế giới, ngay cả ở những thị trường lớn nơi nhà hàng Burger King
                  đã hoàn toàn thành danh.`,
    investedBudget: 83000000,
    totalBudget: 100000000
  },
  {
    image: '/static/components/Hot-Bussiness2.png',
    businessName: 'Dairy Queen',
    description: `Dairy Queen, thường được gọi là “DQ”, là một chuỗi cửa hàng đồ ăn nhanh và kem
                  mềm, mở cửa hàng đầu tiên tại Joliet, Illinois vào năm 1940. Hệ thống Dairy Queen
                  đã phát triển hơn 6.600 địa điểm tại Hoa Kỳ và Canada, trong đó có hơn 2.200 địa
                  điểm tại 22 quốc gia. Công ty dành hai địa điểm làm cửa hàng của công ty. Trong
                  tám năm qua, tổng số cửa hàng của nó tăng trưởng chậm nhưng đều đặn, thêm hơn 300
                  đơn vị trong ba năm qua.`,
    investedBudget: 83000000,
    totalBudget: 100000000
  }
];

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  return (
    <RootStyle
      sx={{
        // color: isLight ? 'white' : 'text.primary',
        // backgroundColor: bgLight ? '#14B7CC' : '#14B7CC',
        paddingBottom: '5rem'
      }}
    >
      <Box sx={{ mb: { xs: 10, md: 10, textAlign: 'center', paddingTop: '3rem' } }}>
        <Typography variant="h4" sx={{ mb: 3, color: isLight ? '#14B7CC' : '#FF7F50' }}>
          {t('highlight_project')}
        </Typography>
        <Typography variant="h3" sx={{ mb: 3, color: isLight ? '#251E18' : 'black' }}>
          {t('highlight_project_description')}
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={isDesktop ? 10 : 5}>
          {Array.from(HotProject).map((value) => (
            <Grid key={value.businessName} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle sx={{ maxWidth: 345, maxHeight: 500, height: '500px' }}>
                  <CardMedia
                    style={{ paddingTop: '2rem' }}
                    component="img"
                    height="194"
                    image={value.image}
                  />
                  {/*<Typography
                  style={{
                    color: '#14B7CC',
                    textAlign: 'center',
                    paddingTop: '1rem',
                    fontWeight: 700
                  }}
                  paragraph
                >
                </Typography>*/}
                  <Typography
                    sx={{
                      color: isLight ? '#14B7CC' : 'white',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      paddingTop: '18px',
                      textAlign: 'center'
                    }}
                    variant="h5"
                    paragraph
                  >
                    {value.businessName}
                  </Typography>
                  <Typography
                    style={{ textAlign: 'left' }}
                    sx={{
                      color: isLight ? '#251E18' : 'black',
                      textOverflow: 'ellipsis',
                      // whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 4
                    }}
                  >
                    {/* Thẩm mỹ viện uy tin 100% với chất lượng các y bác sĩ hàng đầu Việt Nam cùng nhiều
                  bác sĩ được mời từ các quốc gia chuyên về thẩm mỹ */}
                    {value.description}
                  </Typography>
                  <BorderLinearProgress
                    sx={{ marginTop: '18px' }}
                    variant="determinate"
                    value={83}
                  />
                  <Typography
                    paragraph
                    sx={{
                      color: isLight ? '#251E18' : 'black',
                      paddingTop: '18px',
                      textAlign: 'center'
                    }}
                  >
                    <strong> {fCurrency(value.investedBudget)} </strong> trên{' '}
                    <strong> {fCurrency(value.totalBudget)} </strong>
                  </Typography>
                  <Button
                    style={{
                      color: '#14B7CC',
                      display: 'flex',
                      float: 'right'
                    }}
                    href={PATH_DETAILS}
                  >
                    {t('button_click')}
                  </Button>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}

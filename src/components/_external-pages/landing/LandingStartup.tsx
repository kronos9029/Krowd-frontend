// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography, useMediaQuery, Button } from '@mui/material';
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
// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 13,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#63C1E3' : '#af4cab'
    }
  }));
  const currentLanguageCode = cookies.get('i18next') || 'vi';
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
        <Typography variant="h4" sx={{ mb: 3, color: isLight ? '#14B7CC' : '#008dff' }}>
          {t('highlight_project')}
        </Typography>
        <Typography variant="h3" sx={{ mb: 3, color: isLight ? '#251E18' : 'black' }}>
          {t('highlight_project_description')}
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={isDesktop ? 10 : 5}>
          {/* <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem', borderRadius: '40px 42px 1rem 1rem' }}
                  component="img"
                  height="194"
                  image="/static/components/Hot-Bussiness2.png"
                />
                <Typography
                  style={{
                    color: '#14B7CC',
                    textAlign: 'center',
                    paddingTop: '1rem',
                    fontWeight: 700
                  }}
                  paragraph
                >
                  Thực phẩm True Made
                </Typography>
                <Typography
                  sx={{
                    color: isLight ? '#14B7CC' : 'white',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
paddingTop: '1rem',
                    textAlign: 'center'
                  }}
                  variant="h5"
                  paragraph
                >
                  True Made Foods
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
                    WebkitLineClamp: 6
                  }}
                >
                  Hiện tại, chúng tôi cung cấp một dòng tương cà chua ngọt từ rau, nước sốt BBQ kiểu
                  vùng, sriracha, mù tạt và nước sốt nóng, được chứng nhận Whole30 và palo. Chúng
                  được chứng nhận Whole30 và palo được phê duyệt keto, thuần chay, không biến đổi
                  gen và không chứa gluten. Chúng tôi cắt giảm đường, nhưng vẫn giữ nguyên hương vị.
                  Công thức nấu ăn của chúng tôi tôn vinh các công thức nấu ăn gia đình sử dụng các
                  loại rau củ và chúng tôi không bao giờ sử dụng chất làm ngọt nhân tạo hoặc tinh
                  chế.
                </Typography>
                <BorderLinearProgress variant="determinate" value={50} />
                <Typography
                  paragraph
                  sx={{
                    color: isLight ? '#251E18' : 'black',
                    paddingTop: '1rem'
                  }}
                >
                  <strong> 83,000,000 </strong> trên <strong> 100,000,000 </strong> 
                </Typography>
                <Button
                  style={{
                    color: '#FF7F50',
                    display: 'flex',
                    float: 'right'
                  }}
                  href={PATH_DETAILS}
                >
                  {t('button_click')}
                </Button>
              </CardStyle>
            </MotionInView>
          </Grid> */}
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem', borderRadius: '40px 42px 1rem 1rem' }}
                  component="img"
                  height="194"
                  image="/static/components/Hot-Bussiness-KFC.png"
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
                    paddingTop: '1rem',
                    textAlign: 'center'
                  }}
                  variant="h5"
                  paragraph
                >
                  KFC – Gà rán Kentuckey
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
                    WebkitLineClamp: 6
                  }}
                >
                  {/* Thẩm mỹ viện uy tin 100% với chất lượng các y bác sĩ hàng đầu Việt Nam cùng nhiều
                  bác sĩ được mời từ các quốc gia chuyên về thẩm mỹ */}
                  Gà rán Kentucky được biết đến trên toàn thế giới. các thương mại nhượng quyền KFC
                  hoạt động tại khoảng 123 quốc gia. Nhà hàng chuyên phục vụ thức ăn nhanh và các
                  món gà khác nhau. Thương hiệu mang đến cơ hội kinh doanh tuyệt với cho các doanh
                  nhân. Sở hữu một thương hiệu nhượng quyền nhà hàng thức ăn nhanh KFC rất dễ dàng
                  vì sự đào tạo và hỗ trợ của đội ngũ thương hiệu. Bạn khởi động một doanh nghiệp
                  với một cái tên được nhiều khách hàng biết đến.
                </Typography>
                <BorderLinearProgress variant="determinate" value={83} />
                <Typography
                  paragraph
                  sx={{
                    color: isLight ? '#251E18' : 'black',
                    paddingTop: '1rem'
                  }}
                >
                  <strong> 83,000,000 </strong> trên <strong> 100,000,000 </strong>
                </Typography>
                <Button
                  style={{
                    color: '#FF7F50',
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
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem', borderRadius: '40px 42px 1rem 1rem' }}
                  component="img"
                  height="194"
                  image="/static/components/Hot-Bussiness-Burger.png"
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
                    paddingTop: '1rem',
                    textAlign: 'center'
                  }}
                  variant="h5"
                  paragraph
                >
                  Burger King
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
                    WebkitLineClamp: 6
                  }}
                >
                  Với hơn 11.000 nhà hàng trên khắp thế giới và tại hơn 60 quốc gia, sự tăng trưởng
                  ấn tượng của Burger King phụ thuộc nhiều hơn vào các đối tác nhượng quyền của nó.
                  Và đó là lý do chính khiến họ tiếp tục tìm kiếm và sáng tạo thêm. Cơ hội nhượng
                  quyền trên toàn thế giới, ngay cả ở những thị trường lớn nơi nhà hàng Burger King
                  đã hoàn toàn thành danh.
                </Typography>
                <BorderLinearProgress variant="determinate" value={83} />
                <Typography
                  paragraph
                  sx={{
                    color: isLight ? '#251E18' : 'black',
                    paddingTop: '1rem'
                  }}
                >
                  <strong> 83,000,000 </strong> trên <strong> 100,000,000 </strong>
                </Typography>
                <Button
                  style={{
                    color: '#FF7F50',
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
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem', borderRadius: '40px 42px 1rem 1rem' }}
                  component="img"
                  height="194"
                  image="/static/components/Hot-Bussiness2.png"
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
                    paddingTop: '1rem',
                    textAlign: 'center'
                  }}
                  variant="h5"
                  paragraph
                >
                  Dairy Queen
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
                    WebkitLineClamp: 6
                  }}
                >
                  Dairy Queen, thường được gọi là “DQ”, là một chuỗi cửa hàng đồ ăn nhanh và kem
                  mềm, mở cửa hàng đầu tiên tại Joliet, Illinois vào năm 1940. Hệ thống Dairy Queen
                  đã phát triển hơn 6.600 địa điểm tại Hoa Kỳ và Canada, trong đó có hơn 2.200 địa
                  điểm tại 22 quốc gia. Công ty dành hai địa điểm làm cửa hàng của công ty. Trong
                  tám năm qua, tổng số cửa hàng của nó tăng trưởng chậm nhưng đều đặn, thêm hơn 300
                  đơn vị trong ba năm qua.
                </Typography>
                <BorderLinearProgress variant="determinate" value={100} />
                <Typography
                  paragraph
                  sx={{
                    color: isLight ? '#251E18' : 'black',
                    paddingTop: '1rem'
                  }}
                >
                  <strong> 83,000,000 </strong> trên <strong> 100,000,000 </strong>
                </Typography>
                <Button
                  style={{
                    color: '#FF7F50',
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
          {/* <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem', borderRadius: '40px 42px 1rem 1rem' }}
                  component="img"
                  height="194"
                  image="/static/components/Hot-Bussiness.png"
                />
                <Typography
                  style={{
                    color: '#14B7CC',
                    textAlign: 'center',
                    paddingTop: '1rem',
                    fontWeight: 700
                  }}
                  paragraph
                >
                  
                </Typography>
                <Typography
                  sx={{
                    color: isLight ? '#14B7CC' : 'white',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
paddingTop: '1rem',
                    textAlign: 'center'
                  }}
                  variant="h5"
                  paragraph
                >
                  Tôi đi bộ store
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
                    WebkitLineClamp: 6
                  }}
                >
                  Store chuyên giày thể thao nhập khẩu chính hãng, bảo hành đổi trả 100% nếu phát
                  hiện giày giả.
                </Typography>
                <BorderLinearProgress variant="determinate" value={48} />
                <Typography
                  paragraph
                  sx={{
                    color: isLight ? '#251E18' : 'black',
                    paddingTop: '1rem'
                  }}
                >
                  <strong> 83,000,000 </strong> trên <strong> 100,000,000 </strong> 
                </Typography>
                <Button
                  style={{
                    color: '#FF7F50',
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
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInUp}>
              <CardStyle sx={{ maxWidth: 345 }}>
                <CardMedia
                  style={{ paddingTop: '2rem', borderRadius: '40px 42px 1rem 1rem' }}
                  component="img"
                  height="194"
                  image="/static/components/Hot-Bussiness2.png"
                />
                <Typography
                  style={{
                    color: '#14B7CC',
                    textAlign: 'center',
                    paddingTop: '1rem',
                    fontWeight: 700
                  }}
                  paragraph
                >
                  
                </Typography>
                <Typography
                  sx={{
                    color: isLight ? '#14B7CC' : 'white',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
paddingTop: '1rem',
                    textAlign: 'center'
                  }}
                  variant="h5"
                  paragraph
                >
                  Thẩm mỹ viện Hạnh Phúc
                </Typography>
                <Typography
                  sx={{
                    color: isLight ? '#251E18' : 'black',
                    textOverflow: 'ellipsis',
                    // whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 6,
                    textAlign: 'left'
                  }}
                >
                  Thẩm mỹ viện uy tin 100% với chất lượng các y bác sĩ hàng đầu Việt Nam cùng nhiều
                  bác sĩ được mời từ các quốc gia chuyên về thẩm mỹ
                </Typography>
                <BorderLinearProgress variant="determinate" value={74} />
                <Typography
                  paragraph
                  sx={{
                    color: isLight ? '#251E18' : 'black',
                    paddingTop: '1rem'
                  }}
                >
                  <strong> 83,000,000 </strong> trên <strong> 100,000,000 </strong> 
                </Typography>
                <Button
                  style={{
                    color: '#FF7F50',
                    display: 'flex',
                    float: 'right'
                  }}
                  href={PATH_DETAILS}
                >
                  {t('button_click')}
                </Button>
              </CardStyle>
            </MotionInView>
          </Grid> */}
        </Grid>
      </Container>
    </RootStyle>
  );
}

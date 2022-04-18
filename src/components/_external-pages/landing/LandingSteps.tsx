// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Typography, useMediaQuery } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';
//dhwjahkdawjk
// ----------------------------------------------------------------------

const CARDS = [
  {
    image: '/static/faqs/Why1.png',
    title: 'Đầu tư với số vốn nhỏ',
    description:
      'Chỉ từ 500 nghìn đồng bạn có thể tham gia đầu tư trên nền tảng Krowd. Cùng đồng hành với doanh nghiệp với nhiều lựa chọn phong phú với các dự án về bán lẻ, thực phẩm, phần mềm.'
  },
  {
    image: '/static/faqs/Why2.png',
    title: 'Mô hình đầu tư chia sẻ doanh thu',
    description:
      'Chia sẻ doanh thu sẽ loại bỏ sự phức tạp của công việc tính toán. Phân chia lợi nhuận theo doanh thu và chi phí. Hàng tháng dựa theo doanh thu của dự án đầu tư, dự án sẽ thanh toán cho nhà tư vấn theo tỉ lệ%.'
  },
  {
    image: '/static/faqs/Why3.png',
    title: 'Lợi nhuận thu về theo tháng',
    description:
      'Sức mạnh của lợi nhuận "kép" khi đầu tư tiền sẽ trả theo tháng và bạn có thế thêm nhiều tư vấn khác nhau với số tiền thu được.  Doanh thu càng cao thì nhà dầu tư nhận về càng nhiều.'
  },
  {
    image: '/static/faqs/Why4.png',
    title: 'Minh bạch thông tin dự án',
    description:
      'Qui trình thẩm định dự án, tất cả các thông tin đều được kiếm tra trước khi công bố đến nhà đầu tư. Khi dự án diễn ra, doanh thu phát sinh sẽ được cập nhật cho nhà đầu tư có thể kiểm tra ngẫu nhiên các công việc không gian hoặc sai sót.'
  },
  {
    image: '/static/faqs/Why5.png',
    title: 'Hợp đồng pháp lý rõ ràng',
    description: 'Hợp đồng pháp lý rõ ràng rành mạch giữa các bên'
  },
  {
    image: '/static/faqs/Why6.png',
    title: 'Cùng phát triển cộng đồng',
    description: 'Cùng nhau chung tay phát triển cộng đồng mạnh mẽ.'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    // paddingBottom: theme.spacing(5),
    backgroundColor: 'white'
  }
}));
const Container = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(9),
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12),
  borderRadius: theme.shape.borderRadiusSm,
  [theme.breakpoints.up('sm')]: {
    paddingBottom: theme.spacing(7),
    backgroundColor: '#04297a'
  }
}));
const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    maxWidth: 420,
    minHeight: 400,
    margin: 'auto',
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#212b35',
      borderRadius: theme.shape.borderRadiusMd,
      boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: '#212b35',
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
          backgroundColor: '#212b35',
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const bgLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle
      sx={{
        mb: { xs: 10, md: 10, textAlign: 'center' },
        color: isLight ? 'white' : 'text.primary',
        backgroundColor: bgLight ? '#212b35' : '#9acdff'
      }}
    >
      <Container>
        <Box sx={{ mb: { xs: 10, md: 10, textAlign: 'center' } }}>
          <Typography variant="h2" sx={{ mb: 3, color: isLight ? 'white' : 'white' }}>
            Tại sao nên đầu tư qua nền tảng Krowd
          </Typography>
        </Box>
        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.image} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle
                  sx={{
                    mb: { xs: 10, md: 7, textAlign: 'center' },
                    color: isLight ? 'white' : 'text.primary',
                    backgroundColor: bgLight ? '#212b35' : '#9acdff'
                  }}
                >
                  <Typography>
                    <img style={{ width: '80px', display: 'inline' }} src={card.image} />
                  </Typography>
                  <Typography
                    sx={{
                      color: isLight ? 'white' : 'white',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}
                    variant="h5"
                    paragraph
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    style={{ paddingBottom: '2rem', textAlign: 'left' }}
                    sx={{ color: isLight ? 'white' : 'white' }}
                  >
                    {card.description}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}

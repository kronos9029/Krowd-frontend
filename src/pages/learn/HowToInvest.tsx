// material
import { Box, Container, Divider, Grid, Link, Stack, styled, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import React from 'react';
import Page from '../../components/Page';
import { PATH_AUTH, PATH_DASHBOARD, PATH_DASHBOARD_LEARN, PATH_PAGE } from 'routes/paths';
const ContentStyle = styled(Typography)(() => ({
  fontSize: '18px'
}));
const GrayContentStyle = styled(Typography)(() => ({
  fontSize: '18px',
  color: 'gray'
}));
const SubContentStyle = styled(Typography)(() => ({
  fontSize: '18px',
  paddingLeft: 20
}));
const SubTitle = styled(Typography)(() => ({
  fontSize: '30px',
  color: 'gray'
}));
const StepStyle = styled(Typography)(() => ({
  fontSize: '80px',
  color: '#C7E4FF'
}));
const BoldStyle = styled('span')(() => ({
  fontWeight: 'bold'
}));
const ItalicStyle = styled('span')(() => ({
  fontStyle: 'italic'
}));
const BorderBoxStyle = styled(Box)(() => ({
  width: 100,
  height: 100,
  backgroundColor: '#14B7CC',
  borderRadius: 25,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
const ImageStyle = styled('img')(() => ({
  width: 80,
  height: 80
}));
export default function HowToInvest() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Làm thế nào để bắt đầu đầu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            Làm thế nào để bắt đầu đầu tư
          </Typography>
        </Grid>

        <Grid container sx={{ py: 2 }}>
          <Typography sx={{ py: 1 }}>
            <SubTitle>Bắt đầu đầu tư nào !!!</SubTitle>
          </Typography>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>1</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>
                  <Link href={PATH_AUTH.login} underline="none">
                    Đăng nhập
                  </Link>{' '}
                  vào Krowd
                </Typography>
                <GrayContentStyle>
                  Hiện tại Krowd đang hỗ trợ việc đăng nhập bằng Google email, hãy chắc chắn rằng
                  bạn sở hữu Google email trước khi đăng nhập vào Krowd nhé. Việc này chỉ mất một ít
                  thời gian của bạn thôi.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>2</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>
                  Cập nhật{' '}
                  <Link href={PATH_DASHBOARD.user.account} underline="none">
                    thông tin cá nhân
                  </Link>
                </Typography>
                <GrayContentStyle>
                  Krowd được yêu cầu bởi các quy định của Việt Nam để xác minh danh tính của tất cả
                  các nhà đầu tư.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>3</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>
                  <Link href={PATH_PAGE.pageTopUp} underline="none">
                    Nạp tiền
                  </Link>{' '}
                  vào ví đầu tư
                </Typography>
                <GrayContentStyle>
                  Hầu hết các khoản đầu tư hiện tại vào Krowd có thể được thực hiện qua ví Momo.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>4</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>
                  <Link href={PATH_PAGE.project} underline="none">
                    Tìm dự án
                  </Link>{' '}
                  mình quan tâm
                </Typography>
                <GrayContentStyle>
                  Ở đây Krowd cung cấp cho bạn tất cả các dự án đang trong giai đoạn gọi vốn đầu tư,
                  bạn có thể nhấp vào từng dự án để xem ghi chú chia sẻ doanh thu, các gói đầu tư,
                  các ưu đãi của dự án, thông tin của chủ dự án và các thông tin liên quan khác. Sau
                  đó chọn gói đầu tư phù hợp với mình, yêu cầu thanh toán, chờ xác nhận thành công.
                  Thế là chúc mừng bạn đã chính thức trở thành một nhà đầu tư của Krowd rồi đó.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>5</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Xác nhận thông tin hợp đồng</Typography>
                <GrayContentStyle>
                  Đây là bước cuối cùng trong giai đoạn đầu tư, bạn sẽ nhận được một hợp đồng từ dự
                  án gửi về email của bạn. Bạn nên kiểm tra kĩ các thông tin trong hợp đồng. Nếu có
                  sai sót bạn nên liên hệ ngay với Krowd để được sửa chữa hoặc bạn có thể hủy giao
                  dịch trong vòng 24h.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box my={5} p={2} bgcolor={'#FFFAE9'} height={80} width="90%">
          <Typography fontWeight={'bold'}>Câu hỏi ?</Typography>
          <ContentStyle>
            Mọi câu hỏi thắc mắc vui lòng liên hệ với Krowd qua email{' '}
            <Link href={`mailto:krowd.support@gmail.com`}>krowd.support@gmail.com</Link>{' '}
          </ContentStyle>
        </Box>
        <Box p={2}>
          <ContentStyle my={2}>
            <BoldStyle>Ghi nhớ:</BoldStyle> Đầu tư là rủi ro! Mặc dù một số khoản đầu tư thành công
            và có thể mang lại lợi ích đáng kể cho các nhà đầu tư, nhưng hầu hết sẽ thất bại. Đọc về
            rủi ro đầu tư <Link href={PATH_DASHBOARD_LEARN.learn.risk_invested}>tại đây</Link>.
          </ContentStyle>
          <ContentStyle my={2}>
            <BoldStyle>Không có gì được đảm bảo.</BoldStyle> Bạn không có nhiều quyền với tư cách là
            nhà đầu tư. Hiệu suất, dự báo hoặc kế hoạch trong quá khứ không dự đoán thành công trong
            tương lai.
          </ContentStyle>
          <ContentStyle my={2}>
            <BoldStyle>Cuối cùng nhưng không kém phần quan trọng</BoldStyle>, hãy đầu tư vào tương
            lai mà bạn tin tưởng. Hầu hết các khoản đầu tư vào Krowd đều cho phép bạn tham gia sớm,
            sở hữu gói đầu tư và đó có thể là câu chuyện bạn kể cho những đứa trẻ tương lai của mình
            vào một ngày nào đó.
          </ContentStyle>
        </Box>
      </Container>
    </Page>
  );
}

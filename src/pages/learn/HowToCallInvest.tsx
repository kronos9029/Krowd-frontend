// material
import { Box, Container, Divider, Grid, Link, Stack, styled, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import React from 'react';
import Page from '../../components/Page';
import useLocales from 'hooks/useLocales';
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
export default function HowToCallInvest() {
  const { themeStretch } = useSettings();
  const { translate: t } = useLocales();

  return (
    <Page title="Làm thể nào để trở thành chủ dự án của Krowd | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            Làm thể nào để trở thành chủ dự án của Krowd
          </Typography>
          <ContentStyle>
            Hiện tại Krowd cung cấp 2 phương thức để trở thành chủ dự án của Krowd: Trở thành quản
            lý dự án dưới danh nghĩa là nhân viên của Krowd và trở thành chủ dự án hợp tác với
            Krowd.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }} my={1}>
            Phương thức 1: Quản lý dự án dưới danh nghĩa là nhân viên của Krowd.
          </Typography>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>1</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Chuẩn bị hồ sơ ứng tuyển</Typography>
                <GrayContentStyle>
                  Đây là bước sơ khai khi bạn muốn ứng tuyển vào Krowd, bạn cần chuẩn bị một bộ CV
                  và các giấy tờ liên quan (CMND/CCCD, bằng tốt nghiệp đại học/cao đẳng, các chứng
                  chỉ chứng minh năng lực nghiệp vụ và quản lý,...)
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>2</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Ứng tuyển vào công ty Krowd</Typography>
                <GrayContentStyle my={1}>
                  Gửi CV và các giấy tờ đã chuẩn bị đến email{' '}
                  <Link href={`mailto:krowd.hr@gmail.com`}>krowd.hr@gmail.com</Link> để tham gia ứng
                  tuyển.
                </GrayContentStyle>
                <GrayContentStyle my={1}>
                  Hoặc trực tiếp đến phòng nhân sự của công ty địa chỉ: Văn phòng 1714, tòa S105,
                  chung cư Vinhome GrandPark, đường Nguyễn Xiển, phường Long Thạnh Mỹ, TP.Thủ Đức,
                  TPHCM.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>3</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Được phân công vào dự án của Krowd</Typography>
                <GrayContentStyle>
                  Sau giải đoạn phỏng vấn và được thành công trở thành nhân viên của công ty, bạn sẽ
                  được phân công vào các dự án có sẵn của Krowd. Bạn sẽ bắt đầu công việc phân tích
                  thị trưởng, đưa ra các ưu điểm, nhược điểm của dự án mà bạn sẽ làm quản lý. Cung
                  cấp các thông tin cần thiết cho dự án bạn được giao lên nền tảng Krowd.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>4</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Trở thành quản lý dự án</Typography>
                <GrayContentStyle>
                  Sau khi dự án của bạn vượt qua giai đoạn thẩm định của Krowd, chúc mừng bạn đã
                  chính thức trở thành quản lý dự án đó.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }} my={1}>
            Phương thức 2: Chủ dự án hợp tác với Krowd.
          </Typography>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>1</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Chuẩn bị dự án mà bạn có muốn triển khai</Typography>
                <GrayContentStyle>
                  Đây là bước sơ khai để trở thành chủ dự án hợp tác với Krowd, thương hiệu của dự
                  án mà bạn muốn triển khai phải trực thuộc vào hệ sinh thái của Krowd (
                  <Link>KrowdEco</Link>).
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>2</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Liên hệ với Krowd</Typography>
                <GrayContentStyle my={1}>
                  Gửi hồ sơ cá nhân và các giấy tờ liên quan đến bạn (CMND/CCCD, bằng tốt nghiệp đại
                  học/cao đẳng, các chứng chỉ chứng minh năng lực nghiệp vụ và quản lý,...) đã chuẩn
                  bị đến{' '}
                  <Link href={`mailto:krowd.co-operate@gmail.com`}>krowd.co-operate@gmail.com</Link>{' '}
                  để được hỗ trợ.
                </GrayContentStyle>
                <GrayContentStyle my={1}>
                  Hoặc trực tiếp đến phòng hợp tác của công ty địa chỉ: Văn phòng 1714, tòa S105,
                  chung cư Vinhome GrandPark, đường Nguyễn Xiển, phường Long Thạnh Mỹ, TP.Thủ Đức,
                  TPHCM.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>3</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Ký hợp đồng</Typography>
                <GrayContentStyle>
                  Bên Krowd sẽ có nhân viên thẩm định đến gặp trực tiếp bạn để trao đổi về các quy
                  trình hợp tác giữa bạn và Krowd. Sau đó, bạn sẽ phải ký một hợp đồng hợp tác giữa
                  hai bên.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>4</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Được cung cấp tài khoản Krowd Business</Typography>
                <GrayContentStyle>
                  Sau giai đoạn ký hợp đồng hợp tác, bạn sẽ được Krowd cung cấp một tài khoản Krowd
                  Business để đăng nhập vào trang{' '}
                  <Link href={'https://business.krowd.vn/'}>business.krowd.vn</Link>, bạn sẽ cập
                  nhật một số thông tin cá nhân trên trang này.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>5</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Tạo thông tin dự án</Typography>
                <GrayContentStyle>
                  Sau đó, bạn sẽ cập nhật các thông tin cần thiết cho dự án mà bạn muốn triển khai
                  lên nền tảng Krowd.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <StepStyle>6</StepStyle>
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Bắt đầu kêu gọi và trở thành chủ dự án</Typography>
                <GrayContentStyle>
                  Sau khi đăng dự án và vượt qua giai đoạn thẩm định dự án của Krowd, chúc mừng bạn
                  đã chính thức trở thành chủ dự án đó.
                </GrayContentStyle>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

// material
import { Box, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import React from 'react';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';
const ContentStyle = styled(Typography)(() => ({
  fontSize: '18px'
}));
const SubContentStyle = styled(Typography)(() => ({
  fontSize: '18px',
  paddingLeft: 20
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
export default function TermOfService() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Những gì bạn nhận được khi bạn đầu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            Những gì bạn nhận được khi bạn đầu tư
          </Typography>
          <ContentStyle>
            Khi bạn đầu tư thông qua hệ sinh thái của Krowd, bạn cung cấp vốn thông qua việc mua gói
            đầu tư để đổi lấy những ưu đãi, phần lợi tức từ dự án của Krowd. Lãi suất tài chính đó
            bị ràng buộc bởi một thỏa thuận giữa bạn và dự án huy động tiền của Krowd. Thỏa thuận
            này được ghi lại bằng hợp đồng giữa bạn và dự án và nó này là một bảo mật chỉ bạn và
            Krowd có thể xem.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Các gói đầu tư vào dự án của Krowd sẽ đưa cho bạn phần lợi tức thông qua:
          </Typography>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <ImageStyle src="/static/icons/navbar/revenue.png" />
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Chia sẻ doanh thu</Typography>
                <ContentStyle>
                  Chia sẻ doanh thu là một loại hình đầu tư tư nhân mà bạn được chia sẻ phần doanh
                  thu của dự án mà không cần quyền sở hữu và từ đó kiếm thu nhập thụ động.
                </ContentStyle>
                <ContentStyle>
                  Ghi chú chia sẻ doanh thu có thể cung cấp các khoản thanh toán dựa trên luồng
                  doanh thu của dự án trền nền tảng Krowd, lên đến một mức tối đa nhất định.
                </ContentStyle>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item md={1}>
              <BorderBoxStyle>
                <ImageStyle src="/static/icons/navbar/voucher.png" />
              </BorderBoxStyle>
            </Grid>
            <Grid item md={10}>
              <Box mx={5}>
                <Typography variant={'h4'}>Ưu đãi của từng gói đầu tư dự án (Voucher) </Typography>
                <ContentStyle>
                  Các gói đầu tư của từng dự án khác nhau sẽ cho bạn các ưu đãi khác nhau khi sử
                  dụng dịch vụ tại các cơ sở kinh doanh của dự án. Ví dụ như: phiếu giảm giá, gói sử
                  dụng dịch vụ, thẻ thành viên,...
                </ContentStyle>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

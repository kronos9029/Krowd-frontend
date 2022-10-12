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
export default function HowReturnWork() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Những gì bạn nhận được khi bạn đầu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            Quy trình thanh khoản
          </Typography>
          <ContentStyle my={2}>
            Các nhà đầu tư có thể kiếm tiền khi một dự án Krowd thành công. Rủi ro và lợi nhuận sẽ
            khác nhau tùy theo gói đầu tư khác nhau.
          </ContentStyle>
          <ContentStyle my={2}>
            Các khoản đầu tư được cấu trúc theo nhiều gói đầu tư khác nhau. Lợi nhuận tiềm năng
            tương ứng với các điều khoản và điều kiện duy nhất của dự án. Các khoản đầu tư sẽ được
            dự án thanh khoản lại cho nhà đầu tư theo hình thức chia sẻ doanh thu theo nhiều kỳ mà
            dự án đã cam kết trước đó.
          </ContentStyle>
          <ContentStyle my={2}>
            Giữa tất cả các dự án dưới sự bảo trợ của Krowd, chúng tôi đã tạo điều kiện hỗ trợ từ 2
            - 10% thanh toán còn lại từ các dự án cho các nhà đầu tư trong trường hợp dự án rủi ro
            cao mà chủ dự án không có khả năng chi trả tùy theo hồ sơ thẩm định của Krowd.
          </ContentStyle>
        </Grid>
      </Container>
    </Page>
  );
}

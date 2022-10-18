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
export default function RiskManager() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Rủi ro khi đâu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            Rủi ro khi đầu tư
          </Typography>
          <ContentStyle>
            Chúng tôi đã chuẩn bị phần sau dưới dạng một đoạn trích từ các tiết lộ rủi ro đầy đủ của
            chúng tôi để bạn tiện theo dõi. Các khoản đầu tư vào Krowd vốn có tính rủi ro. Bạn nên
            tự nghiên cứu và xem xét kỹ lưỡng tất cả các yếu tố rủi ro được tiết lộ trước khi đưa ra
            quyết định đầu tư.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Tính thất bại của dự án
          </Typography>
          <ContentStyle>
            Các khoản đầu tư vào các dự án mới thành lập đều mang tính rủi ro cao và những dự án này
            có thể thất bại. Không giống như khoản đầu tư vào một doanh nghiệp đã trưởng thành, nơi
            có hồ sơ về doanh thu và thu nhập, thành công của một dự án mới thành lập thường dựa vào
            các yếu tố tài chính, địa lý, con người và môi trường xung quanh dự án đó. Bạn nên chuẩn
            bị để mất toàn bộ khoản đầu tư của mình.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Tính thanh khoản của dự án
          </Typography>
          <ContentStyle>
            Khả năng thanh toán lại khoản đầu tư của bạn trong những kỳ đầu tiên sẽ bị hạn chế với
            các lý do khác nhau. Bạn có thể phải neo khoản đầu tư của mình trong một khoảng thời
            gian dài. Không giống như đầu tư vào các dự án được niêm yết trên sàn giao dịch chứng
            khoán, tại Krowd không hỗ trợ hình thức bán lại khoản đầu tư của mình cho người khác để
            thu hồi vốn đầu tư ban đầu. Song, nếu bạn thực hiện giao dịch đó ngoài nền tảng của
            Krowd, mọi rủi ro và rắc rối về sau không nằm trong sự quản lý của Krowd.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Tính sở hữu và biểu quyết về dự án
          </Typography>
          <ContentStyle>
            Các dự án đầu tư được lưu trữ trên Krowd được Krowd sở hữu sẽ được tổ chức thông qua quy
            trình của Krowd, không cung cấp quyền biểu quyết cho các nhà đầu tư. Cách thức xây dựng
            và tổ chức của dự án sẽ do bên quản lý dự án của Krowd quyết định toàn bộ. Nhà đầu tư sẽ
            nhận được các thông báo thường nhật và báo cáo hằng kỳ về tình hình dự án và nhà đầu tư
            có quyền góp ý về dự án thông qua kênh truyền thông của Krowd. Song quyền quyết định vẫn
            thuộc về quản lý dự án đó.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Hạn chế hủy bỏ
          </Typography>
          <ContentStyle>
            Theo quy định huy động vốn cộng đồng và quy định của Krowd, sau khi bạn thực hiện việc
            mua gói đầu tư, bạn có thể hủy giao dịch bất kỳ lúc nào và vì bất kỳ lý do gì trong vòng
            24h sau khi thực hiện giao dịch. Sau khoản thời gian này, mọi giao dịch được coi là đã
            xác nhận, các khiếu nại của bạn về sau Krowd sẽ dựa theo quy định này để xử lý.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Tiết lộ hạn chế
          </Typography>
          <ContentStyle>
            Dự án phải tiết lộ thông tin về thông tin người quản lý, kế hoạch kinh doanh, đợt kêu
            gọi, đợt thanh toán và việc sử dụng dự kiến số tiền thu được, cùng những thứ khác. Điều
            quan trọng cần lưu ý là một dự án ở giai đoạn đầu có thể chỉ cung cấp thông tin hạn chế
            về kế hoạch kinh doanh và hoạt động của mình vì công ty vẫn đang phát triển hoạt động
            của mình. Tùy thuộc vào cách thức kêu gọi, công ty cũng có thể không có nghĩa vụ phải
            nộp thông tin liên quan đến hoạt động kinh doanh của mình hàng năm, bao gồm cả báo cáo
            tài chính.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Đầu tư vào nhân sự
          </Typography>
          <ContentStyle>
            Khoản đầu tư vào một dự án mới thành lập cũng là khoản đầu tư vào (các) doanh nhân, nhà
            quản lý sáng lập và / hoặc ban quản lý của dự án. Các doanh nhân và nhà quản lý sáng lập
            sẽ có trình độ chuyên nghiệp và trình độ quản lý khác nhau. Khả năng thực hiện kế hoạch
            kinh doanh là một yếu tố quan trọng để xác định liệu hoạt động kinh doanh có khả thi và
            thành công hay không. Các nhà đầu tư nên xem xét cẩn thận bất kỳ thông tin tiết lộ nào
            liên quan đến việc sử dụng tiền của dự án.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Khả năng xảy ra gian lận
          </Typography>
          <ContentStyle>
            Có một rủi ro rằng một dự án kêu gọi vốn gian lận. Krowd sẽ có những đợt kiểm tra thường
            kỳ để giảm nguy cơ này một cách tốt nhất có thể. Tuy nhiên, không có cách nào để kiểm
            soát hành động của một dự án sau khi đợt chào bán kết thúc một cách triệt để.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Thiếu sự hướng dẫn nghiệp vụ
          </Typography>
          <ContentStyle>
            Nhiều dự án thành công một phần cho rằng thành công ban đầu của họ là do sự hướng dẫn
            của các nhà quản trị chuyên nghiệp ở giai đoạn đầu (ví dụ: các nhà đầu tư thiên thần và
            các công ty đầu tư mạo hiểm). Những nhà đầu tư này thường thương lượng để có được ghế
            trong ban giám đốc của công ty và đóng vai trò quan trọng trong việc cung cấp thêm nguồn
            lực, địa chỉ liên hệ và kinh nghiệm trong việc hỗ trợ các công ty ở giai đoạn đầu thực
            hiện kế hoạch kinh doanh của họ. Một công ty ở giai đoạn đầu được tài trợ chủ yếu thông
            qua huy động vốn cộng đồng có thể không có được lợi ích từ các nhà đầu tư chuyên nghiệp
            như vậy.
          </ContentStyle>
        </Grid>
      </Container>
    </Page>
  );
}

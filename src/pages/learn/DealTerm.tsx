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
export default function DealTerm() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Hiểu về các điều khoản giao dịch | Krowd">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid container>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h2" sx={{ pt: 5 }}>
                Các điều khoản giao dịch cho giai đoạn kêu gọi
              </Typography>
              <Typography
                sx={{ fontSize: '25px', lineHeight: 1.3, color: '#777', fontWeight: 400, py: 3 }}
              >
                Giao dịch các dự án gây quỹ trên Krowd đặt ra các điều khoản thỏa thuận mà tại đó họ
                bán các gói đầu tư của mình. Dưới đây là một số định nghĩa và giải thích để giúp bạn
                thực hiện khoản đầu tư tiếp theo.{' '}
              </Typography>
              <Box>
                <Typography variant="h3">Mục tiêu tài trợ</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ lineHeight: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <ContentStyle>
                      Số tiền mà dự án của Krowd cần huy động. Nếu dự án không đạt được mục tiêu tài
                      trợ này trước khi chiến dịch kết thúc, chiến dịch của họ được coi là không
                      thành công và tất cả các khoản đầu tư sẽ được hoàn lại cho nhà đầu tư.
                    </ContentStyle>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="h3">Các giai đoạn của chiến dịch kêu gọi </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ lineHeight: 2 }}>
                  <Box>
                    Mỗi chiến dịch kêu gọi khởi động sẽ chạy trong một khoảng thời gian nhất định.
                  </Box>

                  <Box sx={{ pb: 5 }}>Mỗi chiến dịch bao gồm các giai đoạn:</Box>

                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        1
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 4.5 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          Dự án được Krowd thẩm định các ghi chú chia sẻ doanh thu và thông tin dự
                          án
                        </Typography>
                        <br /> Các dự án được các chủ dự án bên Krowd thuyết trình dưới dạng bài
                        viết, sau đó gửi về cho Krowd để được bên thẩm định xem qua và xác nhận về
                        thông tin dự án, độ tin cậy, độ chính xác và độ rủi ro của dự án. Cuối cùng,
                        Krowd sẽ quyết định cho phép công khai dự án với nhà đầu tư hay không.
                      </Box>
                    </Box>
                  </Box>

                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        {' '}
                        2
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 3 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          Dự án được công khai với các nhà đầu tư
                        </Typography>
                        <br /> Các dự án sau khi vượt qua giai đoạn thẩm định của Krowd sẽ được công
                        khai với các nhà đầu tư trên trang đầu tư. Các thông tin về ghi chú chia sẻ
                        doanh thu sẽ không được sửa đổi sau khi Krowd xác nhận cho dự án công khai
                        với nhà đầu tư.
                      </Box>
                    </Box>
                  </Box>
                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        {' '}
                        3
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 3 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          Dự án trong thời gian kêu gọi vốn đầu tư
                        </Typography>
                        <br /> Các dự án sẽ có ngày bắt đầu kêu gọi và ngày kết thúc kêu gọi. Dự án
                        phải lúc này sẽ được các nhà đầu tư quan tâm và mua các gói đầu tư mà dự án
                        cung cấp xem như là hành động góp vốn vào dự án. Nhiệm vụ của dự án là phải
                        kêu gọi được mục tiêu tài trợ trước khi thời gian kêu gọi kết thúc.
                        <br />
                        Các dự án hoàn thành mục tiêu tài trợ sớm hơn thời gian kết thúc kêu gọi sẽ
                        được xem là đã hoàn thành chiến dịch và sẽ không nhận bất cứ khoản đầu tư
                        nào sau khi đã hoàn thành.
                        <br />
                        Với mỗi lần mua gói đầu tư, nhà đầu tư có 24h (kể từ lúc mua gói) để kiểm
                        tra lại hợp đồng giao dịch, nếu có gì sai sót có thể báo lại với Krowd để
                        sửa chữa hoặc hủy giao dịch, sau khoảng thời gian này xem như nhà đầu tư đã
                        chấp nhận, mọi rủi ro về sau Krowd không chịu trách nhiệm.
                      </Box>
                    </Box>
                  </Box>
                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        {' '}
                        4
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 3 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          Dự án thành công và được Krowd thẩm định lần 2
                        </Typography>
                        <br />
                        Các dự án đã hoàn thành mục tiêu tài trợ sẽ được Krowd xác nhận và thẩm định
                        lần 2 để quyết định chuyển sang giai đoạn thực hiện dự án (chậm nhất 48h sau
                        khi dự án hoàn thành mục tiêu tài trợ). Với các dự án không hoàn thành mục
                        tiêu kêu gọi hoặc không vượt qua vòng thầm định lần 2 sẽ xem như chiến dịch
                        kêu gọi thất bại, và các khoản đầu tư sẽ được hoàn trả lại cho các nhà đầu
                        tư.
                      </Box>
                    </Box>
                  </Box>
                  <Box display={'flex'}>
                    <Box>
                      <Typography sx={{ color: 'blue', fontWeight: 700, fontSize: 70 }}>
                        {' '}
                        5
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 5 }}>
                      <Box sx={{ px: 3 }}>
                        <Typography sx={{ fontSize: '22px', lineHeight: 0.2 }}>
                          Dự án bắt đầu triển khai
                        </Typography>
                        <br />
                        Các dự án sẽ bắt đầu giai đoạn triển khai dự án, nhà đầu tư có thể nhận được
                        cập nhật của dự án, ưu đãi của gói đầu tư, tiền hoàn trả sau mỗi kỳ theo hợp
                        đồng đã cam kết khi mua gói đầu tư.
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="h3">Thay đổi điều khoản giao dịch</Typography>
                <Divider sx={{ mb: 3 }} />

                <Box>
                  <Typography sx={{ mb: 2 }}>
                    Ở trên là các điều khoản giao dịch chung của Krowd, các dự án của Krowd đều sẽ
                    tuân theo các điều khoản trên. Tuy nhiên, mỗi dự án có thể có các điều khoản
                    giao dịch kèm theo phát sinh để phù hợp với lĩnh vực kinh doanh của dự án. Nếu
                    các dự án có các điều khoản phát sinh phải được Krowd phê duyệt và thông báo đến
                    nhà đầu tư ngay sau đó, thời gian có hiệu lực của điều khoản phát sinh là 5 ngày
                    sau khi Krowd phê duyệt và thông báo cho các nhà đầu tư thông qua trang dự án
                    hoặc email của nhà đầu tư để nhà đầu tư xác nhận.
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ mb: 2 }}>
                    Nếu sau 5 ngày nhà đầu tư không xác nhận thông báo từ dự án có phát sinh điều
                    khoản. Giao dịch đầu tư của nhà đầu tư sẽ bị hủy bỏ và nhà đầu tư sẽ được hoàn
                    khoản đầu tư. Các giao dịch đầu tư tiếp theo sẽ được xem như một giao dịch mới.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

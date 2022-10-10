// material
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  styled,
  Typography
} from '@mui/material';
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
export default function HowItWork() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Cách thức đâu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            Cách thức hoạt động
          </Typography>
          <ContentStyle>
            Krowd là một nền tảng kết nối nhà đầu tư với các dự án nhượng quyền từ các thương hiệu
            uy tín và chất lượng hàng đầu trong khu vực thuộc hệ sinh thái của Krowd (hay được gọi
            là <Link to={'#'}>KrowdEco</Link>). Các nhà đầu tư sẽ mua các gói đầu tư từ các dự án
            của Krowd, coi như đây là hành động góp vốn để thành lập và thực hiện dự án. Krowd có
            trách nhiệm thực hiện dự án đó, cung cấp các báo cáo về tình hình dự án cũng như doanh
            thu của dự án để tiến hành hoàn trả lại số vốn ban đầu cũng như phần lãi cho nhà đầu tư
            tùy theo giá trị mà nhà đầu tư góp vào theo hình thức{' '}
            <BoldStyle>"chia sẻ doanh thu"</BoldStyle>.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            KrowdEco là gì ?
          </Typography>
          <ContentStyle>
            Là hệ sinh thái của Krowd, ở đây tập hợp các thương hiệu uy tín và chất lượng đã ký hợp
            đồng nhượng quyền cho Krowd, ở đây Krowd được quyền sử dụng tên hoặc sản phẩm của thương
            hiệu đó để tạo các dự án kêu gọi vốn đầu tư từ các nhà đầu tư và thực hiện các dự án đó
            theo đúng hợp đồng đã ký với thương hiệu.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Chia sẻ doanh thu là gì?
          </Typography>
          <ContentStyle>
            Chia sẻ doanh thu là một thỏa thuận cho đầu tư trong đó nhà đầu tư ràng buộc khoản hoàn
            trả của họ với doanh thu mà doanh nghiệp của họ tạo ra theo thời gian (Khoản này được
            gọi là <BoldStyle>"Phần trăm chia sẻ"</BoldStyle> được công khai cùng với thông tin dự
            án). Khi một nhà đầu tư mang lại doanh thu cao, thời hạn trả nợ sẽ giảm xuống. Nếu doanh
            thu giảm, thời hạn trả nợ sẽ tăng lên. Điều này có thể mang lại sự linh hoạt cho các dự
            án có tốc độ tăng trưởng cao hoặc theo mùa, nơi khó dự đoán doanh thu hơn. Nó cũng có
            tiềm năng cung cấp tỷ suất lợi nhuận hấp dẫn cho các nhà đầu tư.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Ưu điểm của mô hình chia sẻ doanh thu
          </Typography>
          <ContentStyle lineHeight={3}>
            <ItalicStyle>
              - Không giống như đầu tư huy động vốn từ cộng đồng cổ phần, ghi chú chia sẻ doanh thu
              có thể trở nên thanh khoản sớm hơn nhiều.
            </ItalicStyle>
            <SubContentStyle>
              + Các khoản thanh toán chuyển đến các nhà đầu tư khi doanh thu bắt đầu chảy đến dự án.
            </SubContentStyle>
          </ContentStyle>
          <ContentStyle lineHeight={3}>
            <ItalicStyle>
              - Có thể đưa ra một tỷ suất sinh lợi tiềm năng hấp dẫn với một số giá trị tăng.
            </ItalicStyle>
            <SubContentStyle>
              + Nếu một công ty vượt quá kỳ vọng tăng trưởng, khoản hoàn trả hàng tháng của họ sẽ
              tăng lên và thời hạn sẽ giảm đi, do đó tăng lợi nhuận của nhà đầu tư.
            </SubContentStyle>
          </ContentStyle>
          <ContentStyle lineHeight={3}>
            <ItalicStyle>
              - Các nhà đầu tư có thể đóng một vai trò tích cực trong sự thành công của doanh
              nghiệp.
            </ItalicStyle>
            <SubContentStyle>
              + Bởi vì các nhà đầu tư nhận được phần trăm doanh thu, họ có thể hưởng lợi từ việc
              quảng bá doanh nghiệp trong cộng đồng của họ để giúp doanh nghiệp phát triển.
            </SubContentStyle>
          </ContentStyle>
          <ContentStyle lineHeight={3}>
            <ItalicStyle>
              - Thẩm định đơn giản hơn so với đầu tư huy động vốn cộng đồng cổ phần.
            </ItalicStyle>
            <SubContentStyle>
              + Bạn sẽ không có mối quan tâm về định giá hoặc chiến lược rút lui của công ty.
            </SubContentStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Ghi chú chia sẻ doanh thu là gì?
          </Typography>
          <ContentStyle>
            Ghi chú chia sẻ doanh thu liên quan đến thỏa thuận giữa hai bên: nhà đầu tư và người
            quản lý dự án. Các nhà đầu tư đầu tư tiền vào các dự án của Krowd đang muốn thành lập
            hoặc mở rộng quy mô dự án. Những nhà đầu tư đồng ý trả cho những dự án của Krowd với một
            tỷ lệ phần trăm doanh thu của dự án trong một khoảng thời gian cụ thể{' '}
            <BoldStyle>(kỳ hạn)</BoldStyle> cho đến khi tổng số tiền đã đầu tư được hoàn trả
            <ItalicStyle>(bao gồm cả phần vốn và phần lãi)</ItalicStyle>.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Các thuật ngữ chính cần biết về ghi chú chia sẻ doanh thu
          </Typography>
          <ContentStyle>
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                <BoldStyle>- Phần trăm chia sẻ:</BoldStyle> Là phần trăm doanh thu mà nhà đầu tư
                nhận được sau mỗi cuối kỳ thanh toán của dự án, phần trăm doanh thu sẽ được công
                khai khi dự án được Krowd duyệt và cho phép hiển thị trên trang "Đầu tư", con số này
                là sự cam kết của dự án trả cho nhà đầu tư mỗi kỳ từ tổng doanh thu của mình. (Đây
                không phải là bổ sung cho hệ số nhân — đây là cách một doanh nghiệp đạt được hệ số
                nhân).
              </ListItemText>
              <ListItemText disableTypography>
                <BoldStyle>- Hệ số nhân:</BoldStyle> Là chỉ số quyết định số tiền dự án sẽ nợ nhà
                đầu tư bao gồm cả phần vốn và phần lãi.
              </ListItemText>
              <ListItemText disableTypography>
                <BoldStyle>- Kỳ hạn:</BoldStyle> Ngày mà tất cả các khoản tiền được hoàn trả cho nhà
                đầu tư. Đôi khi điều này xảy ra trước “Kỳ hạn”, trong trường hợp đó sẽ không có số
                tiền nào đến hạn. Tuy nhiên, nếu bất kỳ số tiền nào vẫn còn đến hạn trước “Kỳ hạn”,
                dự án sẽ phải trả phần còn lại đến hạn.
              </ListItemText>
              <ListItemText disableTypography>
                <BoldStyle>- Số kỳ:</BoldStyle> Là số lần mà dự án sẽ trả cho nhà đầu tư theo tổng
                doanh thu của dự án trong khoảng thời gian (mỗi kỳ) đó.
              </ListItemText>
            </List>
            Ví dụ: Bạn mua <BoldStyle>10 gói</BoldStyle> có giá trị{' '}
            <BoldStyle>10,000,000 đồng</BoldStyle> tức là bạn đã đầu tư{' '}
            <BoldStyle>100,000,000 đồng</BoldStyle> vào một dự án chia sẻ doanh thu trên Krowd.
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                Phần trăm chia sẻ: <ItalicStyle>8%</ItalicStyle>
              </ListItemText>
              <ListItemText disableTypography>
                Hệ số nhân: <ItalicStyle>1.7x</ItalicStyle>
              </ListItemText>
              <ListItemText disableTypography>
                Kỳ hạn: <ItalicStyle>48 tháng</ItalicStyle>
              </ListItemText>
              <ListItemText disableTypography>
                Số kỳ: <ItalicStyle>6 kỳ</ItalicStyle>
              </ListItemText>
            </List>
            <ContentStyle>
              Từ đó bạn sẽ nhận được{' '}
              <BoldStyle>8% trên tổng doanh thu mà dự án thực hiện mỗi kỳ</BoldStyle> miễn là doanh
              nghiệp có thể thực hiện thanh toán{' '}
              <BoldStyle>cho đến hết 6 kỳ (48 tháng) hoặc sớm hơn</BoldStyle>. Tối thiểu bạn sẽ nhận
              được{' '}
              <BoldStyle>
                100,000,000 đồng và tối đa bạn sẽ nhận được 100,000,000 * 1,7 = 170,000,000 đồng
              </BoldStyle>
              .
            </ContentStyle>
            <ContentStyle color={'orange'} mt={1}>
              Lưu ý nhỏ: Đầu tư không được đảm bảo hoặc không được bảo hiểm và các nhà đầu tư có thể
              mất một phần hoặc toàn bộ số tiền gốc đã đầu tư nếu dự án không thể thanh toán.
            </ContentStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Khi nào thì thanh toán của tôi bắt đầu?
          </Typography>
          <ContentStyle>
            Sau khi kết thúc một chiến dịch kêu gọi thành công, các khoản thanh toán thường bắt đầu
            sau khi dự án đã tạo ra doanh thu trong một kỳ theo lịch. Điều này khác với ghi chú có
            kỳ hạn, bắt đầu tuân theo các điều khoản của hợp đồng mua ghi chú. Thông thường, các dự
            án bắt đầu nhận được doanh thu sau khi mở cửa công khai. Nếu một công ty không có doanh
            thu, thì không có khoản thanh toán nào đến hạn.
            <ContentStyle color={'orange'} mt={1}>
              Lưu ý nhỏ: Có khả năng các khoản thanh toán sẽ không bắt đầu nếu công ty không tạo ra
              doanh thu. Hơn nữa, không phải tất cả các khoản đầu tư đều ở dạng “nợ có bảo đảm”.
            </ContentStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Khi nào thanh toán của tôi kết thúc?
          </Typography>
          <ContentStyle>
            Thanh toán sẽ kết thúc khi dự án trả lại cho bạn tổng số tiền thanh toán mà dự án cảm
            kết với bạn. Hệ số nhân xác định tổng số tiền mà một dự án phải trả cho bạn. Ví dụ bạn
            đầu tư 100,000,000 đồng (hệ số nhân 1.7x). Nếu kỳ hạn của khoản đầu tư là 48 tháng:
            <ContentStyle lineHeight={3}>
              <BoldStyle>- Trường hợp tốt nhất:</BoldStyle> Dự án trả cho bạn 170,000,000 đồng trong
              40 tháng, thì khoản thanh toán sẽ dừng lại ở 40 tháng.
            </ContentStyle>
            <ContentStyle lineHeight={3}>
              <BoldStyle>- Trường hợp bình thường:</BoldStyle> Dự án trả cho bạn 100,000,000 đô la
              trong 40 tháng, thì khoản thanh toán sẽ tiếp tục để trả lãi 70,000,000 còn lại trong 8
              tháng tới. Nếu đến tháng 48 mà dự án trả bạn 150,000,000 thì dự án sẽ không thanh toán
              thêm phần còn lại, dự án sẽ phải nhận đánh giá dựa trên tổng số tiền trả lại trên tổng
              số tiền cam kết ban đầu. Nhà đầu tư sẽ có thể đánh giá và quyết định đầu tư tiếp cho
              dự án vào vòng kêu gọi sau hay không.
            </ContentStyle>
            <ContentStyle lineHeight={3}>
              <BoldStyle>- Trường hợp không tốt:</BoldStyle> Nếu đã qua 48 tháng và doanh nghiệp chỉ
              trả cho bạn 90,000,000 đồng la, thì dự án sẽ được yêu cầu thanh toán 10,000,000 đồng
              còn lại vào ngày cuối kỳ hạn.
            </ContentStyle>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            Tôi có thể đầu tư vào những lĩnh vực gì ?
          </Typography>
          <ContentStyle>
            Hiện tại Krowd đang cung cấp một số lĩnh vực chính trong các mô hình nhượng quyền gần
            đây, các lĩnh vực này sẽ được cập nhật thêm trong tương lai tùy theo xu hướng thị
            trường.
          </ContentStyle>
        </Grid>
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/healthy-eating.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Đồ ăn</Typography>
            <ContentStyle>
              Các dự án liên quan đến trải nghiệm ẩm thực như nhà hàng, thức ăn nhanh.
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/drink.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Đồ uống</Typography>
            <ContentStyle>
              Các dự án liên quan đến trải nghiệm thức uống như quán cà phê, trà sữa, trà chanh.
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/education.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Giáo dục</Typography>
            <ContentStyle>
              Các dự án liên quan đến nâng cao trí thức và giáo dục như lớp dạy Ngoại ngữ, siêu trí
              nhớ, toán thông minh, logic, tư duy.
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/cosmetics.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Làm đẹp</Typography>
            <ContentStyle>
              Các dự án liên quan đến nhu cầu làm đẹp như spa, salon, tư vấn và nâng cao thẩm mỹ.
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/shop.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Quầy tiện ích</Typography>
            <ContentStyle>
              Các dự án liên quan đến các cửa hàng tiện ích ở đây bán các loại nhu yếu phẩm hàng
              ngày cho người tiêu dùng và thường hoạt động 24/7
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/muscle.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Sức khỏe</Typography>
            <ContentStyle>
              Các dự án liên quan đến các mô hình cung cấp các gói dịch vụ chăm sóc sức khỏe định kỳ
              như khám bệnh định kỳ, siêu âm định kỳ, các gói tư vấn dinh dưỡng 24/7, bác sĩ trực
              tuyến.
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/treadmill.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Thể thao</Typography>
            <ContentStyle>
              Các dự án liên quan đến cung cấp các dịch vụ liên quan đến thể thao như cho thuê sân
              tập, thuê PT, cung cấp các gói tập thể thao theo ngày hoặc định kỳ (vd: phòng tập gym,
              yoga, aerobic,...).
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/fashion-merchandising.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Thời trang</Typography>
            <ContentStyle>
              Các dự án liên quan đến các cửa hàng thời trang nhượng quyền, tư vấn thời gian theo
              gói.
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={5}>
            <BorderBoxStyle>
              <ImageStyle src="/static/icons/navbar/pills.png" />
            </BorderBoxStyle>
            <Typography variant={'h4'}>Y tế</Typography>
            <ContentStyle>
              Các dự án liên quan đến các cửa hàng bán thuốc và y tế nhượng quyền.
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

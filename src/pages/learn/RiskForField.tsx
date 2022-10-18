// material
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
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
export default function RiskForField() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Rủi ro khi đâu tư | Krowd">
      <Container maxWidth={'lg'}>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h2" sx={{ py: 1 }}>
            Rủi ro khi đầu tư từng lĩnh vực khác nhau
          </Typography>
          <ContentStyle>
            Krowd cung cấp nền tảng đầu tư cho nhiều lĩnh vực kinh doanh khác nhau. Khi tham gia vào
            đầu tư, bạn nên có một sự am hiểu nhất định về lĩnh vực đó. Ở đây chúng tôi liệt kê ra
            một số rủi ro cho từng lĩnh vực đầu tư để bạn có thể tham khảo trong quá trình đầu tư
            tiếp theo.
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            1. Lĩnh vực ăn uống
          </Typography>
          <ContentStyle>
            Khi bắt đầu thực hiện dự án trong lĩnh vực ăn uống, có thể do chưa có nhiều kinh nghiệm
            và trang bị đầy đủ kiến thức, bên chủ dự án sẽ dễ “sa chân” vào những rủi ro, tổn thất
            không đáng có.
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                - Không bắt kịp xu hướng, thị hiếu khách
              </ListItemText>
              <ListItemText disableTypography>- Xác định sai khách hàng mục tiêu</ListItemText>
              <ListItemText disableTypography>- Vấn đề an toàn thực phẩm</ListItemText>
              <ListItemText disableTypography>
                - Giá cả không hợp lý so với mặt bằng chung
              </ListItemText>
              <ListItemText disableTypography>- Trộm cắp, lừa đảo</ListItemText>
              <ListItemText disableTypography>- Thực phẩm dễ hư hỏng</ListItemText>
              <ListItemText disableTypography>- Thiệt hại do cháy nổ</ListItemText>
            </List>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            2. Lĩnh vực giáo dục
          </Typography>
          <ContentStyle>
            Kinh doanh theo mô hình nhượng quyền có rất nhiều thuận lợi nhưng rủi ro không hề ít.
            Nhượng quyền giáo dục lại càng nhiều rủi ro hơn do đây là một lĩnh vực khá mới và nó
            cũng cần nhiều yếu tố cấu thành để có thể thành công.
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                - Khó khăn trong việc xây dựng giáo trình
              </ListItemText>
              <ListItemText disableTypography>- Gây nên sự xung đột văn hóa</ListItemText>
              <ListItemText disableTypography>
                - Cạnh tranh mạnh trong tất cả phân khúc
              </ListItemText>
              <ListItemText disableTypography>- Rủi ro về chính sách pháp luật</ListItemText>
              <ListItemText disableTypography>- Cạnh tranh với giáo dục công lập</ListItemText>
              <ListItemText disableTypography>- Dân số trẻ ngày càng giảm sút</ListItemText>
              <ListItemText disableTypography>- Khan hiếm giáo viên có năng lực</ListItemText>
            </List>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            3. Lĩnh vực làm đẹp
          </Typography>
          <ContentStyle>
            Làm đẹp, thẩm mỹ là một ngành có ềm năng phát triển rất mạnh mẽ, thế nhưng kèm theo đó
            cũng là những rủi ro lớn, khiến nhà quản lý dễ mắc phải sai lầm ngay từ những bước đi
            đầu tiên.
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                - Khó khăn trong quản lý doanh thu và chi phí
              </ListItemText>
              <ListItemText disableTypography>- Quảng cáo marketing không hiệu quả</ListItemText>
              <ListItemText disableTypography>- Tuyển chọn nhân viên thiếu kỹ năng</ListItemText>
              <ListItemText disableTypography>- Thiết kế không gian chưa phù hợp</ListItemText>
              <ListItemText disableTypography>- Lựa chọn mỹ phẩm kém chất lượng</ListItemText>
              <ListItemText disableTypography>- Không có khả năng xử lý khủng hoảng</ListItemText>
            </List>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            4. Lĩnh vực quầy tiện ích
          </Typography>
          <ContentStyle>
            Trong kinh doanh sẽ luôn có rủi ro, đặc biệt với ngành hàng bách hóa, càng nhiều mặt
            hàng thì càng nhiều rủi ro và nhiều vấn đề cần phải giải quyết.
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                - Lừa đảo trưng bày sản phẩm giả mạo, kém chất lượng
              </ListItemText>
              <ListItemText disableTypography>- Lượng hàng tồn kho lớn</ListItemText>
              <ListItemText disableTypography>
                - Nhân viên sale tăng giá và ngắt cắt chương trình công ty
              </ListItemText>
              <ListItemText disableTypography>- Nhân viên giao hàng giao thiếu hàng</ListItemText>
              <ListItemText disableTypography>- Dễ mất trộm hàng hóa cửa hàng</ListItemText>
              <ListItemText disableTypography>
                - Khó khăn trong việc quản lý hàng hóa và các chi phí
              </ListItemText>
            </List>
          </ContentStyle>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Typography variant="h3" sx={{ py: 1 }}>
            1. Lĩnh vực ăn uống
          </Typography>
          <ContentStyle>
            Khi bắt đầu thực hiện dự án trong lĩnh vực ăn uống, có thể do chưa có nhiều kinh nghiệm
            và trang bị đầy đủ kiến thức, bên chủ dự án sẽ dễ “sa chân” vào những rủi ro, tổn thất
            không đáng có.
            <List dense sx={{ lineHeight: 2 }}>
              <ListItemText disableTypography>
                - Không bắt kịp xu hướng, thị hiếu khách
              </ListItemText>
              <ListItemText disableTypography>- Xác định sai khách hàng mục tiêu</ListItemText>
              <ListItemText disableTypography>- Vấn đề an toàn thực phẩm</ListItemText>
              <ListItemText disableTypography>
                - Giá cả không hợp lý so với mặt bằng chung
              </ListItemText>
              <ListItemText disableTypography>- Trộm cắp, lừa đảo</ListItemText>
              <ListItemText disableTypography>- Thực phẩm dễ hư hỏng</ListItemText>
              <ListItemText disableTypography>- Thiệt hại do cháy nổ</ListItemText>
            </List>
          </ContentStyle>
        </Grid>
      </Container>
    </Page>
  );
}

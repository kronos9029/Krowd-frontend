import { Container, Typography } from '@mui/material';
//
import { alpha, useTheme, styled } from '@mui/material/styles';
import { MotionInView } from '../../animate';

// ----------------------------------------------------------------------

// const ContentStyle = styled('div')(({ theme }) => ({
//   maxWidth: '100%',
//   margin: 'auto',
//   overflow: 'hidden',
//   paddingBottom: theme.spacing(10),
//   borderRadius: theme.shape.borderRadiusMd,
//   backgroundImage: `linear-gradient(135deg,
//     ${theme.palette.primary.main} 0%,
//     ${theme.palette.primary.dark} 100%)`,
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//     maxWidth: '100%',
//     paddingBottom: 0,
//     alignItems: 'center'
//   }
// }));

// ----------------------------------------------------------------------

export default function LandingLegal() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <Container maxWidth="lg">
      <MotionInView sx={{ mb: 12, color: isLight ? 'black' : 'white' }}>
        <Typography style={{ paddingTop: '4rem' }}>
          Đầu tư luôn hàm chứa những rủi ro có thể kể đến như rủi ro mất đi các khoản đầu tư, rủi ro
          về tính thanh khoản, khoản đầu tư có thể bị pha loãng... Vui lòng tham khảo chi tiết nội
          dung mục "Cảnh báo về rủi ro đầu tư" trước khi thực hiện đầu tư chỉ nên thực hiện khi mỗi
          nhà đầu tư tùy từng trường hợp cụ thể mỗi nhà nhà đầu tư nhận thức rõ ràng rủi ro hàm
          chứa. Nghĩa vụ thuế là khác nhau cho đầu tư có trách nhiệm tự thực hiện nghĩa vụ thuế liên
          quan.
        </Typography>
        <Typography style={{ paddingTop: '2rem' }}>
          Trang web này thuộc về Krowd. Chúng tôi cam kết không đưa ra trước bất kỳ lời chào mời đầu
          tư hay quảng bá đầu tư cho công ty nào trong danh mục. Không có bất kỳ nội dung nào trên
          trang web hoặc các phương thức thông tin của Krowd dến người dùng là lời mời chào đầu tư,
          mua bán hay dẫn dụ người dùng. Chúng tôi cũng không đưa ra những lời tư vấn về tài chính,
          pháp lý hay thuế cho nhà dầu tư dưới bất kỳ hình thức nào. Nếu có bất kỳ câu hỏi nào liên
          quan đến các vấn đề trên, chúng tôi khuyến nghị vui lòng tìm đến những nhà tư vấn chuyên
          nghiệp của từng lĩnh vực.
        </Typography>
        <Typography style={{ paddingTop: '2rem' }}>
          Tất cả thông tin về các công ty khởi nghiệp là do nhà sáng lập cung cấp và Krowd cũng tiến
          hành nhữmg quy trình nội bộ để kiểm duyệt thông tin này. Tuy nhiên, Krowd khuyến nghị nhà
          đầu tư nên tìm hiểu thư điện tử và đối chiếu thông tin một cách trực tiếp với nhà sáng
          lập. Về bản chất , quy trình kiểm duyệt của chúng tôi không phải là một đợt kiểm toán nội
          bộ nên tồn tại rủi ro về những sai sót trong thông tin và trách nhiệm trước tiên thuộc về
          công ty khởi nghiệp.
        </Typography>
      </MotionInView>
    </Container>
  );
}

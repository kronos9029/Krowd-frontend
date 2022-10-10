//-----------------
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';
import { OrderCompleteIllustration, PageNotFoundIllustration, SuccessIlustation } from '../assets';
import { useEffect, useState } from 'react';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));
const SuccessIlustation2 = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0, 4, 0),
  backgroundImage: `url(${SuccessIlustation})`,
  backgroundSize: 'cover'
}));
// ----------------------------------------------------------------------

export default function PageSuccess() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      navigate('/dashboard/banking');
    }
    console.log('1 second', count);
  }, [count]);

  return (
    <RootStyle title="Success | Krowd">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Giao dịch hoàn thành
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Chúng tôi sẽ quay lại ví của bạn trong vòng {count} giây. <br />
              Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào thì vui lòng liên hệ với chúng tôi. <br />{' '}
              <br /> Chúc bạn một ngày vui vẻ,
            </Typography>

            <motion.div variants={varBounceIn}>
              <SuccessIlustation2 sx={{ height: 460 }}></SuccessIlustation2>
            </motion.div>

            <Button to="/dashboard/banking" size="large" variant="contained" component={RouterLink}>
              Trở về ví của bạn
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}

//-----------------
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';
import { OrderCompleteIllustration, PageNotFoundIllustration } from '../assets';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
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
      navigate('/');
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
                Bạn đã thanh toán thành công
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Chúng tôi sẽ quay lại trang chủ trong vòng {count} giây. <br />
              Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào thì vui lòng liên hệ với chúng tôi. <br />{' '}
              <br /> Chúc mọi điều tốt lành,
            </Typography>

            <motion.div variants={varBounceIn}>
              <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />
            </motion.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Trở về trang chủ
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}

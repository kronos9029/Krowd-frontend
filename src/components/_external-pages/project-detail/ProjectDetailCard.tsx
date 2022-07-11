import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography
} from '@mui/material';
import { Project } from '../../../@types/krowd/project';
import { fCurrency } from 'utils/formatNumber';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#14B7CC'
  }
}));
const LargeImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%'
  // position: 'absolute'
}));

function ProjectDetailCard({ p }: { p: Project }) {
  return (
    <Grid container>
      <Grid
        // px={{ lg: 3, md: 5, sm: 5, xs: 2 }}
        sx={{ pr: 5 }}
        py={{ lg: 5, md: 3, sm: 3 }}
        item
        xs={12}
        sm={12}
        md={7}
        lg={8}
      >
        <Box sx={{ cursor: 'zoom-in', position: 'relative' }}>
          <LargeImgStyle alt="large image" src={p.image} />
        </Box>
      </Grid>
      <Grid
        px={{ lg: 5, md: 5, sm: 5, xs: 2 }}
        py={{ lg: 5, md: 3, sm: 3, xs: 3 }}
        item
        xs={12}
        sm={12}
        md={5}
        lg={4}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '0.5rem'
            }}
          >
            <Typography
              paragraph
              sx={{
                color: '#251E18',
                marginBottom: '0.2rem'
              }}
            >
              <strong>Đã đầu tư</strong>
            </Typography>
            <Typography
              paragraph
              sx={{
                color: '#251E18',
                marginBottom: '0.2rem'
              }}
            >
              <strong>Mục tiêu</strong>
            </Typography>
          </Box>
          <BorderLinearProgress
            variant="determinate"
            value={(p && (p.investedCapital / p.investmentTargetCapital) * 100) ?? 0}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              my: '0.5rem'
            }}
          >
            <Typography
              paragraph
              sx={{
                color: '#14B7CC'
              }}
            >
              <strong>{fCurrency(p.investedCapital)}</strong>
            </Typography>
            <Typography
              paragraph
              sx={{
                color: '#FF7F56'
              }}
            >
              <strong>{fCurrency(p.investmentTargetCapital)}</strong>
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderStyle: 'dashed', color: 'text.disabled' }} variant="middle" />

        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
            {p.multiplier}
            <span>%</span>
            <Typography>Doanh thu chia sẻ</Typography>
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed', color: 'text.disabled' }} variant="middle" />

        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
            <span>x</span>
            {p.multiplier}
            <Typography>Hệ số nhân</Typography>
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed', color: 'text.disabled' }} variant="middle" />

        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
            {p.duration} <span> tháng </span>
            <Typography>Thanh toán đầu tư</Typography>
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed', color: 'text.disabled' }} variant="middle" />

        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mt: 0.2, fontSize: '25px', fontWeight: '900' }}>
            {p.numOfStage} <span> kì</span>
            <Typography>Số kì thanh toán</Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            sx={{ backgroundColor: '#FF7F50', '&:hover': { backgroundColor: '#FF7F50' } }}
            disableElevation
            disableRipple
            fullWidth={true}
            variant="contained"
            size="large"
            href="#__investmentPackage"
          >
            Đầu tư ngay
          </Button>
        </Box>
        {/*                 <Divider sx={{ borderStyle: 'dashed', color: 'text.disabled' }} variant="middle" />
         */}
        {/* <Box
                    sx={{
                      my: 3,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                      Doanh nghiệp
                    </Typography>
                    <Typography sx={{ mt: 0.2 }}>{p.business.name}</Typography>
                  </Box>

                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                      Khu vực
                    </Typography>
                    <Typography sx={{ mt: 0.2 }}>{p.name}</Typography>
                  </Box>

                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                      Địa chỉ
                    </Typography>
                    <Typography sx={{ mt: 0.2 }}>{p.address}</Typography>
                  </Box> */}
      </Grid>
    </Grid>
  );
}
export default ProjectDetailCard;

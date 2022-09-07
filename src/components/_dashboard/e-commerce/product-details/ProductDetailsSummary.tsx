import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';

import { useFormik, Form, FormikProvider, useField } from 'formik';

import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Tooltip,
  Divider,
  Typography,
  LinearProgress,
  linearProgressClasses
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import { MIconButton } from '../../../@material-extend';
import { Product, CartItem } from '../../../../@types/products';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------
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
// const Incrementer = ({ name, available }: { name: string; available: number }) => {
//   const [field, , helpers] = useField(name);
//   const { value } = field;
//   const { setValue } = helpers;

//   const incrementQuantity = () => {
//     setValue(value + 1);
//   };
//   const decrementQuantity = () => {
//     setValue(value - 1);
//   };

//   return (
//     <Box
//       sx={{
//         py: 0.5,
//         px: 0.75,
//         border: 1,
//         lineHeight: 0,
//         borderRadius: 1,
//         display: 'flex',
//         alignItems: 'center',
//         borderColor: 'grey.50032'
//       }}
//     >
//       <MIconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
//         <Icon icon={minusFill} width={16} height={16} />
//       </MIconButton>
//       <Typography
//         variant="body2"
//         component="span"
//         sx={{
//           width: 40,
//           textAlign: 'center',
//           display: 'inline-block'
//         }}
//       >
//         {value}
//       </Typography>
//       <MIconButton
//         size="small"
//         color="inherit"
//         disabled={value >= available}
//         onClick={incrementQuantity}
//       >
//         <Icon icon={plusFill} width={16} height={16} />
//       </MIconButton>
//     </Box>
//   );
// };

type ProductDetailsSumaryprops = {
  product: Product;
  cart: CartItem[];
  onAddCart: (cartItem: CartItem) => void;
  onGotoStep: (step: number) => void;
};

export default function ProductDetailsSummary({
  product,
  cart,
  onAddCart,
  onGotoStep,
  ...other
}: ProductDetailsSumaryprops) {
  const navigate = useNavigate();
  const { id, name, sizes, price, cover, status, colors, available } = product;

  const alreadyProduct = cart.map((item) => item.id).includes(id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      name,
      cover,
      available,
      price,
      color: colors[0],
      size: sizes[4],
      quantity: available < 1 ? 0 : 1
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        if (!alreadyProduct) {
          onAddCart({
            ...values,
            subtotal: values.price * values.quantity
          });
        }
        setSubmitting(false);
        onGotoStep(0);
        navigate(PATH_DASHBOARD.eCommerce.checkout);
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  let totalBudget = Math.floor(Math.random() * 100000000);
  let currentBudget = Math.floor(Math.random() * totalBudget);
  let ratio = Math.floor((currentBudget / totalBudget) * 100);

  return (
    <RootStyle {...other}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography
            variant="overline"
            sx={{
              mb: 1,
              display: 'block',
              color: status === 'Đang hoạt động' ? 'error.main' : 'info.main'
            }}
          >
            {status}
          </Typography>

          <Typography variant="h5" paragraph>
            {name}
          </Typography>

          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
              Thuộc doanh nghiệp
            </Typography>
            <Typography sx={{ mt: 0.2 }}>GS 25</Typography>
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
              Thuộc Khu vực:
            </Typography>
            <Typography sx={{ mt: 0.2 }}>TP HCM</Typography>
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
              Địa chỉ:
            </Typography>
            <Typography sx={{ mt: 0.2 }}>Quận 12</Typography>
          </Box>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
              Doanh thu chia sẻ (%)
            </Typography>
            <Typography sx={{ mt: 0.2 }}>7%</Typography>
          </Box>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
              Thành viên đã tham gia
            </Typography>
            <Typography sx={{ mt: 0.2 }}>12</Typography>
          </Box>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
              Hệ số nhân
            </Typography>
            <Typography sx={{ mt: 0.2 }}>1.7</Typography>
          </Box>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
              Thời hạn
            </Typography>
            <Typography sx={{ mt: 0.2 }}>2 month</Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box my={1}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <Typography
                paragraph
                sx={{
                  color: '#251E18'
                }}
              >
                <strong>Đã đầu tư</strong>
              </Typography>
              <Typography
                paragraph
                sx={{
                  color: '#251E18'
                }}
              >
                <strong>Mục tiêu</strong>
              </Typography>
            </Box>
            <BorderLinearProgress sx={{ my: 0 }} variant="determinate" value={ratio} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <Typography
                paragraph
                sx={{
                  color: '#14B7CC'
                }}
              >
                <strong>{fCurrency(currentBudget)}</strong>
              </Typography>
              <Typography
                paragraph
                sx={{
                  color: '#FF7F56'
                }}
              >
                <strong>{fCurrency(totalBudget)}</strong>
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 1, textAlign: 'center' }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}

import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// @types
import { ProductState } from '../../../../@types/products';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity
} from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
//
import Scrollbar from '../../../Scrollbar';
import EmptyContent from '../../../EmptyContent';
import CheckoutPackageSummary from './CheckoutPackageSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

export default function CheckoutPackage() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state: { product: ProductState }) => state.product);
  const { cart, total, discount, subtotal } = checkout;
  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId: string) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value: number) => {
    dispatch(applyDiscount(value));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        handleNextStep();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => item.quantity));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Gói đã chọn
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} gói)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <Scrollbar>
                  <CheckoutProductList
                    products={values.products}
                    onDelete={handleDeleteCart}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title="Bạn chưa chọn gói nào"
                  description="Có vẻ như bạn không có gói nào"
                  img="/static/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>

            <Button
              color="inherit"
              component={RouterLink}
              to={'/details'}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Trở về
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutPackageSummary
              total={total}
              enableDiscount
              discount={discount}
              subtotal={subtotal}
              // onApplyDiscount={handleApplyDiscount}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              // disabled={values.products.length === 0}
            >
              Thanh toán
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

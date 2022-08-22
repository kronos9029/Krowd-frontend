import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCart, createBilling } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
// @types
import { ProductState } from '../../@types/products';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  CheckoutPackage,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress
} from '../../components/_dashboard/e-commerce/checkout';
import KrowdPackage from 'pages/KrowdPackage';

// ----------------------------------------------------------------------

const STEPS = ['Gói ưu đãi', 'Gói đã chọn', 'Thanh toán'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main
    }
  }
}));

function QontoStepIcon({ active, completed }: { active: boolean; completed: boolean }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled'
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

export default function PackageVoucherCheckout() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { checkout } = useSelector((state: { product: ProductState }) => state.product);
  const { cart, billing, activeStep } = checkout;
  const isComplete = activeStep === 2;
  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);
  console.log('activeS', activeStep);
  return (
    <Page title="Gói ưu đãi | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container sx={{ py: 10 }} justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {!isComplete ? (
          <>
            {activeStep === 0 && <CheckoutPackage />}
            {activeStep === 1 && <CheckoutBillingAddress />}
            {/* {activeStep === 1 && <CheckoutPackage />} */}
            {/* {activeStep === 2 && <CheckoutBillingAddress />} */}
            {activeStep === 2 && billing && <CheckoutPayment />}
          </>
        ) : (
          <CheckoutOrderComplete open={isComplete} />
        )}
      </Container>
    </Page>
  );
}

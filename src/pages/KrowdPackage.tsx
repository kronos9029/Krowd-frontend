// material
import {
  Divider,
  Container,
  Grid,
  Box,
  Typography,
  styled,
  CircularProgress,
  TextField,
  Stack,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Input
} from '@mui/material';

// redux
import { dispatch, RootState, useSelector } from 'redux/store';
// icons
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// material
import { Button, Toolbar } from '@mui/material';
// components
import Page from 'components/Page';
import { ProjectDetailDocument } from 'components/_external-pages/project-detail/index';

import { useEffect, useState } from 'react';
//Language
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import {
  getPackageBYID,
  getProjectListById,
  getProjectPackage
} from 'redux/slices/krowd_slices/project';
import { getAllProjectStage, getProjectStageList } from 'redux/slices/krowd_slices/stage';
import { Icon } from '@iconify/react';
import lockFill from '@iconify/icons-ant-design/lock-outline';
import useAuth from 'hooks/useAuth';
import { getUserKrowdDetail } from 'redux/slices/krowd_slices/investor';
import UserAccountForm from './dashboard/AccountManager/UserAccountForm';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import { REACT_APP_API_URL } from 'config';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { fCurrency, fCurrencyPackage } from 'utils/formatNumber';
import { LoadingButton } from '@mui/lab';
import eyeFill from '@iconify/icons-eva/eye-fill';
import refresh from '@iconify/icons-eva/refresh-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-2-fill';
import checkFill from '@iconify/icons-eva/checkmark-fill';
import check2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import redFill from '@iconify/icons-eva/alert-triangle-fill';
import alertFill from '@iconify/icons-eva/alert-triangle-outline';
import { MIconButton } from 'components/@material-extend';
import { getWalletList } from 'redux/slices/krowd_slices/wallet';
import { PATH_PAGE } from 'routes/paths';
import { Package } from '../@types/krowd/project';

// ----------------------------------------------------------------------

const LIST_TERM = styled('div')(({}) => ({
  borderTop: '1px solid #e0e0e0',
  border: '1px solid #e0e0e0',
  color: '#000',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '1.2rem',
  padding: '10px 14px 12px'
}));

const Language = [
  {
    code: 'vi',
    name: 'English',
    countryCode: 'vi'
  },
  {
    code: 'en',
    name: 'Vietnamese',
    countryCode: 'en'
  }
];

export default function KrowdPackage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showCurrency, setShowCurrency] = useState(true);
  const [showIDPayment, setShowIDPayment] = useState(true);
  const [openModalInvestSuccess, setOpenModalInvestSuccess] = useState(false);
  const [openModalInvestError, setOpenModalInvestError] = useState(false);
  const { id = '' } = useParams();

  //DATA RESPONSE SUCCESS
  const [resPaymentID, setDataInvestedIDPAY] = useState('');
  const [resQuality, setDataInvestedQuality] = useState('');
  const [resWalletName, setDataInvestedfromWalletName] = useState('');
  const [resFee, setDataInvestedfee] = useState('');
  const [resDate, setDataInvestedDate] = useState('');
  const [dataInvestedSuccess, setDataInvestedSuccess] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const onToggleShowCurrency = () => {
    setShowCurrency((prev) => !prev);
  };
  const onToggleShowIDPayment = () => {
    setShowIDPayment((prev) => !prev);
  };

  //--------------------GET DATA----------------------------
  useEffect(() => {
    dispatch(getUserKrowdDetail(user?.id));
    dispatch(getProjectListById(id));
    dispatch(getWalletList());
    dispatch(getProjectPackage(id));
  }, [dispatch]);

  //--------------------ROOT STATE-------------------------
  //--------------------GET MAIN USER (INVESTOR)------------
  const { investorKrowdDetail: mainInvestor, isLoading } = useSelector(
    (state: RootState) => state.user_InvestorStateKrowd
  );
  //--------------------PROJECT-----------------------------
  const { detailOfProject, packageLists, projectPackageDetails } = useSelector(
    (state: RootState) => state.project
  );
  const { detailOfProjectID: projectID, isLoadingDetailOfProjectID } = detailOfProject;
  //-------------------WALLET BALANCE------------------------
  const { walletList } = useSelector((state: RootState) => state.walletKrowd);
  const { listOfInvestorWallet } = walletList;
  //-------------------PACKAGE-------------------------------
  const { PackageDetails } = projectPackageDetails;
  const { isPackageLoading } = packageLists;
  //-------------------LANGUAGE------------------------------
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = Language.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  const handleClickOpenPackage2 = async (v: Package) => {
    dispatch(getPackageBYID({ package_param: v }));
  };

  // const handleClickRefeshBalance = async (v: Package) => {
  //   dispatch(getWalletTypeByID(v.id));
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getEntityList = (type: 'DOCUMENT') => {
    return projectID?.projectEntity.find((pe) => pe.type === type)?.typeItemList;
  };

  const { documents } = {
    documents: getEntityList('DOCUMENT')
  };

  const NewProjectSchema = Yup.object().shape({
    projectId: Yup.string().required('Yêu cầu nhập dự án')
  });
  function getToken() {
    return window.localStorage.getItem('accessToken');
  }

  function getHeaderFormData() {
    const token = getToken();
    return { Authorization: `Bearer ${token}` };
  }
  const formik = useFormik({
    initialValues: {
      projectId: id,
      checkBox: false,
      packageId: PackageDetails?.id,
      quantity: 1
    },
    validationSchema: NewProjectSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const headers = getHeaderFormData();
        await axios
          .post(
            `${REACT_APP_API_URL}/investments`,
            {
              projectId: id,
              packageId: PackageDetails?.id,
              quantity: `${values.quantity}`
            },
            { headers: headers }
          )
          .then((res) => {
            setDataInvestedSuccess(res.data.amount);
            setDataInvestedIDPAY(res.data.id);
            setDataInvestedQuality(res.data.investedQuantity);
            setDataInvestedfromWalletName(res.data.fromWalletName);
            setDataInvestedfee(res.data.fee);
            setDataInvestedDate(res.data.createDate);
            if (res.data.status === 'SUCCESS') {
              setOpenModalInvestSuccess(true);
              enqueueSnackbar('Đầu tư thành công', {
                variant: 'success'
              });
            } else {
              setOpenModalInvestError(true);
              enqueueSnackbar('Cập nhật thất bại', {
                variant: 'error'
              });
            }
          })
          .catch(() => {
            setOpenModalInvestError(true);
            enqueueSnackbar('Cập nhật thất bại', {
              variant: 'error'
            });
          })
          .finally(() => {
            resetForm();
            setSubmitting(true);
          });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });
  const inputProps = {
    step: 1
  };
  const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;
  return (
    <Page title="Chi tiết dự án | Krowd">
      {isLoadingDetailOfProjectID && (
        <Box sx={{ height: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box>
            <CircularProgress
              size={100}
              sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
              Đang tải dữ liệu, vui lòng đợi giây lát...
            </Typography>
          </Box>
        </Box>
      )}
      {!isLoadingDetailOfProjectID && projectID && (
        <>
          <Container maxWidth={'lg'}>
            <Box my={2} pt={'7rem'} sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Typography>
                <img style={{ width: '80px' }} src={projectID.business.image} />
              </Typography>
              <Typography variant="h2">{projectID.name}</Typography>
            </Box>
          </Container>
          <Box sx={{ mb: 5 }}>
            <Divider variant="fullWidth" sx={{ opacity: 0.1 }} />
          </Box>
          <Container maxWidth={'lg'}>
            <Box>
              <Grid container justifyContent="space-between">
                <Grid xs={12} sm={7} md={6} lg={8}>
                  <Container sx={{ maxWidth: 600 }}>
                    <Box>
                      <Grid container justifyContent="space-between" alignItems={'baseline'}>
                        <Grid lg={6}>
                          <Typography variant="h3">
                            {t(`Project_package_invest.InvestmentAmount`)}
                          </Typography>
                        </Grid>
                        {listOfInvestorWallet && (
                          <Grid>
                            <Typography variant="h5"> Số tiền trong ví của bạn</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography sx={{ typography: 'h5' }}>
                                {showCurrency
                                  ? '********'
                                  : listOfInvestorWallet.at(1)?.balance &&
                                    fCurrency(`${listOfInvestorWallet.at(1)?.balance}`)}
                              </Typography>
                              <MIconButton
                                color="inherit"
                                onClick={onToggleShowCurrency}
                                sx={{ opacity: 0.48 }}
                                // onClickCapture={() => setBalance(e.balance)}
                              >
                                <Icon icon={showCurrency ? eyeFill : eyeOffFill} />
                              </MIconButton>
                            </Stack>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                    <Box sx={{ pt: 1.5, maxWidth: 600 }}>
                      {t(`Project_package_invest.InvestPaymentsHead`)}
                    </Box>
                    <Box sx={{ pt: 1.5 }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 3, sm: 2 }}
                        sx={{ pb: 3 }}
                      >
                        <TextField
                          sx={{ width: 600 }}
                          disabled
                          label="Chọn gói của bạn muốn đầu tư"
                          value={PackageDetails?.name ?? 'Lựa chọn gói bạn muốn'}
                        />

                        <TextField
                          sx={{ width: 300 }}
                          disabled
                          label="Giá"
                          value={(PackageDetails?.price && fCurrency(PackageDetails!.price)) ?? 0}
                        />

                        <TextField
                          sx={{ width: 300 }}
                          disabled
                          label="Số gói còn lại"
                          value={
                            (PackageDetails?.remainingQuantity &&
                              PackageDetails?.remainingQuantity) ??
                            ''
                          }
                        />
                      </Stack>
                      {PackageDetails?.price && PackageDetails?.price >= 2000000 ? (
                        <Input
                          type={'number'}
                          sx={{
                            border: '2px solid #ff8500ad',
                            borderRadius: 1,
                            width: 400,
                            height: 60,
                            p: 2
                          }}
                          endAdornment={'Gói'}
                          disableUnderline
                          id="basic-input"
                          {...getFieldProps('quantity')}
                          value={values.quantity}
                        />
                      ) : (
                        <Input
                          sx={{
                            border: '2px solid #0af50a85',
                            borderRadius: 1,
                            width: 400,
                            height: 60,
                            p: 2
                          }}
                          endAdornment={'Gói'}
                          disableUnderline
                          id="basic-input"
                          {...getFieldProps('quantity')}
                          value={values.quantity}
                        />
                      )}
                      {PackageDetails?.price && PackageDetails?.price < 2000000 ? (
                        <Box sx={{ display: 'flex', mt: 2 }}>
                          <Box>
                            <Icon height={20} width={20} icon={checkFill} color={'#00cc17'} />
                          </Box>
                          <Box>
                            <Typography>
                              Hiện tại bạn đang chọn gói {fCurrency(PackageDetails?.price)}.
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', mt: 2 }}>
                          <Box>
                            <Icon height={20} width={20} icon={alertFill} color={'#ff8500ad'} />
                          </Box>
                          <Box>
                            <Typography>
                              Đây là gói "{PackageDetails?.name}". Tùy thuộc vào thu nhập và giá trị
                              ròng của bạn, bạn có thể đủ điều kiện cho giới hạn đầu tư cao hơn. Hãy
                              cân nhắc về tài chính trước khi đầu tư.
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ pt: 1.5, pb: 3, maxWidth: 600 }}>
                      {t(`Project_package_invest.InvestMyself`)}
                    </Box>
                    <Divider sx={{ mt: 7, maxWidth: 600 }} />
                  </Container>
                  <Container sx={{ p: 5 }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="h3">
                        {t(`Project_package_invest.PersonalInformation`)}
                        <Icon
                          style={{ marginLeft: '7px' }}
                          icon={lockFill}
                          height={20}
                          width={20}
                        />
                      </Typography>
                    </Box>
                    <Box sx={{ pt: 1.5, maxWidth: 600 }}>
                      {t(`Project_package_invest.PrivatePersonalInfomation`)}
                    </Box>

                    <Box sx={{ pt: 3, pb: 7 }}>
                      <Button variant="contained" onClick={handleClickOpen}>
                        {t(`Project_package_invest.ConfirmInformation`)}
                        {mainInvestor && (
                          <UserAccountForm user={mainInvestor} open={open} onClose={handleClose} />
                        )}
                      </Button>
                    </Box>
                    <Divider sx={{ mt: 7, maxWidth: 600 }} />
                  </Container>

                  <Container sx={{ p: 5 }}>
                    <Box>
                      <Typography variant="h3"> {t(`Project_package_invest.Terms`)}</Typography>
                    </Box>
                    <Box sx={{ pt: 1.5, pb: 1.5, maxWidth: 600 }}>
                      <LIST_TERM>
                        I understand that I can cancel my investment up until 01/17/23 (48 hours
                        prior to the deal deadline)
                      </LIST_TERM>
                      <LIST_TERM>
                        I understand that Republic will receive cash and security commission based
                        on these rates
                      </LIST_TERM>
                      <LIST_TERM>
                        I understand I will not have voting rights and will grant a third-party
                        nominee broad authority to act on my behalf.
                      </LIST_TERM>
                      <LIST_TERM>
                        I understand I may never become an equity holder, only a beneficial owner of
                        equity interest in the Company.
                      </LIST_TERM>
                      <LIST_TERM>
                        I understand that investing this amount into several deals would better
                        diversify my risk
                      </LIST_TERM>
                      <LIST_TERM>
                        I understand that there is no guarantee of a relationship between Republic
                        and AlphaFlow: Pre-Series B post-offering{' '}
                      </LIST_TERM>
                      <LIST_TERM>
                        I consent to electronic delivery of all documents, notices and agreements as
                        related to my investment
                      </LIST_TERM>
                      <LIST_TERM>
                        I understand my investment won't be transferable for 12 months and may not
                        have a market for resale
                      </LIST_TERM>
                      <LIST_TERM>
                        I have read the educational materials and agree to the Terms of Service,
                        including arbitration provisions{' '}
                      </LIST_TERM>
                      <LIST_TERM>
                        I understand this investment is risky and that I shouldn't invest unless I
                        can afford to lose all invested funds
                      </LIST_TERM>
                      <LIST_TERM>
                        I understand I am responsible for all fees and charges associated with the
                        use of my payment method
                      </LIST_TERM>
                      <LIST_TERM>
                        I confirm that this investment, together with all my other Regulation
                        Crowdfunding investments during the past 12 months on any crowdfunding
                        portal, does not exceed my investment limit
                      </LIST_TERM>
                      <LIST_TERM>
                        <Box sx={{ display: 'flex' }}>
                          <TextField
                            type={'checkbox'}
                            sx={{ width: '1.5rem' }}
                            {...getFieldProps('checkBox')}
                          />
                          <Typography sx={{ pl: 3 }}>
                            I have readand accept the terms of investment
                          </Typography>
                        </Box>
                      </LIST_TERM>
                    </Box>
                  </Container>
                  <Container sx={{ p: 5 }}>
                    <Box>
                      <Typography variant="h3">
                        {t(`Project_package_invest.AdditionalInformation`)}
                      </Typography>
                    </Box>
                    <Box sx={{ pt: 1.5, pb: 1.5 }}>
                      {t(`Project_package_invest.DesOfAdditionalInformation`)}
                    </Box>
                    <Box
                      sx={{
                        pt: 1.5,
                        pb: 1.5,
                        backgroundColor: '#8080801c',
                        borderRadius: '5px',
                        maxWidth: 600
                      }}
                    >
                      <Box sx={{ p: 2 }}>
                        Vui lòng hoàn thành các câu hỏi sau để đảm bảo bạn có thể tham gia vào chiến
                        dịch này và với mục đích hoàn thành Biểu mẫu W-9 hoặc Mẫu W-8BEN để tuân thủ
                        các yêu cầu báo cáo thuế. Những tuyên bố này được thực hiện theo hình phạt
                        khai man và sẽ được sử dụng để điền vào thỏa thuận đăng ký của bạn.
                      </Box>
                      <Box sx={{ px: 2, pt: 1, pb: 2 }}>
                        Những câu hỏi này là tóm tắt các câu hỏi trên Mẫu Đơn W-9 hoặc Mẫu Đơn
                        W-8BEN, nếu có. Nếu nghi ngờ, vui lòng tham khảo Biểu mẫu W-9 hoặc Mẫu đơn
                        thay thế W-8BEN được bao gồm trong Thỏa thuận đăng ký trong Mẫu C.
                      </Box>
                    </Box>
                    <Divider sx={{ mt: 7, maxWidth: 600 }} />
                    {listOfInvestorWallet &&
                      listOfInvestorWallet.slice(1, 2).map((e, i) => (
                        <Grid key={i}>
                          <Typography variant="h5"> Cập nhật số dư ví</Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Button
                              color="inherit"
                              sx={{ opacity: 0.48 }}
                              // onClick={() => handleClickRefeshBalance(e)}
                            >
                              <Icon icon={refresh} />
                            </Button>
                            <Typography>
                              {fCurrency(`${listOfInvestorWallet.at(1)?.balance}`)}
                            </Typography>
                          </Stack>
                        </Grid>
                      ))}
                    {PackageDetails?.price &&
                    values.checkBox &&
                    values.quantity > 0 &&
                    listOfInvestorWallet.at(1)!.balance >=
                      PackageDetails!.price * values.quantity ? (
                      // {values.checkBox ? (
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', width: 600 }}>
                        <FormikProvider value={formik}>
                          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <LoadingButton
                              sx={{ width: 600 }}
                              type="submit"
                              variant="contained"
                              loading={isSubmitting}
                            >
                              Xác nhận đầu tư {''} vào {projectID.name} với số tiền{' '}
                              {PackageDetails?.price &&
                                fCurrency(PackageDetails?.price * values.quantity)}{' '}
                            </LoadingButton>
                          </Form>
                        </FormikProvider>
                      </Box>
                    ) : (
                      <>
                        <Box
                          sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', width: 600 }}
                        >
                          <FormikProvider value={formik}>
                            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                              <LoadingButton
                                sx={{ width: 600 }}
                                type="submit"
                                disabled
                                variant="contained"
                                loading={isSubmitting}
                              >
                                Xác nhận đầu tư {''}{' '}
                                {PackageDetails?.price &&
                                  fCurrency(PackageDetails?.price * values.quantity)}{' '}
                              </LoadingButton>
                            </Form>
                          </FormikProvider>
                        </Box>

                        <Box>
                          {PackageDetails?.price &&
                            listOfInvestorWallet.at(1)?.balance &&
                            listOfInvestorWallet.at(1)!.balance <
                              PackageDetails!.price * values.quantity && (
                              <Box sx={{ my: 3, mx: 3, width: 570 }}>
                                <Box sx={{ display: 'flex', mt: 2 }}>
                                  <Box>
                                    <Icon height={20} width={20} icon={alertFill} color={'red'} />
                                  </Box>
                                  <Box>
                                    <Typography color={'red'} sx={{ ml: 1.4, mb: 1 }}>
                                      Bạn không đủ tiền đê đàu tư vui lòng nạp vào ví Krowd bên dưới
                                    </Typography>
                                  </Box>
                                </Box>
                                <Typography sx={{ textAlign: 'end' }}>
                                  <Button variant="contained" href={PATH_PAGE.pageTopUp}>
                                    Nạp tiền
                                  </Button>
                                </Typography>
                              </Box>
                            )}
                        </Box>
                      </>
                    )}
                  </Container>
                </Grid>
                <Grid xs={12} sm={4} md={5} lg={3}>
                  {(isPackageLoading && (
                    <Box>
                      <CircularProgress
                        size={100}
                        sx={{ margin: '0px auto', padding: '1rem', display: 'flex' }}
                      />
                      <Typography variant="h5" sx={{ textAlign: 'center', padding: '1rem' }}>
                        Đang tải dữ liệu, vui lòng đợi giây lát...
                      </Typography>
                    </Box>
                  )) || (
                    <Grid sx={{ mt: 1, my: 1 }}>
                      <Typography variant="h3">Gói đầu tư</Typography>
                      {packageLists.listOfPackage &&
                        packageLists.listOfPackage.length > 0 &&
                        packageLists.listOfPackage.map((e, index) => (
                          <Grid sx={{ p: 2 }} item key={index} xs={12} sm={12} md={12} lg={12}>
                            <Grid
                              container
                              sx={{
                                color: 'primary.main',
                                display: 'flex'
                              }}
                            >
                              <Grid xs={8} sm={8} md={8} lg={8}>
                                <Typography
                                  variant="overline"
                                  sx={{ color: 'text.secondary', justifyContent: 'left' }}
                                >
                                  {e.name}
                                </Typography>
                              </Grid>
                              <Grid>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: 'primary.main',
                                    justifyContent: 'right'
                                  }}
                                >
                                  {e.remainingQuantity} / {e.quantity}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                              {index === 1 || index === 2 ? (
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: 'text.secondary' }}
                                ></Typography>
                              ) : (
                                ''
                              )}
                              <Typography variant="h5">
                                {e.price === 0 ? 'Free' : fCurrencyPackage(e.price)} VND
                              </Typography>
                            </Box>

                            <Stack
                              paddingLeft={0}
                              textAlign={'left'}
                              component="ul"
                              spacing={2}
                              sx={{ my: 1, width: 1 }}
                            >
                              {e.descriptionList.map((item, i) => (
                                <Stack
                                  key={i}
                                  component="li"
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                  sx={{
                                    typography: 'body2'
                                  }}
                                >
                                  <Typography variant="body2">{item}</Typography>
                                </Stack>
                              ))}
                            </Stack>
                            <Typography sx={{ textAlign: 'end' }}>
                              <Button
                                variant="contained"
                                onClick={() => handleClickOpenPackage2(e)}
                                sx={{ display: 'right', mb: 2 }}
                              >
                                Chọn gói
                              </Button>
                            </Typography>

                            <Divider variant="fullWidth" />
                          </Grid>
                        ))}
                      {documents && documents.length > 0 && (
                        <ProjectDetailDocument documents={documents} />
                      )}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Container>
        </>
      )}
      <Dialog fullWidth maxWidth="sm" open={openModalInvestSuccess}>
        <DialogTitle sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Icon color="#14b7cc" height={60} width={60} icon={check2Fill} />
        </DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <DialogContentText
              sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'black' }}
            >
              Giao dịch thành công
            </DialogContentText>
          </Box>
          <Stack spacing={{ xs: 2, md: 1 }}>
            <Container sx={{ p: 2 }}>
              <Box>
                <Typography sx={{ textAlign: 'center' }}>
                  Mua thành công {resQuality} {PackageDetails?.name}{' '}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ textAlign: 'center', color: '#14b7cc', fontSize: 35 }}>
                  {fCurrency(`${dataInvestedSuccess}`)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem',
                  p: 1
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Dự án</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>{projectID?.name}</strong>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,

                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',

                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Thời gian</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  {resDate}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Nguồn tiền</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  {resWalletName}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,

                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',

                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Phí giao dịch</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  {resFee}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,

                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',

                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Mã giao dịch</strong>
                </Typography>

                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    <MIconButton
                      color="inherit"
                      onClick={onToggleShowIDPayment}
                      sx={{ opacity: 0.48 }}
                    >
                      <Icon icon={showIDPayment ? eyeFill : eyeOffFill} />
                    </MIconButton>
                    <Typography sx={{ typography: 'body2' }}>
                      {showIDPayment ? '********' : resPaymentID}
                    </Typography>
                  </Stack>
                </Typography>
              </Box>
            </Container>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Box>
              <Button variant="contained" href={`${PATH_PAGE.details}/${projectID?.id}`}>
                Trở về dự án
              </Button>
            </Box>
            {/* <Box>
              <Button
                color="success"
                variant="contained"
                onClick={() => setOpenModalInvestSuccess(false)}
              >
                Xong
              </Button>
            </Box> */}
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm" open={openModalInvestError}>
        <DialogTitle sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Icon color="red" height={60} width={60} icon={redFill} />
        </DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <DialogContentText
              sx={{ textAlign: 'center', fontWeight: 900, fontSize: 20, color: 'black' }}
            >
              Giao dịch không thành công
            </DialogContentText>
          </Box>
          <Stack spacing={{ xs: 2, md: 1 }}>
            <Container sx={{ p: 2 }}>
              <Box>
                <Typography sx={{ textAlign: 'center' }}>
                  Mua thất bại {resQuality} {PackageDetails?.name}{' '}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ textAlign: 'center', color: 'red', fontSize: 35 }}>
                  {fCurrency(`${dataInvestedSuccess}`)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem',
                  p: 1
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Dự án</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>{projectID?.name}</strong>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,

                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',

                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Thời gian</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  {resDate}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',
                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Nguồn tiền</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  {resWalletName}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,

                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',

                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Phí giao dịch</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  {resFee}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  p: 1,

                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18',

                    marginBottom: '0.2rem'
                  }}
                >
                  <strong>Mã giao dịch</strong>
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: '#251E18'
                  }}
                >
                  {resPaymentID}
                </Typography>
              </Box>
            </Container>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Box>
              <Button variant="contained" href={`${PATH_PAGE.details}/${projectID?.id}`}>
                Trở về dự án
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Page>
  );
}

import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  Chip,
  Stack,
  Switch,
  Button,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box
} from '@mui/material';
// utils
import { useNavigate } from 'react-router-dom';
// @types
import { NewPostFormValues } from '../../../@types/blog';
//
import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
import BlogNewPostPreview from './BlogNewPostPreview';
import { dispatch, RootState, useSelector } from 'redux/store';
import { getFieldList } from 'redux/slices/krowd_slices/field';
import { getAreasList } from 'redux/slices/krowd_slices/area';
import Autocomplete from '@mui/material/Autocomplete';
import { PATH_DASHBOARD } from 'routes/paths';
import axios from 'axios';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BusinessProjectForm() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { fieldList } = useSelector((state: RootState) => state.fieldKrowd);
  const { areaList } = useSelector((state: RootState) => state.areaKrowd);
  useEffect(() => {
    dispatch(getFieldList());
    dispatch(getAreasList());
  }, [dispatch]);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required('Yêu cầu nhập tên'),
    businessId: Yup.string().required('Yêu cầu nhập businessId'),
    managerId: Yup.string().required('Yêu cầu nhập managerId'),
    fieldId: Yup.string().required('Yêu cầu nhập fieldId'),
    areaId: Yup.string().required('Yêu cầu nhập areaId'),
    address: Yup.string().required('Yêu cầu nhập địa chỉ'),
    description: Yup.string().min(10).required('Yêu cầu nhập mô tả'),
    investmentTargetCapital: Yup.string().required('Yêu cầu nhập vốn mục tiêu đầu tư'),
    investedCapital: Yup.string().required('Yêu cầu nhập vốn đầu tư'),
    sharedRevenue: Yup.string().required('Yêu cầu nhập doanh thu được chia sẻ'),
    multiplier: Yup.string().required('Yêu cầu nhập hệ số nhân'),
    duration: Yup.string().required('Yêu cầu nhập thời hạn'),
    numOfStage: Yup.string().required('Yêu cầu nhập số kỳ'),
    businessLicense: Yup.string().required('Yêu cầu nhập mã doanh nghiệp'),
    // startDate: Yup.string().required('Yêu cầu nhập mã doanh nghiệp'),
    // endDate: Yup.string().required('Yêu cầu nhập mã doanh nghiệp'),
    image: Yup.mixed().required('Yêu cầu nhập ảnh')
  });

  const formik = useFormik<NewPostFormValues>({
    initialValues: {
      name: '',
      businessId: '9E74278A-F610-11EC-B939-0242AC120002',
      managerId: '00A551DC-0781-11ED-B939-0242AC120002',
      fieldId: '',
      areaId: '',
      address: '',
      description: '',
      investmentTargetCapital: '',
      investedCapital: '',
      sharedRevenue: '',
      multiplier: '',
      duration: '',
      numOfStage: '',
      businessLicense: '',
      startDate: '29/05/2022 00:00:00',
      endDate: '30/05/2022 00:00:00',
      image: null
      // tags: ['Logan'],
      // publish: true,
      // comments: true,
      // metaTitle: '',
      // metaDescription: '',
      // metaKeywords: ['Logan']
    },
    validationSchema: NewProjectSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      //     try {
      //       await axios.post(
      //         `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects`,
      //         values
      //       );
      //       resetForm();
      //       setSubmitting(true);
      //       enqueueSnackbar('Tạo mới thành công', {
      //         variant: 'success'
      //       });
      //       navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessKrowd);
      //     } catch (error) {
      //       console.error(error);
      //       setSubmitting(false);
      //     }
      //   }
      // });
      try {
        const formData = new FormData();
        formData.append('businessId', '9E74278A-F610-11EC-B939-0242AC120002');
        formData.append('managerId', '00A551DC-0781-11ED-B939-0242AC120002');
        formData.append('name', values.name);
        formData.append('fieldId', values.fieldId);
        formData.append('areaId', values.areaId);
        formData.append('address', values.address);
        formData.append('description', values.description);
        formData.append('investmentTargetCapital', values.investmentTargetCapital);
        formData.append('investedCapital', values.investedCapital);
        formData.append('sharedRevenue', values.sharedRevenue);
        formData.append('multiplier', values.multiplier);
        formData.append('duration', values.duration);
        formData.append('startDate', '29/05/2022 00:00:00');
        formData.append('endDate', '30/05/2022 00:00:00');
        formData.append('numOfStage', values.numOfStage);
        formData.append('businessLicense', values.businessLicense);
        formData.append('image', values.image);
        await fetch(
          `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/projects`,
          { method: 'POST', mode: 'cors', body: formData }
        );
        console.log('fromdata', values.name);
        resetForm();
        setSubmitting(true);
        enqueueSnackbar('Tạo mới thành công', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessKrowd);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  console.log(formik);
  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       setFieldValue('image', {
  //         ...file,
  //         preview: URL.createObjectURL(file)
  //       });
  //     }
  //   },
  //   [setFieldValue]
  // );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <LabelStyle>Dự án</LabelStyle>

                  <TextField
                    fullWidth
                    label="Tên"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Mã doanh nghiệp :9161615736481"
                    {...getFieldProps('businessLicense')}
                    error={Boolean(touched.businessLicense && errors.businessLicense)}
                    helperText={touched.businessLicense && errors.businessLicense}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <Stack spacing={3}>
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => {
                        setFieldValue('areaId', newValue);
                      }}
                      options={areaList.map((option) => option.id)}
                      renderInput={(params) => <TextField {...params} label="Khu vực" />}
                    />
                  </Stack>
                  <div>
                    <LabelStyle sx={{ py: 1 }}>Ảnh</LabelStyle>
                    <TextField fullWidth label="Ảnh" type={'file'} {...getFieldProps('image')} />
                    {/* <TextField
                      type="file"
                      name="images"
                      id="imgid"
                      className="imgcls"
                    /> */}
                    {/* <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.image}
                      onDrop={handleDrop}
                      error={Boolean(touched.image && errors.image)}
                    />
                    {touched.image && errors.image && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.image && errors.image}
                      </FormHelperText>
                    )} */}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <LabelStyle sx={{ pb: 1 }}>Doanh thu</LabelStyle>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Vốn đầu tư"
                    {...getFieldProps('investedCapital')}
                    error={Boolean(touched.investedCapital && errors.investedCapital)}
                    helperText={touched.investedCapital && errors.investedCapital}
                  />
                  <TextField
                    fullWidth
                    label="Doanh thu chia sẻ"
                    {...getFieldProps('sharedRevenue')}
                    error={Boolean(touched.sharedRevenue && errors.sharedRevenue)}
                    helperText={touched.sharedRevenue && errors.sharedRevenue}
                  />
                  <TextField
                    fullWidth
                    label="Mục tiêu vốn đầu tư"
                    {...getFieldProps('investmentTargetCapital')}
                    error={Boolean(
                      touched.investmentTargetCapital && errors.investmentTargetCapital
                    )}
                    helperText={touched.investmentTargetCapital && errors.investmentTargetCapital}
                  />
                  <TextField
                    fullWidth
                    label="Số kỳ"
                    {...getFieldProps('numOfStage')}
                    error={Boolean(touched.numOfStage && errors.numOfStage)}
                    helperText={touched.numOfStage && errors.numOfStage}
                  />
                  <TextField
                    fullWidth
                    label="Hệ số nhân"
                    {...getFieldProps('multiplier')}
                    error={Boolean(touched.multiplier && errors.multiplier)}
                    helperText={touched.multiplier && errors.multiplier}
                  />
                  <TextField
                    fullWidth
                    label="Thời hạn"
                    {...getFieldProps('duration')}
                    error={Boolean(touched.duration && errors.duration)}
                    helperText={touched.duration && errors.duration}
                  />
                </Stack>
              </Card>
              {/* <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Autocomplete
                    multiple
                    freeSolo
                    onChange={(event, newValue) => {
                      setFieldValue('businessId', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                        />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Business" />}
                  />
                </Stack>
              </Card> */}
              {/* <Card sx={{ p: 3 }}>
                <LabelStyle sx={{ pb: 1 }}>Quản lý</LabelStyle>
                <Stack spacing={3}>
                  <Autocomplete
                    multiple
                    freeSolo
                    onChange={(event, newValue) => {
                      setFieldValue('managerId', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Người sở hữu dự án"
                        error={Boolean(touched.managerId && errors.managerId)}
                        helperText={touched.managerId && errors.managerId}
                      />
                    )}
                  />
                </Stack>
              </Card> */}

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Autocomplete
                    freeSolo
                    onChange={(event, newValue) => {
                      setFieldValue('fieldId', newValue);
                    }}
                    options={fieldList.map((option) => option.id)}
                    // options={fieldList}
                    // options={fieldList.map((option) => option.id)}
                    // getOptionLabel={(option) => option.name}
                    // renderOption={(props, option) => (
                    //   <Box component="li" {...props}>
                    //     {option.name}
                    //   </Box>
                    // )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Lĩnh vực"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password' // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <div>
            <LabelStyle sx={{ py: 4 }}>Mô tả thông tin</LabelStyle>
            <QuillEditor
              id="post-content"
              value={values.description}
              onChange={(val) => setFieldValue('description', val)}
              error={Boolean(touched.description && errors.description)}
            />
            {touched.description && errors.description && (
              <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                {touched.description && errors.description}
              </FormHelperText>
            )}
          </div>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            {/* <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={handleOpenPreview}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button> */}
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Tạo mới
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>

      <BlogNewPostPreview
        formik={formik}
        isOpenPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}

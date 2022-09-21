import * as Yup from 'yup';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  Button,
  TextField,
  Typography,
  FormHelperText,
  Autocomplete
} from '@mui/material';
// utils
import { useNavigate } from 'react-router-dom';
// @types
import { NewProjectEntityFormValues } from '../../../../@types/krowd/project';
//
import { QuillEditor } from '../../../editor';

import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from 'routes/paths';
import { RootState } from 'redux/store';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function ProjectEntitytDocumentForm() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { detailOfProject } = useSelector((state: RootState) => state.project);
  const { detailOfProjectID: projectID } = detailOfProject;
  const handleOpenPreview = () => {
    navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessDetails);
  };

  const NewProjectSchema = Yup.object().shape({
    projectId: Yup.string().required('Yêu cầu nhập dự án'),
    title: Yup.string().required('Yêu cầu nhập tên'),
    description: Yup.string().required('Yêu cầu nhập mô tả'),
    link: Yup.string().required('Yêu cầu nhập đường dẫn')
  });

  const formik = useFormik<NewProjectEntityFormValues>({
    initialValues: {
      projectId: projectID!.id,
      type: 'MEDIA',
      title: '',
      link: '',
      content: '',
      description: ''
    },
    validationSchema: NewProjectSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('projectId', projectID!.id);
        formData.append('type', 'MEDIA');
        formData.append('title', values.title);
        formData.append('link', values.link);
        formData.append('description', values.description);
        await fetch(
          `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/project_entities`,
          { method: 'POST', mode: 'cors', body: formData }
        );
        resetForm();
        setSubmitting(true);
        enqueueSnackbar('Tạo mới thành công', {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessDetails);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  console.log(formik);

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <LabelStyle>Truyền thông</LabelStyle>

              <TextField
                sx={{ legend: { span: { mt: 1 } } }}
                label="Tên"
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Đường dẫn"
                {...getFieldProps('link')}
                error={Boolean(touched.link && errors.link)}
                helperText={touched.link && errors.link}
              />
              <TextField
                fullWidth
                label="Mô tả thông tin"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Stack>
          </Card>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              fullWidth
              type="button"
              color="inherit"
              variant="outlined"
              size="large"
              onClick={handleOpenPreview}
              sx={{ mr: 1.5 }}
            >
              Cancel
            </Button>
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
    </>
  );
}

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

type ProjectEntityNewFormProps = {
  isEdit: boolean;
  currentField?: NewProjectEntityFormValues;
};
// export default function ProjectEntitytForm({ isEdit, currentField }: ProjectEntityNewFormProps) {
export default function ProjectEntitytExtensionForm() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { activeProjectId: projectID } = useSelector((state: RootState) => state.project);

  const handleOpenPreview = () => {
    navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessDetails);
  };

  // const handleClosePreview = () => {
  //   navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessKrowd);
  // };

  const NewProjectSchema = Yup.object().shape({
    projectId: Yup.string().required('Yêu cầu nhập dự án'),
    title: Yup.string().required('Yêu cầu nhập tên')
  });

  const formik = useFormik<NewProjectEntityFormValues>({
    // initialValues: {
    //   projectId: projectID!.id,
    //   type: currentField?.type || '',
    //   title: currentField?.title || '',
    //   link: currentField?.link || '',
    //   content: currentField?.content || '',
    //   description: currentField?.description || ''
    // },
    initialValues: {
      projectId: projectID!.id,
      type: 'EXTENSION',
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
        formData.append('type', 'EXTENSION');
        formData.append('title', values.title);
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
  //     if (!isEdit) {
  //       try {
  //         const formData = new FormData();
  //         formData.append('projectId', projectID!.id);
  //         formData.append('type', values.type);
  //         formData.append('title', values.title);
  //         formData.append('link', values.link);
  //         formData.append('content', values.content);
  //         formData.append('description', values.description);
  //         await fetch(
  //           `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/project_entities`,
  //           { method: 'POST', mode: 'cors', body: formData }
  //         );
  //         resetForm();
  //         setSubmitting(true);
  //         enqueueSnackbar('Tạo mới thành công', {
  //           variant: 'success'
  //         });
  //         navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessDetails);
  //       } catch (error) {
  //         console.error(error);
  //         setSubmitting(false);
  //       }
  //     } else {
  //       try {
  //         const formData = new FormData();
  //         formData.append('projectId', projectID!.id);
  //         formData.append('type', values.type);
  //         formData.append('title', values.title);
  //         formData.append('link', values.link);
  //         formData.append('content', values.content);
  //         formData.append('description', values.description);
  //         await fetch(
  //           `https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/project_entities/${currentField?.projectId}`,
  //           { method: 'PUT', mode: 'cors', body: formData }
  //         );
  //         resetForm();
  //         setSubmitting(true);
  //         enqueueSnackbar('Tạo mới thành công', {
  //           variant: 'success'
  //         });
  //         navigate(PATH_DASHBOARD.projectsBusiness.projectBusinessDetails);
  //       } catch (error) {
  //         console.error(error);
  //         setSubmitting(false);
  //       }
  //     }
  //   }
  // });
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;
  console.log(formik);

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <LabelStyle>Mở rộng</LabelStyle>

              <TextField
                sx={{ legend: { span: { mt: 1 } } }}
                label="Tên"
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                variant="outlined"
              />
              {/* <Stack spacing={3}>
                <Autocomplete
                  freeSolo
                  onChange={(event, newValue) => {
                    setFieldValue('type', newValue);
                  }}
                  options={projectID!.projectEntity.map((option) => option.type)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Thể loại"
                      inputProps={{
                        ...params.inputProps
                      }}
                    />
                  )}
                />
              </Stack> */}

              {/* <TextField
                fullWidth
                label="Đường dẫn"
                {...getFieldProps('link')}
                error={Boolean(touched.link && errors.link)}
                helperText={touched.link && errors.link}
              /> */}
              {/* <Stack spacing={3}>
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => {
                        setFieldValue('areaId', newValue);
                      }}
                      options={areaList.map((option) => option.id)}
                      renderInput={(params) => <TextField {...params} label="Khu vực" />}
                    />
                  </Stack> */}
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

      {/* <BlogNewPostPreview
        formik={formik}
        isOpenPreview={open}
        onClosePreview={handleClosePreview}
      /> */}
    </>
  );
}

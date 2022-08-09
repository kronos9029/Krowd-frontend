// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import React from 'react';

import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProjectEntitytFAQForm } from '../../components/_dashboard/project/projectEntity';
// ----------------------------------------------------------------------

export default function KrowdNewProjectFAQ() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo mới câu hỏi| Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Câu hỏi thường gặp"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Thông tin' }]}
        />
        <ProjectEntitytFAQForm />
      </Container>
    </Page>
  );
}

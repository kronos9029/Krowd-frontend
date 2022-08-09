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
import { ProjectEntitytDocumentForm } from '../../components/_dashboard/project/projectEntity';
// ----------------------------------------------------------------------

export default function KrowdNewProjectDocument() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo mới tài liệu| Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thông tin tài liệu"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Thông tin' }]}
        />
        <ProjectEntitytDocumentForm />
      </Container>
    </Page>
  );
}
